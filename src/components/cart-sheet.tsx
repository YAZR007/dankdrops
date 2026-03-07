
"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
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
          <SheetTitle className="font-headline text-2xl flex items-center gap-2">
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
              <p className="font-medium text-lg">Your bag is empty</p>
              <p className="text-sm text-muted-foreground">Looks like you haven't added anything yet.</p>
            </div>
            <SheetTrigger asChild>
              <Button asChild className="w-full mt-4">
                <Link href="/shop">START SHOPPING</Link>
              </Button>
            </SheetTrigger>
          </div>
        ) : (
          <ScrollArea className="flex-grow px-6">
            <div className="flex flex-col gap-6 py-6">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4">
                  <div className="relative aspect-[3/4] h-24 w-18 overflow-hidden rounded-md flex-shrink-0">
                    <Image 
                      src={item.imageUrl} 
                      alt={item.name} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow flex flex-col justify-between py-1">
                    <div>
                      <h4 className="font-headline font-bold text-sm leading-tight line-clamp-1">{item.name}</h4>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                        Size: {item.selectedSize} | {item.selectedColor}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border rounded-md h-8">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 rounded-none"
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 rounded-none"
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-accent">${item.price * item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                        >
                          <Trash2 className="h-4 w-4" />
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
          <SheetFooter className="p-6 bg-muted/30 border-t flex-col sm:flex-col gap-4">
            <div className="flex items-center justify-between w-full">
              <span className="text-muted-foreground font-medium">Subtotal</span>
              <span className="text-xl font-bold">${totalPrice}</span>
            </div>
            <p className="text-[10px] text-muted-foreground text-center">Taxes and shipping calculated at checkout</p>
            <SheetTrigger asChild>
              <Button asChild className="w-full h-12 text-md font-bold tracking-widest bg-primary hover:bg-primary/90">
                <Link href="/checkout">CHECKOUT NOW</Link>
              </Button>
            </SheetTrigger>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
