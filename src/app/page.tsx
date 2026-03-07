
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PRODUCTS } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Zap, Shield, Truck, Leaf, Sparkles, Award } from 'lucide-react';

export default function HomePage() {
  const featuredProducts = PRODUCTS.slice(0, 4);
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero')?.imageUrl || '';

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden flex items-center">
        <Image 
          src={heroImage} 
          alt="DankDrops Flagship" 
          fill 
          className="object-cover brightness-[0.3]"
          priority
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <Badge className="bg-primary text-white mb-6 px-4 py-1 text-sm font-bold tracking-widest uppercase">
              Exclusive Harvest No. 042
            </Badge>
            <h1 className="font-headline text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase mb-6">
              Elite <span className="text-primary">Cannabis</span> For The Connoisseur.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
              Experience the pinnacle of cultivation. Artisanal flower, high-potency concentrates, and chef-curated edibles.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-14 px-8 text-lg">
                <Link href="/shop">SHOP THE HARVEST</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 hover:bg-white/10 text-white font-bold h-14 px-8 text-lg">
                <Link href="/shop?filter=new">NEW ARRIVALS</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Drops */}
      <section className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold uppercase tracking-tighter">Current Harvest</h2>
            <p className="text-muted-foreground">Handpicked strains and boutique products from our latest drop.</p>
          </div>
          <Link href="/shop" className="text-primary font-bold flex items-center gap-1 hover:underline">
            VIEW ALL <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[600px]">
          <Link href="/shop?category=Flower" className="group relative overflow-hidden rounded-2xl">
            <Image 
              src="https://picsum.photos/seed/cat1/800/800" 
              alt="Flower" 
              fill 
              className="object-cover brightness-50 group-hover:scale-105 transition-transform duration-700" 
              data-ai-hint="cannabis buds"
            />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <h3 className="font-headline text-4xl font-black text-white uppercase tracking-tighter">Boutique Flower</h3>
              <p className="text-white/70">Sun-grown & Indoor premium strains</p>
            </div>
          </Link>
          <div className="grid grid-cols-1 gap-8">
            <Link href="/shop?category=Concentrates" className="group relative overflow-hidden rounded-2xl">
              <Image 
                src="https://picsum.photos/seed/cat2/800/400" 
                alt="Concentrates" 
                fill 
                className="object-cover brightness-50 group-hover:scale-105 transition-transform duration-700" 
                data-ai-hint="cannabis oil"
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="font-headline text-3xl font-black text-white uppercase tracking-tighter">Concentrates</h3>
              </div>
            </Link>
            <Link href="/shop?category=Edibles" className="group relative overflow-hidden rounded-2xl">
              <Image 
                src="https://picsum.photos/seed/cat3/800/400" 
                alt="Edibles" 
                fill 
                className="object-cover brightness-50 group-hover:scale-105 transition-transform duration-700" 
                data-ai-hint="cannabis candy"
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="font-headline text-3xl font-black text-white uppercase tracking-tighter">Infused Edibles</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary">
              <Leaf className="h-8 w-8" />
            </div>
            <h4 className="font-headline text-xl font-bold uppercase tracking-tighter">Lab Tested</h4>
            <p className="text-muted-foreground text-sm max-w-xs">Every batch is tested for potency, purity, and safety by state-certified labs.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center text-accent">
              <Shield className="h-8 w-8" />
            </div>
            <h4 className="font-headline text-xl font-bold uppercase tracking-tighter">Discreet Delivery</h4>
            <p className="text-muted-foreground text-sm max-w-xs">Secure, odor-proof packaging delivered straight to your door with real-time tracking.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary">
              <Award className="h-8 w-8" />
            </div>
            <h4 className="font-headline text-xl font-bold uppercase tracking-tighter">Award Winning</h4>
            <p className="text-muted-foreground text-sm max-w-xs">Home to multiple High Times Cup winners. Experience the gold standard.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>
      {children}
    </span>
  );
}
