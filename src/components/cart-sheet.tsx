
"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function CartSheet({ children }: { children: React.ReactNode }) {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-6 pb-2">
          <SheetTitle className="font-headline text-2xl flex items-center gap-2 uppercase tracking-tighter">
            YOUR BAG <span className="text-muted-foreground text-lg">({totalItems})</span>
          </SheetTitle>
        </SheetHeader>
        
        <Separator className="mx-6 w-auto" />

        {cart.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center p-6 gap-4 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <p className="font-bold uppercase tracking-tight text-lg">Your bag is empty</p>
              <p className="text-sm text-muted-foreground">Looks like you haven't added anything to your drop yet.</p>
            </div>
            <SheetTrigger asChild>
              <Button asChild className="w-full mt-4 font-bold tracking-widest uppercase h-12 active:scale-95 transition-transform">
                <Link href="/shop">START SHOPPING</Link>
              </Button>
            </SheetTrigger>
          </div>
        ) : (
          <ScrollArea className="flex-grow px-6">
            <div className="flex flex-col gap-6 py-6">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4">
                  <SheetTrigger asChild>
                    <Link href={`/products/${item.id}`} className="relative aspect-[3/4] h-24 w-18 overflow-hidden rounded-md flex-shrink-0 group active:scale-95 transition-transform transform-gpu">
                      <Image 
                        src={item.imageUrl} 
                        alt={item.name} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </Link>
                  </SheetTrigger>
                  <div className="flex-grow flex flex-col justify-between py-1">
                    <div>
                      <SheetTrigger asChild>
                        <Link href={`/products/${item.id}`}>
                          <h4 className="font-headline font-bold text-sm leading-tight line-clamp-1 uppercase hover:text-primary transition-colors">{item.name}</h4>
                        </Link>
                      </SheetTrigger>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5 font-bold">
                        {item.selectedSize} | {item.selectedColor}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-white/10 rounded-md h-8 bg-black/40">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 rounded-none hover:bg-white/5 active:bg-white/10 transition-colors"
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 rounded-none hover:bg-white/5 active:bg-white/10 transition-colors"
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-accent text-sm">£{(item.priceAtSelection || item.price) * item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 active:scale-90 transition-all"
                          onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        {cart.length > 0 && (
          <SheetFooter className="p-6 bg-secondary/10 border-t border-white/5 flex-col sm:flex-col gap-4">
            <div className="flex items-center justify-between w-full">
              <span className="text-muted-foreground font-bold uppercase tracking-widest text-xs">Subtotal</span>
              <span className="text-2xl font-black">£{totalPrice}</span>
            </div>
            <p className="text-[10px] text-muted-foreground text-center italic">Discreet shipping calculated at next step</p>
            <SheetTrigger asChild>
              <Button asChild className="w-full h-14 text-lg font-black tracking-[0.2em] bg-primary hover:bg-primary/90 uppercase shadow-[0_0_20px_rgba(126,42,219,0.3)] active:scale-95 transition-transform transform-gpu">
                <Link href="/checkout">
                  CHECKOUT NOW <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </SheetTrigger>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
