import React, { useState } from 'react';
import { X, CreditCard, Clock, CheckCircle, AlertCircle, Calculator, TrendingUp, Shield, Zap } from 'lucide-react';
import { LoanOption } from '../types';

interface LoanOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  loanOptions: LoanOption[];
  onSelectLoan: (loan: LoanOption) => void;
  shortfallAmount: number;
}

export const LoanOptionsModal: React.FC<LoanOptionsModalProps> = ({
  isOpen,
  onClose,
  loanOptions,
  onSelectLoan,
  shortfallAmount
}) => {
  const [selectedLoan, setSelectedLoan] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectLoan = (loan: LoanOption) => {
    onSelectLoan(loan);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Budget Exceeded - Loan Options</h2>
              <p className="text-sm text-gray-600">
                Shortfall: <span className="font-semibold text-red-600">₹{shortfallAmount.toLocaleString()}</span>
              </p>
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
          {/* Alert Message */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-amber-900 mb-1">Budget Limit Exceeded</h3>
                <p className="text-sm text-amber-800">
                  Your shopping total has exceeded your budget by ₹{shortfallAmount.toLocaleString()}. 
                  Consider these instant loan options to complete your purchase.
                </p>
              </div>
            </div>
          </div>

          {/* Loan Options */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Loan Options</h3>
            
            {loanOptions.map((loan, index) => (
              <div 
                key={loan.id} 
                className={`border rounded-xl p-6 transition-all cursor-pointer hover:shadow-lg ${
                  selectedLoan === loan.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                } ${index === 0 ? 'ring-2 ring-green-200 bg-green-50' : ''}`}
                onClick={() => setSelectedLoan(loan.id)}
              >
                {index === 0 && (
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      RECOMMENDED
                    </span>
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      BEST RATE
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{loan.provider}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>Approval: {loan.approvalTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-green-600 font-medium">{loan.eligibility}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">₹{loan.amount.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Loan Amount</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="text-lg font-bold text-gray-900">₹{loan.monthlyEMI.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Monthly EMI</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="text-lg font-bold text-gray-900">{loan.interestRate}%</div>
                    <div className="text-xs text-gray-500">Interest Rate</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="text-lg font-bold text-gray-900">{loan.tenure} months</div>
                    <div className="text-xs text-gray-500">Tenure</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="text-lg font-bold text-gray-900">₹{loan.processingFee.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Processing Fee</div>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Key Features:</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {loan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <span className="text-sm text-gray-500">Total Amount Payable: </span>
                    <span className="text-lg font-bold text-gray-900">₹{loan.totalAmount.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => handleSelectLoan(loan)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>Apply Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* EMI Calculator */}
          <div className="mt-8 bg-gray-50 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Calculator className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">EMI Impact on Your Budget</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Budget Increase</span>
                </div>
                <div className="text-xl font-bold text-green-600">
                  +₹{loanOptions[0]?.amount.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">One-time addition</div>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Monthly Deduction</span>
                </div>
                <div className="text-xl font-bold text-blue-600">
                  -₹{loanOptions[0]?.monthlyEMI.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">From next budget cycle</div>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">Credit Score Impact</span>
                </div>
                <div className="text-xl font-bold text-purple-600">Positive</div>
                <div className="text-xs text-gray-500">With timely payments</div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-900 mb-2">Important Information</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• EMI will be automatically deducted from your next budget cycle</li>
                  <li>• Interest rates are subject to bank approval and credit score</li>
                  <li>• Processing fees are one-time charges</li>
                  <li>• Early repayment options available with most lenders</li>
                  <li>• Your credit score will be checked for loan approval</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};