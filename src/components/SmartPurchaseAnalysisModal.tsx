import React from 'react';
import { X, AlertTriangle, TrendingUp, Target, Lightbulb, Heart, Coins, Calendar, BarChart3, Award } from 'lucide-react';
import { Product } from '../types';

interface PurchaseAnalysis {
  similarItemCount: number;
  monthlySpentOnCategory: number;
  monthlySpentOnSimilarItems: number;
  lastPurchaseDate?: Date;
  averageTimeBetweenPurchases: number;
  isExcessivePurchasing: boolean;
  savingsOpportunity: number;
  motivationalMessage: string;
  spendingTrend: 'increasing' | 'stable' | 'decreasing';
}

interface SmartPurchaseAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  analysis: PurchaseAnalysis;
  onProceedAnyway: () => void;
  onReconsider: () => void;
}

export const SmartPurchaseAnalysisModal: React.FC<SmartPurchaseAnalysisModalProps> = ({
  isOpen,
  onClose,
  product,
  analysis,
  onProceedAnyway,
  onReconsider
}) => {
  if (!isOpen) return null;

  const motivationalQuotes = [
    "💰 A penny saved is a penny earned - Benjamin Franklin",
    "🎯 The real measure of your wealth is how much you'd be worth if you lost all your money - Anonymous",
    "✨ It's not how much money you make, but how much money you keep - Robert Kiyosaki",
    "🌟 Save money and money will save you - Jamaica Proverb",
    "💎 The habit of saving is itself an education - T.T. Munger",
    "🚀 Don't save what is left after spending, spend what is left after saving - Warren Buffett",
    "🌈 Small amounts saved daily add up to big amounts annually - Anonymous",
    "⭐ The secret to getting ahead is getting started with saving - Mark Twain"
  ];

  const getRandomMotivationalQuote = () => {
    return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
  };

  const getTrendIcon = () => {
    switch (analysis.spendingTrend) {
      case 'increasing': return <TrendingUp className="h-5 w-5 text-red-600" />;
      case 'stable': return <BarChart3 className="h-5 w-5 text-yellow-600" />;
      case 'decreasing': return <TrendingUp className="h-5 w-5 text-green-600 transform rotate-180" />;
    }
  };

  const getTrendColor = () => {
    switch (analysis.spendingTrend) {
      case 'increasing': return 'text-red-600 bg-red-50';
      case 'stable': return 'text-yellow-600 bg-yellow-50';
      case 'decreasing': return 'text-green-600 bg-green-50';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[95vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Smart Purchase Analysis</h2>
              <p className="text-sm text-gray-600">Let's review your spending pattern for this item</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(95vh-120px)]">
          {/* Product Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-4">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <div className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</div>
                <div className="text-sm text-gray-600 capitalize">{product.category} • {product.platform}</div>
              </div>
            </div>
          </div>

          {/* Warning Alert */}
          {analysis.isExcessivePurchasing && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-6 w-6 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-red-900 mb-2">⚠️ Frequent Purchase Alert!</h3>
                  <p className="text-red-800 mb-3">
                    You've purchased similar items <strong>{analysis.similarItemCount} times</strong> this month. 
                    Is this purchase really necessary?
                  </p>
                  <div className="bg-red-100 rounded-lg p-4">
                    <h4 className="font-medium text-red-900 mb-2">🤔 Consider These Questions:</h4>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• Do you already have similar items at home?</li>
                      <li>• Can you wait a week before making this purchase?</li>
                      <li>• Is this a want or a genuine need?</li>
                      <li>• Could you find a better deal by waiting?</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Spending Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Monthly Spending Pattern</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Similar Items This Month</span>
                  <span className="text-xl font-bold text-blue-600">{analysis.similarItemCount}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Spent on {product.category}</span>
                  <span className="text-xl font-bold text-gray-900">₹{analysis.monthlySpentOnCategory.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Spent on Similar Items</span>
                  <span className="text-xl font-bold text-purple-600">₹{analysis.monthlySpentOnSimilarItems.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center pt-3 border-t">
                  <span className="text-gray-600">Spending Trend</span>
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getTrendColor()}`}>
                    {getTrendIcon()}
                    <span className="font-medium capitalize">{analysis.spendingTrend}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Savings Opportunity</h3>
              </div>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    ₹{analysis.savingsOpportunity.toLocaleString()}
                  </div>
                  <p className="text-sm text-green-800">
                    Potential monthly savings if you reduce similar purchases by 50%
                  </p>
                </div>
                
                <div className="bg-green-100 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-2">💡 Smart Saving Tips:</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Wait 24 hours before purchasing</li>
                    <li>• Create a wishlist instead of buying immediately</li>
                    <li>• Set a monthly budget for this category</li>
                    <li>• Look for bundle deals or bulk discounts</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Purchase Timeline */}
          {analysis.lastPurchaseDate && (
            <div className="bg-purple-50 rounded-lg p-6 mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Purchase Timeline</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.floor((Date.now() - analysis.lastPurchaseDate.getTime()) / (1000 * 60 * 60 * 24))}
                  </div>
                  <div className="text-sm text-purple-800">Days since last similar purchase</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{analysis.averageTimeBetweenPurchases}</div>
                  <div className="text-sm text-purple-800">Average days between purchases</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {analysis.similarItemCount > 3 ? '🔥' : analysis.similarItemCount > 1 ? '⚠️' : '✅'}
                  </div>
                  <div className="text-sm text-purple-800">
                    {analysis.similarItemCount > 3 ? 'High frequency' : 
                     analysis.similarItemCount > 1 ? 'Moderate frequency' : 'Normal frequency'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Motivational Section */}
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <Heart className="h-6 w-6 text-pink-600" />
              <h3 className="text-lg font-semibold text-gray-900">💪 Motivation to Save</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border-l-4 border-pink-500">
                <p className="text-gray-800 font-medium mb-2">{analysis.motivationalMessage}</p>
                <p className="text-sm text-pink-700 italic">{getRandomMotivationalQuote()}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Coins className="h-5 w-5 text-yellow-600" />
                    <h4 className="font-medium text-gray-900">What You Could Save</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    By skipping this purchase, you could save ₹{product.price.toLocaleString()} towards your financial goals!
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="h-5 w-5 text-blue-600" />
                    <h4 className="font-medium text-gray-900">Future You Will Thank You</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Every rupee saved today is an investment in your future financial freedom and peace of mind.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Alternative Suggestions */}
          <div className="bg-yellow-50 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <Lightbulb className="h-6 w-6 text-yellow-600" />
              <h3 className="text-lg font-semibold text-gray-900">💡 Smart Alternatives</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">🕐 Wait & Watch</h4>
                <p className="text-sm text-gray-600">
                  Add to wishlist and wait 7 days. Often, the urge to buy fades, and you realize you didn't need it.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">🔍 Compare & Research</h4>
                <p className="text-sm text-gray-600">
                  Research alternatives, read reviews, and compare prices. You might find better deals or realize you don't need it.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">💰 Set a Savings Goal</h4>
                <p className="text-sm text-gray-600">
                  Instead of buying, save this amount towards a bigger goal like vacation, emergency fund, or investment.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">🎯 Use What You Have</h4>
                <p className="text-sm text-gray-600">
                  Check if you already have similar items at home that can serve the same purpose.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onReconsider}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center space-x-2 shadow-lg"
            >
              <Heart className="h-5 w-5" />
              <span>💚 I'll Reconsider & Save Money</span>
            </button>
            
            <button
              onClick={onProceedAnyway}
              className="flex-1 bg-gray-600 text-white py-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
            >
              <AlertTriangle className="h-5 w-5" />
              <span>I Really Need This Item</span>
            </button>
          </div>

          {/* Savings Challenge */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">🏆 30-Day Savings Challenge</h3>
              <p className="text-sm text-gray-600 mb-4">
                Skip unnecessary purchases for 30 days and see how much you can save!
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">₹{(analysis.savingsOpportunity * 2).toLocaleString()}</div>
                  <div className="text-blue-800">Potential 30-day savings</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">🎯</div>
                  <div className="text-green-800">Your savings goal</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-600">🏆</div>
                  <div className="text-purple-800">Achievement unlocked</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};