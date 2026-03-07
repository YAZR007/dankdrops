
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Settings, Package, Heart, CreditCard, LogOut } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col md:flex-row items-center gap-6 mb-12 text-center md:text-left">
          <Avatar className="h-24 w-24 border-4 border-primary">
            <AvatarImage src="https://picsum.photos/seed/user1/200/200" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
              <h1 className="font-headline text-3xl font-bold uppercase tracking-tighter">Justin Drops</h1>
              <Badge className="bg-accent text-white uppercase text-[10px] font-bold">PLATINUM MEMBER</Badge>
            </div>
            <p className="text-muted-foreground">Member since November 2023 | 24 Drops Collected</p>
          </div>
          <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10">
            <LogOut className="mr-2 h-4 w-4" /> LOGOUT
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="font-headline text-2xl font-bold uppercase tracking-tighter mb-4">Recent Orders</h2>
              <div className="space-y-4">
                {[1, 2].map(i => (
                  <Card key={i} className="bg-card/50 border-none">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-12 relative rounded-md overflow-hidden bg-muted">
                          <img src={`https://picsum.photos/seed/order${i}/400/600`} alt="Order item" className="object-cover" />
                        </div>
                        <div>
                          <p className="font-bold">Order #DANK-2024-{i}</p>
                          <p className="text-xs text-muted-foreground">Placed on Feb {10 + i}, 2024</p>
                          <Badge variant="secondary" className="mt-1 text-[10px] uppercase">DELIVERED</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-accent">$145.00</p>
                        <Button variant="link" className="p-0 h-auto text-xs text-primary">VIEW ORDER</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-headline text-2xl font-bold uppercase tracking-tighter mb-4">Wishlist Items</h2>
              <div className="grid grid-cols-2 gap-4">
                {[3, 4].map(i => (
                  <Card key={i} className="bg-card/30 border-none group cursor-pointer overflow-hidden">
                    <div className="relative aspect-[3/4]">
                      <img src={`https://picsum.photos/seed/wish${i}/600/800`} className="object-cover h-full w-full group-hover:scale-105 transition-transform" />
                    </div>
                    <CardContent className="p-3">
                      <p className="font-bold text-sm truncate">Exclusive Streetwear Item</p>
                      <p className="text-accent font-bold">$95</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="font-headline text-lg uppercase">Account Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start font-medium text-sm">
                  <Package className="mr-2 h-4 w-4" /> My Orders
                </Button>
                <Button variant="ghost" className="w-full justify-start font-medium text-sm">
                  <Heart className="mr-2 h-4 w-4" /> Wishlist
                </Button>
                <Button variant="ghost" className="w-full justify-start font-medium text-sm">
                  <CreditCard className="mr-2 h-4 w-4" /> Payment Methods
                </Button>
                <Button variant="ghost" className="w-full justify-start font-medium text-sm">
                  <Settings className="mr-2 h-4 w-4" /> Profile Settings
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-accent/5 border-accent/20">
              <CardHeader>
                <CardTitle className="font-headline text-lg uppercase">Dank Rewards</CardTitle>
                <CardDescription>You have 1,250 points</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-muted rounded-full h-2 mb-4">
                  <div className="bg-accent h-2 rounded-full w-[75%]"></div>
                </div>
                <p className="text-xs text-muted-foreground mb-4">You're 250 points away from a $25 discount code!</p>
                <Button size="sm" className="w-full bg-accent hover:bg-accent/90">REDEEM POINTS</Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
