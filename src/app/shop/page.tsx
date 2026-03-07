
"use client";

import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, X, Clock } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const CATEGORIES = ['All', 'Flower', 'Prerolls', 'Concentrates', 'Edibles', 'Vapes', 'Accessories'];

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
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="mb-8 md:mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2 md:mb-4">The Dispensary</h1>
        <p className="text-muted-foreground text-sm md:text-lg">Explore our curated selection of premium cannabis products.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile Categories - Horizontal Scroll */}
        <div className="md:hidden -mx-4 px-4 mb-4">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-2 pb-4">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full transition-all font-bold text-xs uppercase tracking-widest border ${
                    activeCategory === cat 
                      ? 'bg-primary border-primary text-white shadow-[0_0_10px_rgba(126,42,219,0.3)]' 
                      : 'bg-secondary/20 border-white/5 text-muted-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>
        </div>

        {/* Desktop Filters Sidebar */}
        <aside className="hidden md:block w-64 flex-shrink-0 space-y-8">
          <div>
            <h3 className="font-headline text-lg font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <Filter className="h-4 w-4" /> Categories
            </h3>
            <div className="flex flex-col gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-left px-3 py-2 rounded-md transition-colors font-medium text-sm flex items-center justify-between group ${
                    activeCategory === cat 
                      ? 'bg-primary text-white' 
                      : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {cat}
                  {cat !== 'All' && cat !== 'Flower' && (
                    <span className="text-[8px] font-black tracking-tighter opacity-50 group-hover:opacity-100">SOON</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-white/5">
            <h3 className="font-headline text-lg font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" /> Sort By
            </h3>
            <div className="flex flex-col gap-2">
              <button className="text-left px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors">Newest Harvest</button>
              <button className="text-left px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors">THC: High to Low</button>
              <button className="text-left px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors">Price: Low to High</button>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-700">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-6">
                <Clock className="h-8 w-8" />
              </div>
              <p className="font-headline text-3xl font-black uppercase tracking-tighter mb-2">Coming Soon</p>
              <p className="text-muted-foreground mb-8 max-w-sm">We are currently curing our next batch of artisanal {activeCategory.toLowerCase()}. Sign up for drops to be notified.</p>
              <Button onClick={() => setActiveCategory('Flower')} variant="outline" className="font-bold uppercase tracking-widest text-[10px]">
                BROWSE CURRENT FLOWERS
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
