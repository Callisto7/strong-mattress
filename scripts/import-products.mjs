#!/usr/bin/env node
/**
 * Синхронизация каталога с поставщиком.
 *
 * Запуск (локально или в GitHub Actions по расписанию):
 *   node scripts/import-products.mjs
 *
 * Источник данных выбирается по переменным окружения:
 *
 *   SUPPLIER_FEED_URL   — ссылка на YML/XML прайс-фид (формат Яндекс.Маркета).
 *                         Самый надёжный вариант — запросите его у поставщика.
 *
 *   SUPPLIER_PAGES      — список URL страниц каталога через запятую. Скрипт
 *                         достаёт товары из микроразметки JSON-LD (schema.org
 *                         Product), которая есть на большинстве магазинов.
 *
 *   DOWNLOAD_IMAGES=0   — не скачивать картинки локально (по умолчанию скачивает
 *                         в public/synced и подставляет локальные пути).
 *
 *   MAX_PRODUCTS=40     — ограничение на число импортируемых товаров.
 *
 * Результат пишется в components/products.data.json. Если источник не задан
 * или запрос упал — существующие данные НЕ затираются (сайт не сломается).
 *
 * ВАЖНО: фото и описания на стороне поставщика защищены авторским правом.
 * Используйте синхронизацию только с их разрешения (например, по официальному
 * фиду для партнёров-реселлеров).
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { createWriteStream, existsSync } from 'node:fs';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA_FILE = path.join(ROOT, 'components', 'products.data.json');
const IMAGES_DIR = path.join(ROOT, 'public', 'synced');

const FEED_URL = process.env.SUPPLIER_FEED_URL || '';
const PAGES = (process.env.SUPPLIER_PAGES || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const DOWNLOAD_IMAGES = process.env.DOWNLOAD_IMAGES !== '0';
const MAX_PRODUCTS = Number(process.env.MAX_PRODUCTS || 40);

const FIRMNESS = ['Мягкая', 'Средняя', 'Жёсткая'];

function fail(msg) {
  console.error(`✗ ${msg}`);
  console.error('  Данные не изменены. Настройте SUPPLIER_FEED_URL или SUPPLIER_PAGES.');
  process.exit(1);
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { 'user-agent': 'StrongMattressBot/1.0 (+catalog sync)' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} для ${url}`);
  return res.text();
}

// —— helpers для разбора без сторонних зависимостей ————————————————————

function decode(s = '') {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#3[49];|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/<[^>]+>/g, '')
    .trim();
}

function slugify(s, i) {
  const base = s
    .toLowerCase()
    .replace(/[^a-zа-я0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
  return base || `item-${i}`;
}

function guessFirmness(text) {
  const t = text.toLowerCase();
  // «средней жёсткости» — это средняя, поэтому проверяем «средн» первым.
  if (/средн/.test(t)) return 'Средняя';
  if (/мягк/.test(t)) return 'Мягкая';
  if (/жёстк|жестк/.test(t)) return 'Жёсткая';
  return 'Средняя';
}

function guessType(text) {
  const t = text.toLowerCase();
  if (/латекс/.test(t)) return 'Независимый блок · латекс';
  if (/кокос/.test(t)) return 'Беспружинный · кокос';
  if (/памят/.test(t)) return 'Память формы';
  if (/независим|пружин/.test(t)) return 'Независимый блок';
  if (/детск/.test(t)) return 'Беспружинный · детский';
  return 'Беспружинный';
}

function guessHeight(text) {
  const m = text.match(/(\d{2})\s*см/);
  return m ? Number(m[1]) : 20;
}

// —— парсер YML (Яндекс.Маркет) ————————————————————————————————————————

function parseYml(xml) {
  const offers = [...xml.matchAll(/<offer\b[^>]*>([\s\S]*?)<\/offer>/gi)];
  return offers.map((m, i) => {
    const body = m[1];
    const pick = (tag) => {
      const r = body.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'));
      return r ? decode(r[1]) : '';
    };
    const name = pick('name') || pick('model') || `Товар ${i + 1}`;
    const desc = pick('description');
    const price = Number(pick('price').replace(/[^\d.]/g, '')) || 0;
    const oldPrice = Number(pick('oldprice').replace(/[^\d.]/g, '')) || 0;
    const picture = pick('picture');
    return normalize({ name, desc, price, oldPrice, image: picture, i });
  });
}

// —— парсер JSON-LD (schema.org Product) ——————————————————————————————

function parseJsonLd(html) {
  const blocks = [
    ...html.matchAll(
      /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ];
  const products = [];
  for (const b of blocks) {
    let json;
    try {
      json = JSON.parse(b[1].trim());
    } catch {
      continue;
    }
    const nodes = Array.isArray(json)
      ? json
      : json['@graph']
        ? json['@graph']
        : [json];
    for (const n of nodes) {
      if (!n || n['@type'] !== 'Product') continue;
      const offer = Array.isArray(n.offers) ? n.offers[0] : n.offers || {};
      products.push(
        normalize({
          name: n.name || '',
          desc: typeof n.description === 'string' ? n.description : '',
          price: Number(offer.price) || 0,
          oldPrice: 0,
          image: Array.isArray(n.image) ? n.image[0] : n.image || '',
          rating: n.aggregateRating ? Number(n.aggregateRating.ratingValue) : 0,
          reviews: n.aggregateRating ? Number(n.aggregateRating.reviewCount) : 0,
          i: products.length,
        }),
      );
    }
  }
  return products;
}

// —— общая нормализация в нашу схему ——————————————————————————————————

function normalize({ name, desc = '', price, oldPrice, image, rating, reviews, i }) {
  const text = `${name} ${desc}`;
  const product = {
    id: slugify(name, i),
    name: name.trim(),
    image: image || '',
    type: guessType(text),
    height: guessHeight(text),
    firmness: guessFirmness(text),
    price,
    rating: rating && rating > 0 ? Math.round(rating * 10) / 10 : 4.7,
    reviews: reviews && reviews > 0 ? reviews : 0,
  };
  if (oldPrice && oldPrice > price) {
    product.oldPrice = oldPrice;
    const off = Math.round((1 - price / oldPrice) * 100);
    if (off > 0) product.badge = `−${off}%`;
  }
  return product;
}

async function downloadImage(url, id) {
  if (!url || !/^https?:\/\//.test(url)) return url;
  try {
    const ext = (url.split('?')[0].match(/\.(jpe?g|png|webp|avif)$/i) || [
      '',
      'jpg',
    ])[1];
    const rel = `/synced/${id}.${ext}`;
    const dest = path.join(ROOT, 'public', rel);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
    return rel;
  } catch (e) {
    console.warn(`  ! не удалось скачать ${url}: ${e.message}`);
    return url; // оставляем внешний адрес как запасной вариант
  }
}

async function main() {
  if (!FEED_URL && PAGES.length === 0) {
    fail('Источник не задан.');
  }

  let products = [];
  try {
    if (FEED_URL) {
      console.log(`→ Читаю YML-фид: ${FEED_URL}`);
      products = parseYml(await fetchText(FEED_URL));
    } else {
      for (const url of PAGES) {
        console.log(`→ Читаю страницу: ${url}`);
        products.push(...parseJsonLd(await fetchText(url)));
      }
    }
  } catch (e) {
    fail(`Не удалось получить данные: ${e.message}`);
  }

  products = products.filter((p) => p.name && p.price > 0).slice(0, MAX_PRODUCTS);
  if (products.length === 0) fail('Не найдено ни одного товара с ценой.');

  if (DOWNLOAD_IMAGES) {
    if (!existsSync(IMAGES_DIR)) await mkdir(IMAGES_DIR, { recursive: true });
    for (const p of products) {
      p.image = (await downloadImage(p.image, p.id)) || '/images/mattress-1.jpg';
    }
  }

  const payload = {
    source: FEED_URL ? 'yml-feed' : 'jsonld-scrape',
    updatedAt: new Date().toISOString().slice(0, 10),
    products,
  };
  await writeFile(DATA_FILE, JSON.stringify(payload, null, 2) + '\n', 'utf8');
  console.log(`✓ Импортировано товаров: ${products.length} → ${path.relative(ROOT, DATA_FILE)}`);
}

main();
