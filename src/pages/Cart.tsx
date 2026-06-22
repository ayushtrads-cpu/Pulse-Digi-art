import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center max-w-2xl mx-auto">
        <div className="w-24 h-24 bg-cyan-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-cyan-300" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added any digital masterpieces to your collection yet.</p>
        <Link
          to="/"
          className="px-8 py-4 bg-cyan-500 text-white font-semibold rounded-full shadow-lg shadow-cyan-500/30 hover:bg-cyan-600 transition-all hover:-translate-y-0.5"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <h1 className="text-3xl font-bold text-gray-900 mb-12">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-8 space-y-6">
          {cart.map((item, index) => (
            <div
              key={item.id || `cart-${index}`}
              className="flex flex-col sm:flex-row items-start sm:items-center p-4 bg-white border border-gray-100 rounded-2xl shadow-sm gap-6"
            >
              <Link to={`/product/${item.id}`} className="block w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </Link>
              
              <div className="flex-grow min-w-0">
                <Link to={`/product/${item.id}`}>
                  <h3 className="text-lg font-bold text-gray-900 hover:text-cyan-600 transition-colors truncate">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500 mb-4">{item.category}</p>
                
                <div className="flex items-center justify-between">
                  {/* Quantity Control */}
                  <div className="flex items-center border border-gray-200 rounded-full bg-white">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="p-2 text-gray-500 hover:text-cyan-600 disabled:opacity-50 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 text-gray-500 hover:text-cyan-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4">
                     <p className="font-semibold text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                     <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-gray-50 rounded-3xl p-8 sticky top-24 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-gray-900 font-medium">₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Digital Delivery</span>
                <span className="text-cyan-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (calculated at checkout)</span>
                <span className="text-gray-900 font-medium">₹0.00</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6 mb-8">
              <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/checkout')}
              className="w-full flex items-center justify-center py-4 px-8 bg-cyan-500 text-white font-semibold rounded-full shadow-lg shadow-cyan-500/30 hover:bg-cyan-600 transition-all hover:-translate-y-0.5 group"
            >
              Proceed to Checkout
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
