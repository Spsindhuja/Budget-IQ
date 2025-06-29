import { useState, useEffect } from 'react';
import { BudgetWithLoans, LoanOption, EMIOption } from '../types';

export const useBudget = () => {
  const [budget, setBudget] = useState<BudgetWithLoans>(() => {
    // Load budget from localStorage if available
    const savedBudget = localStorage.getItem('budget');
    if (savedBudget) {
      const parsed = JSON.parse(savedBudget);
      return {
        ...parsed,
        activeEMIs: parsed.activeEMIs?.map((emi: any) => ({
          ...emi,
          startDate: new Date(emi.startDate),
          nextPaymentDate: new Date(emi.nextPaymentDate)
        })) || [],
        nextEMIPayments: parsed.nextEMIPayments ? {
          ...parsed.nextEMIPayments,
          dueDate: new Date(parsed.nextEMIPayments.dueDate),
          items: parsed.nextEMIPayments.items?.map((item: any) => ({
            ...item,
            startDate: new Date(item.startDate),
            nextPaymentDate: new Date(item.nextPaymentDate)
          })) || []
        } : { totalAmount: 0, dueDate: new Date(), items: [] }
      };
    }
    return {
      total: 5000, // Default budget
      spent: 0,
      remaining: 5000,
      period: 'monthly',
      currency: '₹',
      activeEMIs: [],
      nextEMIPayments: { totalAmount: 0, dueDate: new Date(), items: [] }
    };
  });

  // Save budget to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('budget', JSON.stringify(budget));
  }, [budget]);

  const updateBudget = (newTotal: number, period: 'weekly' | 'monthly') => {
    setBudget(prev => ({
      ...prev,
      total: newTotal,
      period,
      remaining: newTotal - prev.spent
    }));
  };

  const addExpense = (amount: number) => {
    setBudget(prev => {
      const newSpent = prev.spent + amount;
      const newRemaining = prev.total - newSpent;
      
      return {
        ...prev,
        spent: newSpent,
        remaining: newRemaining
      };
    });
  };

  const addLoan = (loan: LoanOption) => {
    setBudget(prev => ({
      ...prev,
      activeLoan: loan,
      total: prev.total + loan.amount,
      remaining: prev.remaining + loan.amount
    }));
  };

  const addEMI = (emi: EMIOption) => {
    setBudget(prev => {
      const newActiveEMIs = [...prev.activeEMIs, emi];
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      nextMonth.setDate(5); // EMI due on 5th of every month
      
      const totalEMIAmount = newActiveEMIs.reduce((sum, e) => sum + e.monthlyEMI, 0);
      
      return {
        ...prev,
        activeEMIs: newActiveEMIs,
        nextEMIPayments: {
          totalAmount: totalEMIAmount,
          dueDate: nextMonth,
          items: newActiveEMIs
        }
      };
    });
  };

  const processEMIPayments = () => {
    setBudget(prev => {
      const emiAmount = prev.nextEMIPayments.totalAmount;
      const newSpent = prev.spent + emiAmount;
      const newRemaining = prev.total - newSpent;
      
      // Update next payment date
      const nextMonth = new Date(prev.nextEMIPayments.dueDate);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      
      return {
        ...prev,
        spent: newSpent,
        remaining: newRemaining,
        nextEMIPayments: {
          ...prev.nextEMIPayments,
          dueDate: nextMonth
        }
      };
    });
  };

  const resetBudget = () => {
    setBudget(prev => ({
      ...prev,
      spent: 0,
      remaining: prev.total
    }));
  };

  const getBudgetStatus = (): 'safe' | 'moderate' | 'warning' | 'critical' | 'exceeded' => {
    if (budget.total === 0) return 'safe';
    
    const percentage = (budget.spent / budget.total) * 100;
    if (percentage > 100) return 'exceeded';
    if (percentage >= 90) return 'critical';
    if (percentage >= 75) return 'warning';
    if (percentage >= 50) return 'moderate';
    return 'safe';
  };

  const isBudgetExceeded = () => {
    return budget.spent >= budget.total;
  };

  const getAvailableLoanOptions = (): LoanOption[] => {
    const shortfallAmount = Math.max(0, budget.spent - budget.total);
    const recommendedAmount = Math.max(shortfallAmount, 10000); // Minimum loan amount
    
    return [
      {
        id: 'loan-1',
        provider: 'HDFC Bank Personal Loan',
        amount: recommendedAmount,
        interestRate: 10.5,
        tenure: 12,
        monthlyEMI: Math.round((recommendedAmount * (10.5/100/12) * Math.pow(1 + 10.5/100/12, 12)) / (Math.pow(1 + 10.5/100/12, 12) - 1)),
        totalAmount: Math.round(recommendedAmount * 1.126),
        processingFee: Math.round(recommendedAmount * 0.02),
        eligibility: 'eligible',
        approvalTime: '24 hours',
        features: ['No collateral required', 'Quick approval', 'Flexible tenure', 'Prepayment allowed']
      },
      {
        id: 'loan-2',
        provider: 'SBI Quick Personal Loan',
        amount: recommendedAmount,
        interestRate: 11.2,
        tenure: 24,
        monthlyEMI: Math.round((recommendedAmount * (11.2/100/12) * Math.pow(1 + 11.2/100/12, 24)) / (Math.pow(1 + 11.2/100/12, 24) - 1)),
        totalAmount: Math.round(recommendedAmount * 1.268),
        processingFee: Math.round(recommendedAmount * 0.015),
        eligibility: 'eligible',
        approvalTime: '48 hours',
        features: ['Lower processing fee', 'Longer tenure', 'Government bank', 'Digital process']
      },
      {
        id: 'loan-3',
        provider: 'Bajaj Finserv Instant Loan',
        amount: recommendedAmount,
        interestRate: 12.0,
        tenure: 18,
        monthlyEMI: Math.round((recommendedAmount * (12.0/100/12) * Math.pow(1 + 12.0/100/12, 18)) / (Math.pow(1 + 12.0/100/12, 18) - 1)),
        totalAmount: Math.round(recommendedAmount * 1.216),
        processingFee: Math.round(recommendedAmount * 0.025),
        eligibility: 'eligible',
        approvalTime: '2 hours',
        features: ['Instant approval', 'No documentation', 'Flexible EMI dates', 'Pre-approved offers']
      }
    ];
  };

  return {
    budget,
    updateBudget,
    addExpense,
    addLoan,
    addEMI,
    processEMIPayments,
    resetBudget,
    getBudgetStatus,
    isBudgetExceeded,
    getAvailableLoanOptions
  };
};