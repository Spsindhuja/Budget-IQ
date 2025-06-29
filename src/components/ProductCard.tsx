import React, { useState } from 'react';
import { Star, ShoppingCart, TrendingUp, Sparkles, Check, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToList: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToList, onBuyNow }) => {
  const { t } = useLanguage();
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  const getPlatformColor = () => {
    switch (product.platform) {
      case 'amazon': return 'bg-orange-100 text-orange-800';
      case 'flipkart': return 'bg-blue-100 text-blue-800';
      case 'local': return 'bg-green-100 text-green-800';
    }
  };

  const handleAddToList = async () => {
    if (!product.inStock || isAdding) return;
    
    setIsAdding(true);
    
    try {
      await onAddToList(product);
      setIsAdded(true);
      
      // Reset the "added" state after 2 seconds
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    } catch (error) {
      console.error('Error adding product to list:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = async () => {
    if (!product.inStock || isBuying || !onBuyNow) return;
    
    setIsBuying(true);
    
    try {
      await onBuyNow(product);
    } catch (error) {
      console.error('Error buying product:', error);
    } finally {
      setIsBuying(false);
    }
  };

  // Get translated product name using the product ID
  const getTranslatedProductName = () => {
    const translatedName = t(`product.${product.id}`);
    // If translation exists and is different from the key, use it; otherwise use original name
    return translatedName !== `product.${product.id}` ? translatedName : product.name;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={product.image} 
          alt={getTranslatedProductName()}
          className="w-full h-48 object-cover"
          onError={(e) => {
            // Fallback image if the original fails to load
            (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=400';
          }}
        />
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {product.isNew && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              <Sparkles className="h-3 w-3 mr-1" />
              {t('product.new')}
            </span>
          )}
          {product.isTrending && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              <TrendingUp className="h-3 w-3 mr-1" />
              {t('product.trending')}
            </span>
          )}
        </div>
        {product.discount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
            {product.discount}% {t('product.off')}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getPlatformColor()}`}>
            {product.platform}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full capitalize font-medium ${
            product.category === 'organic' ? 'bg-green-100 text-green-800' :
            product.category === 'food' ? 'bg-orange-100 text-orange-800' :
            product.category === 'inorganic' ? 'bg-gray-100 text-gray-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {product.category}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
          {getTranslatedProductName()}
        </h3>
        
        <div className="flex items-center space-x-1 mb-3">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium text-gray-700">{product.rating}</span>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">{t('common.currency')}{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">{t('common.currency')}{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
            {product.inStock ? t('product.inStock') : t('product.outOfStock')}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {/* Buy Now Button */}
          <button
            onClick={handleBuyNow}
            disabled={!product.inStock || isBuying}
            className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
              product.inStock && !isBuying
                ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white hover:scale-105 transform shadow-lg'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isBuying ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>{t('product.processing')}</span>
              </>
            ) : (
              <>
                <Zap className="h-4 w-4" />
                <span>{t('product.buyNow')}</span>
              </>
            )}
          </button>

          {/* Add to List Button */}
          <button
            onClick={handleAddToList}
            disabled={!product.inStock || isAdding}
            className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
              isAdded
                ? 'bg-green-600 text-white'
                : product.inStock && !isAdding
                ? 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 transform'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isAdding ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>{t('product.adding')}</span>
              </>
            ) : isAdded ? (
              <>
                <Check className="h-4 w-4" />
                <span>{t('product.added')}</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                <span>{t('product.addToList')}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};