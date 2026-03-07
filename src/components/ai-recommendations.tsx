
"use client";

import { useEffect, useState } from 'react';
import { receivePersonalizedRecommendations } from '@/ai/flows/receive-personalized-recommendations-flow';
import { Product } from '@/types/product';
import { PRODUCTS } from '@/lib/products';
import { ProductCard } from './product-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Leaf } from 'lucide-react';

interface AIRecommendationsProps {
  currentProductId?: string;
}

export function AIRecommendations({ currentProductId }: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getRecs() {
      try {
        setLoading(true);
        const browsingHistory = currentProductId ? [currentProductId] : [];
        const result = await receivePersonalizedRecommendations({
          browsingHistory,
          cartItems: [],
          allProducts: PRODUCTS.map(p => ({
            id: p.id,
            name: p.name,
            description: p.description,
            category: p.category,
            price: p.price
          }))
        });

        const recIds = result.recommendedProducts.map(p => p.id);
        const products = PRODUCTS.filter(p => recIds.includes(p.id) && p.id !== currentProductId);
        setRecommendations(products.slice(0, 4));
      } catch (error) {
        // Fallback to random products if flow fails
        setRecommendations(PRODUCTS.filter(p => p.id !== currentProductId).slice(0, 4));
      } finally {
        setLoading(false);
      }
    }

    getRecs();
  }, [currentProductId]);

  if (!loading && recommendations.length === 0) return null;

  return (
    <section className="py-12 border-t mt-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <Leaf className="h-5 w-5 text-primary" />
          <h2 className="font-headline text-2xl font-bold uppercase tracking-tighter">Curated Picks</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[3/4] w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            ))
          ) : (
            recommendations.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
