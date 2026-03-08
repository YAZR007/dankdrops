import { Product } from '@/types/product';

// Generic placeholder for other products
const GENERIC_MACRO = "https://static.wixstatic.com/media/a82ad9_2c38c072dab44fc488cdfb554e857ee3~mv2.jpg/v1/fill/w_1138,h_1708,al_c,q_90/a82ad9_2c38c072dab44fc488cdfb554e857ee3~mv2.webp";

// Specific images for Blue Dream
const BLUE_DREAM_PRIMARY = "https://static.wixstatic.com/media/a82ad9_cda5746897164e49912146db6a489808~mv2.jpg/v1/fill/w_1138,h_1708,al_c,q_90/a82ad9_cda5746897164e49912146db6a489808~mv2.webp";
const BLUE_DREAM_SECONDARY = "https://static.wixstatic.com/media/a82ad9_017d2aea4b704288b4b723e8b382a962~mv2.jpg/v1/fill/w_1138,h_1708,al_c,q_90/a82ad9_017d2aea4b704288b4b723e8b382a962~mv2.webp";
const BLUE_DREAM_TERTIARY = "https://friscolabs.com/cdn/shop/files/1-Pound-Dream-Star-THCA-Strain-_small_-Frisco-Labs-30906654.heic?v=1767044337&width=600";

// Specific images for Permanent Marker
const PERMANENT_MARKER_SECONDARY = "https://static.wixstatic.com/media/a82ad9_575ca2f738b84e9bb3cec63714690669~mv2.jpg/v1/fill/w_1138,h_1708,al_c,q_90/a82ad9_575ca2f738b84e9bb3cec63714690669~mv2.webp";

// Specific images for GMO Cookies
const GMO_COOKIES_PRIMARY = "https://static.wixstatic.com/media/a82ad9_4877c8ac51504407a1703ed4eda57dc4~mv2.jpg/v1/fill/w_1124,h_1708,al_c,q_90/a82ad9_4877c8ac51504407a1703ed4eda57dc4~mv2.webp";
const GMO_COOKIES_SECONDARY = "https://static.wixstatic.com/media/a82ad9_a36855ee1d474b9f9d995b3d4d418dce~mv2.jpg/v1/fill/w_1124,h_1708,al_c,q_90/a82ad9_a36855ee1d474b9f9d995b3d4d418dce~mv2.webp";

// Specific images for Gelato #41
const GELATO_41_PRIMARY = "https://static.wixstatic.com/media/a82ad9_56bd23227d7844f09a21700efcdef619~mv2.jpg/v1/fill/w_1138,h_1708,al_c,q_90/a82ad9_56bd23227d7844f09a21700efcdef619~mv2.webp";
const GELATO_41_SECONDARY = "https://static.wixstatic.com/media/a82ad9_a92ad8ab14fc4476ad4d7216f3f30035~mv2.jpg/v1/fill/w_1138,h_1708,al_c,q_90/a82ad9_a92ad8ab14fc4476ad4d7216f3f30035~mv2.webp";

// Specific images for Blueberry Pancakes
const BLUEBERRY_PANCAKES_PRIMARY = "https://litfarms.com/cdn/shop/files/BlueberryPancakesS-LEO_2_550f9d9b-4342-494b-855f-d78ebebfaefe.jpg?v=1760471298";

export const PRODUCTS: Product[] = [
  {
    id: 'f6',
    name: 'Blueberry Pancakes CBD',
    description: 'A boutique CBD phenotype of the legendary Blueberry Pancakes. This strain is an indica-dominant hybrid featuring an artisanal profile of sweet berries and buttery dough. It delivers exactly what it promises: a sensory experience like a big stack of blueberry pancakes, providing deeply relaxing effects and gentle mental clarity.',
    category: 'Flower',
    price: 21,
    imageUrl: BLUEBERRY_PANCAKES_PRIMARY,
    sizes: ['3.5g', '7g', '14g', '28g'],
    colors: ['Indica'],
    isNewArrival: true,
    lineage: 'Slurrican x Purple Panty Dropper (CBD Phenotype)',
    cbd: '20%',
    terpenes: ['Caryophyllene', 'Myrcene', 'Limonene'],
    effects: ['Relaxed', 'Happy', 'Hungry']
  },
  {
    id: 'f1',
    name: 'Permanent Marker CBD',
    description: 'Our flagship CBD-dominant hybrid. This boutique-grown strain is floral, soapy, and gassy, offering a powerful sense of clarity and focused bliss without psychoactive effects.',
    category: 'Flower',
    price: 21,
    imageUrl: GENERIC_MACRO,
    secondaryImageUrl: PERMANENT_MARKER_SECONDARY,
    sizes: ['3.5g', '7g', '14g', '28g'],
    colors: ['Hybrid'],
    isNewArrival: true,
    lineage: '(Biscotti x Jealousy) x London Pound Cake (Hemp Derivative)',
    cbd: '18%',
    terpenes: ['Caryophyllene', 'Limonene', 'Myrcene'],
    effects: ['Focused', 'Relaxed', 'Calm']
  },
  {
    id: 'f2',
    name: 'Blue Dream CBD',
    description: 'A premium CBD sativa-dominant strain that balances full-body relaxation with gentle mental clarity. Renowned for its sweet berry aroma and smooth finish.',
    category: 'Flower',
    price: 21,
    imageUrl: BLUE_DREAM_PRIMARY,
    secondaryImageUrl: BLUE_DREAM_SECONDARY,
    tertiaryImageUrl: BLUE_DREAM_TERTIARY,
    sizes: ['3.5g', '7g', '14g', '28g'],
    colors: ['Sativa'],
    isNewArrival: false,
    lineage: 'Blueberry x Haze (CBD Phenotype)',
    cbd: '15%',
    terpenes: ['Myrcene', 'Pinene', 'Caryophyllene'],
    effects: ['Uplifted', 'Clear-headed', 'Creative']
  },
  {
    id: 'f3',
    name: 'GMO Cookies CBD',
    description: 'An artisanal CBD indica-dominant strain famous for its savory, funky aroma and profound physical comfort. Perfect for evening relaxation.',
    category: 'Flower',
    price: 21,
    imageUrl: GMO_COOKIES_PRIMARY,
    secondaryImageUrl: GMO_COOKIES_SECONDARY,
    sizes: ['3.5g', '7g', '14g', '28g'],
    colors: ['Indica'],
    isNewArrival: true,
    lineage: 'Chemdog x Girl Scout Cookies (High CBD)',
    cbd: '22%',
    terpenes: ['Caryophyllene', 'Limonene', 'Myrcene'],
    effects: ['Sleepy', 'Relaxed', 'Comfortable']
  },
  {
    id: 'f4',
    name: 'Gelato #41 CBD',
    description: 'A top-shelf CBD hybrid featuring a complex aroma of sweet sherbet and citrus. Delivers a balanced, flavorful experience for connoisseurs.',
    category: 'Flower',
    price: 21,
    imageUrl: GELATO_41_PRIMARY,
    secondaryImageUrl: GELATO_41_SECONDARY,
    sizes: ['3.5g', '7g', '14g', '28g'],
    colors: ['Hybrid'],
    isNewArrival: false,
    lineage: 'Sunset Sherbert x Thin Mint GSC (CBD Cross)',
    cbd: '19%',
    terpenes: ['Caryophyllene', 'Limonene', 'Linalool'],
    effects: ['Happy', 'Relaxed', 'Balanced']
  },
  {
    id: 'f5',
    name: 'OG Kush CBD',
    description: 'The backbone of our artisanal CBD collection. This phenotype boasts a complex fuel and spice aroma with classic relaxation benefits.',
    category: 'Flower',
    price: 21,
    imageUrl: GENERIC_MACRO,
    sizes: ['3.5g', '7g', '14g', '28g'],
    colors: ['Hybrid'],
    isNewArrival: false,
    lineage: 'Hindu Kush x Chemdog (Hemp Selection)',
    cbd: '17%',
    terpenes: ['Myrcene', 'Limonene', 'Caryophyllene'],
    effects: ['Relaxed', 'Grounded', 'Sleepy']
  }
];

export const getPriceForSize = (basePrice: number, size: string): number => {
  const weight = parseFloat(size.replace('g', ''));
  if (weight === 7) return 35;
  if (weight === 14) return 65;
  if (weight === 28) return 120;
  return basePrice; // Fallback to 3.5g base price (21)
};
