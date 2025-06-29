import React from 'react';
import { Leaf, Package, Apple, Grid3X3 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface CategorySectionProps {
  title: string;
  category: 'organic' | 'inorganic' | 'food' | 'general';
  products: Product[];
  onAddToList: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ 
  title, 
  category, 
  products, 
  onAddToList,
  onBuyNow
}) => {
  const { t } = useLanguage();

  const getCategoryIcon = () => {
    switch (category) {
      case 'organic': return <Leaf className="h-6 w-6" />;
      case 'food': return <Apple className="h-6 w-6" />;
      case 'inorganic': return <Package className="h-6 w-6" />;
      case 'general': return <Grid3X3 className="h-6 w-6" />;
    }
  };

  const getCategoryColor = () => {
    switch (category) {
      case 'organic': return 'text-green-600 bg-green-50';
      case 'food': return 'text-orange-600 bg-orange-50';
      case 'inorganic': return 'text-gray-600 bg-gray-50';
      case 'general': return 'text-blue-600 bg-blue-50';
    }
  };

  return (
    <section className="mb-12">
      <div className="flex items-center space-x-3 mb-6">
        <div className={`p-3 rounded-xl ${getCategoryColor()}`}>
          {getCategoryIcon()}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600">{products.length} {t('categories.itemsAvailable')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToList={onAddToList}
            onBuyNow={onBuyNow}
          />
        ))}
      </div>
    </section>
  );
};