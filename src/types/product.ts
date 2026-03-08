
export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number; // Base price for 3.5g
  imageUrl: string;
  secondaryImageUrl?: string;
  sizes: string[];
  colors: string[];
  isNewArrival?: boolean;
  lineage?: string;
  cbd?: string;
  terpenes?: string[];
  effects?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  priceAtSelection: number; // The actual price based on the selected size
}
