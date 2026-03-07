
"use client";

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { PRODUCTS } from '@/lib/products';
import { useCart } from '@/context/cart-context';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, ShoppingBag, Heart, Share2, Info } from 'lucide-react';
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
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted">
            <Image 
              src={product.imageUrl} 
              alt={product.name} 
              fill 
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted cursor-pointer hover:opacity-80 transition-opacity">
                <Image 
                  src={`https://picsum.photos/seed/thumb${i}${product.id}/400/600`} 
                  alt={`${product.name} thumb ${i}`} 
                  fill 
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <p className="text-sm text-primary font-bold tracking-widest uppercase mb-2">{product.category}</p>
            <h1 className="font-headline text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-accent">${product.price}</span>
              {product.isNewArrival && (
                <Badge className="bg-primary text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider">NEW ARRIVAL</Badge>
              )}
            </div>
          </div>

          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            {product.description}
          </p>

          <Separator className="mb-8" />

          {/* Color Selection */}
          <div className="mb-8">
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">Select Color</h4>
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

          {/* Size Selection */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold uppercase tracking-wider">Select Size</h4>
              <button className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
                <Info className="h-3 w-3" /> SIZE GUIDE
              </button>
            </div>
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
              <AccordionTrigger className="font-headline font-bold uppercase text-sm tracking-widest py-4">Details & Fit</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                - 100% Premium French Terry Cotton<br />
                - Oversized streetwear fit<br />
                - High-definition logo embroidery<br />
                - Pre-shrunk for minimal shrinkage
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger className="font-headline font-bold uppercase text-sm tracking-widest py-4">Shipping & Returns</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Free shipping on all orders over $150. Standard delivery takes 3-5 business days. Returns are accepted within 30 days of delivery.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <AIRecommendations currentProductId={product.id} />
    </div>
  );
}
