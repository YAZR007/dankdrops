import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Leaf, Shield, Info, Scale, Heart, Zap } from 'lucide-react';
import Link from 'next/link';

export default function ExploreCBDPage() {
  const videoUrl1 = "https://video.wixstatic.com/video/a82ad9_9e5ae1b2d845406fba0a902c92d7d03a/1080p/mp4/file.mp4";
  const videoUrl2 = "https://video.wixstatic.com/video/a82ad9_17c8d4a393094bf0a490459c8af28ba3/1080p/mp4/file.mp4";

  const galleryVideos = [
    { url: videoUrl1, title: "Elite Trichome Density", label: "MACRO STUDY 1" },
    { url: videoUrl2, title: "Artisanal Resin Profile", label: "MACRO STUDY 2" },
  ];

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-black overflow-hidden">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-40 brightness-75 scale-110"
        >
          <source src={videoUrl1} type="video/mp4" />
        </video>
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <h1 className="font-headline text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            <span className="text-hollow-white">THE ART</span> <span className="text-primary">&</span> <span className="text-hollow-white">SCIENCE</span> <span className="text-primary">OF CBD</span>.
          </h1>
          <p className="text-muted-foreground text-lg md:text-2xl font-bold uppercase tracking-widest max-w-2xl mx-auto">
            A boutique guide to elite wellness and UK compliance.
          </p>
        </div>
      </section>

      {/* Video Gallery */}
      <section className="container mx-auto px-4">
        <div className="mb-12 border-b border-white/10 pb-6">
          <h2 className="font-headline text-3xl md:text-6xl font-black uppercase tracking-tighter">
            TRICHOMES <span className="text-hollow-white">IN MOTION</span>.
          </h2>
          <p className="text-muted-foreground uppercase tracking-widest text-sm font-bold mt-2">Artisanal Macro Gallery</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {galleryVideos.map((video, i) => (
            <div key={i} className="group relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/5 bg-black">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 brightness-110"
              >
                <source src={video.url} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-8 flex flex-col justify-end">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">{video.label}</p>
                <h3 className="font-headline font-black text-xl uppercase tracking-tight text-white">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blog/Education Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 space-y-12">
            <article>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                  <Info className="h-6 w-6" />
                </div>
                <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tighter">What is CBD?</h2>
              </div>
              <div className="prose prose-invert max-w-none text-muted-foreground text-lg leading-relaxed space-y-6">
                <p>
                  CBD, or Cannabidiol, is a naturally occurring compound found in the resinous flower of cannabis. While cannabis has a history as a medicine going back thousands of years, today the therapeutic properties of CBD are being tested and confirmed by scientists and doctors around the world.
                </p>
                <p>
                  Unlike THC, CBD is <strong>non-psychoactive</strong>. This means it does not produce a "high." For those seeking the wellness benefits of cannabis without the cognitive alteration, boutique-grown CBD represents the ultimate frontier in natural recovery and balance.
                </p>
              </div>
            </article>

            <article>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-accent/20 rounded-xl flex items-center justify-center text-accent">
                  <Heart className="h-6 w-6" />
                </div>
                <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tighter">Who Benefits?</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-secondary/20 border-white/5 hover:border-primary/50 transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="font-headline uppercase tracking-tight flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" /> Athletes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-sm leading-relaxed">
                    Elite performers use our micro-grown CBD for post-session recovery, muscle inflammation management, and achieving a grounded state after high-intensity training.
                  </CardContent>
                </Card>
                <Card className="bg-secondary/20 border-white/5 hover:border-primary/50 transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="font-headline uppercase tracking-tight flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" /> Professionals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-sm leading-relaxed">
                    High-stakes environments demand clarity. CBD aids in maintaining focus and managing everyday stress without the fog associated with traditional alternatives.
                  </CardContent>
                </Card>
              </div>
            </article>
          </div>

          <aside className="lg:col-span-5 space-y-8">
            <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <Scale className="h-8 w-8 text-primary" />
                <h2 className="font-headline text-2xl font-black uppercase tracking-tighter">UK Legal Standing</h2>
              </div>
              <div className="space-y-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  DANKDROPS operates with absolute transparency and compliance under UK law. All products in our harvest meet the following criteria:
                </p>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="thc" className="border-white/10">
                    <AccordionTrigger className="font-bold text-xs uppercase tracking-widest text-white">THC Threshold</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-xs leading-relaxed">
                      Every strain is strictly tested to contain less than 0.2% THC, ensuring they are fully non-psychoactive and legal for possession and use in the UK.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="hemp" className="border-white/10">
                    <AccordionTrigger className="font-bold text-xs uppercase tracking-widest text-white">Hemp Origin</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-xs leading-relaxed">
                      Our boutique collective only cultivates CBD from EU-approved hemp strains, ensuring artisanal quality that adheres to rigorous agricultural standards.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="lab" className="border-white/10">
                    <AccordionTrigger className="font-bold text-xs uppercase tracking-widest text-white">Laboratory Verified</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-xs leading-relaxed">
                      We triple-test every batch for purity, terpene profiles, and cannabinoid content, providing the ultimate assurance for the connoisseur.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Button asChild className="w-full bg-primary hover:bg-primary/90 font-black uppercase tracking-tighter h-12">
                  <Link href="/shop">BROWSE COMPLIANT HARVEST</Link>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Trust Seal */}
      <section className="bg-black py-20 border-y border-white/5">
        <div className="container mx-auto px-4 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary font-black uppercase tracking-widest text-xs">
            <Shield className="h-4 w-4" /> TRIPLE TESTED PURITY
          </div>
          <h2 className="font-headline text-4xl md:text-7xl font-black uppercase tracking-tighter">
            THE <span className="text-hollow-white">NEW STANDARD</span> IN WELLNESS.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="h-14 px-10 font-black uppercase tracking-tighter text-lg">
              <Link href="/shop">SHOP ELITE FLOWER</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-10 font-black uppercase tracking-tighter text-lg border-white/20">
              <Link href="/">RETURN HOME</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
