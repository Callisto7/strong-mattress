import { SimpleGrid } from '@mantine/core';
import { products } from './products';
import { ProductCard } from './ProductCard';
import { Reveal } from './Reveal';

// Хиты продаж: помеченные бейджем плюс самые популярные по числу отзывов.
const bestsellers = [...products]
  .sort((a, b) => {
    const badged = Number(Boolean(b.badge)) - Number(Boolean(a.badge));
    return badged !== 0 ? badged : b.reviews - a.reviews;
  })
  .slice(0, 4);

export function Bestsellers() {
  return (
    <SimpleGrid cols={{ base: 1, xs: 2, lg: 4 }} spacing="lg">
      {bestsellers.map((p, i) => (
        <Reveal key={p.id} delay={i * 0.06} y={20} fill>
          <ProductCard product={p} />
        </Reveal>
      ))}
    </SimpleGrid>
  );
}
