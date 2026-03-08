
"use client";

import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { useState, useMemo, Suspense } from 'react';
import { Filter, SlidersHorizontal, X, Clock, ArrowDownWideNarrow, ArrowUpNarrowWide } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const CATEGORIES = ['All', 'Flower', 'Prerolls', 'Concentrates', 'Vapes', 'Accessories'];

type SortOption = 'default' | 'cbd-desc' | 'price-asc';

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  const filterParam = searchParams.get('filter');

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];
    
    // Category Filtering
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    
    // 'New' Filter from params
    if (filterParam === 'new') {
      result = result.filter(p => p.isNewArrival);
    }

    // Sorting Logic
    if (sortBy === 'cbd-desc') {
      result.sort((a, b) => {
        const cbdA = parseFloat(a.cbd?.replace('%', '') || '0');
        const cbdB = parseFloat(b.cbd?.replace('%', '') || '0');
        return cbdB - cbdA;
      });
    } else if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    }

    return result;
  }, [activeCategory, filterParam, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="mb-8 md:mb-12">
        <h1 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tighter mb-2">The Dispensary</h1>
        <p className="text-muted-foreground text-xs md:text-lg uppercase tracking-[0.2em] font-bold">Curated Artisanal CBD Harvest</p>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile Categories - Horizontal Scroll */}
        <div className="md:hidden -mx-4 px-4 mb-6">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-3 pb-4">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full transition-all font-black text-[10px] uppercase tracking-widest border active:scale-90 transform-gpu ${
                    activeCategory === cat 
                      ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(126,42,219,0.4)]' 
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
                  className={`text-left px-3 py-2 rounded-md transition-all font-bold text-xs uppercase tracking-widest flex items-center justify-between group active:scale-95 transform-gpu ${
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
              <button 
                onClick={() => setSortBy(sortBy === 'cbd-desc' ? 'default' : 'cbd-desc')}
                className={`text-left px-3 py-2 text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-between active:scale-95 transform-gpu ${
                  sortBy === 'cbd-desc' ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                CBD: High to Low
                {sortBy === 'cbd-desc' && <ArrowDownWideNarrow className="h-3 w-3" />}
              </button>
              <button 
                onClick={() => setSortBy(sortBy === 'price-asc' ? 'default' : 'price-asc')}
                className={`text-left px-3 py-2 text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-between active:scale-95 transform-gpu ${
                  sortBy === 'price-asc' ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                Price: Low to High
                {sortBy === 'price-asc' && <ArrowUpNarrowWide className="h-3 w-3" />}
              </button>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-700">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-6">
                <Clock className="h-8 w-8" />
              </div>
              <p className="font-headline text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2">Coming Soon</p>
              <p className="text-muted-foreground mb-8 max-w-sm text-xs md:text-base">We are currently curing our next batch of artisanal {activeCategory.toLowerCase()}. Sign up for drops to be notified.</p>
              <Button onClick={() => setActiveCategory('Flower')} variant="outline" className="font-black uppercase tracking-widest text-[10px] h-12 active:scale-95 transition-transform">
                BROWSE CURRENT FLOWERS
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="animate-pulse space-y-8">
          <div className="h-12 w-48 bg-muted rounded-md mx-auto" />
          <div className="h-4 w-64 bg-muted rounded-md mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-80 bg-muted/50 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
