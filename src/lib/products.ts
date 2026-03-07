
import { Product } from '@/types/product';
import { PlaceHolderImages } from './placeholder-images';

const getBlackImg = () => {
  return PlaceHolderImages.find(img => img.id === 'black-square')?.imageUrl || 'https://placehold.co/600x800/000000/000000/png';
};

export const PRODUCTS: Product[] = [
  {
    id: 'f1',
    name: 'Purple Urkle',
    description: 'Deep purple hues and sweet grape-like aroma. Crystalline trichome density.',
    category: 'Flower',
    price: 60,
    imageUrl: getBlackImg(),
    sizes: ['3.5g', '7g', '14g', '28g'],
    colors: ['Indica'],
    isNewArrival: true
  },
  {
    id: 'f2',
    name: 'Granddaddy Purple',
    description: 'Vibrant orange pistils and heavy resin production.',
    category: 'Flower',
    price: 55,
    imageUrl: getBlackImg(),
    sizes: ['3.5g', '7g', '14g', '28g'],
    colors: ['Indica'],
    isNewArrival: true
  },
  {
    id: 'f3',
    name: 'Ghost Train Haze',
    description: 'Potent sativa-dominant strain with heavy resin production.',
    category: 'Flower',
    price: 65,
    imageUrl: getBlackImg(),
    sizes: ['3.5g', '7g', '14g', '28g'],
    colors: ['Sativa'],
    isNewArrival: true
  },
  {
    id: 'f4',
    name: 'Wedding Cake',
    description: 'Rich, tangy flavor profile with sugary resin coating.',
    category: 'Flower',
    price: 50,
    imageUrl: getBlackImg(),
    sizes: ['3.5g', '7g', '14g', '28g'],
    colors: ['Hybrid'],
  },
  {
    id: 'f5',
    name: 'Northern Lights',
    description: 'Resinous buds and fast flowering. Sweet and spicy aroma.',
    category: 'Flower',
    price: 45,
    imageUrl: getBlackImg(),
    sizes: ['3.5g', '7g', '14g', '28g'],
    colors: ['Indica'],
  },
  {
    id: 'f6',
    name: 'Sour Diesel',
    description: 'Pungent, fuel-like aroma with fiery orange hairs.',
    category: 'Flower',
    price: 55,
    imageUrl: getBlackImg(),
    sizes: ['3.5g', '7g', '14g', '28g'],
    colors: ['Sativa'],
  }
];
