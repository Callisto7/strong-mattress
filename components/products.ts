import data from './products.data.json';

export type Firmness = 'Мягкая' | 'Средняя' | 'Жёсткая';

export type Product = {
  id: string;
  name: string;
  image: string;
  type: string;
  height: number;
  firmness: Firmness;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  /** Максимальная нагрузка на спальное место, кг */
  load?: number;
};

/** Нагрузка по умолчанию, если не задана явно (по жёсткости). */
export const productLoad = (p: Product) =>
  p.load ?? (p.firmness === 'Жёсткая' ? 160 : p.firmness === 'Мягкая' ? 110 : 140);

// Данные лежат в products.data.json и перегенерируются скриптом
// scripts/import-products.mjs (синхронизация с поставщиком). Если синк
// не настроен — используется наш собственный курируемый набор.
export const products: Product[] = data.products as Product[];

/** Когда данные последний раз обновлялись импортёром (или "curated"). */
export const productsUpdatedAt: string = data.updatedAt;
export const productsSource: string = data.source;

export const formatPrice = (n: number) => `${n.toLocaleString('ru-RU')} ₽`;
