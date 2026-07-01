import {
  IconBedFilled,
  IconFeather,
  IconShoe,
  IconLayoutGrid,
  IconArmchair,
  IconStack2,
  type Icon,
} from '@tabler/icons-react';
import { IconMattress } from './icons';

export type Category = {
  /** URL slug used for /catalog?cat=<slug> */
  slug: string;
  label: string;
  /** Short line shown on the homepage banner */
  tagline: string;
  icon: Icon;
  /** Optional cutout photo shown on the homepage banner */
  bannerImage?: string;
};

export const categories: Category[] = [
  {
    slug: 'mattresses',
    label: 'Матрасы',
    tagline: 'Ортопедические и беспружинные',
    icon: IconMattress,
    bannerImage: '/images/mattress-2.jpg',
  },
  {
    slug: 'beds',
    label: 'Кровати',
    tagline: 'Каркасы и основания',
    icon: IconBedFilled,
    bannerImage: '/images/cta-couch.jpg',
  },
  {
    slug: 'pillows',
    label: 'Подушки',
    tagline: 'Анатомические и с памятью',
    icon: IconFeather,
  },
  {
    slug: 'shoe-racks',
    label: 'Обувные стеллажи',
    tagline: 'Для прихожей и гардеробной',
    icon: IconShoe,
  },
];

// —— Мега-меню «Каталог» ————————————————————————————————————————————

export type MenuItem = { label: string; href: string };
export type MenuColumn = { title: string; items: MenuItem[] };

/** Левый список категорий в мега-меню. */
export const catalogSideItems: { label: string; slug: string; icon: Icon }[] = [
  { label: 'Матрасы', slug: 'mattresses', icon: IconMattress },
  { label: 'Кровати', slug: 'beds', icon: IconBedFilled },
  { label: 'Наматрасники', slug: 'toppers', icon: IconLayoutGrid },
  { label: 'Подушки', slug: 'pillows', icon: IconFeather },
  { label: 'Одеяла', slug: 'blankets', icon: IconStack2 },
  { label: 'Мебель для спальни', slug: 'furniture', icon: IconArmchair },
];

/** Правые колонки мега-меню для матрасов (ссылки ведут в каталог с фильтрами). */
export const mattressMenuColumns: MenuColumn[] = [
  {
    title: 'Вид',
    items: [
      { label: 'Беспружинные', href: '/catalog?cat=mattresses&type=беспружин' },
      { label: 'Независимый блок', href: '/catalog?cat=mattresses&type=независим' },
      { label: 'С памятью формы', href: '/catalog?cat=mattresses&type=память' },
      { label: 'С кокосом', href: '/catalog?cat=mattresses&type=кокос' },
      { label: 'С латексом', href: '/catalog?cat=mattresses&type=латекс' },
    ],
  },
  {
    title: 'По жёсткости',
    items: [
      { label: 'Мягкие', href: '/catalog?cat=mattresses&firm=Мягкая' },
      { label: 'Средней жёсткости', href: '/catalog?cat=mattresses&firm=Средняя' },
      { label: 'Жёсткие', href: '/catalog?cat=mattresses&firm=Жёсткая' },
      { label: 'Детские', href: '/catalog?cat=mattresses&type=детск' },
    ],
  },
  {
    title: 'Цена',
    items: [
      { label: 'До 20 000 ₽', href: '/catalog?cat=mattresses&price=0-20000' },
      { label: '20 000 – 40 000 ₽', href: '/catalog?cat=mattresses&price=20000-40000' },
      { label: 'От 40 000 ₽', href: '/catalog?cat=mattresses&price=40000-' },
    ],
  },
];
