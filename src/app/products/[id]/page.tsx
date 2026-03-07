
"use client";

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { PRODUCTS } from '@/lib/products';
import { useCart } from '@/context/cart-context';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, ShoppingBag, Heart, Share2, Info, Wind, Zap, Microscope, Flame, Sparkles } from 'lucide-react';
import { AIRecommendations } from '@/components/ai-recommendations';
import { useToast } from '@/hooks/use-toast';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const product = PRODUCTS.find(p => p.id === id);

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Button onClick={() => router.push('/shop')}>BACK TO SHOP</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);
    toast({
      title: "Added to bag",
      description: `${product.name} (${selectedSize}) has been added.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <button 
        onClick={() => router.back()} 
        className="flex items-center gap-1 text-muted-foreground hover:text-primary mb-8 font-medium transition-colors"
      >
        <ChevronLeft className="h-4 w-4" /> BACK
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="space-y-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-black border border-white/5">
            <Image 
              src={product.imageUrl} 
              alt={product.name} 
              fill 
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-sm text-primary font-bold tracking-widest uppercase">{product.category}</p>
              {product.thc && (
                <Badge variant="outline" className="border-accent text-accent font-black">{product.thc} THC</Badge>
              )}
            </div>
            <h1 className="font-headline text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-white">${product.price}</span>
              {product.isNewArrival && (
                <Badge className="bg-primary text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider">NEW ARRIVAL</Badge>
              )}
            </div>
          </div>

          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-6 mb-8 bg-secondary/20 p-6 rounded-2xl border border-white/5">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2 flex items-center gap-1.5">
                <Microscope className="h-3 w-3 text-primary" /> Lineage
              </h4>
              <p className="font-bold text-sm">{product.lineage || 'Proprietary Hybrid'}</p>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2 flex items-center gap-1.5">
                <Flame className="h-3 w-3 text-primary" /> THC Potency
              </h4>
              <p className="font-bold text-sm">{product.thc || 'N/A'}</p>
            </div>
            <div className="col-span-2">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2 flex items-center gap-1.5">
                <Wind className="h-3 w-3 text-primary" /> Top Terpenes
              </h4>
              <p className="font-bold text-sm">{product.terpenes?.join(', ') || 'Limonene, Myrcene'}</p>
            </div>
            <div className="col-span-2">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-primary" /> Reported Effects
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.effects?.map(effect => (
                  <Badge key={effect} variant="secondary" className="bg-white/5 hover:bg-white/10 text-[10px] font-bold uppercase tracking-widest">{effect}</Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">Strain Type</h4>
            <div className="flex flex-wrap gap-3">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-md border text-sm font-medium transition-all ${
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
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">Select Amount</h4>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`aspect-square flex items-center justify-center rounded-md border text-sm font-bold transition-all ${
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

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              size="lg" 
              className="flex-grow h-14 bg-primary hover:bg-primary/90 text-white font-bold text-lg tracking-widest uppercase"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="mr-2 h-5 w-5" /> ADD TO BAG
            </Button>
            <Button size="lg" variant="outline" className="h-14 w-14 p-0 border-white/20 hover:bg-white/10">
              <Heart className="h-6 w-6" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 w-14 p-0 border-white/20 hover:bg-white/10">
              <Share2 className="h-6 w-6" />
            </Button>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="details">
              <AccordionTrigger className="font-headline font-bold uppercase text-sm tracking-widest py-4">Cultivation Specs</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Slow-cured for 21 days in controlled environments. Hand-trimmed by master artisans to preserve trichome integrity. Packaged in light-resistant, air-tight glass jars to maintain peak freshness.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <AIRecommendations currentProductId={product.id} />
    </div>
  );
}
