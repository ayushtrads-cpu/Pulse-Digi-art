import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Check, X } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { removeProduct } = useProducts();
  const { email } = useAuth();
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const canDelete = email === 'ayushtrads@gmail.com';

  return (
    <div className="group relative flex flex-col bg-white overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-cyan-100">
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1542840410-3092f99611a3?q=80&w=800&auto=format&fit=crop'}
          alt={product.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-cyan-600 bg-white/90 backdrop-blur-sm rounded-full">
            {product.category}
          </span>
        </div>
      </Link>

      {canDelete && (
        <div className={`absolute top-4 right-4 z-10 transition-opacity ${isConfirmingDelete ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          {isConfirmingDelete ? (
            <div className="flex bg-white/90 backdrop-blur-sm rounded-full shadow-sm overflow-hidden">
              <button
                onClick={(e) => { e.preventDefault(); removeProduct(product.id); }}
                className="p-2 text-white bg-red-500 hover:bg-red-600 transition-colors"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => { e.preventDefault(); setIsConfirmingDelete(false); }}
                className="p-2 text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsConfirmingDelete(true);
              }}
              className="p-2 text-red-500 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-red-500 hover:text-white transition-colors focus:ring-4 focus:outline-none focus:ring-red-100"
              aria-label={`Delete ${product.title}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`} className="block mb-2">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-cyan-500 transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <p className="text-xl font-medium text-gray-900">₹{product.price.toFixed(2)}</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="flex items-center justify-center p-3 text-cyan-600 bg-cyan-50 rounded-full hover:bg-cyan-500 hover:text-white transition-colors focus:ring-4 focus:outline-none focus:ring-cyan-100"
            aria-label={`Add ${product.title} to cart`}
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
