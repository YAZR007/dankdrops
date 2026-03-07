
export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  sizes: string[];
  colors: string[];
  isNewArrival?: boolean;
  lineage?: string;
  thc?: string;
  terpenes?: string[];
  effects?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}
