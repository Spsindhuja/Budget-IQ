import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, Truck, Shield, Clock, Star, Package } from 'lucide-react';
import { Product } from '../types';

interface PurchaseConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  purchaseMethod: 'direct' | 'emi';
  onConfirmPurchase: () => void;
}

export const PurchaseConfirmationModal: React.FC<PurchaseConfirmationModalProps> = ({
  isOpen,
  onClose,
  product,
  purchaseMethod,
  onConfirmPurchase
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !product) return null;

  const handleConfirmPurchase = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onConfirmPurchase();
    setIsProcessing(false);
    onClose();
  };

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-green-50 to-blue-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Confirm Purchase</h2>
              <p className="text-sm text-gray-600">
                {purchaseMethod === 'emi' ? 'EMI Purchase' : 'Direct Purchase'}
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
          {/* Product Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex items-start space-x-4">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                <div className="flex items-center space-x-1 mb-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{product.rating} ({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                  )}
                  {product.discount && (
                    <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full font-medium">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Purchase Summary */}
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Purchase Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Item Price</span>
                <span className="font-semibold">₹{product.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Charges</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (GST)</span>
                <span className="font-semibold">₹{Math.round(product.price * 0.18).toLocaleString()}</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="text-lg font-bold text-gray-900">Total Amount</span>
                <span className="text-xl font-bold text-blue-600">
                  ₹{Math.round(product.price * 1.18).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery & Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Truck className="h-5 w-5 text-blue-600" />
                <h5 className="font-semibold text-gray-900">Delivery Info</h5>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div>Expected: {estimatedDelivery.toLocaleDateString('en-IN', { 
                  day: 'numeric', 
                  month: 'long' 
                })}</div>
                <div>Free delivery on orders above ₹500</div>
                <div>Cash on Delivery available</div>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Shield className="h-5 w-5 text-green-600" />
                <h5 className="font-semibold text-gray-900">Purchase Protection</h5>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div>7-day return policy</div>
                <div>1-year warranty included</div>
                <div>Secure payment gateway</div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <CreditCard className="h-6 w-6 text-purple-600" />
              <h4 className="text-lg font-semibold text-gray-900">Payment Method</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border-2 border-purple-200">
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">UPI Payment</div>
                  <div className="text-sm text-gray-600">Instant & Secure</div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">Credit/Debit Card</div>
                  <div className="text-sm text-gray-600">All major cards</div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">Cash on Delivery</div>
                  <div className="text-sm text-gray-600">Pay when delivered</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmPurchase}
              disabled={isProcessing}
              className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5" />
                  <span>Confirm & Pay ₹{Math.round(product.price * 1.18).toLocaleString()}</span>
                </>
              )}
            </button>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-gray-600 mt-0.5" />
              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-1">Secure Transaction</h5>
                <p className="text-xs text-gray-600">
                  Your payment information is encrypted and secure. We never store your card details.
                  This transaction is protected by 256-bit SSL encryption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};