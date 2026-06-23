import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product, initialProducts } from '../data/products';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('pulse_products_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Programmatically filter out any product referencing "Qin Shi Huang" as requested
          return parsed.filter((p: Product) => {
            const textToSearch = `${p.title || ''} ${p.description || ''} ${p.longDescription || ''}`.toLowerCase();
            const isQinShiHuang = 
              textToSearch.includes('qin shi huang') || 
              textToSearch.includes('秦始皇') || 
              textToSearch.includes('shinshikō') || 
              textToSearch.includes('shinshiko') || 
              textToSearch.includes('チンシーファン');
            return !isQinShiHuang;
          });
        }
      }
    } catch (error) {
      console.error('Failed to parse products from local storage:', error);
    }
    return initialProducts;
  });

  useEffect(() => {
    try {
      localStorage.setItem('pulse_products_v2', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to local storage. Quota may be exceeded.', e);
    }
  }, [products]);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, removeProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}

