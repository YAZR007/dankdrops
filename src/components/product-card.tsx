
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden border-none bg-transparent hover:bg-muted/30 transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-secondary/10">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        {product.isNewArrival && (
          <Badge className="absolute top-2 left-2 md:top-4 md:left-4 bg-primary text-white font-bold uppercase tracking-wider text-[8px] md:text-[10px] px-2 py-0.5">
            New
          </Badge>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <Button asChild variant="secondary" className="w-full font-bold text-[10px] md:text-xs tracking-widest uppercase shadow-2xl">
            <Link href={`/products/${product.id}`}>
              <Eye className="mr-2 h-3 w-3 md:h-4 md:w-4" /> Quick View
            </Link>
          </Button>
        </div>
      </div>
      <CardFooter className="flex flex-col items-start p-2 md:p-4 gap-0.5 md:gap-1 flex-grow">
        <p className="text-[8px] md:text-xs text-muted-foreground uppercase tracking-widest font-medium">{product.category}</p>
        <h3 className="font-headline font-bold text-sm md:text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1 uppercase tracking-tight w-full">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="font-bold text-accent text-xs md:text-base mb-2">${product.price}</p>
        
        <Button asChild variant="outline" size="sm" className="w-full border-primary/20 hover:border-primary/50 text-primary font-black uppercase tracking-[0.2em] text-[9px] h-8 md:h-9 mt-auto group-hover:bg-primary/5">
          <Link href={`/products/${product.id}`}>VIEW DROP</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
