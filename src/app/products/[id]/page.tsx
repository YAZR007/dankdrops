
"use client";

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { PRODUCTS, getPriceForSize } from '@/lib/products';
import { useCart } from '@/context/cart-context';
import { useState, useMemo, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, ShoppingBag, Heart, Share2, Wind, Flame, Microscope, Sparkles, Search as SearchIcon } from 'lucide-react';
import { AIRecommendations } from '@/components/ai-recommendations';
import { useToast } from '@/hooks/use-toast';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const product = useMemo(() => {
    if (!id) return null;
    return PRODUCTS.find(p => p.id === id);
  }, [id]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '3.5g');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || 'Hybrid');
  
  const currentPrice = useMemo(() => {
    if (!product) return 0;
    return getPriceForSize(product.price, selectedSize);
  }, [product, selectedSize]);

  const images = useMemo(() => {
    if (!product) return [];
    const imgs = [product.imageUrl];
    if (product.secondaryImageUrl) imgs.push(product.secondaryImageUrl);
    if (product.tertiaryImageUrl) imgs.push(product.tertiaryImageUrl);
    return imgs;
  }, [product]);

  // Magnification & Navigation State
  const [showLens, setShowLens] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });
  const [showHeadsUp, setShowHeadsUp] = useState(true);
  const [hasMagnified, setHasMagnified] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHoldingRef = useRef<boolean>(false);
  const tapCountRef = useRef(0);
  const lastTapTimeRef = useRef(0);

  useEffect(() => {
    setShowHeadsUp(true);
    setHasMagnified(false);
  }, [id]);

  const updatePosition = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;

    if (x < 0 || y < 0 || x > width || y > height) {
      if (!isHoldingRef.current) setShowLens(false);
      return;
    }

    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;

    setLensPosition({ x, y });
    setBgPosition({ x: xPercent, y: yPercent });
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: width * index,
        behavior: 'smooth'
      });
      setActiveImageIndex(index);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const now = Date.now();
      const delta = now - lastTapTimeRef.current;
      
      if (delta < 300) {
        tapCountRef.current++;
      } else {
        tapCountRef.current = 1;
      }
      lastTapTimeRef.current = now;

      if (tapCountRef.current === 3) {
        isHoldingRef.current = true;
        setShowLens(true);
        setShowHeadsUp(false);
        setHasMagnified(true);
        updatePosition(touch.clientX, touch.clientY);
        if (e.cancelable) e.preventDefault();
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isHoldingRef.current) {
        const touch = e.touches[0];
        if (e.cancelable) e.preventDefault();
        updatePosition(touch.clientX, touch.clientY);
      }
    };

    const onTouchEnd = () => {
      if (isHoldingRef.current) {
        isHoldingRef.current = false;
        setShowLens(false);
        tapCountRef.current = 0;
      }
    };

    container.addEventListener('touchstart', onTouchStart, { passive: false });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    container.addEventListener('touchend', onTouchEnd, { passive: true });
    container.addEventListener('contextmenu', (e) => e.preventDefault());

    return () => {
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
    };
  }, [activeImageIndex]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const index = Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth);
      if (index !== activeImageIndex) {
        setActiveImageIndex(index);
      }
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 text-muted-foreground">
          <ShoppingBag className="h-8 w-8" />
        </div>
        <h1 className="font-headline text-3xl font-black uppercase tracking-tighter mb-4">Strain Not Found</h1>
        <Button asChild size="lg" className="font-bold uppercase tracking-widest">
          <Link href="/shop">BACK TO THE HARVEST</Link>
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);
    toast({
      title: "Added to bag",
      description: `${product.name} (${selectedSize}) has been added to your drop.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-12">
      <button 
        onClick={() => router.back()} 
        className="flex items-center gap-1 text-muted-foreground hover:text-primary mb-6 md:mb-8 font-bold transition-colors uppercase text-[10px] tracking-widest"
      >
        <ChevronLeft className="h-4 w-4" /> BACK
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
        <div className="space-y-6">
          <div className="relative group/gallery">
            <div 
              ref={containerRef}
              onMouseMove={(e) => updatePosition(e.clientX, e.clientY)}
              onMouseEnter={() => setShowLens(true)}
              onMouseLeave={() => setShowLens(false)}
              className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-black border border-white/5 cursor-none select-none touch-none"
            >
              <div 
                ref={scrollRef}
                className="flex w-full h-full overflow-x-auto lg:overflow-hidden snap-x snap-mandatory scrollbar-hide scroll-smooth"
                onScroll={handleScroll}
              >
                {images.map((img, idx) => (
                  <div key={idx} className="relative flex-shrink-0 w-full h-full snap-center">
                    <Image 
                      src={img} 
                      alt={`${product.name} ${idx + 1}`} 
                      fill 
                      className="object-cover pointer-events-none"
                      priority={idx === 0}
                    />
                  </div>
                ))}
              </div>

              {showHeadsUp && !hasMagnified && (
                <div className="absolute inset-x-0 bottom-10 flex justify-center z-40 px-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 pointer-events-none md:hidden">
                  <div className="bg-black/80 backdrop-blur-xl border border-primary/40 rounded-full px-6 py-3 flex items-center gap-3 shadow-[0_0_30px_rgba(126,42,219,0.3)]">
                    <SearchIcon className="h-4 w-4 text-primary animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
                      Triple tap and hold to magnify
                    </span>
                  </div>
                </div>
              )}

              {showLens && (
                <div 
                  className="absolute w-40 h-40 md:w-52 md:h-52 rounded-full border-4 border-primary shadow-[0_0_30px_rgba(126,42,219,0.7)] pointer-events-none z-50 bg-black"
                  style={{
                    left: lensPosition.x - (typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 104),
                    top: lensPosition.y - (typeof window !== 'undefined' && window.innerWidth < 768 ? 160 : 104),
                    backgroundImage: `url(${images[activeImageIndex]})`,
                    backgroundSize: '600%',
                    backgroundPosition: `${bgPosition.x}% ${bgPosition.y}%`,
                    backgroundRepeat: 'no-repeat'
                  }}
                />
              )}
            </div>

            {/* External Navigation Arrows for PC */}
            {images.length > 1 && (
              <div className="hidden lg:block">
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    const nextIdx = (activeImageIndex - 1 + images.length) % images.length;
                    scrollToIndex(nextIdx);
                  }}
                  className="absolute left-0 -translate-x-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-primary hover:scale-110 active:scale-95 transition-all opacity-0 group-hover/gallery:opacity-100 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    const nextIdx = (activeImageIndex + 1) % images.length;
                    scrollToIndex(nextIdx);
                  }}
                  className="absolute right-0 translate-x-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-primary hover:scale-110 active:scale-95 transition-all opacity-0 group-hover/gallery:opacity-100 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToIndex(idx)}
                  className={cn(
                    "relative w-16 md:w-20 aspect-[3/4] rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all",
                    activeImageIndex === idx ? 'border-primary shadow-[0_0_10px_rgba(126,42,219,0.4)]' : 'border-white/10 opacity-50 hover:opacity-100'
                  )}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-[10px] md:text-sm text-primary font-bold tracking-widest uppercase">{product.category}</p>
              {product.cbd && (
                <Badge variant="outline" className="border-accent text-accent font-black text-[10px]">{product.cbd} CBD</Badge>
              )}
            </div>
            <h1 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-2xl md:text-3xl font-bold text-white">£{currentPrice}</span>
              {product.isNewArrival && (
                <Badge className="bg-primary text-white px-2 py-0.5 md:px-3 md:py-1 text-[8px] md:text-[10px] font-bold uppercase tracking-wider">NEW HARVEST</Badge>
              )}
            </div>
          </div>

          <p className="text-muted-foreground text-sm md:text-lg leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8 bg-secondary/20 p-4 md:p-6 rounded-2xl border border-white/5">
            <div>
              <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1.5 flex items-center gap-1.5">
                <Microscope className="h-2.5 w-2.5 text-primary" /> Lineage
              </h4>
              <p className="font-bold text-xs md:text-sm truncate">{product.lineage || 'Proprietary Hybrid'}</p>
            </div>
            <div>
              <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1.5 flex items-center gap-1.5">
                <Flame className="h-2.5 w-2.5 text-primary" /> Concentration
              </h4>
              <p className="font-bold text-xs md:text-sm">{product.cbd || 'N/A'}</p>
            </div>
            <div className="col-span-2">
              <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1.5 flex items-center gap-1.5">
                <Wind className="h-2.5 w-2.5 text-primary" /> Top Terpenes
              </h4>
              <p className="font-bold text-xs md:text-sm">{product.terpenes?.join(', ') || 'Limonene, Myrcene'}</p>
            </div>
            <div className="col-span-2">
              <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1.5 flex items-center gap-1.5">
                <Sparkles className="h-2.5 w-2.5 text-primary" /> Reported Benefits
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.effects?.map(effect => (
                  <Badge key={effect} variant="secondary" className="bg-white/5 hover:bg-white/10 text-[8px] md:text-[10px] font-bold uppercase tracking-widest">{effect}</Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h4 className="text-xs font-bold uppercase tracking-wider mb-4">Select Weight</h4>
            <div className="grid grid-cols-4 gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                    selectedSize === size 
                      ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(126,42,219,0.3)]' 
                      : 'border-white/10 hover:border-white/30 bg-black/40'
                  }`}
                >
                  <span className={`text-xs font-black uppercase tracking-widest ${selectedSize === size ? 'text-primary' : 'text-muted-foreground'}`}>{size}</span>
                  <span className="text-[10px] font-bold mt-1">£{getPriceForSize(product.price, size)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <Button 
              size="lg" 
              className="flex-grow h-14 bg-primary hover:bg-primary/90 text-white font-bold text-lg tracking-widest uppercase active:scale-95 transition-transform"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="mr-2 h-5 w-5" /> ADD TO BAG
            </Button>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="details" className="border-white/10">
              <AccordionTrigger className="font-headline font-bold uppercase text-xs md:text-sm tracking-widest py-4">Cultivation Specs</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-xs md:text-base leading-relaxed">
                UK Compliant CBD strains. Slow-cured for 21 days in controlled environments. Hand-trimmed by master artisans.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <AIRecommendations currentProductId={product.id} />
    </div>
  );
}
