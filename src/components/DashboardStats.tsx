import React from 'react';
import { TrendingUp, Package, Star, Clock, Search, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { DashboardStats as StatsType } from '../types';

interface DashboardStatsProps {
  stats: StatsType;
  onCategoryClick?: (category: string) => void;
  onStatsClick?: (type: 'total' | 'savings' | 'new') => void;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ 
  stats, 
  onCategoryClick, 
  onStatsClick 
}) => {
  const { t } = useLanguage();

  const statCards = [
    {
      title: t('stats.totalItems'),
      value: stats.totalItems,
      icon: Package,
      color: 'bg-blue-500',
      clickable: true,
      type: 'total' as const,
      description: t('stats.browseAll'),
      onClick: () => onStatsClick?.('total')
    },
    {
      title: t('stats.avgSavings'),
      value: `${stats.avgSavings}%`,
      icon: TrendingUp,
      color: 'bg-green-500',
      clickable: true,
      type: 'savings' as const,
      description: t('stats.viewDiscounted'),
      onClick: () => onStatsClick?.('savings')
    },
    {
      title: t('stats.topCategory'),
      value: stats.topCategory,
      icon: Star,
      color: 'bg-purple-500',
      clickable: true,
      type: 'category' as const,
      description: t('stats.filterByCategory'),
      onClick: () => onCategoryClick?.(stats.topCategory)
    },
    {
      title: t('stats.newToday'),
      value: stats.newItemsToday,
      icon: Clock,
      color: 'bg-orange-500',
      clickable: true,
      type: 'new' as const,
      description: t('stats.seeLatest'),
      onClick: () => onStatsClick?.('new')
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <div 
          key={index} 
          className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-300 ${
            stat.clickable 
              ? 'hover:shadow-lg hover:scale-105 cursor-pointer transform hover:border-blue-200' 
              : 'hover:shadow-md'
          }`}
          onClick={stat.onClick}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg text-white ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            {stat.clickable && (
              <div className="p-2 rounded-lg bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
            <p className="text-2xl font-bold text-gray-900 capitalize">{stat.value}</p>
            
            {stat.clickable && (
              <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-gray-100">
                <Filter className="h-3 w-3 text-blue-600" />
                <span className="text-xs text-blue-600 font-medium">{stat.description}</span>
              </div>
            )}
          </div>

          {stat.clickable && (
            <div className="absolute inset-0 bg-blue-50 opacity-0 hover:opacity-10 rounded-xl transition-opacity pointer-events-none"></div>
          )}
        </div>
      ))}
    </div>
  );
};