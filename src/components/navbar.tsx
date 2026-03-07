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
          <Link 
            href="/" 
            className="flex items-center space-x-2 group transition-all duration-300 hover:scale-110 active:scale-95 transform-gpu"
          >
            <span className="font-headline text-2xl font-bold tracking-tighter text-primary drop-shadow-[0_0_12px_rgba(126,42,219,0.6)] transition-all uppercase">
              DANKDROPS
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/shop" 
              className="text-sm font-bold hover:text-primary transition-all hover:scale-110 inline-block uppercase tracking-widest"
            >
              SHOP ALL
            </Link>
            <Link 
              href="/shop?category=Flower" 
              className="text-sm font-bold hover:text-primary transition-all hover:scale-110 inline-block uppercase tracking-widest"
            >
              BOUTIQUE FLOWER
            </Link>
            <Link 
              href="/shop?filter=new" 
              className="text-sm font-bold hover:text-primary transition-all hover:scale-110 inline-block uppercase tracking-widest"
            >
              NEW DROPS
            </Link>
          </div>
        </div>

        <div className="flex-1 max-w-md hidden lg:block">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search strains..." 
              className="pl-10 bg-muted/50 border-none focus-visible:ring-primary transition-all hover:bg-muted/70"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden hover:scale-125 transition-transform" 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="hover:scale-125 transition-transform">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          <CartSheet>
            <Button variant="ghost" size="icon" className="relative hover:scale-125 transition-transform">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full animate-in zoom-in">
                  {totalItems}
                </span>
              )}
            </Button>
          </CartSheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden hover:scale-125 transition-transform">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="font-headline text-primary">DANKDROPS</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                <Link href="/shop" className="text-lg font-bold uppercase hover:text-primary transition-all hover:translate-x-2">Shop All</Link>
                <Link href="/shop?category=Flower" className="text-lg font-bold uppercase hover:text-primary transition-all hover:translate-x-2">Boutique Flower</Link>
                <Link href="/shop?filter=new" className="text-lg font-bold uppercase hover:text-primary transition-all hover:translate-x-2">New Drops</Link>
                <Link href="/shop?category=Concentrates" className="text-lg font-bold uppercase hover:text-primary transition-all hover:translate-x-2">Concentrates</Link>
                <Link href="/shop?category=Edibles" className="text-lg font-bold uppercase hover:text-primary transition-all hover:translate-x-2">Edibles</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}