
import { Product } from '@/types/product';
import { PlaceHolderImages } from './placeholder-images';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Ghost Train Haze',
    description: 'A legendary Sativa-dominant strain known for its potent cerebral effects and frosty trichomes. Captured here in a high-contrast macro study.',
    category: 'Flower',
    price: 55,
    imageUrl: PlaceHolderImages.find(img => img.id === 'p1')?.imageUrl || '',
    sizes: ['3.5g', '7g', '14g', '28g'],
    colors: ['Sativa', 'Hybrid'],
    isNewArrival: true
  },
  {
    id: 'p2',
    name: 'Skywalker OG Prerolls',
    description: 'Five pack of premium hand-rolled joints using 100% whole flower. Studio lighting highlights the artisanal craft of the roll.',
    category: 'Prerolls',
    price: 35,
    imageUrl: PlaceHolderImages.find(img => img.id === 'p2')?.imageUrl || '',
    sizes: ['5-Pack', 'Single'],
    colors: ['Indica'],
    isNewArrival: true
  },
  {
    id: 'p3',
    name: 'Live Resin Diamonds',
    description: 'Ultra-pure THC-A crystals submersed in a terpene-rich sauce. The golden amber hues pop against the signature black backdrop.',
    category: 'Concentrates',
    price: 65,
    imageUrl: PlaceHolderImages.find(img => img.id === 'p3')?.imageUrl || '',
    sizes: ['1g', '2g'],
    colors: ['Hybrid', 'Indica'],
  },
  {
    id: 'p4',
    name: 'Midnight Berry Gummies',
    description: 'Nano-emulsified for fast onset. These 10mg THC gummies are presented in our curated dark aesthetic for the nighttime connoisseur.',
    category: 'Edibles',
    price: 25,
    imageUrl: PlaceHolderImages.find(img => img.id === 'p4')?.imageUrl || '',
    sizes: ['10-Pack', '20-Pack'],
    colors: ['Mixed Berry'],
    isNewArrival: true
  },
  {
    id: 'p5',
    name: 'Elite Distillate Cart',
    description: 'High-potency distillate with botanical terpenes. Features a ceramic heating element, shown here in a minimalist studio setting.',
    category: 'Vapes',
    price: 45,
    imageUrl: PlaceHolderImages.find(img => img.id === 'p5')?.imageUrl || '',
    sizes: ['0.5g', '1g'],
    colors: ['Sativa-Lean', 'Indica-Lean'],
  },
  {
    id: 'p6',
    name: 'Chromium Magnetic Grinder',
    description: 'Four-piece aircraft-grade aluminum grinder. The violet-chromium finish catches the low-key studio lighting perfectly.',
    category: 'Accessories',
    price: 30,
    imageUrl: PlaceHolderImages.find(img => img.id === 'p6')?.imageUrl || '',
    sizes: ['Medium', 'Large'],
    colors: ['Violet', 'Slate'],
  }
];
