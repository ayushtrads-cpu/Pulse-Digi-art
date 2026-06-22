import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { useAuth } from '../context/AuthContext';

export default function UploadProduct() {
  const { addProduct } = useProducts();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { email } = useAuth();
  const isOwner = email === 'ayushtrads@gmail.com';

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    price: '',
    category: CATEGORIES[0],
  });
  const [imageBase64, setImageBase64] = useState<string>('');
  const [error, setError] = useState<string>('');

  if (!isOwner) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
        <p className="text-gray-600">Only the owner can upload new artwork.</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-8 px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
        >
          Return Home
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageBase64) {
      setError('Please upload an image.');
      return;
    }
    const newProduct = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      longDescription: formData.longDescription,
      price: parseFloat(formData.price),
      category: formData.category,
      image: imageBase64,
    };
    addProduct(newProduct);
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const file = e.target.files?.[0];
    if (!file) {
      setImageBase64('');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('Image size exceeds 2MB limit.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      setImageBase64('');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
        <Upload className="text-cyan-500 w-8 h-8" /> Upload New Product
      </h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cyan-500 outline-none transition-all bg-white" placeholder="Artwork Title" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
              <input required type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cyan-500 outline-none transition-all bg-white" placeholder="99.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select required name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cyan-500 outline-none transition-all bg-white">
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
            <input required type="text" name="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cyan-500 outline-none transition-all bg-white" placeholder="Brief tagline..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Long Description</label>
            <textarea required name="longDescription" value={formData.longDescription} onChange={handleChange} rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cyan-500 outline-none transition-all bg-white" placeholder="Detailed description of the artwork..."></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image (Max 2MB)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ImageIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                required 
                type="file" 
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange} 
                className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cyan-500 outline-none transition-all bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100" 
              />
            </div>
            {imageBase64 && (
              <div className="mt-4 opacity-100 transition-opacity duration-300">
                <p className="text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
                <div className="w-32 h-32 rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                  <img src={imageBase64} alt="Preview" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <button type="submit" className="w-full bg-cyan-500 text-white font-semibold py-4 rounded-xl shadow-lg hover:bg-cyan-600 transition-all">
            Publish Product
          </button>
        </div>
      </form>
    </div>
  );
}
