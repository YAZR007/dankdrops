
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
    id: 'f9',
    name: 'GMO Cookies',
    description: 'Also known as Garlic Cookies, this strain is famous for its pungent, savory aroma and heavy-hitting sedative effects.',
    category: 'Flower',
    price: 65,
    imageUrl: MACRO_IMG,
    sizes: ['3.5g', '7g', '14g', '28g'],
    colors: ['Indica'],
    lineage: 'Girl Scout Cookies x Chemdawg',
    thc: '28%',
    terpenes: ['Caryophyllene', 'Limonene', 'Myrcene'],
    effects: ['Sleepy', 'Hungry', 'Relaxed']
  },
  {
    id: 'f10',
    name: 'Blue Dream',
    description: 'A West Coast staple that balances full-body relaxation with gentle cerebral invigoration. Ideal for daytime use.',
    category: 'Flower',
    price: 50,
    imageUrl: MACRO_IMG,
    sizes: ['3.5g', '7g', '14g', '28g'],
    colors: ['Sativa'],
    lineage: 'Blueberry x Haze',
    thc: '18%',
    terpenes: ['Myrcene', 'Pinene', 'Caryophyllene'],
    effects: ['Uplifted', 'Creative', 'Energetic']
  },
  {
    id: 'f3',
    name: 'Ghost Train Haze',
    description: 'One of the most potent sativas on the market. Expect a sour citrus aroma and a heavy dose of cerebral energy.',
    category: 'Flower',
    price: 65,
    imageUrl: MACRO_IMG,
    sizes: ['3.5g', '7g', '14g', '28g'],
    colors: ['Sativa'],
    lineage: 'Ghost OG x Neville’s Wreck',
    thc: '25%',
    terpenes: ['Terpinolene', 'Myrcene', 'Limonene'],
    effects: ['Energetic', 'Focused', 'Uplifted']
  },
  {
    id: 'f4',
    name: 'Wedding Cake',
    description: 'A potent type of indica-hybrid marijuana strain made by crossing Triangle Kush with Animal Mints.',
    category: 'Flower',
    price: 50,
    imageUrl: MACRO_IMG,
    sizes: ['3.5g', '7g', '14g', '28g'],
    colors: ['Hybrid'],
    lineage: 'Triangle Kush x Animal Mints',
    thc: '21%',
    terpenes: ['Limonene', 'Caryophyllene', 'Myrcene'],
    effects: ['Relaxed', 'Hungry', 'Aroused']
  }
];
