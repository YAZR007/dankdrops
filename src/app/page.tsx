
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PRODUCTS } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Leaf, Shield, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  const featuredFlowers = PRODUCTS.filter(p => p.category === 'Flower').slice(0, 4);
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero')?.imageUrl || '';
  const flowerCatImage = PlaceHolderImages.find(img => img.id === 'flower-1')?.imageUrl || '';
  const concentratesCatImage = PlaceHolderImages.find(img => img.id === 'concentrates')?.imageUrl || '';
  const ediblesCatImage = PlaceHolderImages.find(img => img.id === 'edibles')?.imageUrl || '';

  return (
    <div className="flex flex-col gap-8 md:gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-[85vh] min-h-[500px] w-full overflow-hidden flex items-center">
        <Image 
          src={heroImage} 
          alt="DANKDROPS Flagship" 
          fill 
          className="object-cover brightness-[0.35]"
          priority
          data-ai-hint="macro bud"
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-[8px] md:text-xs font-black tracking-[0.2em] uppercase text-white mb-4 md:mb-8">
              Micro-Grown • Artisanal • Elite
            </div>
            <h1 className="font-headline text-4xl sm:text-6xl md:text-9xl font-black text-white leading-[0.95] md:leading-[0.9] tracking-tighter uppercase mb-6 md:mb-8">
              The <span className="text-primary">Macro</span><br />Collection.
            </h1>
            <p className="text-base md:text-2xl text-muted-foreground mb-8 md:mb-10 max-w-xl leading-relaxed">
              Experience cannabis through a different lens. High-potency, trichome-rich strains captured in their purest form.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-14 md:h-16 px-8 md:px-10 text-lg md:text-xl tracking-tighter uppercase w-full sm:w-auto">
                <Link href="/shop?category=Flower">Enter The Harvest</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 hover:bg-white/10 text-white font-bold h-14 md:h-16 px-8 md:px-10 text-lg md:text-xl tracking-tighter uppercase w-full sm:w-auto">
                <Link href="/shop">View Full Catalog</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Strains */}
      <section className="container mx-auto px-4">
        <div className="flex flex-row items-end justify-between mb-8 md:mb-10 border-b pb-4 md:pb-6 border-white/10 gap-4">
          <div>
            <h2 className="font-headline text-2xl md:text-5xl font-black uppercase tracking-tighter">Current Strains</h2>
            <p className="text-muted-foreground text-[10px] md:text-lg uppercase tracking-widest hidden sm:block">Hand-picked elite flower</p>
          </div>
          <Link href="/shop?category=Flower" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all text-[10px] md:text-sm tracking-widest whitespace-nowrap">
            EXPLORE ALL <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-10">
          {featuredFlowers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Cinematic High Resolution Video Section */}
      <section className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden flex items-center justify-center bg-black">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.5] contrast-[1.1]"
        >
          <source src="https://video.wixstatic.com/video/11062b_a4055f2694934d45a278972e39130095/1080p/mp4/file.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h2 className="font-headline text-3xl md:text-7xl font-black uppercase tracking-tighter text-white mb-2 md:mb-4 drop-shadow-2xl">
            Macro <span className="text-primary">In Motion</span>.
          </h2>
          <p className="text-white text-[10px] md:text-xl font-bold uppercase tracking-[0.3em] mb-6 md:mb-8 drop-shadow-xl">
            The Living Resin Experience
          </p>
          <Button asChild variant="outline" className="border-white/20 hover:bg-white/10 text-white font-black uppercase tracking-widest h-10 md:h-12 px-6 backdrop-blur-md">
            <Link href="/shop?category=Flower">EXPLORE THE HARVEST</Link>
          </Button>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 h-auto md:h-[650px]">
          <Link href="/shop?category=Flower" className="group relative overflow-hidden rounded-2xl md:rounded-3xl aspect-[16/9] md:aspect-auto">
            <Image 
              src={flowerCatImage} 
              alt="Flower" 
              fill 
              className="object-cover brightness-50 group-hover:scale-105 transition-transform duration-1000" 
              data-ai-hint="cannabis macro"
            />
            <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="font-headline text-2xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-2 md:mb-4">Elite Flower</h3>
              <p className="text-white/70 text-xs md:text-lg max-w-sm hidden md:block">Frosty, purple-hued buds with extreme trichome density.</p>
            </div>
          </Link>
          <div className="grid grid-cols-1 gap-4 md:gap-10">
            <div className="group relative overflow-hidden rounded-2xl md:rounded-3xl aspect-[21/9] md:aspect-auto">
              <Image 
                src={concentratesCatImage} 
                alt="Concentrates" 
                fill 
                className="object-cover brightness-[0.2] group-hover:scale-105 transition-transform duration-1000 grayscale" 
                data-ai-hint="cannabis extract"
              />
              <div className="absolute inset-0 p-4 md:p-10 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
                <Badge className="w-fit mb-1 md:mb-2 bg-accent text-white font-black uppercase tracking-widest text-[8px] md:text-[10px]">COMING SOON</Badge>
                <h3 className="font-headline text-lg md:text-3xl font-black text-white uppercase tracking-tighter opacity-50">Artisanal Extracts</h3>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl md:rounded-3xl aspect-[21/9] md:aspect-auto">
              <Image 
                src={ediblesCatImage} 
                alt="Edibles" 
                fill 
                className="object-cover brightness-[0.2] group-hover:scale-105 transition-transform duration-1000 grayscale" 
                data-ai-hint="cannabis edible"
              />
              <div className="absolute inset-0 p-4 md:p-10 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
                <Badge className="w-fit mb-1 md:mb-2 bg-accent text-white font-black uppercase tracking-widest text-[8px] md:text-[10px]">COMING SOON</Badge>
                <h3 className="font-headline text-lg md:text-3xl font-black text-white uppercase tracking-tighter opacity-50">Boutique Edibles</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-secondary/30 py-12 md:py-24">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          <div className="flex flex-col items-center text-center gap-4 md:gap-6">
            <div className="w-12 h-12 md:w-20 md:h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary rotate-3">
              <Leaf className="h-6 w-6 md:h-10 md:w-10" />
            </div>
            <h4 className="font-headline text-lg md:text-2xl font-black uppercase tracking-tighter">Purity Guaranteed</h4>
            <p className="text-muted-foreground text-xs md:text-lg max-w-xs leading-relaxed">Triple-tested for heavy metals, pesticides, and potency. Clean cannabis only.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4 md:gap-6">
            <div className="w-12 h-12 md:w-20 md:h-20 bg-accent/10 rounded-2xl flex items-center justify-center text-accent -rotate-3">
              <Shield className="h-6 w-6 md:h-10 md:w-10" />
            </div>
            <h4 className="font-headline text-lg md:text-2xl font-black uppercase tracking-tighter">Discreet Logistics</h4>
            <p className="text-muted-foreground text-xs md:text-lg max-w-xs leading-relaxed">Double-sealed, vacuum-packed delivery in unbranded luxury packaging.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4 md:gap-6">
            <div className="w-12 h-12 md:w-20 md:h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary rotate-1">
              <Award className="h-6 w-6 md:h-10 md:w-10" />
            </div>
            <h4 className="font-headline text-lg md:text-2xl font-black uppercase tracking-tighter">Master Growers</h4>
            <p className="text-muted-foreground text-xs md:text-lg max-w-xs leading-relaxed">Cultivated by our award-winning internal collective of artisanal growers.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
