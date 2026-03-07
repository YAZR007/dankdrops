
"use client";

import { useState } from 'react';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { ShoppingBag, CreditCard, Wallet, QrCode, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('crypto');
  const [cryptoType, setCryptoType] = useState('btc');
  const [isOrdered, setIsOrdered] = useState(false);

  const handlePlaceOrder = () => {
    setIsOrdered(true);
    clearCart();
  };

  if (isOrdered) {
    return (
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8 animate-in zoom-in duration-500">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <h1 className="font-headline text-5xl font-black uppercase tracking-tighter mb-4">Order Received</h1>
        <p className="text-muted-foreground text-lg max-w-md mb-10">
          Your drop is being prepared. Check your email for a confirmation and tracking details shortly.
        </p>
        <Button asChild size="lg" className="h-16 px-10 text-xl font-bold uppercase tracking-tighter">
          <Link href="/shop">BACK TO THE HARVEST</Link>
        </Button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Your bag is empty</h1>
        <Button asChild>
          <Link href="/shop">GO SHOPPING</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-headline text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-7 space-y-12">
          {/* Step 1: Shipping */}
          <section className="space-y-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">1</div>
              <h2 className="font-headline text-2xl font-bold uppercase tracking-tight">Shipping Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Justin" className="bg-muted/50 border-none" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Drops" className="bg-muted/50 border-none" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Trichome Lane" className="bg-muted/50 border-none" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Mendocino" className="bg-muted/50 border-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="CA" className="bg-muted/50 border-none" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP</Label>
                  <Input id="zip" placeholder="95460" className="bg-muted/50 border-none" />
                </div>
              </div>
            </div>
          </section>

          <Separator className="bg-white/5" />

          {/* Step 2: Payment */}
          <section className="space-y-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">2</div>
              <h2 className="font-headline text-2xl font-bold uppercase tracking-tight">Payment Method</h2>
            </div>

            <RadioGroup 
              value={paymentMethod} 
              onValueChange={setPaymentMethod}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <Label
                htmlFor="crypto"
                className={`flex flex-col items-start gap-4 p-6 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'crypto' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-white/5 bg-secondary/20 hover:bg-secondary/30'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <Wallet className={`h-6 w-6 ${paymentMethod === 'crypto' ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="font-bold uppercase tracking-wide">Crypto Payment</span>
                  </div>
                  <RadioGroupItem value="crypto" id="crypto" className="sr-only" />
                </div>
                <p className="text-xs text-muted-foreground">Pay with BTC, ETH, or USDC. Fast and discreet.</p>
              </Label>

              <Label
                htmlFor="card"
                className={`flex flex-col items-start gap-4 p-6 rounded-2xl border cursor-pointer opacity-50 transition-all ${
                  paymentMethod === 'card' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-white/5 bg-secondary/20'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-6 w-6 text-muted-foreground" />
                    <span className="font-bold uppercase tracking-wide">Credit Card</span>
                  </div>
                  <RadioGroupItem value="card" id="card" className="sr-only" disabled />
                </div>
                <p className="text-xs text-muted-foreground">Traditional payment (Currently Unavailable)</p>
              </Label>
            </RadioGroup>

            {paymentMethod === 'crypto' && (
              <div className="mt-8 p-8 rounded-2xl bg-black border border-white/5 space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex flex-wrap gap-4">
                  {['btc', 'eth', 'usdc'].map(type => (
                    <Button
                      key={type}
                      variant={cryptoType === type ? 'default' : 'outline'}
                      onClick={() => setCryptoType(type)}
                      className={`h-12 px-6 font-bold uppercase tracking-widest ${
                        cryptoType === type ? 'bg-primary' : 'border-white/10 hover:bg-white/5'
                      }`}
                    >
                      {type}
                    </Button>
                  ))}
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-40 h-40 bg-white p-2 rounded-xl flex-shrink-0">
                    <div className="w-full h-full bg-black flex items-center justify-center">
                      <QrCode className="w-32 h-32 text-white" />
                    </div>
                  </div>
                  <div className="space-y-4 flex-grow w-full">
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Send to Address</Label>
                      <div className="flex gap-2">
                        <Input 
                          readOnly 
                          value={cryptoType === 'btc' ? 'bc1q...x9z2' : '0x71...f3a2'} 
                          className="bg-muted/30 border-none font-mono text-xs h-12"
                        />
                        <Button variant="secondary" size="icon" className="h-12 w-12">
                          <CheckCircle2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground bg-primary/5 p-3 rounded-lg border border-primary/10">
                      <Info className="h-4 w-4 text-primary" />
                      Wait for 1 confirmation after sending. Your order will update automatically.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar: Order Summary */}
        <aside className="lg:col-span-5">
          <Card className="bg-secondary/20 border-white/5 sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-xl uppercase tracking-tighter">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4">
                    <div className="relative aspect-[3/4] h-16 w-12 overflow-hidden rounded-md flex-shrink-0">
                      <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-grow flex flex-col justify-center">
                      <h4 className="font-bold text-xs truncate uppercase">{item.name}</h4>
                      <p className="text-[10px] text-muted-foreground">{item.selectedSize} | Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-xs self-center">${item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <Separator className="bg-white/5" />

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discreet Shipping</span>
                  <span className="text-accent uppercase font-bold text-[10px] flex items-center">FREE</span>
                </div>
                <Separator className="bg-white/5" />
                <div className="flex justify-between items-end">
                  <span className="font-headline text-lg font-bold uppercase tracking-tight">Total</span>
                  <span className="text-3xl font-black text-white">${totalPrice}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 bg-black/40 p-4 rounded-xl">
                <Checkbox id="terms" />
                <label htmlFor="terms" className="text-[10px] text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  I agree to the <span className="text-primary underline cursor-pointer">Terms of Service</span> and verify I am of legal age.
                </label>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handlePlaceOrder}
                className="w-full h-16 bg-primary hover:bg-primary/90 text-xl font-bold uppercase tracking-tighter shadow-[0_0_20px_rgba(126,42,219,0.3)]"
              >
                PLACE DROP ORDER <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </CardFooter>
          </Card>
        </aside>
      </div>
    </div>
  );
}
