
import { Product } from '@/types/product';
import { PlaceHolderImages } from './placeholder-images';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Ghost Train Haze',
    description: 'A legendary Sativa-dominant strain known for its potent cerebral effects and citrus-floral aroma. Perfect for daytime focus and creative energy.',
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
    description: 'Five pack of premium hand-rolled joints using 100% whole flower. This heavy-hitting Indica provides deep relaxation and euphoria.',
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
    description: 'Ultra-pure THC-A crystals submersed in a terpene-rich sauce. Extracted at sub-zero temperatures to preserve the plant\'s natural profile.',
    category: 'Concentrates',
    price: 65,
    imageUrl: PlaceHolderImages.find(img => img.id === 'p3')?.imageUrl || '',
    sizes: ['1g', '2g'],
    colors: ['Hybrid', 'Indica'],
  },
  {
    id: 'p4',
    name: 'Midnight Berry Gummies',
    description: 'Nano-emulsified for fast onset. These 10mg THC / 5mg CBN gummies are crafted for the perfect night\'s sleep with a natural blackberry flavor.',
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
    description: 'High-potency distillate with botanical terpenes. Features a ceramic heating element for smooth, consistent draws every time.',
    category: 'Vapes',
    price: 45,
    imageUrl: PlaceHolderImages.find(img => img.id === 'p5')?.imageUrl || '',
    sizes: ['0.5g', '1g'],
    colors: ['Sativa-Lean', 'Indica-Lean'],
  },
  {
    id: 'p6',
    name: 'Chromium Magnetic Grinder',
    description: 'Four-piece aircraft-grade aluminum grinder with razor-sharp teeth and a stainless steel pollen screen.',
    category: 'Accessories',
    price: 30,
    imageUrl: PlaceHolderImages.find(img => img.id === 'p6')?.imageUrl || '',
    sizes: ['Medium', 'Large'],
    colors: ['Violet', 'Slate'],
  }
];
