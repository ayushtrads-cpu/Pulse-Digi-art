import { ShoppingCart, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { email, logout } = useAuth();
  const isOwner = email === 'ayushtrads@gmail.com';
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

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
            {isOwner && (
              <Link to="/upload" className="text-sm font-medium text-gray-600 hover:text-cyan-500 transition-colors">
                Upload Work
              </Link>
            )}
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="relative p-2 text-gray-600 hover:text-cyan-500 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-cyan-500 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
              <div className="flex items-center space-x-3 border-l pl-4 border-gray-200">
                <span className="text-xs text-gray-500 font-mono truncate max-w-[150px] block" title={email || ''}>{email}</span>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
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
            {isOwner && (
              <Link
                to="/upload"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-800 hover:bg-cyan-50 hover:text-cyan-600 rounded-md"
              >
                Upload Work
              </Link>
            )}
            <div className="pt-4 mt-2 border-t border-gray-100">
              <div className="px-3 py-2 text-sm text-gray-500 truncate">{email}</div>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
