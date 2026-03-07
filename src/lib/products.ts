
import { Product } from '@/types/product';
import { PlaceHolderImages } from './placeholder-images';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Midnight Oversized Hoodie',
    description: 'A premium, heavyweight cotton hoodie designed for maximum comfort and style. Features drop shoulders and a minimalist logo embroidery on the chest.',
    category: 'Hoodies',
    price: 85,
    imageUrl: PlaceHolderImages.find(img => img.id === 'p1')?.imageUrl || '',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Midnight Black', 'Slate Grey'],
    isNewArrival: true
  },
  {
    id: 'p2',
    name: 'Neon Glitch Graphic Tee',
    description: 'Streetwear essential featuring a vibrant neon glitch graphic print on high-quality acid-wash cotton.',
    category: 'T-Shirts',
    price: 45,
    imageUrl: PlaceHolderImages.find(img => img.id === 'p2')?.imageUrl || '',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Vintage Black', 'Neon Violet'],
    isNewArrival: true
  },
  {
    id: 'p3',
    name: 'Tactical Utility Cargo',
    description: 'Durable nylon-blend cargo pants with 8 functional pockets and adjustable ankle cuffs for a tailored streetwear fit.',
    category: 'Pants',
    price: 110,
    imageUrl: PlaceHolderImages.find(img => img.id === 'p3')?.imageUrl || '',
    sizes: ['30', '32', '34', '36'],
    colors: ['Tactical Olive', 'Stealth Black'],
  },
  {
    id: 'p4',
    name: 'DankRunner High-Tops',
    description: 'Exclusive high-top sneakers with a mixed-media upper, featuring violet suede and reflective blue detailing.',
    category: 'Shoes',
    price: 160,
    imageUrl: PlaceHolderImages.find(img => img.id === 'p4')?.imageUrl || '',
    sizes: ['8', '9', '10', '11', '12'],
    colors: ['Dank Violet', 'Cyber Blue'],
    isNewArrival: true
  },
  {
    id: 'p5',
    name: 'Legacy Denim Trucker',
    description: 'Classic denim jacket with a modern oversized fit, featuring a large screen-printed back patch and custom metal buttons.',
    category: 'Jackets',
    price: 125,
    imageUrl: PlaceHolderImages.find(img => img.id === 'p5')?.imageUrl || '',
    sizes: ['M', 'L', 'XL'],
    colors: ['Washed Blue', 'Black Denim'],
  },
  {
    id: 'p6',
    name: 'Reflective Bucket Hat',
    description: 'Lightweight bucket hat with a 3M reflective logo that shines bright in flash photography.',
    category: 'Accessories',
    price: 35,
    imageUrl: PlaceHolderImages.find(img => img.id === 'p6')?.imageUrl || '',
    sizes: ['OS'],
    colors: ['Black', 'Silver'],
  }
];
