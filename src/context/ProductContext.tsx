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
      const saved = localStorage.getItem('pulse_products');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to parse products from local storage:', error);
    }
    return initialProducts;
  });

  useEffect(() => {
    try {
      localStorage.setItem('pulse_products', JSON.stringify(products));
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

