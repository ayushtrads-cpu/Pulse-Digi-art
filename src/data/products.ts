export interface Product {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  category: string;
  image: string;
}

export const CATEGORIES = [
  'Anime Posters',
  'Human Like Arts',
  'Digital Arts',
];

export const initialProducts: Product[] = [];

