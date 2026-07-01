import { SimpleGrid } from '@mantine/core';
import { products } from './products';
import { ProductCard } from './ProductCard';
import { Reveal } from './Reveal';

export function RelatedProducts({ currentId }: { currentId: string }) {
  const related = products.filter((p) => p.id !== currentId).slice(0, 4);

  return (
    <SimpleGrid cols={{ base: 1, xs: 2, lg: 4 }} spacing="lg">
      {related.map((p, i) => (
        <Reveal key={p.id} delay={i * 0.06} y={20} fill>
          <ProductCard product={p} />
        </Reveal>
      ))}
    </SimpleGrid>
  );
}
