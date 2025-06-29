import React, { useState } from 'react';
import { X, CreditCard, Calendar, Calculator, TrendingDown, CheckCircle, Clock } from 'lucide-react';
import { Product, EMIOption } from '../types';

interface EMIOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSelectEMI: (emi: EMIOption) => void;
}

export const EMIOptionsModal: React.FC<EMIOptionsModalProps> = ({
  isOpen,
  onClose,
  product,
  onSelectEMI
}) => {
  const [selectedTenure, setSelectedTenure] = useState<number>(6);

  if (!isOpen || !product) return null;

  const calculateEMI = (principal: number, rate: number, tenure: number) => {
    const monthlyRate = rate / 100 / 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                 (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(emi);
  };

  const emiOptions = [
    {
      tenure: 3,
      interestRate: 0, // No cost EMI
      provider: 'No Cost EMI',
      downPayment: Math.round(product.price * 0.1) // 10% down payment
    },
    {
      tenure: 6,
      interestRate: 12,
      provider: 'HDFC Bank',
      downPayment: Math.round(product.price * 0.15) // 15% down payment
    },
    {
      tenure: 9,
      interestRate: 13.5,
      provider: 'SBI Cards',
      downPayment: Math.round(product.price * 0.2) // 20% down payment
    },
    {
      tenure: 12,
      interestRate: 15,
      provider: 'ICICI Bank',
      downPayment: Math.round(product.price * 0.25) // 25% down payment
    },
    {
      tenure: 18,
      interestRate: 16.5,
      provider: 'Bajaj Finserv',
      downPayment: Math.round(product.price * 0.3) // 30% down payment
    },
    {
      tenure: 24,
      interestRate: 18,
      provider: 'Kotak Bank',
      downPayment: Math.round(product.price * 0.35) // 35% down payment
    }
  ];

  const handleSelectEMI = (option: typeof emiOptions[0]) => {
    const principal = product.price - option.downPayment;
    const monthlyEMI = option.interestRate === 0 ? 
      Math.round(principal / option.tenure) : 
      calculateEMI(principal, option.interestRate, option.tenure);
    
    const totalAmount = monthlyEMI * option.tenure + option.downPayment;
    
    const startDate = new Date();
    const nextPaymentDate = new Date();
    nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
    nextPaymentDate.setDate(5); // EMI due on 5th of every month

    const emiOption: EMIOption = {
      id: `emi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      tenure: option.tenure,
      monthlyEMI,
      interestRate: option.interestRate,
      totalAmount,
      downPayment: option.downPayment,
      provider: option.provider,
      isActive: true,
      startDate,
      nextPaymentDate
    };

    onSelectEMI(emiOption);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-green-50 to-blue-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CreditCard className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">EMI Options</h2>
              <p className="text-sm text-gray-600">{product.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Product Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 flex items-center space-x-4">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{product.name}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                )}
              </div>
            </div>
          </div>

          {/* EMI Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Your EMI Plan</h3>
            
            {emiOptions.map((option, index) => {
              const principal = product.price - option.downPayment;
              const monthlyEMI = option.interestRate === 0 ? 
                Math.round(principal / option.tenure) : 
                calculateEMI(principal, option.interestRate, option.tenure);
              const totalAmount = monthlyEMI * option.tenure + option.downPayment;
              const totalInterest = totalAmount - product.price;

              return (
                <div 
                  key={index}
                  className={`border rounded-xl p-6 transition-all cursor-pointer hover:shadow-lg ${
                    index === 0 ? 'border-green-500 bg-green-50 ring-2 ring-green-200' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleSelectEMI(option)}
                >
                  {index === 0 && (
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        NO COST EMI
                      </span>
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        RECOMMENDED
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-3 border">
                      <div className="text-xl font-bold text-blue-600">₹{monthlyEMI.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Monthly EMI</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border">
                      <div className="text-xl font-bold text-gray-900">{option.tenure} months</div>
                      <div className="text-xs text-gray-500">Tenure</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border">
                      <div className="text-xl font-bold text-gray-900">
                        {option.interestRate === 0 ? 'FREE' : `${option.interestRate}%`}
                      </div>
                      <div className="text-xs text-gray-500">Interest Rate</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border">
                      <div className="text-xl font-bold text-gray-900">₹{option.downPayment.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Down Payment</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Provider: {option.provider}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">EMI starts next month</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Total Amount</div>
                      <div className="text-lg font-bold text-gray-900">₹{totalAmount.toLocaleString()}</div>
                    </div>
                  </div>

                  {totalInterest > 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center space-x-2">
                        <TrendingDown className="h-4 w-4 text-amber-600" />
                        <span className="text-sm text-amber-800">
                          Additional cost: ₹{totalInterest.toLocaleString()} over {option.tenure} months
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-600">
                        {option.interestRate === 0 ? 'No additional charges' : 'Instant approval available'}
                      </span>
                    </div>
                    <button
                      onClick={() => handleSelectEMI(option)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <CreditCard className="h-4 w-4" />
                      <span>Select EMI</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* EMI Benefits */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Calculator className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">EMI Benefits</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">No impact on credit score with timely payments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">Automatic deduction from your budget</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">Flexible prepayment options</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">Instant approval for eligible customers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">No hidden charges or fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">Easy online management</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};