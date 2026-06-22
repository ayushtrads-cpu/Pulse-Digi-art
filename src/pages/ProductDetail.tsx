import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Artwork not found</h2>
        <p className="text-gray-500 mb-8">The digital piece you are looking for does not exist or has been removed.</p>
        <Link to="/" className="text-cyan-600 font-medium hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to collection
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-cyan-600 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to gallery
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Image */}
        <div className="flex flex-col">
          <div className="w-full aspect-[4/5] md:aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-900/5">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 text-sm font-semibold tracking-wider text-cyan-700 bg-cyan-100 rounded-full mb-4">
              {product.category}
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              {product.title}
            </h1>
            <p className="text-3xl font-light text-gray-900 mb-8">
              ₹{product.price.toFixed(2)}
            </p>
            <div className="prose prose-cyan text-gray-600 text-lg leading-relaxed">
              <p>{product.longDescription}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center py-4 px-8 rounded-full font-semibold transition-all ${
                added
                  ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/30'
                  : 'bg-cyan-500 text-white hover:bg-cyan-600 shadow-lg shadow-cyan-500/30 hover:-translate-y-0.5'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5 mr-2" /> Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
                </>
              )}
            </button>
             <button
              onClick={() => {
                addToCart(product);
                navigate('/checkout');
              }}
              className="flex-1 flex items-center justify-center py-4 px-8 rounded-full font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-all shadow-lg hover:-translate-y-0.5"
            >
              Buy Now
            </button>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-100 space-y-4 text-sm text-gray-500">
             <p className="flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 inline-block"></span>
               Instant digital download (High-res PNG & TIFF)
             </p>
             <p className="flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 inline-block"></span>
               Commercial usage rights available via standard license
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
