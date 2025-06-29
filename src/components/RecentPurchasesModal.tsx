import React, { useState } from 'react';
import { 
  X, Package, Calendar, Star, Truck, CreditCard, 
  TrendingUp, BarChart3, Filter, Search, Download,
  Clock, CheckCircle, AlertCircle, XCircle, Eye,
  ShoppingBag, Zap, Gift, RefreshCw
} from 'lucide-react';
import { PurchaseHistory } from '../types';

interface RecentPurchasesModalProps {
  isOpen: boolean;
  onClose: () => void;
  purchases: PurchaseHistory[];
  analytics: {
    totalOrders: number;
    totalSpent: number;
    avgOrderValue: number;
    categoryStats: Record<string, { count: number; totalAmount: number }>;
    monthlySpending: Record<string, number>;
    deliveredOrders: number;
    pendingOrders: number;
  };
  onUpdateStatus: (id: string, status: PurchaseHistory['deliveryStatus']) => void;
  onAddReview: (id: string, rating: number, review: string) => void;
}

export const RecentPurchasesModal: React.FC<RecentPurchasesModalProps> = ({
  isOpen,
  onClose,
  purchases,
  analytics,
  onUpdateStatus,
  onAddReview
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'analytics'>('overview');
  const [filterStatus, setFilterStatus] = useState<'all' | 'processing' | 'shipped' | 'delivered' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<PurchaseHistory | null>(null);

  if (!isOpen) return null;

  const filteredPurchases = purchases.filter(purchase => {
    const matchesStatus = filterStatus === 'all' || purchase.deliveryStatus === filterStatus;
    const matchesSearch = purchase.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         purchase.orderNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusIcon = (status: PurchaseHistory['deliveryStatus']) => {
    switch (status) {
      case 'processing': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'shipped': return <Truck className="h-4 w-4 text-blue-600" />;
      case 'delivered': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'cancelled': return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusColor = (status: PurchaseHistory['deliveryStatus']) => {
    switch (status) {
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[95vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Recent Purchases</h2>
              <p className="text-sm text-gray-600">Last 30 days purchase history & analytics</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 px-6 pt-4 border-b">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-1 text-sm font-medium transition-colors ${
              activeTab === 'overview' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-1 text-sm font-medium transition-colors ${
              activeTab === 'orders' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Order History ({purchases.length})
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`pb-3 px-1 text-sm font-medium transition-colors ${
              activeTab === 'analytics' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Analytics
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(95vh-180px)]">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <ShoppingBag className="h-8 w-8 text-blue-600" />
                    <span className="text-2xl font-bold text-blue-900">{analytics.totalOrders}</span>
                  </div>
                  <h3 className="text-sm font-medium text-blue-800">Total Orders</h3>
                  <p className="text-xs text-blue-600">Last 30 days</p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                    <span className="text-2xl font-bold text-green-900">₹{analytics.totalSpent.toLocaleString()}</span>
                  </div>
                  <h3 className="text-sm font-medium text-green-800">Total Spent</h3>
                  <p className="text-xs text-green-600">Including taxes</p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <BarChart3 className="h-8 w-8 text-purple-600" />
                    <span className="text-2xl font-bold text-purple-900">₹{Math.round(analytics.avgOrderValue).toLocaleString()}</span>
                  </div>
                  <h3 className="text-sm font-medium text-purple-800">Avg Order Value</h3>
                  <p className="text-xs text-purple-600">Per transaction</p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <CheckCircle className="h-8 w-8 text-orange-600" />
                    <span className="text-2xl font-bold text-orange-900">{analytics.deliveredOrders}</span>
                  </div>
                  <h3 className="text-sm font-medium text-orange-800">Delivered</h3>
                  <p className="text-xs text-orange-600">{analytics.pendingOrders} pending</p>
                </div>
              </div>

              {/* Recent Orders Preview */}
              <div className="bg-white border rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-4">
                  {purchases.slice(0, 3).map((purchase) => (
                    <div key={purchase.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <img 
                        src={purchase.product.image} 
                        alt={purchase.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{purchase.product.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Order: {purchase.orderNumber}</span>
                          <span>{formatDate(purchase.purchaseDate)}</span>
                          <span>₹{purchase.totalAmount.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(purchase.deliveryStatus)}`}>
                        {getStatusIcon(purchase.deliveryStatus)}
                        <span className="capitalize">{purchase.deliveryStatus}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="bg-white border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Category Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(analytics.categoryStats).map(([category, stats]) => (
                    <div key={category} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 capitalize">{category}</span>
                        <span className="text-lg font-bold text-gray-900">{stats.count}</span>
                      </div>
                      <div className="text-sm text-gray-600">₹{stats.totalAmount.toLocaleString()} spent</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Orders List */}
              <div className="space-y-4">
                {filteredPurchases.map((purchase) => (
                  <div key={purchase.id} className="bg-white border rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={purchase.product.image} 
                        alt={purchase.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-1">{purchase.product.name}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="font-mono">#{purchase.orderNumber}</span>
                              <span>{formatDate(purchase.purchaseDate)}</span>
                              <span className="capitalize">{purchase.paymentMethod} Payment</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-gray-900">₹{purchase.totalAmount.toLocaleString()}</div>
                            <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(purchase.deliveryStatus)}`}>
                              {getStatusIcon(purchase.deliveryStatus)}
                              <span className="capitalize">{purchase.deliveryStatus}</span>
                            </div>
                          </div>
                        </div>

                        {/* Order Progress */}
                        <div className="mb-4">
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600">
                                {purchase.deliveryStatus === 'delivered' && purchase.deliveryDate
                                  ? `Delivered on ${formatDate(purchase.deliveryDate)}`
                                  : `Expected: ${formatDate(purchase.estimatedDelivery)}`
                                }
                              </span>
                            </div>
                            {purchase.trackingNumber && (
                              <div className="flex items-center space-x-2">
                                <Truck className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-600">Tracking: {purchase.trackingNumber}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => setSelectedOrder(purchase)}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            <Eye className="h-4 w-4" />
                            <span>View Details</span>
                          </button>
                          
                          {purchase.deliveryStatus !== 'delivered' && purchase.deliveryStatus !== 'cancelled' && (
                            <button
                              onClick={() => onUpdateStatus(purchase.id, 'delivered')}
                              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                            >
                              <CheckCircle className="h-4 w-4" />
                              <span>Mark Delivered</span>
                            </button>
                          )}
                          
                          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                            <Download className="h-4 w-4" />
                            <span>Invoice</span>
                          </button>

                          {purchase.deliveryStatus === 'delivered' && !purchase.rating && (
                            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                              <Star className="h-4 w-4" />
                              <span>Rate Product</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredPurchases.length === 0 && (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Spending Trend */}
              <div className="bg-white border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Spending Trend</h3>
                <div className="space-y-4">
                  {Object.entries(analytics.monthlySpending).map(([month, amount]) => {
                    const maxAmount = Math.max(...Object.values(analytics.monthlySpending));
                    const barWidth = (amount / maxAmount) * 100;
                    
                    return (
                      <div key={month} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">
                            {new Date(month + '-01').toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                          </span>
                          <span className="text-sm font-bold text-gray-900">₹{amount.toLocaleString()}</span>
                        </div>
                        <div className="bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
                            style={{ width: `${barWidth}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Categories</h3>
                  <div className="space-y-4">
                    {Object.entries(analytics.categoryStats)
                      .sort(([,a], [,b]) => b.totalAmount - a.totalAmount)
                      .map(([category, stats]) => (
                        <div key={category} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900 capitalize">{category}</div>
                            <div className="text-sm text-gray-500">{stats.count} orders</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-900">₹{stats.totalAmount.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">
                              {((stats.totalAmount / analytics.totalSpent) * 100).toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="bg-white border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Status Distribution</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">Delivered</span>
                      </div>
                      <span className="font-bold text-green-600">{analytics.deliveredOrders}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-yellow-600" />
                        <span className="text-gray-700">Pending</span>
                      </div>
                      <span className="font-bold text-yellow-600">{analytics.pendingOrders}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="h-4 w-4 text-blue-600" />
                        <span className="text-gray-700">Success Rate</span>
                      </div>
                      <span className="font-bold text-blue-600">
                        {analytics.totalOrders > 0 ? ((analytics.deliveredOrders / analytics.totalOrders) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Insights */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Zap className="h-6 w-6 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Shopping Insights</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Most Purchased Category</h4>
                    <p className="text-sm text-gray-600">
                      {Object.entries(analytics.categoryStats).length > 0 
                        ? Object.entries(analytics.categoryStats)
                            .sort(([,a], [,b]) => b.count - a.count)[0][0]
                        : 'No data'
                      } - Your favorite shopping category
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Shopping Frequency</h4>
                    <p className="text-sm text-gray-600">
                      {analytics.totalOrders > 0 
                        ? `${(analytics.totalOrders / 30 * 7).toFixed(1)} orders per week`
                        : 'No orders yet'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-60">
            <div className="bg-white rounded-xl max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Order Details</h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <img 
                    src={selectedOrder.product.image} 
                    alt={selectedOrder.product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900">{selectedOrder.product.name}</h4>
                    <div className="text-2xl font-bold text-gray-900 mt-2">₹{selectedOrder.totalAmount.toLocaleString()}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Order Number</label>
                    <div className="font-mono text-gray-900">{selectedOrder.orderNumber}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Purchase Date</label>
                    <div className="text-gray-900">{formatDate(selectedOrder.purchaseDate)}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Payment Method</label>
                    <div className="text-gray-900 capitalize">{selectedOrder.paymentMethod}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.deliveryStatus)}`}>
                      {getStatusIcon(selectedOrder.deliveryStatus)}
                      <span className="capitalize">{selectedOrder.deliveryStatus}</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Download Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};