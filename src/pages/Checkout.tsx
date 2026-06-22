import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, ArrowLeft, Lock } from 'lucide-react';

export default function Checkout() {
  const { cartTotal, cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Open Razorpay payment gateway
    window.open('https://razorpay.me/@ayushkumarmallick', '_blank');

    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      navigate('/', { replace: true });
    }, 1000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center max-w-2xl mx-auto">
         <h2 className="text-3xl font-bold text-gray-900 mb-4">You have nothing to checkout</h2>
         <Link to="/" className="text-cyan-600 font-medium hover:underline">
          Go back to store
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <Link to="/cart" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-cyan-600 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Cart
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Checkout Form */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
            
            {/* Contact Info */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                  <input required type="email" id="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all" placeholder="you@example.com" />
                </div>
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                  <input required type="text" id="firstName" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                  <input required type="text" id="lastName" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
                  <div className="flex gap-2">
                    <select className="w-1/3 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all bg-white text-gray-700">
                      <option value="+1">+1 (US/CA)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+61">+61 (AU)</option>
                      <option value="+91">+91 (IN)</option>
                      <option value="+86">+86 (CN)</option>
                      <option value="+81">+81 (JP)</option>
                      <option value="+82">+82 (KR)</option>
                      <option value="+62">+62 (ID)</option>
                      <option value="+92">+92 (PK)</option>
                      <option value="+880">+880 (BD)</option>
                      <option value="+63">+63 (PH)</option>
                      <option value="+84">+84 (VN)</option>
                      <option value="+66">+66 (TH)</option>
                      <option value="+60">+60 (MY)</option>
                      <option value="+65">+65 (SG)</option>
                      <option value="+94">+94 (LK)</option>
                      <option value="+977">+977 (NP)</option>
                    </select>
                    <input required type="tel" id="phone" className="w-2/3 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all" />
                  </div>
                </div>
              </div>
            </section>

             {/* Billing Address */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Billing Address</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input required type="text" id="address" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all" placeholder="123 Main St" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input required type="text" id="city" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all" />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">ZIP / Postal Code</label>
                    <input required type="text" id="zip" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all" />
                  </div>
                </div>
                 <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select required id="country" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all bg-white">
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="EU">European Union</option>
                    <option disabled>──────────</option>
                    <option value="IN">India</option>
                    <option value="CN">China</option>
                    <option value="JP">Japan</option>
                    <option value="KR">South Korea</option>
                    <option value="ID">Indonesia</option>
                    <option value="PK">Pakistan</option>
                    <option value="BD">Bangladesh</option>
                    <option value="PH">Philippines</option>
                    <option value="VN">Vietnam</option>
                    <option value="TH">Thailand</option>
                    <option value="MY">Malaysia</option>
                    <option value="SG">Singapore</option>
                    <option value="LK">Sri Lanka</option>
                    <option value="NP">Nepal</option>
                    <option value="MM">Myanmar</option>
                    <option value="KH">Cambodia</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Payment Link */}
            <section className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="text-cyan-500 w-6 h-6" />
                <h2 className="text-xl font-semibold text-gray-900">Secure Payment</h2>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                You will be securely processed to complete your purchase. By clicking "Pay Now", you agree to our Terms of Service.
              </p>
              
               <button
                type="submit"
                disabled={isProcessing}
                className="w-full flex items-center justify-center py-4 px-8 bg-gray-900 text-white font-semibold rounded-xl shadow-lg hover:bg-gray-800 transition-all focus:ring-4 focus:ring-gray-200 disabled:opacity-70"
              >
                {isProcessing ? (
                   <span className="flex items-center gap-2">
                     <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                     Processing...
                   </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Pay ₹{cartTotal.toFixed(2)} Now
                  </span>
                )}
              </button>
            </section>
          </form>
        </div>

        {/* Order Summary sidebar */}
        <div>
          <div className="bg-gray-50 rounded-3xl p-8 sticky top-24 border border-gray-100">
             <h2 className="text-xl font-bold text-gray-900 mb-6">In your cart</h2>
             
             <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
               {cart.map((item) => (
                 <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-200">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="text-sm text-gray-900 font-medium truncate">{item.title}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-semibold text-gray-900">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                 </div>
               ))}
             </div>

             <div className="border-t border-gray-200 pt-6 space-y-4 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-gray-900 font-medium">₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Digital Delivery</span>
                  <span className="text-cyan-600 font-medium">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
