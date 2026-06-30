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
};

// Демо-данные: типы, диапазоны цен и высоты ориентированы на реальный
// рынок (matras-city.ru). Названия и фото — собственные.
export const products: Product[] = [
  {
    id: 'eko-lite',
    name: 'Strong Эко Лайт',
    image: '/images/mattress-3.jpg',
    type: 'Беспружинный',
    height: 18,
    firmness: 'Средняя',
    price: 9990,
    rating: 4.6,
    reviews: 96,
  },
  {
    id: 'komfort',
    name: 'Strong Комфорт',
    image: '/images/mattress-1.jpg',
    type: 'Беспружинный',
    height: 21,
    firmness: 'Средняя',
    price: 12490,
    rating: 4.7,
    reviews: 128,
  },
  {
    id: 'komfort-bio',
    name: 'Strong Комфорт Био',
    image: '/images/mattress-6.jpg',
    type: 'Независимый блок',
    height: 20,
    firmness: 'Жёсткая',
    price: 14490,
    rating: 4.7,
    reviews: 154,
  },
  {
    id: 'energy',
    name: 'Strong Энерджи',
    image: '/images/mattress-2.jpg',
    type: 'Независимый блок',
    height: 22,
    firmness: 'Средняя',
    price: 20020,
    rating: 4.9,
    reviews: 342,
    badge: 'Хит',
  },
  {
    id: 'kokos',
    name: 'Strong Кокос',
    image: '/images/mattress-5.jpg',
    type: 'Беспружинный · кокос',
    height: 20,
    firmness: 'Жёсткая',
    price: 23270,
    rating: 4.7,
    reviews: 187,
  },
  {
    id: 'dream',
    name: 'Strong Дрим',
    image: '/images/mattress-4.jpg',
    type: 'Память формы',
    height: 24,
    firmness: 'Мягкая',
    price: 31340,
    rating: 4.9,
    reviews: 264,
    badge: 'Новинка',
  },
  {
    id: 'premium',
    name: 'Strong Премиум',
    image: '/images/mattress-7.jpg',
    type: 'Независимый блок · латекс',
    height: 26,
    firmness: 'Средняя',
    price: 34900,
    oldPrice: 40010,
    rating: 4.9,
    reviews: 401,
    badge: '−13%',
  },
  {
    id: 'kids',
    name: 'Strong Кидс',
    image: '/images/mattress-8.jpg',
    type: 'Беспружинный · детский',
    height: 16,
    firmness: 'Средняя',
    price: 8750,
    rating: 4.8,
    reviews: 73,
  },
];

export const formatPrice = (n: number) => `${n.toLocaleString('ru-RU')} ₽`;
