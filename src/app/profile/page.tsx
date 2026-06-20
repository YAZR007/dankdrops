'use client';

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Settings, Package, Heart, CreditCard, LogOut } from 'lucide-react';
import { logOut } from '@/firebase/auth';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const auth = getAuth();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/auth');
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  const handleLogout = async () => {
    await logOut();
    router.push('/auth');
    toast({
      title: 'Success',
      description: 'Logged out successfully!',
    });
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-64px)]">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 font-mono">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col md:flex-row items-center gap-6 mb-12 text-center md:text-left">
          <Avatar className="h-24 w-24 border-4 border-primary shadow-[0_0_20px_rgba(126,42,219,0.2)]">
            <AvatarImage src={user.photoURL || ''} />
            <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
              <h1 className="font-headline text-3xl font-black uppercase tracking-tighter">{user.email}</h1>
              <Badge className="bg-accent text-white uppercase text-[10px] font-black tracking-widest px-3">MEMBER</Badge>
            </div>
            <p className="text-muted-foreground font-medium">
              Member since {new Date(user.metadata.creationTime!).toLocaleDateString()}
            </p>
          </div>
          <Button
            variant="outline"
            className="border-destructive/30 text-destructive hover:bg-destructive/10 font-bold uppercase tracking-widest text-xs"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" /> LOGOUT
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="font-headline text-2xl font-black uppercase tracking-tighter mb-4">Order History</h2>
              <Card className="bg-card/40 border border-white/5">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">No orders yet. Start shopping to see your order history.</p>
                </CardContent>
              </Card>
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
          </aside>
        </div>
      </div>
    </div>
  );
}
