import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-cyan-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start group">
            <span className="text-2xl font-bold tracking-tighter text-gray-900 group-hover:text-cyan-500 transition-colors">
              Pulse <span className="text-cyan-500 font-light">digi art</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-gray-600 hover:text-cyan-500 transition-colors">
              Home
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="relative p-2 text-gray-600 hover:text-cyan-500 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-cyan-500 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
             <Link to="/cart" className="relative p-2 text-gray-600 hover:text-cyan-500 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-cyan-500 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-cyan-500 p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-cyan-100">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-800 hover:bg-cyan-50 hover:text-cyan-600 rounded-md"
            >
              Home
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
