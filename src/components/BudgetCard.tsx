import React from 'react';
import { Wallet, TrendingUp, AlertTriangle, CheckCircle, CreditCard, Calendar, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { BudgetWithLoans } from '../types';

interface BudgetCardProps {
  budget: BudgetWithLoans;
  status: 'safe' | 'moderate' | 'warning' | 'critical' | 'exceeded';
  onLoanRequest?: () => void;
}

export const BudgetCard: React.FC<BudgetCardProps> = ({ budget, status, onLoanRequest }) => {
  const { t } = useLanguage();

  const getStatusColor = () => {
    switch (status) {
      case 'safe': return 'text-green-600 bg-green-50';
      case 'moderate': return 'text-blue-600 bg-blue-50';
      case 'warning': return 'text-amber-600 bg-amber-50';
      case 'critical': return 'text-red-600 bg-red-50';
      case 'exceeded': return 'text-red-600 bg-red-100';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'safe': return <CheckCircle className="h-5 w-5" />;
      case 'moderate': return <TrendingUp className="h-5 w-5" />;
      case 'warning': return <AlertTriangle className="h-5 w-5" />;
      case 'critical': return <AlertTriangle className="h-5 w-5" />;
      case 'exceeded': return <CreditCard className="h-5 w-5" />;
    }
  };

  const percentage = (budget.spent / budget.total) * 100;
  const isExceeded = status === 'exceeded';
  const shortfall = Math.max(0, budget.spent - budget.total);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Wallet className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{t('budget.title')}</h3>
            <p className="text-sm text-gray-500 capitalize">{budget.period} {t('budget.period')}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
          {getStatusIcon()}
          <span className="capitalize">{status}</span>
        </div>
      </div>

      {/* Budget Exceeded Alert */}
      {isExceeded && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-red-900 mb-1">{t('budget.exceeded')}</h4>
              <p className="text-sm text-red-800">
                {t('budget.exceededMessage')} {t('common.currency')}{shortfall.toLocaleString()}
              </p>
            </div>
            {onLoanRequest && (
              <button
                onClick={onLoanRequest}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                {t('budget.getLoanOptions')}
              </button>
            )}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">{t('budget.totalBudget')}</span>
          <span className="text-xl font-bold text-gray-900">{budget.currency}{budget.total.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">{t('budget.spent')}</span>
          <span className={`text-lg font-semibold ${isExceeded ? 'text-red-600' : 'text-red-600'}`}>
            {budget.currency}{budget.spent.toLocaleString()}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">{t('budget.remaining')}</span>
          <span className={`text-lg font-semibold ${budget.remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {budget.currency}{budget.remaining.toLocaleString()}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-300 ${
              percentage >= 100 ? 'bg-red-600' :
              percentage >= 90 ? 'bg-red-500' : 
              percentage >= 75 ? 'bg-amber-500' : 
              percentage >= 50 ? 'bg-blue-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
        
        <div className="text-center">
          <span className="text-sm text-gray-500">{percentage.toFixed(1)}% {t('budget.budgetUsed')}</span>
        </div>

        {/* Active Loan Info */}
        {budget.activeLoan && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CreditCard className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">{t('budget.activeLoan')}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-blue-700">{t('budget.amount')}: </span>
                <span className="font-semibold">{t('common.currency')}{budget.activeLoan.amount.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-blue-700">{t('budget.emi')}: </span>
                <span className="font-semibold">{t('common.currency')}{budget.activeLoan.monthlyEMI.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Active EMIs */}
        {budget.activeEMIs.length > 0 && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">{t('budget.activeEmis')} ({budget.activeEMIs.length})</span>
              </div>
              <span className="text-sm font-semibold text-purple-900">
                {t('common.currency')}{budget.nextEMIPayments.totalAmount.toLocaleString()}{t('common.perMonth')}
              </span>
            </div>
            
            {budget.nextEMIPayments.totalAmount > 0 && (
              <div className="flex items-center space-x-2 text-sm text-purple-700">
                <Clock className="h-3 w-3" />
                <span>
                  {t('budget.nextPayment')}: {budget.nextEMIPayments.dueDate.toLocaleDateString('en-IN', { 
                    day: 'numeric', 
                    month: 'short' 
                  })}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};