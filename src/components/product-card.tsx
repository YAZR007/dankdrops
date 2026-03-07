
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group overflow-hidden border-none bg-transparent hover:bg-muted/30 transition-all duration-300">
        <CardContent className="p-0 relative aspect-[3/4] overflow-hidden rounded-xl">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.isNewArrival && (
            <Badge className="absolute top-4 left-4 bg-primary text-white font-bold uppercase tracking-wider text-[10px] px-2 py-0.5">
              New Arrival
            </Badge>
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white font-bold text-sm tracking-widest uppercase">Quick View</span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start p-4 gap-1">
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">{product.category}</p>
          <h3 className="font-headline font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
          <p className="font-bold text-accent">${product.price}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
