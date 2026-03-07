
"use client";

import Link from 'next/link';
import { ShoppingBag, User, Search, Menu } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useState } from 'react';
import { CartSheet } from './cart-sheet';

export function Navbar() {
  const { totalItems } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-headline text-2xl font-bold tracking-tighter text-primary">DANKDROPS</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/shop" className="text-sm font-medium hover:text-primary transition-colors">SHOP ALL</Link>
            <Link href="/shop?filter=new" className="text-sm font-medium hover:text-primary transition-colors">NEW ARRIVALS</Link>
            <Link href="/shop?category=Hoodies" className="text-sm font-medium hover:text-primary transition-colors">HOODIES</Link>
          </div>
        </div>

        <div className="flex-1 max-w-md hidden lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search drops..." 
              className="pl-10 bg-muted/50 border-none focus-visible:ring-primary"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <Search className="h-5 w-5" />
          </Button>
          
          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          <CartSheet>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Button>
          </CartSheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="font-headline">DANKDROPS</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                <Link href="/shop" className="text-lg font-medium">Shop All</Link>
                <Link href="/shop?filter=new" className="text-lg font-medium">New Arrivals</Link>
                <Link href="/shop?category=Hoodies" className="text-lg font-medium">Hoodies</Link>
                <Link href="/shop?category=T-Shirts" className="text-lg font-medium">T-Shirts</Link>
                <Link href="/shop?category=Shoes" className="text-lg font-medium">Shoes</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
