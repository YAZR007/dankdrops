
import { Product } from '@/types/product';

const MACRO_IMG = "https://static.wixstatic.com/media/a82ad9_2c38c072dab44fc488cdfb554e857ee3~mv2.jpg/v1/fill/w_1138,h_1708,al_c,q_90/a82ad9_2c38c072dab44fc488cdfb554e857ee3~mv2.webp";

export const PRODUCTS: Product[] = [
  {
    id: 'f1',
    name: 'Purple Urkle',
    description: 'A California classic known for its deep purple hues and sweet, grape-like aroma. This indica is perfect for relaxation and sleep.',
    category: 'Flower',
    price: 60,
    imageUrl: MACRO_IMG,
    sizes: ['3.5g', '7g', '14g', '28g'],
    colors: ['Indica'],
    isNewArrival: true,
    lineage: 'Mendocino Purps Phenotype',
    thc: '22%',
    terpenes: ['Myrcene', 'Pinene', 'Caryophyllene'],
    effects: ['Relaxed', 'Sleepy', 'Happy']
  },
  {
    id: 'f7',
    name: 'Runtz',
    description: 'The legendary cross of Zkittlez and Gelato. Runtz is celebrated for its incredibly fruity flavor profile that smells just like a bag of sugary candy.',
    category: 'Flower',
    price: 75,
    imageUrl: MACRO_IMG,
    sizes: ['3.5g', '7g', '14g', '28g'],
    colors: ['Hybrid'],
    isNewArrival: true,
    lineage: 'Zkittlez x Gelato',
    thc: '24%',
    terpenes: ['Caryophyllene', 'Limonene', 'Myrcene'],
    effects: ['Talkative', 'Happy', 'Giggly']
  },
  {
    id: 'f8',
    name: 'Jealousy',
    description: 'Leafly Strain of the Year 2022. A high-potency hybrid that balances physical relaxation with a mentally uplifting spark.',
    category: 'Flower',
    price: 70,
    imageUrl: MACRO_IMG,
    sizes: ['3.5g', '7g', '14g', '28g'],
    colors: ['Hybrid'],
    isNewArrival: true,
    lineage: 'Sherbert Bx1 x Gelato 41',
    thc: '22%',
    terpenes: ['Caryophyllene', 'Limonene', 'Linalool'],
    effects: ['Giggly', 'Relaxed', 'Hungry']
  },
  {
    id: 'c1',
    name: 'Live Rosin: GMO',
    description: 'Solventless extract made from fresh-frozen flower. GMO Rosin delivers an intense, funky aroma and profound sedative effects.',
    category: 'Concentrates',
    price: 80,
    imageUrl: MACRO_IMG,
    sizes: ['1g', '2g'],
    colors: ['Indica'],
    isNewArrival: true,
    lineage: 'GMO Cookies (First Press)',
    thc: '78%',
    terpenes: ['Caryophyllene', 'Limonene', 'Myrcene'],
    effects: ['Relaxed', 'Sleepy', 'Hungry']
  },
  {
    id: 'e1',
    name: 'Huckleberry Gummies',
    description: 'Handcrafted with real fruit and enhanced with a balanced hybrid terpene profile. Consistent, delicious, and deeply effective.',
    category: 'Edibles',
    price: 25,
    imageUrl: MACRO_IMG,
    sizes: ['10pk', '20pk'],
    colors: ['Hybrid'],
    isNewArrival: false,
    lineage: 'Real Fruit Infusion',
    thc: '10mg/unit',
    terpenes: ['Limonene', 'Linalool'],
    effects: ['Happy', 'Focused', 'Calm']
  },
  {
    id: 'p1',
    name: 'Infused Prerolls: Runtz',
    description: 'Premium Runtz flower infused with live resin and coated in kief. Designed for the experienced connoisseur.',
    category: 'Prerolls',
    price: 45,
    imageUrl: MACRO_IMG,
    sizes: ['5-pack', 'Single'],
    colors: ['Hybrid'],
    isNewArrival: true,
    lineage: 'Runtz Flower x Live Resin',
    thc: '35%',
    terpenes: ['Caryophyllene', 'Limonene'],
    effects: ['Euphoric', 'Creative', 'Giggly']
  },
  {
    id: 'v1',
    name: 'Live Resin Cart: Blue Dream',
    description: 'Full-spectrum live resin cartridge preserving the original terpene profile of the legendary Blue Dream strain.',
    category: 'Vapes',
    price: 55,
    imageUrl: MACRO_IMG,
    sizes: ['0.5g', '1g'],
    colors: ['Sativa'],
    isNewArrival: false,
    lineage: 'Blueberry x Haze',
    thc: '82%',
    terpenes: ['Myrcene', 'Pinene'],
    effects: ['Uplifted', 'Energetic', 'Creative']
  }
];
