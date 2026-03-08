
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { Card, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Link 
      href={`/products/${product.id}`} 
      className="block group h-full"
      onClick={() => product.secondaryImageUrl && setIsClicked(true)}
    >
      <Card className="h-full overflow-hidden border-none bg-transparent hover:bg-muted/30 transition-all duration-300 flex flex-col">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-secondary/10">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className={cn(
              "object-cover transition-all duration-700",
              isClicked && product.secondaryImageUrl ? "opacity-0" : "opacity-100",
              product.secondaryImageUrl ? "md:group-hover:opacity-0" : "md:group-hover:scale-110"
            )}
            sizes="(max-width: 768px) 50vw, 33vw"
          />
          {product.secondaryImageUrl && (
            <Image
              src={product.secondaryImageUrl}
              alt={`${product.name} alternate view`}
              fill
              className={cn(
                "object-cover absolute inset-0 transition-all duration-700",
                isClicked ? "opacity-100" : "opacity-0",
                "md:group-hover:opacity-100 md:group-hover:scale-105"
              )}
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          )}
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
        <CardFooter className="flex flex-col items-start p-2 md:p-4 gap-0.5 md:gap-1 flex-grow">
          <p className="text-[8px] md:text-xs text-muted-foreground uppercase tracking-widest font-medium">{product.category}</p>
          <h3 className="font-headline font-bold text-sm md:text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1 uppercase tracking-tight w-full">
            {product.name}
          </h3>
          <p className="font-bold text-accent text-xs md:text-base mb-2">£{product.price}</p>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full border-primary/20 group-hover:border-primary group-hover:bg-primary group-hover:text-white text-primary font-black uppercase tracking-[0.2em] text-[9px] h-8 md:h-9 mt-auto transition-all pointer-events-none"
          >
            VIEW DROP
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
