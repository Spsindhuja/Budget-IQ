import React, { useState, useEffect } from 'react';
import { ShoppingBag, Settings, List, TrendingUp, Zap, Wifi, History } from 'lucide-react';
import { BudgetCard } from './components/BudgetCard';
import { ProductCard } from './components/ProductCard';
import { SearchBar } from './components/SearchBar';
import { CategorySection } from './components/CategorySection';
import { CategoryGrid } from './components/CategoryGrid';
import { HeroBanner } from './components/HeroBanner';
import { FeaturedDeals } from './components/FeaturedDeals';
import { ShoppingListModal } from './components/ShoppingListModal';
import { BudgetSetupModal } from './components/BudgetSetupModal';
import { ApiConfigModal } from './components/ApiConfigModal';
import { LoanOptionsModal } from './components/LoanOptionsModal';
import { EMIOptionsModal } from './components/EMIOptionsModal';
import { PurchaseConfirmationModal } from './components/PurchaseConfirmationModal';
import { PurchaseSuccessModal } from './components/PurchaseSuccessModal';
import { RecentPurchasesModal } from './components/RecentPurchasesModal';
import { SmartPurchaseAnalysisModal } from './components/SmartPurchaseAnalysisModal';
import { DashboardStats } from './components/DashboardStats';
import { EmptyState } from './components/EmptyState';
import { LanguageSelector } from './components/LanguageSelector';
import { useBudget } from './hooks/useBudget';
import { useShoppingList } from './hooks/useShoppingList';
import { usePurchaseHistory } from './hooks/usePurchaseHistory';
import { usePurchaseAnalysis } from './hooks/usePurchaseAnalysis';
import { useLanguage } from './contexts/LanguageContext';
import { apiService } from './services/mockApi';
import { Product, DashboardStats as StatsType, EMIOption } from './types';

function App() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<StatsType | null>(null);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [isEMIModalOpen, setIsEMIModalOpen] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isPurchasesModalOpen, setIsPurchasesModalOpen] = useState(false);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [selectedProductForEMI, setSelectedProductForEMI] = useState<Product | null>(null);
  const [selectedProductForPurchase, setSelectedProductForPurchase] = useState<Product | null>(null);
  const [selectedProductForAnalysis, setSelectedProductForAnalysis] = useState<Product | null>(null);
  const [purchaseMethod, setPurchaseMethod] = useState<'direct' | 'emi'>('direct');
  const [orderNumber, setOrderNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [apiConfig, setApiConfig] = useState(apiService.config);
  const [error, setError] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [showCategories, setShowCategories] = useState(true);

  const { budget, updateBudget, addExpense, addLoan, addEMI, getBudgetStatus, isBudgetExceeded, getAvailableLoanOptions } = useBudget();
  const { items, addItem, removeItem, getTotalEstimatedCost, getTotalItems } = useShoppingList();
  const { 
    purchases, 
    addPurchase, 
    updatePurchaseStatus, 
    addReview, 
    getRecentPurchases, 
    getPurchaseAnalytics 
  } = usePurchaseHistory();
  const { analyzePurchasePattern } = usePurchaseAnalysis(purchases);

  useEffect(() => {
    if (apiConfig.isConnected) {
      loadData();
    }
  }, [apiConfig.isConnected]);

  const loadData = async (category?: string) => {
    if (!apiConfig.isConnected) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const [productsData, statsData] = await Promise.all([
        apiService.getProducts(category),
        apiService.getDashboardStats()
      ]);
      
      setProducts(productsData);
      setStats(statsData);
      
      if (productsData.length === 0 && statsData.totalItems === 0) {
        setError('No data available from APIs');
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Failed to load data from APIs');
      setProducts([]);
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string, type: 'text' | 'voice' | 'image' | 'chat' | 'youtube') => {
    if (!apiConfig.isConnected) return;

    setSearchQuery(query);
    setLoading(true);
    setError(null);
    setCategoryFilter('');
    setShowCategories(false);

    try {
      if (type === 'youtube') {
        // NEW: Handle YouTube URL analysis
        const result = await apiService.processYouTubeUrl(query);
        console.log('YouTube analysis result:', result);
        setProducts(result.products);
        if (result.analysis) {
          // Show analysis message to user
          setError(result.analysis);
        }
        return;
      }
      
      if (type === 'chat') {
        const result = await apiService.processChatInput(query);
        console.log('AI Chat result:', result);
        setProducts(result.products);
        return;
      }
      
      const results = await apiService.searchProducts(query);
      setProducts(results);
      
      if (results.length === 0) {
        setError('No search results found');
      }
    } catch (error) {
      console.error('Search error:', error);
      setError('Search failed - check API connection');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToList = async (product: Product) => {
    try {
      // Check if budget is exceeded and offer EMI option
      if (isBudgetExceeded() || (budget.remaining < product.price)) {
        setSelectedProductForEMI(product);
        setIsEMIModalOpen(true);
        return;
      }

      const newItem = addItem({
        productId: product.id,
        name: product.name,
        estimatedPrice: product.price,
        quantity: 1,
        category: product.category,
        source: 'text'
      });
      
      addExpense(product.price);
      console.log(`Added "${product.name}" to shopping list for ₹${product.price}`);
      return newItem;
    } catch (error) {
      console.error('Error adding product to list:', error);
      throw error;
    }
  };

  const handleBuyNow = async (product: Product) => {
    try {
      // Analyze purchase pattern first
      const analysis = analyzePurchasePattern(product);
      
      // Show analysis modal if there are concerning patterns
      if (analysis.isExcessivePurchasing || analysis.similarItemCount >= 2) {
        setSelectedProductForAnalysis(product);
        setIsAnalysisModalOpen(true);
        return;
      }

      // Proceed with normal purchase flow
      proceedWithPurchase(product);
    } catch (error) {
      console.error('Error initiating purchase:', error);
    }
  };

  const proceedWithPurchase = (product: Product) => {
    // Check if budget is exceeded and offer EMI option
    if (isBudgetExceeded() || (budget.remaining < product.price)) {
      setSelectedProductForEMI(product);
      setPurchaseMethod('emi');
      setIsEMIModalOpen(true);
      return;
    }

    // Direct purchase
    setSelectedProductForPurchase(product);
    setPurchaseMethod('direct');
    setIsPurchaseModalOpen(true);
  };

  const handleAnalysisDecision = (proceed: boolean) => {
    setIsAnalysisModalOpen(false);
    
    if (proceed && selectedProductForAnalysis) {
      proceedWithPurchase(selectedProductForAnalysis);
    }
    
    setSelectedProductForAnalysis(null);
  };

  const handleConfirmPurchase = () => {
    if (!selectedProductForPurchase) return;

    // Generate order number
    const orderNum = `BIQ${Date.now().toString().slice(-8)}`;
    setOrderNumber(orderNum);

    // Add expense to budget
    addExpense(selectedProductForPurchase.price);

    // Add to purchase history
    addPurchase(selectedProductForPurchase, orderNum, 'upi');

    // Show success modal
    setIsPurchaseModalOpen(false);
    setIsSuccessModalOpen(true);

    console.log(`Purchase confirmed for "${selectedProductForPurchase.name}" - Order: ${orderNum}`);
  };

  const handleEMISelection = (emi: EMIOption) => {
    // Add the product with EMI option
    const newItem = addItem({
      productId: emi.productId,
      name: emi.productName,
      estimatedPrice: emi.productPrice,
      quantity: 1,
      category: 'general',
      source: 'text',
      emiOption: emi
    });

    // Add EMI to budget tracking
    addEMI(emi);

    // Add down payment to expenses if any
    if (emi.downPayment) {
      addExpense(emi.downPayment);
    }

    // If this was a direct purchase, show success modal
    if (purchaseMethod === 'emi') {
      const orderNum = `BIQ${Date.now().toString().slice(-8)}`;
      setOrderNumber(orderNum);
      
      // Add to purchase history
      const product: Product = {
        id: emi.productId,
        name: emi.productName,
        price: emi.productPrice,
        image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'general',
        platform: 'amazon',
        rating: 4.5,
        reviews: 100,
        inStock: true
      };
      
      addPurchase(product, orderNum, 'emi', emi);
      
      setSelectedProductForPurchase(product);
      setIsSuccessModalOpen(true);
    }

    console.log(`Added "${emi.productName}" with EMI option: ₹${emi.monthlyEMI}/month for ${emi.tenure} months`);
  };

  const handleApiConfig = (config: { amazonApiKey?: string; flipkartApiKey?: string }) => {
    apiService.setApiConfig(config);
    setApiConfig(apiService.config);
    setError(null);
    setProducts([]);
    setStats(null);
    setCategoryFilter('');
    setSearchQuery('');
    setShowCategories(true);
  };

  const handleCategoryClick = async (category: string) => {
    setCategoryFilter(category);
    setSearchQuery('');
    setShowCategories(false);
    await loadData(category);
  };

  const handleClearFilters = () => {
    setCategoryFilter('');
    setSearchQuery('');
    setShowCategories(true);
    loadData();
  };

  const handleExploreClick = () => {
    setShowCategories(true);
    if (apiConfig.isConnected) {
      loadData();
    }
  };

  const handleViewDeals = () => {
    setShowCategories(false);
    setCategoryFilter('deals-offers');
    setSearchQuery('deals');
    loadData('deals-offers');
  };

  // Handle dashboard stats clicks
  const handleStatsClick = async (type: 'total' | 'savings' | 'new') => {
    if (!apiConfig.isConnected) return;

    setLoading(true);
    setError(null);
    setShowCategories(false);
    setCategoryFilter('');
    setSearchQuery('');

    try {
      let filteredProducts: Product[] = [];
      
      switch (type) {
        case 'total':
          // Show all products
          filteredProducts = await apiService.getProducts();
          break;
        case 'savings':
          // Show products with discounts
          const allProducts = await apiService.getProducts();
          filteredProducts = allProducts.filter(p => p.discount && p.discount > 0);
          break;
        case 'new':
          // Show new products
          const newProducts = await apiService.getProducts();
          filteredProducts = newProducts.filter(p => p.isNew);
          break;
      }

      setProducts(filteredProducts);
      
      if (filteredProducts.length === 0) {
        setError(`No ${type === 'total' ? 'products' : type === 'savings' ? 'discounted items' : 'new items'} found`);
      }
    } catch (error) {
      console.error('Error filtering products:', error);
      setError('Failed to filter products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const categorizedProducts = {
    organic: products.filter(p => p.category === 'organic'),
    inorganic: products.filter(p => p.category === 'inorganic'),
    food: products.filter(p => p.category === 'food'),
    general: products.filter(p => p.category === 'general')
  };

  const hasAnyProducts = products.length > 0;
  const isSearching = searchQuery.length > 0;
  const isFiltering = categoryFilter.length > 0;

  const getEmptyStateType = () => {
    if (!apiConfig.isConnected) return 'no-connection';
    if (error && !error.includes('YouTube Video Analysis')) return 'api-error';
    if ((isSearching || isFiltering) && !hasAnyProducts) return 'no-search-results';
    return 'no-products';
  };

  // Get recent purchases and analytics
  const recentPurchases = getRecentPurchases(30);
  const purchaseAnalytics = getPurchaseAnalytics();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{t('app.title')}</h1>
                <p className="text-sm text-gray-600">{t('app.subtitle')}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <LanguageSelector />

              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                apiConfig.isConnected 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-amber-100 text-amber-800'
              }`}>
                <Wifi className="h-4 w-4" />
                <span>{apiConfig.isConnected ? t('header.apiConnected') : t('header.noApiConnection')}</span>
              </div>

              <button
                onClick={() => setIsPurchasesModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <History className="h-4 w-4" />
                <span>{t('header.recentPurchases')} ({recentPurchases.length})</span>
              </button>

              <button
                onClick={() => setIsListModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <List className="h-4 w-4" />
                <span>{t('header.shoppingList')} ({getTotalItems()})</span>
              </button>
              
              <button
                onClick={() => setIsBudgetModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span>{t('header.budgetSetup')}</span>
              </button>

              <button
                onClick={() => setIsApiModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Wifi className="h-4 w-4" />
                <span>{t('header.apiConfig')}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Banner */}
        {showCategories && !isSearching && !isFiltering && (
          <HeroBanner 
            onExploreClick={handleExploreClick} 
            onViewDeals={handleViewDeals}
          />
        )}

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar 
            onSearch={handleSearch} 
            onAddToList={handleAddToList}
            isConnected={apiConfig.isConnected} 
          />
        </div>

        {/* Active Filters */}
        {(isSearching || isFiltering) && (
          <div className="mb-6 flex items-center space-x-4">
            <span className="text-sm text-gray-600">Active filters:</span>
            {isSearching && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                Search: "{searchQuery}"
              </span>
            )}
            {isFiltering && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                Category: {categoryFilter}
              </span>
            )}
            <button
              onClick={handleClearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Dashboard Stats */}
        {stats && apiConfig.isConnected && stats.totalItems > 0 && (
          <DashboardStats 
            stats={stats} 
            onCategoryClick={handleCategoryClick}
            onStatsClick={handleStatsClick}
          />
        )}

        {/* Budget Card */}
        <div className="mb-8">
          <BudgetCard 
            budget={budget} 
            status={getBudgetStatus()} 
            onLoanRequest={() => setIsLoanModalOpen(true)}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className={`mb-6 p-4 rounded-lg ${
            error.includes('YouTube Video Analysis') 
              ? 'bg-blue-50 border border-blue-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <p className={`text-sm ${
              error.includes('YouTube Video Analysis') 
                ? 'text-blue-800' 
                : 'text-red-800'
            }`}>{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">{t('common.loading')}</p>
          </div>
        )}

        {/* Content based on connection and data state */}
        {!loading && (
          <>
            {/* Category Grid - Show when no search/filter is active */}
            {showCategories && !isSearching && !isFiltering && apiConfig.isConnected && (
              <CategoryGrid onCategoryClick={handleCategoryClick} />
            )}

            {/* Featured Deals */}
            {hasAnyProducts && (
              <FeaturedDeals 
                products={products} 
                onAddToList={handleAddToList}
                onBuyNow={handleBuyNow}
              />
            )}

            {!hasAnyProducts && !showCategories ? (
              <EmptyState 
                type={getEmptyStateType()}
                onAction={() => {
                  if (!apiConfig.isConnected || (error && !error.includes('YouTube Video Analysis'))) {
                    setIsApiModalOpen(true);
                  } else if (isSearching || isFiltering) {
                    handleClearFilters();
                  } else {
                    loadData();
                  }
                }}
                actionLabel={
                  !apiConfig.isConnected ? "Configure APIs" :
                  (error && !error.includes('YouTube Video Analysis')) ? "Check API Config" :
                  (isSearching || isFiltering) ? "Clear Filters" : "Refresh Data"
                }
              />
            ) : hasAnyProducts && (
              <>
                {/* Daily Deals Section */}
                {products.filter(p => p.isNew || p.isTrending).length > 0 && (
                  <section className="mb-12">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="p-3 rounded-xl bg-red-50 text-red-600">
                        <TrendingUp className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Daily Deals & New Arrivals</h2>
                        <p className="text-gray-600">Fresh updates from your connected APIs</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {products.filter(p => p.isNew || p.isTrending).map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onAddToList={handleAddToList}
                          onBuyNow={handleBuyNow}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Category Sections */}
                {categorizedProducts.organic.length > 0 && (
                  <CategorySection
                    title="Organic Products"
                    category="organic"
                    products={categorizedProducts.organic}
                    onAddToList={handleAddToList}
                    onBuyNow={handleBuyNow}
                  />
                )}

                {categorizedProducts.food.length > 0 && (
                  <CategorySection
                    title="Food Section"
                    category="food"
                    products={categorizedProducts.food}
                    onAddToList={handleAddToList}
                    onBuyNow={handleBuyNow}
                  />
                )}

                {categorizedProducts.general.length > 0 && (
                  <CategorySection
                    title={t('categories.general')}
                    category="general"
                    products={categorizedProducts.general}
                    onAddToList={handleAddToList}
                    onBuyNow={handleBuyNow}
                  />
                )}

                {categorizedProducts.inorganic.length > 0 && (
                  <CategorySection
                    title="Inorganic Products"
                    category="inorganic"
                    products={categorizedProducts.inorganic}
                    onAddToList={handleAddToList}
                    onBuyNow={handleBuyNow}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      <ShoppingListModal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        items={items}
        onAddItem={addItem}
        onRemoveItem={removeItem}
        totalCost={getTotalEstimatedCost()}
      />

      <BudgetSetupModal
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
        onSetBudget={updateBudget}
      />

      <ApiConfigModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
        onSaveConfig={handleApiConfig}
        currentConfig={apiConfig}
      />

      <LoanOptionsModal
        isOpen={isLoanModalOpen}
        onClose={() => setIsLoanModalOpen(false)}
        loanOptions={getAvailableLoanOptions()}
        onSelectLoan={addLoan}
        shortfallAmount={Math.max(0, budget.spent - budget.total)}
      />

      <EMIOptionsModal
        isOpen={isEMIModalOpen}
        onClose={() => {
          setIsEMIModalOpen(false);
          setSelectedProductForEMI(null);
          setPurchaseMethod('direct');
        }}
        product={selectedProductForEMI}
        onSelectEMI={handleEMISelection}
      />

      <PurchaseConfirmationModal
        isOpen={isPurchaseModalOpen}
        onClose={() => {
          setIsPurchaseModalOpen(false);
          setSelectedProductForPurchase(null);
        }}
        product={selectedProductForPurchase}
        purchaseMethod={purchaseMethod}
        onConfirmPurchase={handleConfirmPurchase}
      />

      <PurchaseSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          setSelectedProductForPurchase(null);
          setOrderNumber('');
        }}
        product={selectedProductForPurchase}
        orderNumber={orderNumber}
      />

      <RecentPurchasesModal
        isOpen={isPurchasesModalOpen}
        onClose={() => setIsPurchasesModalOpen(false)}
        purchases={recentPurchases}
        analytics={purchaseAnalytics}
        onUpdateStatus={updatePurchaseStatus}
        onAddReview={addReview}
      />

      <SmartPurchaseAnalysisModal
        isOpen={isAnalysisModalOpen}
        onClose={() => setIsAnalysisModalOpen(false)}
        product={selectedProductForAnalysis!}
        analysis={selectedProductForAnalysis ? analyzePurchasePattern(selectedProductForAnalysis) : {
          similarItemCount: 0,
          monthlySpentOnCategory: 0,
          monthlySpentOnSimilarItems: 0,
          averageTimeBetweenPurchases: 30,
          isExcessivePurchasing: false,
          savingsOpportunity: 0,
          motivationalMessage: '',
          spendingTrend: 'stable'
        }}
        onProceedAnyway={() => handleAnalysisDecision(true)}
        onReconsider={() => handleAnalysisDecision(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold text-gray-900">{t('app.title')}</span>
            </div>
            <p className="text-gray-600 mb-4">
              {t('footer.description')}
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <span>🔗 {t('footer.liveApi')}</span>
              <span>🌍 {t('footer.multiLanguageAi')}</span>
              <span>⚡ {t('footer.realTimeData')}</span>
              <span>🛡️ {t('footer.securePrivate')}</span>
              <span>💎 {t('footer.jewelryTracking')}</span>
              <span>💳 {t('footer.smartEmi')}</span>
              <span>🧠 {t('footer.smartAnalysis')}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;