
import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { CategoryFilter } from './CategoryFilter';

interface ProductGridProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductSelect, categories, activeCategory, setActiveCategory }) => {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-emerald-900 mb-2">Our Collection</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">Discover a curated selection of plants and flowers, carefully chosen to bring nature's beauty into your space.</p>
      </div>
      
      <CategoryFilter 
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onSelect={() => onProductSelect(product)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-serif text-slate-700">No products found</h2>
          <p className="text-slate-500 mt-2">Try adjusting your search or category filter.</p>
        </div>
      )}
    </div>
  );
};
