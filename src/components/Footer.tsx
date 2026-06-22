import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex flex-col items-start mb-4">
              <span className="text-xl font-bold tracking-tighter text-gray-900">
                Pulse <span className="text-cyan-500 font-light">digi art</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Curated digital art for modern spaces. Elevating the unseen through the power of cyan and white aesthetics.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Explore</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-gray-500 hover:text-cyan-500 transition-colors">
                  All Artworks
                </Link>
              </li>
              <li>
                 <Link to="/cart" className="text-sm text-gray-500 hover:text-cyan-500 transition-colors">
                  Your Cart
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Connect</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-500 hover:text-cyan-500 transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500 hover:text-cyan-500 transition-colors">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Pulse digi art. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
