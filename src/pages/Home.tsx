import { useState, useMemo } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { CATEGORIES, initialProducts } from '../data/products';

export default function Home() {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...CATEGORIES];

  const filteredProducts = useMemo(() => {
    const list = products.length > 0 ? products : initialProducts;
    if (selectedCategory === 'All') return list;
    return list.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, products]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-50 py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 to-white/10 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
              Experience the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">Pulse</span> of Digital Art.
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              Discover curated, high-resolution digital masterpieces that blend aesthetic purity with futuristic vision. Perfect for your modern digital space or print.
            </p>
            <div className="flex gap-4">
               <button onClick={() => {
                   document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })
               }} className="px-8 py-4 bg-cyan-500 text-white font-semibold rounded-full shadow-lg shadow-cyan-500/30 hover:bg-cyan-600 hover:shadow-cyan-500/50 transition-all hover:-translate-y-0.5">
                  Explore Collection
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories & Products */}
      <section id="explore" className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 md:mb-0">
            Latest <span className="text-cyan-500 font-light">drops</span>
          </h2>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
