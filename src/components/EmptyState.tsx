import React from 'react';
import { Package, Wifi, Settings, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface EmptyStateProps {
  type: 'no-connection' | 'no-products' | 'no-search-results' | 'api-error';
  onAction?: () => void;
  actionLabel?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ type, onAction, actionLabel }) => {
  const { t } = useLanguage();

  const getEmptyStateContent = () => {
    switch (type) {
      case 'no-connection':
        return {
          icon: <Wifi className="h-16 w-16 text-gray-400" />,
          title: t('empty.noConnection'),
          description: t('empty.noConnectionDesc'),
          actionText: actionLabel || t('empty.configureApis')
        };
      case 'no-products':
        return {
          icon: <Package className="h-16 w-16 text-gray-400" />,
          title: t('empty.noProducts'),
          description: t('empty.noProductsDesc'),
          actionText: actionLabel || t('empty.refreshData')
        };
      case 'no-search-results':
        return {
          icon: <Package className="h-16 w-16 text-gray-400" />,
          title: t('empty.noResults'),
          description: t('empty.noResultsDesc'),
          actionText: actionLabel || t('empty.clearSearch')
        };
      case 'api-error':
        return {
          icon: <AlertCircle className="h-16 w-16 text-red-400" />,
          title: t('empty.apiError'),
          description: t('empty.apiErrorDesc'),
          actionText: actionLabel || t('empty.checkApiConfig')
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          {content.icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {content.title}
        </h3>
        <p className="text-gray-600 mb-6">
          {content.description}
        </p>
        {onAction && (
          <button
            onClick={onAction}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span>{content.actionText}</span>
          </button>
        )}
      </div>
    </div>
  );
};