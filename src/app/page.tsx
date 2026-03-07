
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PRODUCTS } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Leaf, Shield, Award } from 'lucide-react';

export default function HomePage() {
  const featuredFlowers = PRODUCTS.filter(p => p.category === 'Flower').slice(0, 4);
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero')?.imageUrl || '';
  const blackPlaceholder = "https://placehold.co/1000/000000/000000/png";

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden flex items-center">
        <Image 
          src={heroImage} 
          alt="DankDrops Flagship" 
          fill 
          className="object-cover brightness-[0.25]"
          priority
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-xs font-black tracking-[0.2em] uppercase text-white mb-8">
              Micro-Grown • Artisanal • Elite
            </div>
            <h1 className="font-headline text-6xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter uppercase mb-8">
              The <span className="text-primary">Macro</span><br />Collection.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Experience cannabis through a different lens. High-potency, trichome-rich strains captured in their purest form.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-16 px-10 text-xl tracking-tighter uppercase">
                <Link href="/shop?category=Flower">Enter The Harvest</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 hover:bg-white/10 text-white font-bold h-16 px-10 text-xl tracking-tighter uppercase">
                <Link href="/shop">View Full Catalog</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Strains */}
      <section className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10 border-b pb-6 border-white/10">
          <div>
            <h2 className="font-headline text-4xl md:text-5xl font-black uppercase tracking-tighter">Current Strains</h2>
            <p className="text-muted-foreground text-lg">Hand-picked elite flower from this week's drop.</p>
          </div>
          <Link href="/shop?category=Flower" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm tracking-widest">
            EXPLORE ALL STRAINS <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {featuredFlowers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 h-[650px]">
          <Link href="/shop?category=Flower" className="group relative overflow-hidden rounded-3xl">
            <Image 
              src={blackPlaceholder} 
              alt="Flower" 
              fill 
              className="object-cover brightness-50 group-hover:scale-105 transition-transform duration-1000" 
            />
            <div className="absolute inset-0 p-12 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="font-headline text-5xl font-black text-white uppercase tracking-tighter leading-none mb-4">Elite Flower</h3>
              <p className="text-white/70 text-lg max-w-sm">Frosty, purple-hued buds with extreme trichome density.</p>
            </div>
          </Link>
          <div className="grid grid-cols-1 gap-10">
            <Link href="/shop?category=Concentrates" className="group relative overflow-hidden rounded-3xl">
              <Image 
                src={blackPlaceholder} 
                alt="Concentrates" 
                fill 
                className="object-cover brightness-50 group-hover:scale-105 transition-transform duration-1000" 
              />
              <div className="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="font-headline text-3xl font-black text-white uppercase tracking-tighter">Artisanal Extracts</h3>
              </div>
            </Link>
            <Link href="/shop?category=Edibles" className="group relative overflow-hidden rounded-3xl">
              <Image 
                src={blackPlaceholder} 
                alt="Edibles" 
                fill 
                className="object-cover brightness-50 group-hover:scale-105 transition-transform duration-1000" 
              />
              <div className="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="font-headline text-3xl font-black text-white uppercase tracking-tighter">Boutique Edibles</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-secondary/30 py-24">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary rotate-3">
              <Leaf className="h-10 w-10" />
            </div>
            <h4 className="font-headline text-2xl font-black uppercase tracking-tighter">Purity Guaranteed</h4>
            <p className="text-muted-foreground text-lg max-w-xs">Triple-tested for heavy metals, pesticides, and potency. Clean cannabis only.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-6">
            <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center text-accent -rotate-3">
              <Shield className="h-10 w-10" />
            </div>
            <h4 className="font-headline text-2xl font-black uppercase tracking-tighter">Discreet Logistics</h4>
            <p className="text-muted-foreground text-lg max-w-xs">Double-sealed, vacuum-packed delivery in unbranded luxury packaging.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-6">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary rotate-1">
              <Award className="h-10 w-10" />
            </div>
            <h4 className="font-headline text-2xl font-black uppercase tracking-tighter">Master Growers</h4>
            <p className="text-muted-foreground text-lg max-w-xs">Cultivated by our award-winning internal collective of artisanal growers.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
