
"use client";

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { PRODUCTS } from '@/lib/products';
import { useCart } from '@/context/cart-context';
import { useState, useMemo, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, ShoppingBag, Heart, Share2, Wind, Flame, Microscope, Sparkles } from 'lucide-react';
import { AIRecommendations } from '@/components/ai-recommendations';
import { useToast } from '@/hooks/use-toast';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from 'next/link';

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

  const images = useMemo(() => {
    if (!product) return [];
    return [product.imageUrl, ...(product.secondaryImageUrl ? [product.secondaryImageUrl] : [])];
  }, [product]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  
  // Magnification State
  const [showLens, setShowLens] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock scroll when lens is active on mobile to prevent accidental page movement
    if (showLens && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showLens]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 text-muted-foreground">
          <ShoppingBag className="h-8 w-8" />
        </div>
        <h1 className="font-headline text-3xl font-black uppercase tracking-tighter mb-4">Strain Not Found</h1>
        <p className="text-muted-foreground mb-8 max-w-sm mx-auto">This drop might have expired or been rotated out of the harvest.</p>
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

  const updatePosition = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;

    if (x < 0 || y < 0 || x > width || y > height) {
      setShowLens(false);
      return;
    }

    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;

    setLensPosition({ x, y });
    setBgPosition({ x: xPercent, y: yPercent });
    setShowLens(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updatePosition(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    updatePosition(touch.clientX, touch.clientY);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
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
          {/* Main Viewport */}
          <div 
            ref={containerRef}
            className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-black border border-white/5 cursor-none group touch-none"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setShowLens(true)}
            onMouseLeave={() => setShowLens(false)}
            onTouchStart={() => setShowLens(true)}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => setShowLens(false)}
          >
            <Image 
              src={images[activeImageIndex]} 
              alt={product.name} 
              fill 
              className="object-cover"
              priority
            />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/60 border border-white/10 text-white hover:bg-primary transition-all md:opacity-0 group-hover:opacity-100 flex items-center justify-center"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/60 border border-white/10 text-white hover:bg-primary transition-all md:opacity-0 group-hover:opacity-100 flex items-center justify-center"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                </button>
              </>
            )}

            {/* Dank Lens (Magnifier) */}
            {showLens && (
              <div 
                className="absolute w-40 h-40 md:w-52 md:h-52 rounded-full border-4 border-primary shadow-[0_0_30px_rgba(126,42,219,0.7)] pointer-events-none z-20 bg-black"
                style={{
                  left: lensPosition.x - (window.innerWidth < 768 ? 80 : 104),
                  top: lensPosition.y - (window.innerWidth < 768 ? 160 : 104), // Offset higher on mobile to see under finger
                  backgroundImage: `url(${images[activeImageIndex]})`,
                  backgroundSize: '600%',
                  backgroundPosition: `${bgPosition.x}% ${bgPosition.y}%`,
                  backgroundRepeat: 'no-repeat'
                }}
              />
            )}

            <div className="absolute bottom-4 left-4 z-10 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full pointer-events-none">
              <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-white/80 flex items-center gap-2">
                <Microscope className="h-3 w-3 text-primary" /> Macro-Lens {window.innerWidth < 768 ? 'Touch' : 'Enabled'}
              </p>
            </div>
          </div>

          {/* Thumbnail Switcher */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 md:w-20 aspect-[3/4] rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                    activeImageIndex === idx ? 'border-primary shadow-[0_0_10px_rgba(126,42,219,0.4)]' : 'border-white/10 opacity-50 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-[10px] md:text-sm text-primary font-bold tracking-widest uppercase">{product.category}</p>
              {product.thc && (
                <Badge variant="outline" className="border-accent text-accent font-black text-[10px]">{product.thc} THC</Badge>
              )}
            </div>
            <h1 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-2xl md:text-3xl font-bold text-white">${product.price}</span>
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
                <Flame className="h-2.5 w-2.5 text-primary" /> Potency
              </h4>
              <p className="font-bold text-xs md:text-sm">{product.thc || 'N/A'}</p>
            </div>
            <div className="col-span-2">
              <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1.5 flex items-center gap-1.5">
                <Wind className="h-2.5 w-2.5 text-primary" /> Top Terpenes
              </h4>
              <p className="font-bold text-xs md:text-sm">{product.terpenes?.join(', ') || 'Limonene, Myrcene'}</p>
            </div>
            <div className="col-span-2">
              <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1.5 flex items-center gap-1.5">
                <Sparkles className="h-2.5 w-2.5 text-primary" /> Reported Effects
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.effects?.map(effect => (
                  <Badge key={effect} variant="secondary" className="bg-white/5 hover:bg-white/10 text-[8px] md:text-[10px] font-bold uppercase tracking-widest">{effect}</Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-xs font-bold uppercase tracking-wider mb-4">Strain Type</h4>
            <div className="flex flex-wrap gap-3">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-md border text-xs font-bold transition-all ${
                    selectedColor === color 
                      ? 'border-primary bg-primary/10 text-primary shadow-[0_0_10px_rgba(126,42,219,0.3)]' 
                      : 'border-border hover:border-primary/50 text-muted-foreground'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <h4 className="text-xs font-bold uppercase tracking-wider mb-4">Select Weight</h4>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`aspect-square flex items-center justify-center rounded-md border text-xs font-black transition-all ${
                    selectedSize === size 
                      ? 'border-primary bg-primary text-white shadow-[0_0_15px_rgba(126,42,219,0.4)]' 
                      : 'border-border hover:border-primary/50 text-muted-foreground'
                  }`}
                >
                  {size}
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
            <div className="flex gap-3">
              <Button size="lg" variant="outline" className="h-14 flex-1 sm:w-14 p-0 border-white/20 hover:bg-white/10 active:scale-95 transition-transform">
                <Heart className="h-6 w-6" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 flex-1 sm:w-14 p-0 border-white/20 hover:bg-white/10 active:scale-95 transition-transform">
                <Share2 className="h-6 w-6" />
              </Button>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="details" className="border-white/10">
              <AccordionTrigger className="font-headline font-bold uppercase text-xs md:text-sm tracking-widest py-4">Cultivation Specs</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-xs md:text-base leading-relaxed">
                Slow-cured for 21 days in controlled environments. Hand-trimmed by master artisans to preserve trichome integrity. Packaged in light-resistant, air-tight glass jars to maintain peak freshness and preserve volatile terpenes.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <AIRecommendations currentProductId={product.id} />
    </div>
  );
}
