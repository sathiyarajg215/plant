
import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { PlusIcon } from './Icons';

interface ProductCardProps {
  product: Product;
  onSelect: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer transform hover:-translate-y-2 transition-all duration-300"
      onClick={onSelect}
    >
      <div className="relative">
        <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
        <button 
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 bg-emerald-500 text-white w-12 h-12 rounded-full flex items-center justify-center
                     transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-emerald-600 shadow-lg"
        >
          <PlusIcon className="w-6 h-6"/>
        </button>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-serif font-bold text-slate-800 truncate">{product.name}</h3>
        <p className="text-slate-500 text-sm mt-1">{product.category}</p>
        <p className="text-xl font-bold text-emerald-700 mt-4">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};
