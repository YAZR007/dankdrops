
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Settings, Package, Heart, CreditCard, LogOut, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col md:flex-row items-center gap-6 mb-12 text-center md:text-left">
          <Avatar className="h-24 w-24 border-4 border-primary shadow-[0_0_20px_rgba(126,42,219,0.2)]">
            <AvatarImage src="https://picsum.photos/seed/user1/200/200" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
              <h1 className="font-headline text-3xl font-black uppercase tracking-tighter">Justin Drops</h1>
              <Badge className="bg-accent text-white uppercase text-[10px] font-black tracking-widest px-3">PLATINUM MEMBER</Badge>
            </div>
            <p className="text-muted-foreground font-medium">Member since November 2023 | 24 Drops Collected</p>
          </div>
          <Button variant="outline" className="border-destructive/30 text-destructive hover:bg-destructive/10 font-bold uppercase tracking-widest text-xs">
            <LogOut className="mr-2 h-4 w-4" /> LOGOUT
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="font-headline text-2xl font-black uppercase tracking-tighter mb-4">Recent Orders</h2>
              <div className="space-y-4">
                {[1, 2].map(i => (
                  <Card key={i} className="bg-card/40 border border-white/5 hover:border-primary/20 transition-colors">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-12 relative rounded-md overflow-hidden bg-muted">
                          <img src={`https://picsum.photos/seed/order${i}/400/600`} alt="Order item" className="object-cover" />
                        </div>
                        <div>
                          <p className="font-black uppercase tracking-tight text-sm">Order #DANK-2024-{i}</p>
                          <p className="text-xs text-muted-foreground">Placed on Feb {10 + i}, 2024</p>
                          <Badge variant="secondary" className="mt-1 text-[8px] font-bold uppercase tracking-widest bg-white/5">DELIVERED</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-accent">$145.00</p>
                        <Button variant="link" className="p-0 h-auto text-[10px] font-black text-primary uppercase tracking-widest hover:no-underline" asChild>
                          <Link href={`/products/f${i}`}>VIEW DETAILS <ExternalLink className="ml-1 h-3 w-3" /></Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-headline text-2xl font-black uppercase tracking-tighter mb-4">Wishlist Items</h2>
              <div className="grid grid-cols-2 gap-4">
                {[3, 4].map(i => (
                  <Link key={i} href={`/products/f${i}`} className="group">
                    <Card className="bg-card/20 border border-white/5 group-hover:border-primary/30 transition-all overflow-hidden">
                      <div className="relative aspect-[3/4]">
                        <img src={`https://picsum.photos/seed/wish${i}/600/800`} className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-[10px] font-black uppercase tracking-[0.2em] border border-white/20 px-4 py-2 bg-black/50 backdrop-blur-sm">VIEW DROP</span>
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <p className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Flower</p>
                        <p className="font-black text-sm truncate uppercase tracking-tight group-hover:text-primary transition-colors">Exclusive Boutique Strain</p>
                        <p className="text-accent font-black mt-1">$75</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="font-headline text-lg font-black uppercase tracking-widest">Account Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start font-bold uppercase tracking-widest text-[10px] hover:bg-primary/10">
                  <Package className="mr-2 h-4 w-4 text-primary" /> My Orders
                </Button>
                <Button variant="ghost" className="w-full justify-start font-bold uppercase tracking-widest text-[10px] hover:bg-primary/10">
                  <Heart className="mr-2 h-4 w-4 text-primary" /> Wishlist
                </Button>
                <Button variant="ghost" className="w-full justify-start font-bold uppercase tracking-widest text-[10px] hover:bg-primary/10">
                  <CreditCard className="mr-2 h-4 w-4 text-primary" /> Payment Methods
                </Button>
                <Button variant="ghost" className="w-full justify-start font-bold uppercase tracking-widest text-[10px] hover:bg-primary/10">
                  <Settings className="mr-2 h-4 w-4 text-primary" /> Profile Settings
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-accent/5 border-accent/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Package className="h-20 w-20 rotate-12" />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-lg font-black uppercase tracking-widest">Dank Rewards</CardTitle>
                <CardDescription className="font-bold text-accent">1,250 POINTS</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-black/40 rounded-full h-2 mb-4 border border-white/5">
                  <div className="bg-accent h-2 rounded-full w-[75%] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                </div>
                <p className="text-[10px] font-bold text-muted-foreground mb-4 uppercase tracking-widest leading-relaxed">You're 250 points away from a <span className="text-white">$25 DISCOUNT</span> code!</p>
                <Button size="sm" className="w-full bg-accent hover:bg-accent/90 font-black uppercase tracking-widest text-[10px] h-10">REDEEM POINTS</Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
