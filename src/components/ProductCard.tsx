import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { removeProduct } = useProducts();

  return (
    <div className="group relative flex flex-col bg-white overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-cyan-100">
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1542840410-3092f99611a3?q=80&w=800&auto=format&fit=crop'}
          alt={product.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1542840410-3092f99611a3?q=80&w=800&auto=format&fit=crop';
          }}
        />
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-cyan-600 bg-white/90 backdrop-blur-sm rounded-full">
            {product.category}
          </span>
        </div>
      </Link>

      <div className="p-3 sm:p-5 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`} className="block mb-1 sm:mb-2">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-cyan-500 transition-colors line-clamp-1 sm:line-clamp-none">
            {product.title}
          </h3>
        </Link>
        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mb-2 sm:mb-4 flex-grow">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <p className="text-lg sm:text-xl font-medium text-gray-900">₹{product.price.toFixed(2)}</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="flex items-center justify-center p-2 sm:p-3 text-cyan-600 bg-cyan-50 rounded-full hover:bg-cyan-500 hover:text-white transition-colors focus:ring-4 focus:outline-none focus:ring-cyan-100"
            aria-label={`Add ${product.title} to cart`}
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
