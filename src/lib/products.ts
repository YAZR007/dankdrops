
import { Product } from '@/types/product';

// Generic placeholder for other products
const GENERIC_MACRO = "https://static.wixstatic.com/media/a82ad9_2c38c072dab44fc488cdfb554e857ee3~mv2.jpg/v1/fill/w_1138,h_1708,al_c,q_90/a82ad9_2c38c072dab44fc488cdfb554e857ee3~mv2.webp";

// Specific images for Blue Dream
const BLUE_DREAM_PRIMARY = "https://static.wixstatic.com/media/a82ad9_cda5746897164e49912146db6a489808~mv2.jpg/v1/fill/w_1138,h_1708,al_c,q_90/a82ad9_cda5746897164e49912146db6a489808~mv2.webp";
const BLUE_DREAM_SECONDARY = "https://static.wixstatic.com/media/a82ad9_017d2aea4b704288b4b723e8b382a962~mv2.jpg/v1/fill/w_1138,h_1708,al_c,q_90/a82ad9_017d2aea4b704288b4b723e8b382a962~mv2.webp";

// Specific images for Permanent Marker
const PERMANENT_MARKER_SECONDARY = "https://static.wixstatic.com/media/a82ad9_575ca2f738b84e9bb3cec63714690669~mv2.jpg/v1/fill/w_1138,h_1708,al_c,q_90/a82ad9_575ca2f738b84e9bb3cec63714690669~mv2.webp";

export const PRODUCTS: Product[] = [
  {
    id: 'f1',
    name: 'Permanent Marker',
    description: 'Leafly 2023 Strain of the Year. This high-potency hybrid is floral, soapy, and gassy with a powerful punch that leaves you in a state of creative bliss.',
    category: 'Flower',
    price: 75,
    imageUrl: GENERIC_MACRO,
    secondaryImageUrl: PERMANENT_MARKER_SECONDARY,
    sizes: ['3.5g', '7g', '14g', '28g'],
    colors: ['Hybrid'],
    isNewArrival: true,
    lineage: '(Biscotti x Jealousy) x London Pound Cake',
    thc: '28%',
    terpenes: ['Caryophyllene', 'Limonene', 'Myrcene'],
    effects: ['Hungry', 'Relaxed', 'Giggly']
  },
  {
    id: 'f2',
    name: 'Blue Dream',
    description: 'A legendary sativa-dominant hybrid that balances full-body relaxation with gentle cerebral invigoration. Known for its sweet berry aroma.',
    category: 'Flower',
    price: 60,
    imageUrl: BLUE_DREAM_PRIMARY,
    secondaryImageUrl: BLUE_DREAM_SECONDARY,
    sizes: ['3.5g', '7g', '14g', '28g'],
    colors: ['Sativa'],
    isNewArrival: false,
    lineage: 'Blueberry x Haze',
    thc: '18%',
    terpenes: ['Myrcene', 'Pinene', 'Caryophyllene'],
    effects: ['Uplifted', 'Energetic', 'Creative']
  },
  {
    id: 'f3',
    name: 'GMO Cookies',
    description: 'Also known as "Garlic Cookies," this indica-dominant heavy hitter is famous for its savory, funky aroma and profound sedative effects.',
    category: 'Flower',
    price: 70,
    imageUrl: GENERIC_MACRO,
    sizes: ['3.5g', '7g', '14g', '28g'],
    colors: ['Indica'],
    isNewArrival: true,
    lineage: 'Chemdog x Girl Scout Cookies',
    thc: '30%',
    terpenes: ['Caryophyllene', 'Limonene', 'Myrcene'],
    effects: ['Sleepy', 'Relaxed', 'Hungry']
  },
  {
    id: 'f4',
    name: 'Gelato #41',
    description: 'A high-end hybrid featuring a complex aroma of sweet sherbet, blueberries, and citrus. Perfect for those looking for a balanced, flavorful smoke.',
    category: 'Flower',
    price: 65,
    imageUrl: GENERIC_MACRO,
    sizes: ['3.5g', '7g', '14g', '28g'],
    colors: ['Hybrid'],
    isNewArrival: false,
    lineage: 'Sunset Sherbert x Thin Mint GSC',
    thc: '22%',
    terpenes: ['Caryophyllene', 'Limonene', 'Linalool'],
    effects: ['Happy', 'Relaxed', 'Euphoric']
  },
  {
    id: 'f5',
    name: 'OG Kush',
    description: 'The backbone of West Coast cannabis. OG Kush has a unique terpene profile that boasts a complex aroma with notes of fuel, skunk, and spice.',
    category: 'Flower',
    price: 60,
    imageUrl: GENERIC_MACRO,
    sizes: ['3.5g', '7g', '14g', '28g'],
    colors: ['Hybrid'],
    isNewArrival: false,
    lineage: 'Unknown (Hindu Kush x Chemdog)',
    thc: '20%',
    terpenes: ['Myrcene', 'Limonene', 'Caryophyllene'],
    effects: ['Relaxed', 'Hungry', 'Sleepy']
  },
  {
    id: 'c1',
    name: 'Live Rosin: Permanent Marker',
    description: 'Solventless extract made from fresh-frozen Permanent Marker flower. Captures the intense floral and gassy profile in its purest form.',
    category: 'Concentrates',
    price: 85,
    imageUrl: GENERIC_MACRO,
    sizes: ['1g', '2g'],
    colors: ['Hybrid'],
    isNewArrival: true,
    lineage: 'Permanent Marker (First Press)',
    thc: '82%',
    terpenes: ['Caryophyllene', 'Limonene'],
    effects: ['Creative', 'Relaxed', 'Happy']
  },
  {
    id: 'e1',
    name: 'Sleepy Time Indica Edibles',
    description: 'Nano-infused gourmet gummies designed for maximum relaxation. Infused with terpene-rich Granddaddy Purple extract.',
    category: 'Edibles',
    price: 30,
    imageUrl: GENERIC_MACRO,
    sizes: ['10pk', '20pk'],
    colors: ['Indica'],
    isNewArrival: false,
    lineage: 'Granddaddy Purple Infusion',
    thc: '10mg/unit',
    terpenes: ['Myrcene', 'Linalool'],
    effects: ['Sleepy', 'Relaxed', 'Calm']
  },
  {
    id: 'p1',
    name: 'Infused Prerolls: GMO',
    description: 'Top-shelf GMO flower infused with live resin and coated in blonde kief. For those seeking maximum potency and depth.',
    category: 'Prerolls',
    price: 45,
    imageUrl: GENERIC_MACRO,
    sizes: ['Single', '5-pack'],
    colors: ['Indica'],
    isNewArrival: true,
    lineage: 'GMO Flower x Live Resin',
    thc: '38%',
    terpenes: ['Caryophyllene', 'Myrcene'],
    effects: ['Euphoric', 'Sedated', 'Happy']
  }
];
