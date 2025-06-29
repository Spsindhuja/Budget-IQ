import React from 'react';
import { Sparkles, ShoppingBag, TrendingUp, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroBannerProps {
  onExploreClick: () => void;
  onViewDeals: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreClick, onViewDeals }) => {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden rounded-3xl mb-12">
      {/* Background with botanical pattern inspired by Mamaearth */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-green-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-emerald-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-teal-400 rounded-full blur-2xl"></div>
        </div>
        
        {/* Botanical pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="leaves" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M10,2 Q15,10 10,18 Q5,10 10,2" fill="currentColor" opacity="0.3"/>
                <path d="M2,10 Q10,5 18,10 Q10,15 2,10" fill="currentColor" opacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#leaves)" className="text-green-300"/>
          </svg>
        </div>
      </div>

      <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-20">
        <div className="max-w-4xl">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-white/90 text-sm font-medium tracking-wide uppercase">
              {t('hero.smartShopping')}
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {t('hero.title')}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-200">
              {t('hero.subtitle')}
            </span>
          </h1>

          <p className="text-xl text-green-100 mb-8 max-w-2xl leading-relaxed">
            {t('hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center px-8 py-4 bg-white text-green-800 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              {t('hero.startShopping')}
            </button>
            
            <button 
              onClick={onViewDeals}
              className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              {t('hero.viewDeals')}
            </button>
          </div>

          <div className="flex items-center space-x-8 text-white/80">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm">{t('hero.categories')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm">{t('hero.aiPowered')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5" />
              <span className="text-sm">{t('hero.smartBudget')}</span>
            </div>
          </div>
        </div>

        {/* Product showcase inspired by Mamaearth design */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
          <div className="relative">
            <div className="w-64 h-80 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-full h-32 bg-gradient-to-br from-green-200 to-emerald-300 rounded-xl mb-4 flex items-center justify-center">
                <Sparkles className="h-12 w-12 text-green-700" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Featured Product</h3>
              <p className="text-green-100 text-sm mb-4">Premium quality items with amazing deals & EMI options</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-white">₹299</span>
                <button className="px-4 py-2 bg-white text-green-800 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};