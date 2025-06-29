import { useState, useEffect } from 'react';
import { PurchaseHistory, Product } from '../types';

export const usePurchaseHistory = () => {
  const [purchases, setPurchases] = useState<PurchaseHistory[]>(() => {
    // Load purchase history from localStorage if available
    const savedPurchases = localStorage.getItem('purchaseHistory');
    if (savedPurchases) {
      return JSON.parse(savedPurchases).map((purchase: any) => ({
        ...purchase,
        purchaseDate: new Date(purchase.purchaseDate),
        deliveryDate: purchase.deliveryDate ? new Date(purchase.deliveryDate) : undefined,
        estimatedDelivery: new Date(purchase.estimatedDelivery)
      }));
    }
    return [];
  });

  // Save purchase history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('purchaseHistory', JSON.stringify(purchases));
  }, [purchases]);

  const addPurchase = (
    product: Product, 
    orderNumber: string, 
    paymentMethod: 'upi' | 'card' | 'cod' | 'emi',
    emiDetails?: any
  ) => {
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

    const newPurchase: PurchaseHistory = {
      id: `purchase_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      orderNumber,
      product,
      purchaseDate: new Date(),
      totalAmount: Math.round(product.price * 1.18), // Including 18% GST
      paymentMethod,
      deliveryStatus: 'processing',
      estimatedDelivery,
      emiDetails,
      trackingNumber: `TRK${Date.now().toString().slice(-8)}`
    };

    setPurchases(prev => [newPurchase, ...prev]);
    console.log('Purchase added to history:', newPurchase);
    return newPurchase;
  };

  const updatePurchaseStatus = (id: string, status: PurchaseHistory['deliveryStatus']) => {
    setPurchases(prev => 
      prev.map(purchase => {
        if (purchase.id === id) {
          const updated = { ...purchase, deliveryStatus: status };
          if (status === 'delivered') {
            updated.deliveryDate = new Date();
          }
          return updated;
        }
        return purchase;
      })
    );
  };

  const addReview = (id: string, rating: number, review: string) => {
    setPurchases(prev => 
      prev.map(purchase => 
        purchase.id === id ? { ...purchase, rating, review } : purchase
      )
    );
  };

  const getRecentPurchases = (days: number = 30) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return purchases.filter(purchase => purchase.purchaseDate >= cutoffDate);
  };

  const getPurchasesByCategory = () => {
    const categoryStats = purchases.reduce((acc, purchase) => {
      const category = purchase.product.category;
      if (!acc[category]) {
        acc[category] = { count: 0, totalAmount: 0 };
      }
      acc[category].count++;
      acc[category].totalAmount += purchase.totalAmount;
      return acc;
    }, {} as Record<string, { count: number; totalAmount: number }>);

    return categoryStats;
  };

  const getTotalSpent = (days: number = 30) => {
    const recentPurchases = getRecentPurchases(days);
    return recentPurchases.reduce((total, purchase) => total + purchase.totalAmount, 0);
  };

  const getPurchaseAnalytics = () => {
    const recentPurchases = getRecentPurchases(30);
    const totalSpent = getTotalSpent(30);
    const avgOrderValue = recentPurchases.length > 0 ? totalSpent / recentPurchases.length : 0;
    const categoryStats = getPurchasesByCategory();
    
    // Calculate monthly trend
    const monthlySpending = recentPurchases.reduce((acc, purchase) => {
      const month = purchase.purchaseDate.toISOString().slice(0, 7); // YYYY-MM
      acc[month] = (acc[month] || 0) + purchase.totalAmount;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalOrders: recentPurchases.length,
      totalSpent,
      avgOrderValue,
      categoryStats,
      monthlySpending,
      deliveredOrders: recentPurchases.filter(p => p.deliveryStatus === 'delivered').length,
      pendingOrders: recentPurchases.filter(p => p.deliveryStatus !== 'delivered' && p.deliveryStatus !== 'cancelled').length
    };
  };

  return {
    purchases,
    addPurchase,
    updatePurchaseStatus,
    addReview,
    getRecentPurchases,
    getPurchasesByCategory,
    getTotalSpent,
    getPurchaseAnalytics
  };
};