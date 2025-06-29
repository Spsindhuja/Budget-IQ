export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'organic' | 'inorganic' | 'food' | 'general';
  platform: 'amazon' | 'flipkart' | 'local';
  rating: number;
  reviews: number;
  discount?: number;
  inStock: boolean;
  isNew?: boolean;
  isTrending?: boolean;
}

export interface BudgetInfo {
  total: number;
  spent: number;
  remaining: number;
  period: 'weekly' | 'monthly';
  currency: string;
}

export interface ShoppingListItem {
  id: string;
  productId?: string;
  name: string;
  estimatedPrice?: number;
  quantity: number;
  category: 'organic' | 'inorganic' | 'food' | 'general';
  addedDate: Date;
  source: 'text' | 'image' | 'chat' | 'voice';
  notes?: string;
  emiOption?: EMIOption;
}

export interface PurchaseHistory {
  id: string;
  orderNumber: string;
  product: Product;
  purchaseDate: Date;
  totalAmount: number;
  paymentMethod: 'upi' | 'card' | 'cod' | 'emi';
  deliveryStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  deliveryDate?: Date;
  estimatedDelivery: Date;
  emiDetails?: EMIOption;
  rating?: number;
  review?: string;
  invoiceUrl?: string;
  trackingNumber?: string;
}

export interface ApiConfig {
  amazonApiKey?: string;
  flipkartApiKey?: string;
  isConnected: boolean;
}

export interface DashboardStats {
  totalItems: number;
  avgSavings: number;
  topCategory: string;
  newItemsToday: number;
}

export interface LoanOption {
  id: string;
  provider: string;
  amount: number;
  interestRate: number;
  tenure: number; // in months
  monthlyEMI: number;
  totalAmount: number;
  processingFee: number;
  eligibility: 'eligible' | 'not-eligible' | 'pending';
  approvalTime: string;
  features: string[];
}

export interface EMIOption {
  id: string;
  productId: string;
  productName: string;
  productPrice: number;
  tenure: number; // in months
  monthlyEMI: number;
  interestRate: number;
  totalAmount: number;
  downPayment?: number;
  provider: string;
  isActive: boolean;
  startDate: Date;
  nextPaymentDate: Date;
}

export interface BudgetWithLoans extends BudgetInfo {
  activeLoan?: LoanOption;
  activeEMIs: EMIOption[];
  nextEMIPayments: {
    totalAmount: number;
    dueDate: Date;
    items: EMIOption[];
  };
}