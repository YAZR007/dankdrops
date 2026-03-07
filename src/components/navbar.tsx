"use client";

import Link from 'next/link';
import { ShoppingBag, User, Search, Menu, X, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useState, useMemo, useEffect, useRef } from 'react';
import { CartSheet } from './cart-sheet';
import { PRODUCTS } from '@/lib/products';
import Image from 'next/image';

export function Navbar() {
  const { totalItems } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const SearchResultsList = () => {
    if (searchResults.length === 0) return null;
    
    return (
      <div className="absolute top-full left-0 w-full mt-2 bg-background/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] animate-in fade-in slide-in-from-top-2 duration-300">
        <div className="max-h-[400px] overflow-y-auto">
          {searchResults.map((product) => (
            <Link 
              key={product.id} 
              href={`/products/${product.id}`}
              onClick={() => {
                setSearchQuery("");
                setIsSearchOpen(false);
                setIsFocused(false);
              }}
              className="block group p-4 hover:bg-white/5 transition-all border-b border-white/5 last:border-0"
            >
              <div className="flex items-center justify-between group-hover:scale-[1.02] transition-all duration-300">
                <div className="flex flex-col gap-0.5 p-2">
                  <span className="text-[9px] font-black text-primary uppercase tracking-widest">{product.category}</span>
                  <h4 className="font-headline font-bold text-sm uppercase tracking-tight group-hover:text-primary transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-[10px] font-bold text-accent">£{product.price}</p>
                </div>
                <div className="relative w-12 h-16 rounded-lg overflow-hidden border border-white/10 group-hover:border-primary/50 transition-all duration-300 mr-2">
                  <Image 
                    src={product.imageUrl} 
                    alt={product.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between relative">
        <div className="flex items-center gap-4 md:gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden hover:scale-110 active:scale-90 transition-transform">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-xs border-r border-white/5 p-0 flex flex-col">
              <SheetHeader className="p-6 border-b border-white/5">
                <SheetTitle className="font-headline text-2xl font-black text-primary tracking-tighter uppercase">DANKDROPS</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 p-4">
                <Link href="/shop" className="p-4 text-xl font-black uppercase tracking-tighter hover:text-primary transition-all flex items-center justify-between group">
                  Shop All <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link href="/shop?category=Flower" className="p-4 text-xl font-black uppercase tracking-tighter hover:text-primary transition-all flex items-center justify-between group">
                  Boutique Flower <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link href="/shop?filter=new" className="p-4 text-xl font-black uppercase tracking-tighter hover:text-primary transition-all flex items-center justify-between group">
                  New Drops <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <div className="mt-8 pt-8 border-t border-white/5">
                  <Link href="/profile" className="flex items-center gap-3 p-4 text-muted-foreground font-bold uppercase tracking-widest text-sm">
                    <User className="h-5 w-5" /> Account Settings
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link 
            href="/" 
            className="hidden md:flex items-center group transition-all duration-300 hover:scale-105 active:scale-95 transform-gpu"
          >
            {!mounted ? (
              <span className="font-headline text-2xl md:text-3xl font-black tracking-tighter text-primary">DANKDROPS</span>
            ) : (
              <svg viewBox="0 0 240 50" className="h-10 w-auto overflow-visible">
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-headline font-black uppercase tracking-[-0.05em] text-[28px] stroke-primary stroke-[1.5px] fill-primary logo-hover-target drop-shadow-[0_0_8px_rgba(126,42,219,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(126,42,219,0.6)]"
                >
                  DANKDROPS
                </text>
              </svg>
            )}
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/shop" 
              className="text-[10px] font-black hover:text-primary transition-all hover:scale-110 active:scale-95 inline-block uppercase tracking-widest"
            >
              SHOP ALL
            </Link>
            <Link 
              href="/shop?category=Flower" 
              className="text-[10px] font-black hover:text-primary transition-all hover:scale-110 active:scale-95 inline-block uppercase tracking-widest"
            >
              BOUTIQUE FLOWER
            </Link>
            <Link 
              href="/shop?filter=new" 
              className="text-[10px] font-black hover:text-primary transition-all hover:scale-110 active:scale-95 inline-block uppercase tracking-widest"
            >
              NEW DROPS
            </Link>
          </div>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden">
          <Link href="/" className="flex items-center group active:scale-95 transition-transform">
            {!mounted ? (
              <span className="font-headline text-xl font-black tracking-tighter text-primary">DANKDROPS</span>
            ) : (
              <svg viewBox="0 0 200 40" className="h-8 w-auto overflow-visible">
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-headline font-black uppercase tracking-[-0.05em] text-[22px] stroke-primary stroke-[1px] fill-primary logo-hover-target drop-shadow-[0_0_8px_rgba(126,42,219,0.3)]"
                >
                  DANKDROPS
                </text>
              </svg>
            )}
          </Link>
        </div>

        <div className="hidden lg:block flex-1 max-w-md mx-8 relative" ref={searchRef}>
          <div className="relative group transition-all hover:scale-[1.02]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder="Search strains..." 
              className="pl-10 bg-muted/50 border-none focus-visible:ring-primary transition-all hover:bg-muted/70 text-xs font-bold h-10"
            />
          </div>
          {isFocused && searchQuery.trim() && <SearchResultsList />}
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden hover:scale-110 active:scale-90 transition-transform" 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <Link href="/profile" className="hidden sm:block">
            <Button variant="ghost" size="icon" className="hover:scale-110 active:scale-90 transition-transform">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          <CartSheet>
            <Button variant="ghost" size="icon" className="relative hover:scale-110 active:scale-90 transition-transform">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-[8px] font-black h-4 w-4 flex items-center justify-center rounded-full animate-in zoom-in">
                  {totalItems}
                </span>
              )}
            </Button>
          </CartSheet>
        </div>
      </div>
      
      {isSearchOpen && (
        <div className="absolute inset-x-0 top-16 bg-background border-b border-white/5 p-4 animate-in slide-in-from-top duration-300 lg:hidden z-40" ref={mobileSearchRef}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search strains..." 
              className="pl-10 bg-muted/50 border-none focus-visible:ring-primary text-sm font-bold h-12"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1/2 -translate-y-1/2"
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {searchQuery.trim() && <div className="relative mt-2"><SearchResultsList /></div>}
        </div>
      )}
    </nav>
  );
}
