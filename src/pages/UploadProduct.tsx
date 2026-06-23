import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { CATEGORIES, Product } from '../data/products';
import { Upload, Plus, Trash2, ArrowLeft, Image as ImageIcon, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const PRESET_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop', label: 'Floral Abstract' },
  { url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop', label: 'Fluid Acrylic' },
  { url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop', label: '3D Wave Shape' },
  { url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop', label: 'Neon Cyberpunk' },
  { url: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&auto=format&fit=crop', label: 'Retrowave Sunset' },
  { url: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=800&auto=format&fit=crop', label: 'Minimal Sculpture' }
];

export default function UploadProduct() {
  const { products, addProduct, removeProduct } = useProducts();
  const navigate = useNavigate();

  // Form states
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0] || 'Digital Arts');
  const [customCategory, setCustomCategory] = useState('');
  const [isCustomCategoryActive, setIsCustomCategoryActive] = useState(false);
  const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [imageType, setImageType] = useState<'url' | 'preset' | 'file'>('preset');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [attachedFileName, setAttachedFileName] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  // Status states
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setStatus({ type: 'error', message: 'Invalid file format. Please attach an image file (e.g. JPG, PNG, WEBP).' });
      return;
    }
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setStatus({ type: 'error', message: `File too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Image must be under 5MB.` });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImageUrl(e.target.result as string);
        setAttachedFileName(file.name);
        setStatus({ type: 'success', message: `Successfully attached local image "${file.name}"!` });
        setTimeout(() => {
          setStatus({ type: null, message: '' });
        }, 4000);
      }
    };
    reader.onerror = () => {
      setStatus({ type: 'error', message: 'An error occurred while reading the image file.' });
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handlePresetSelect = (index: number, url: string) => {
    setSelectedPreset(index);
    setImageUrl(url);
    setAttachedFileName('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    if (!title.trim()) {
      setStatus({ type: 'error', message: 'Please provide a title for your artwork.' });
      return;
    }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      setStatus({ type: 'error', message: 'Please enter a valid price greater than 0.' });
      return;
    }
    if (!description.trim()) {
      setStatus({ type: 'error', message: 'Please provide a short description.' });
      return;
    }
    if (!imageUrl.trim()) {
      setStatus({ type: 'error', message: 'Please specify an image URL or choose a preset.' });
      return;
    }

    const finalCategory = isCustomCategoryActive && customCategory.trim() 
      ? customCategory.trim() 
      : category;

    const newProduct: Product = {
      id: `art-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: title.trim(),
      description: description.trim(),
      longDescription: longDescription.trim() || description.trim(),
      price: Number(price),
      category: finalCategory,
      image: imageUrl.trim(),
    };

    addProduct(newProduct);
    setStatus({ type: 'success', message: 'Artist creation success! Your artwork is now live in the gallery.' });

    // Reset some states
    setTitle('');
    setPrice('');
    setDescription('');
    setLongDescription('');
    setCustomCategory('');
    setIsCustomCategoryActive(false);

    // Scroll to success message
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Auto-clear status after 4 seconds
    setTimeout(() => {
      setStatus({ type: null, message: '' });
    }, 4000);
  };

  const handleRemoveProduct = (id: string, productTitle: string) => {
    if (window.confirm(`Are you sure you want to remove "${productTitle}"?`)) {
      removeProduct(id);
      setStatus({ type: 'success', message: `Successfully removed "${productTitle}" from the store.` });
      setTimeout(() => {
        setStatus({ type: null, message: '' });
      }, 4000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-8 mb-12 gap-4">
        <div>
          <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-cyan-600 mb-3 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Store
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Creator Space</h1>
          <p className="text-gray-500 mt-1">Upload new works or manage your catalog items directly.</p>
        </div>
      </div>

      {status.type && (
        <div className={`mb-8 p-4 rounded-2xl flex items-start gap-3 border ${
          status.type === 'success' 
            ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
            : 'bg-rose-50 border-rose-100 text-rose-800'
        }`}>
          {status.type === 'success' ? (
            <CheckCircle className="w-5 h-5 shrink-0 text-emerald-500 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-500 mt-0.5" />
          )}
          <div>
            <p className="font-semibold">{status.type === 'success' ? 'Success' : 'Error'}</p>
            <p className="text-sm opacity-90">{status.message}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Upload Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-gray-100 rounded-3xl shadow-xl shadow-cyan-900/5">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-cyan-50 rounded-2xl text-cyan-500">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Upload New Work</h2>
              <p className="text-sm text-gray-500">Enter parameters to post digital illustrations, posters, and arts.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Title */}
              <div className="sm:col-span-2">
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                  Artwork Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Cyberpunk Street Neon 2077"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-gray-900 placeholder-gray-400"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                  Price (₹) *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-400 font-medium font-sans">₹</span>
                  <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="299"
                    min="1"
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Category selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <div className="flex flex-col gap-2">
                  {!isCustomCategoryActive ? (
                    <div className="flex gap-2">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-gray-900 bg-white"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => setIsCustomCategoryActive(true)}
                        className="px-3 bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-xs transition-all whitespace-nowrap"
                      >
                        Add Custom
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder="Custom Category"
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-gray-900 placeholder-gray-400"
                      />
                      <button
                        type="button"
                        onClick={() => setIsCustomCategoryActive(false)}
                        className="px-3 bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-xs transition-all"
                      >
                        Select List
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Short description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                Short Description *
              </label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary of the artifact (appears on cards)"
                maxLength={120}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            {/* Detail description */}
            <div>
              <label htmlFor="longDescription" className="block text-sm font-semibold text-gray-700 mb-2">
                Detailed Story / Description
              </label>
              <textarea
                id="longDescription"
                rows={4}
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                placeholder="Tell the detailed story behind this digital masterpiece, the inspirations, canvas ratios, style or techniques used..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-gray-900 placeholder-gray-400 resize-none"
              />
            </div>

            {/* Artwork Image Cover */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-gray-700">
                  Artwork Image Choice
                </label>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setImageType('preset');
                      setImageUrl(PRESET_IMAGES[selectedPreset].url);
                    }}
                    className={`px-2.5 py-1 text-[11px] sm:text-xs font-semibold rounded-md transition-all ${
                      imageType === 'preset' ? 'bg-white text-cyan-600 shadow-sm' : 'text-gray-500'
                    }`}
                  >
                    Presets
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setImageType('url');
                      setImageUrl('');
                      setAttachedFileName('');
                    }}
                    className={`px-2.5 py-1 text-[11px] sm:text-xs font-semibold rounded-md transition-all ${
                      imageType === 'url' ? 'bg-white text-cyan-600 shadow-sm' : 'text-gray-500'
                    }`}
                  >
                    Custom URL
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setImageType('file');
                      setImageUrl('');
                      setAttachedFileName('');
                    }}
                    className={`px-2.5 py-1 text-[11px] sm:text-xs font-semibold rounded-md transition-all ${
                      imageType === 'file' ? 'bg-white text-cyan-600 shadow-sm' : 'text-gray-500'
                    }`}
                  >
                    Attach File ({'<'}5MB)
                  </button>
                </div>
              </div>

              {imageType === 'preset' ? (
                <div>
                  <p className="text-xs text-gray-400 mb-3">Choose a stunning visual for your piece from our royalty-free fine abstract collection:</p>
                  <div className="grid grid-cols-3 gap-3">
                    {PRESET_IMAGES.map((img, idx) => (
                      <button
                        key={img.url}
                        type="button"
                        onClick={() => handlePresetSelect(idx, img.url)}
                        className={`group relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                          selectedPreset === idx && imageType === 'preset'
                            ? 'border-cyan-500 scale-95 ring-4 ring-cyan-100'
                            : 'border-transparent hover:border-gray-200'
                        }`}
                      >
                        <img src={img.url} alt={img.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <span className="absolute bottom-0 inset-x-0 bg-black/50 text-[10px] text-white py-1 block truncate text-center opacity-0 group-hover:opacity-100 transition-opacity">
                          {img.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : imageType === 'file' ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[160px] ${
                    isDragOver
                      ? 'border-cyan-500 bg-cyan-50/50'
                      : imageUrl && imageType === 'file'
                        ? 'border-emerald-250 bg-emerald-50/10'
                        : 'border-gray-200 hover:border-cyan-400 hover:bg-gray-50/50'
                  }`}
                  onClick={() => document.getElementById('artwork-file-input')?.click()}
                >
                  <input
                    type="file"
                    id="artwork-file-input"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="p-3 bg-cyan-50 text-cyan-500 rounded-2xl mb-2">
                    <Upload className="w-6 h-6 mx-auto" />
                  </div>
                  <p className="text-sm font-semibold text-gray-700">
                    {attachedFileName ? 'Change attached image file' : 'Click to select or drag & drop'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 max-w-xs">
                    High-quality PNG, JPG, or WEBP under 5MB.
                  </p>
                  {attachedFileName && (
                    <div className="mt-3 px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-xs font-medium border border-cyan-100 flex items-center justify-center gap-1.5 self-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                      {attachedFileName}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-gray-900 placeholder-gray-400 text-sm"
                  />
                  <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                    <ImageIcon className="w-3.5 h-3.5" /> High-quality direct JPEG or PNG links recommended.
                  </p>
                </div>
              )}

              {/* Image Preview */}
              {imageUrl && (
                <div className="p-3 bg-gray-50 border border-gray-100 rounded-2xl flex gap-4 items-center">
                  <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-200 border border-gray-100">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1542840410-3092f99611a3?q=80&w=800&auto=format&fit=crop';
                      }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-semibold text-cyan-600 block mb-0.5">Live Preview Ready</span>
                    <span className="text-xs text-gray-500 block truncate">{imageUrl}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Launch button */}
            <button
              type="submit"
              className="w-full py-4 text-center rounded-2xl font-bold bg-cyan-500 text-white hover:bg-cyan-600 shadow-lg shadow-cyan-500/10 active:scale-98 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" /> Publish New Artwork
            </button>
          </form>
        </div>

        {/* Right Side: Manage & Remove Items */}
        <div className="lg:col-span-5 bg-gray-50 p-6 sm:p-8 rounded-3xl border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span>Gallery Catalog</span>
              <span className="text-xs font-medium px-2.5 py-0.5 bg-cyan-100 text-cyan-800 rounded-full">
                {products.length} {products.length === 1 ? 'item' : 'items'}
              </span>
            </h2>
            <span className="text-xs text-gray-400">Total Products</span>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12 px-6 bg-white border border-gray-100 rounded-2xl">
              <Sparkles className="w-10 h-10 text-cyan-300 mx-auto mb-3" />
              <p className="font-bold text-gray-700">Empty Catalog</p>
              <p className="text-xs text-gray-400 mt-1">Add items using the form to publish to the digital storefront.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[660px] overflow-y-auto pr-2">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="bg-white p-3.5 border border-gray-100 rounded-2xl shadow-sm flex items-center justify-between gap-4 group hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-3 items-center min-w-0">
                    <div className="w-14 h-14 shrink-0 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1542840410-3092f99611a3?q=80&w=800&auto=format&fit=crop';
                        }}
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-gray-900 group-hover:text-cyan-600 transition-colors truncate">
                        {p.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-semibold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded">
                          {p.category}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">
                          ₹{p.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveProduct(p.id, p.title)}
                    className="p-2.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                    title={`Remove ${p.title}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200/60 bg-gradient-to-br from-cyan-50/50 to-emerald-50/50 -mx-6 -mb-8 p-6 rounded-b-3xl">
            <h4 className="text-xs font-bold text-gray-700 tracking-wider uppercase mb-2">Live Store Guidelines</h4>
            <ul className="text-xs text-gray-500 space-y-2 leading-relaxed">
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-cyan-500"></span>
                Works uploaded are instantly available globally on your gallery layout.
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-cyan-500"></span>
                Images are lazily rendered and highly optimized via progressive layouts.
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-cyan-500"></span>
                Pricing should reflect standard Indian premium collectibles indexes.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
