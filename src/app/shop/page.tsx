
"use client";

import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';

const CATEGORIES = ['All', 'Hoodies', 'T-Shirts', 'Pants', 'Shoes', 'Jackets', 'Accessories'];

export default function ShopPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  const filterParam = searchParams.get('filter');

  const [activeCategory, setActiveCategory] = useState(categoryParam);

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS;
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    if (filterParam === 'new') {
      result = result.filter(p => p.isNewArrival);
    }
    return result;
  }, [activeCategory, filterParam]);

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="font-headline text-5xl font-black uppercase tracking-tighter mb-4">The Catalog</h1>
        <p className="text-muted-foreground text-lg">Browse our latest drops and street essentials.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
          <div>
            <h3 className="font-headline text-lg font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <Filter className="h-4 w-4" /> Categories
            </h3>
            <div className="flex flex-col gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-left px-3 py-2 rounded-md transition-colors font-medium text-sm ${
                    activeCategory === cat 
                      ? 'bg-primary text-white' 
                      : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t">
            <h3 className="font-headline text-lg font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" /> Sort By
            </h3>
            <div className="flex flex-col gap-2">
              <button className="text-left px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors">Newest First</button>
              <button className="text-left px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors">Price: Low to High</button>
              <button className="text-left px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors">Price: High to Low</button>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-xl font-bold mb-2">No products found</p>
              <p className="text-muted-foreground mb-6">Try adjusting your filters or category.</p>
              <Button onClick={() => setActiveCategory('All')} variant="outline">
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
