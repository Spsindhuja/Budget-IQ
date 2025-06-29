import React from 'react';
import { CheckCircle, Package, Truck, Calendar, Star, Gift } from 'lucide-react';
import { Product } from '../types';

interface PurchaseSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  orderNumber: string;
}

export const PurchaseSuccessModal: React.FC<PurchaseSuccessModalProps> = ({
  isOpen,
  onClose,
  product,
  orderNumber
}) => {
  if (!isOpen || !product) return null;

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-lg w-full p-8 text-center">
        {/* Success Animation */}
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully! 🎉</h2>
          <p className="text-gray-600">Thank you for your purchase. Your order is being processed.</p>
        </div>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
          <div className="flex items-center space-x-3 mb-4">
            <Package className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Order Details</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Number</span>
              <span className="font-mono font-semibold text-blue-600">{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Product</span>
              <span className="font-semibold text-right max-w-48 truncate">{product.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount Paid</span>
              <span className="font-semibold text-green-600">₹{Math.round(product.price * 1.18).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-semibold">UPI Payment</span>
            </div>
          </div>
        </div>

        {/* Delivery Timeline */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6 text-left">
          <div className="flex items-center space-x-3 mb-4">
            <Truck className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Delivery Information</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Order Confirmed</span>
              <span className="text-xs text-green-600 font-medium">✓ Done</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Processing</span>
              <span className="text-xs text-yellow-600 font-medium">In Progress</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <span className="text-sm text-gray-600">Shipped</span>
              <span className="text-xs text-gray-500">Pending</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <span className="text-sm text-gray-600">Delivered</span>
              <span className="text-xs text-gray-500">
                Expected: {estimatedDelivery.toLocaleDateString('en-IN', { 
                  day: 'numeric', 
                  month: 'long' 
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Special Offers */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Gift className="h-5 w-5 text-purple-600" />
            <h4 className="font-semibold text-purple-900">Special Offer!</h4>
          </div>
          <p className="text-sm text-purple-800 mb-3">
            Get 10% off on your next purchase. Use code: <span className="font-mono font-bold">NEXT10</span>
          </p>
          <div className="flex items-center justify-center space-x-4 text-xs text-purple-700">
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3" />
              <span>Rate this product</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>Valid till next month</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
          
          <div className="flex space-x-3">
            <button className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              Track Order
            </button>
            <button className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              Download Invoice
            </button>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Need help? Contact our support team at{' '}
            <span className="text-blue-600 font-medium">support@budgetiq.com</span> or call{' '}
            <span className="text-blue-600 font-medium">1800-123-4567</span>
          </p>
        </div>
      </div>
    </div>
  );
};