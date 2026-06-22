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

export const initialProducts: Product[] = [
  {
    id: '1',
    title: 'Cyberpunk Cityscape',
    description: 'Neon-lit streets of a futuristic metropolis.',
    longDescription: 'A highly detailed and immersive digital art piece depicting a sprawling cyberpunk city glowing with neon signs and futuristic vehicles.',
    price: 49.99,
    category: 'Digital Arts',
    image: 'https://images.unsplash.com/photo-1542840410-3092f99611a3?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Ethereal Portrait',
    description: 'A study in human likeness and light.',
    longDescription: 'A captivating character portrait exploring ethereal lighting and delicate features, capturing a profound sense of serenity.',
    price: 75.00,
    category: 'Human Like Arts',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Neon Samurai',
    description: 'Classic poster art with a modern anime twist.',
    longDescription: 'Vibrant colors and kinetic energy define this anime-style poster of a samurai warrior illuminated by a vibrant, neon-drenched background.',
    price: 35.00,
    category: 'Anime Posters',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '4',
    title: 'Neon Samurai 2',
    description: 'Classic poster art with a modern anime twist.',
    longDescription: 'Vibrant colors and kinetic energy define this anime-style poster of a samurai warrior illuminated by a vibrant, neon-drenched background.',
    price: 35.00,
    category: 'Anime Posters',
    image: 'https://images.unsplash.com/photo-1613376023733-f5424dfef48a?q=80&w=800&auto=format&fit=crop'
  }
];

