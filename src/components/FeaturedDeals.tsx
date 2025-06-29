import React from 'react';
import { Clock, Star, TrendingUp, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface FeaturedDealsProps {
  products: Product[];
  onAddToList: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

export const FeaturedDeals: React.FC<FeaturedDealsProps> = ({ products, onAddToList, onBuyNow }) => {
  const { t } = useLanguage();
  const dealProducts = products.filter(p => p.discount && p.discount > 20);
  
  if (dealProducts.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl text-white">
            <Zap className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">⚡ {t('deals.flashDeals')}</h2>
            <p className="text-gray-600">{t('deals.limitedTime')}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 bg-red-50 px-4 py-2 rounded-full">
          <Clock className="h-4 w-4 text-red-600" />
          <span className="text-red-600 font-medium text-sm">{t('deals.endsIn')}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dealProducts.slice(0, 8).map((product) => (
          <div key={product.id} className="relative">
            <ProductCard 
              product={product} 
              onAddToList={onAddToList}
              onBuyNow={onBuyNow}
            />
            <div className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
              {t('deals.hotDeal')}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};