import { useState, useEffect } from 'react';
import { Product, PurchaseHistory } from '../types';

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

export const usePurchaseAnalysis = (purchases: PurchaseHistory[]) => {
  const analyzePurchasePattern = (product: Product): PurchaseAnalysis => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
    
    // Get recent purchases (last 30 days)
    const recentPurchases = purchases.filter(p => p.purchaseDate >= thirtyDaysAgo);
    const previousMonthPurchases = purchases.filter(p => 
      p.purchaseDate >= sixtyDaysAgo && p.purchaseDate < thirtyDaysAgo
    );
    
    // Find similar items (same category or similar name keywords)
    const productKeywords = product.name.toLowerCase().split(' ').filter(word => word.length > 3);
    const similarItems = recentPurchases.filter(p => {
      const isSameCategory = p.product.category === product.category;
      const hasSimilarName = productKeywords.some(keyword => 
        p.product.name.toLowerCase().includes(keyword)
      );
      return isSameCategory || hasSimilarName;
    });
    
    const previousSimilarItems = previousMonthPurchases.filter(p => {
      const isSameCategory = p.product.category === product.category;
      const hasSimilarName = productKeywords.some(keyword => 
        p.product.name.toLowerCase().includes(keyword)
      );
      return isSameCategory || hasSimilarName;
    });
    
    // Calculate spending amounts
    const monthlySpentOnCategory = recentPurchases
      .filter(p => p.product.category === product.category)
      .reduce((sum, p) => sum + p.totalAmount, 0);
    
    const monthlySpentOnSimilarItems = similarItems
      .reduce((sum, p) => sum + p.totalAmount, 0);
    
    // Find last similar purchase
    const lastSimilarPurchase = similarItems
      .sort((a, b) => b.purchaseDate.getTime() - a.purchaseDate.getTime())[0];
    
    // Calculate average time between purchases
    const allSimilarPurchases = purchases.filter(p => {
      const isSameCategory = p.product.category === product.category;
      const hasSimilarName = productKeywords.some(keyword => 
        p.product.name.toLowerCase().includes(keyword)
      );
      return isSameCategory || hasSimilarName;
    }).sort((a, b) => a.purchaseDate.getTime() - b.purchaseDate.getTime());
    
    let averageTimeBetweenPurchases = 30; // Default to 30 days
    if (allSimilarPurchases.length > 1) {
      const timeDiffs = [];
      for (let i = 1; i < allSimilarPurchases.length; i++) {
        const diff = allSimilarPurchases[i].purchaseDate.getTime() - 
                    allSimilarPurchases[i-1].purchaseDate.getTime();
        timeDiffs.push(diff / (1000 * 60 * 60 * 24)); // Convert to days
      }
      averageTimeBetweenPurchases = Math.round(
        timeDiffs.reduce((sum, diff) => sum + diff, 0) / timeDiffs.length
      );
    }
    
    // Determine if this is excessive purchasing
    const isExcessivePurchasing = similarItems.length >= 3;
    
    // Calculate savings opportunity
    const savingsOpportunity = monthlySpentOnSimilarItems * 0.5; // 50% reduction potential
    
    // Determine spending trend
    let spendingTrend: 'increasing' | 'stable' | 'decreasing' = 'stable';
    if (similarItems.length > previousSimilarItems.length * 1.2) {
      spendingTrend = 'increasing';
    } else if (similarItems.length < previousSimilarItems.length * 0.8) {
      spendingTrend = 'decreasing';
    }
    
    // Generate motivational message
    const motivationalMessages = [
      `You've already spent ₹${monthlySpentOnSimilarItems.toLocaleString()} on similar items this month. Every rupee saved is a step towards financial freedom! 💪`,
      `Think twice before you buy twice! You've purchased ${similarItems.length} similar items recently. Your future self will thank you for saving today! 🌟`,
      `Small savings today lead to big achievements tomorrow. Consider if this purchase aligns with your financial goals! 🎯`,
      `You're in control of your spending! By being mindful of purchases like this, you're building wealth one decision at a time! 💎`,
      `Remember: The best purchase is sometimes the one you don't make. Your savings account will grow stronger! 🌱`,
      `Every time you resist an impulse purchase, you're investing in your future happiness and security! ✨`,
      `You've been shopping frequently in this category. Take a moment to appreciate what you already have! 🙏`,
      `Smart spenders think before they buy. You're already on the right track by seeing this analysis! 🧠`
    ];
    
    const motivationalMessage = motivationalMessages[
      Math.floor(Math.random() * motivationalMessages.length)
    ];
    
    return {
      similarItemCount: similarItems.length,
      monthlySpentOnCategory,
      monthlySpentOnSimilarItems,
      lastPurchaseDate: lastSimilarPurchase?.purchaseDate,
      averageTimeBetweenPurchases,
      isExcessivePurchasing,
      savingsOpportunity,
      motivationalMessage,
      spendingTrend
    };
  };
  
  return {
    analyzePurchasePattern
  };
};