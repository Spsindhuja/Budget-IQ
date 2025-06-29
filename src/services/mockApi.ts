import { Product, DashboardStats } from '../types';

// Enhanced mock data with more categories and products
const mockProducts: Product[] = [
  // Electronics
  {
    id: '1',
    name: 'iPhone 15 Pro Max 256GB',
    price: 134900,
    originalPrice: 159900,
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'general',
    platform: 'amazon',
    rating: 4.8,
    reviews: 2340,
    discount: 16,
    inStock: true,
    isNew: true,
    isTrending: true
  },
  {
    id: '2',
    name: 'Samsung Galaxy Watch 6 Classic',
    price: 32999,
    originalPrice: 42999,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'general',
    platform: 'flipkart',
    rating: 4.5,
    reviews: 1567,
    discount: 23,
    inStock: true,
    isNew: false,
    isTrending: true
  },
  {
    id: '3',
    name: 'MacBook Air M3 13-inch',
    price: 114900,
    originalPrice: 134900,
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
    category: 'general',
    platform: 'amazon',
    rating: 4.9,
    reviews: 890,
    discount: 15,
    inStock: true,
    isNew: true,
    isTrending: false
  },

  // Fashion
  {
    id: '4',
    name: 'Nike Air Force 1 Sneakers',
    price: 7995,
    originalPrice: 9995,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'general',
    platform: 'flipkart',
    rating: 4.6,
    reviews: 3456,
    discount: 20,
    inStock: true,
    isNew: false,
    isTrending: true
  },
  {
    id: '5',
    name: 'Levi\'s 511 Slim Fit Jeans',
    price: 2999,
    originalPrice: 4999,
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'general',
    platform: 'amazon',
    rating: 4.4,
    reviews: 2234,
    discount: 40,
    inStock: true,
    isNew: false,
    isTrending: false
  },

  // Beauty & Personal Care
  {
    id: '6',
    name: 'Mamaearth Tea Tree Face Wash',
    price: 207,
    originalPrice: 299,
    image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'organic',
    platform: 'amazon',
    rating: 4.7,
    reviews: 8934,
    discount: 31,
    inStock: true,
    isNew: true,
    isTrending: true
  },
  {
    id: '7',
    name: 'Lakme Absolute Perfect Radiance Foundation',
    price: 1050,
    originalPrice: 1400,
    image: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'general',
    platform: 'flipkart',
    rating: 4.3,
    reviews: 1567,
    discount: 25,
    inStock: true,
    isNew: false,
    isTrending: false
  },

  // Grocery & Food
  {
    id: '8',
    name: 'Organic Quinoa Premium 1kg',
    price: 450,
    originalPrice: 650,
    image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'organic',
    platform: 'local',
    rating: 4.5,
    reviews: 234,
    discount: 31,
    inStock: true,
    isNew: true,
    isTrending: false
  },
  {
    id: '9',
    name: 'Fresh Organic Strawberries 500g',
    price: 180,
    image: 'https://images.pexels.com/photos/1232267/pexels-photo-1232267.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'food',
    platform: 'local',
    rating: 4.7,
    reviews: 89,
    inStock: true,
    isNew: true,
    isTrending: false
  },
  {
    id: '10',
    name: 'Amul Fresh Milk 1L',
    price: 65,
    image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'food',
    platform: 'local',
    rating: 4.8,
    reviews: 567,
    inStock: true,
    isNew: false,
    isTrending: false
  },

  // Home & Furniture
  {
    id: '11',
    name: 'IKEA HEMNES Bookcase White',
    price: 12999,
    originalPrice: 15999,
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'general',
    platform: 'amazon',
    rating: 4.4,
    reviews: 445,
    discount: 19,
    inStock: true,
    isNew: false,
    isTrending: false
  },
  {
    id: '12',
    name: 'Philips LED Smart Bulb 9W',
    price: 899,
    originalPrice: 1299,
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'general',
    platform: 'flipkart',
    rating: 4.2,
    reviews: 1234,
    discount: 31,
    inStock: true,
    isNew: true,
    isTrending: false
  },

  // Health & Wellness
  {
    id: '13',
    name: 'Himalaya Ashwagandha Tablets',
    price: 285,
    originalPrice: 350,
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'organic',
    platform: 'amazon',
    rating: 4.6,
    reviews: 2890,
    discount: 19,
    inStock: true,
    isNew: false,
    isTrending: true
  },
  {
    id: '14',
    name: 'Yoga Mat Anti-Slip 6mm',
    price: 1299,
    originalPrice: 1999,
    image: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'general',
    platform: 'flipkart',
    rating: 4.3,
    reviews: 567,
    discount: 35,
    inStock: true,
    isNew: false,
    isTrending: false
  },

  // Cleaning & Household
  {
    id: '15',
    name: 'Eco-Friendly Cleaning Kit',
    price: 750,
    originalPrice: 1200,
    image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'inorganic',
    platform: 'amazon',
    rating: 4.6,
    reviews: 156,
    discount: 38,
    inStock: true,
    isNew: false,
    isTrending: true
  },
  {
    id: '16',
    name: 'Stainless Steel Water Bottle Set',
    price: 650,
    originalPrice: 950,
    image: 'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'inorganic',
    platform: 'flipkart',
    rating: 4.2,
    reviews: 298,
    discount: 32,
    inStock: true,
    isNew: true,
    isTrending: false
  },

  // Books & Stationery
  {
    id: '17',
    name: 'The Psychology of Money Book',
    price: 299,
    originalPrice: 399,
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'general',
    platform: 'amazon',
    rating: 4.8,
    reviews: 4567,
    discount: 25,
    inStock: true,
    isNew: false,
    isTrending: true
  },
  {
    id: '18',
    name: 'Parker Jotter Ballpoint Pen',
    price: 450,
    originalPrice: 600,
    image: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'general',
    platform: 'flipkart',
    rating: 4.5,
    reviews: 234,
    discount: 25,
    inStock: true,
    isNew: false,
    isTrending: false
  },

  // Automotive
  {
    id: '19',
    name: 'Car Dashboard Camera HD',
    price: 3999,
    originalPrice: 5999,
    image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'general',
    platform: 'amazon',
    rating: 4.4,
    reviews: 890,
    discount: 33,
    inStock: true,
    isNew: true,
    isTrending: false
  },
  {
    id: '20',
    name: 'Bike Phone Holder Mount',
    price: 299,
    originalPrice: 499,
    image: 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'general',
    platform: 'flipkart',
    rating: 4.1,
    reviews: 445,
    discount: 40,
    inStock: true,
    isNew: false,
    isTrending: false
  }
];

// Mock API service that simulates real API responses
export const apiService = {
  // Configuration for API keys
  config: {
    amazonApiKey: 'AIzaSyDmS0bCCkuRK-PDnb6Steug3Cu5t0g4ZlQ',
    flipkartApiKey: '',
    isConnected: true
  },

  // Set API configuration
  setApiConfig: (config: { amazonApiKey?: string; flipkartApiKey?: string }) => {
    apiService.config = { ...apiService.config, ...config };
    apiService.config.isConnected = !!(config.amazonApiKey || config.flipkartApiKey);
  },

  // Get products from connected platforms - Returns mock data
  getProducts: async (category?: string): Promise<Product[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      if (!apiService.config.isConnected) {
        console.log('API not connected, returning empty array');
        return [];
      }

      console.log('Fetching products with API key:', apiService.config.amazonApiKey);
      
      // Filter by category if provided
      let filteredProducts = mockProducts;
      if (category && category !== 'all') {
        // Map category IDs to product categories
        const categoryMap: Record<string, string[]> = {
          'electronics': ['general'],
          'fashion': ['general'],
          'beauty-personal-care': ['organic', 'general'],
          'grocery-essentials': ['food', 'organic'],
          'health-wellness': ['organic', 'general'],
          'home-furniture': ['general'],
          'books-stationery': ['general'],
          'automotive': ['general'],
          'deals-offers': ['general', 'organic', 'food']
        };
        
        const mappedCategories = categoryMap[category] || [category];
        filteredProducts = mockProducts.filter(product => 
          mappedCategories.includes(product.category)
        );
      }
      
      console.log(`Returning ${filteredProducts.length} products`);
      return filteredProducts;
      
    } catch (error) {
      console.error('Error fetching products from API:', error);
      return [];
    }
  },

  // Search products across platforms - Returns filtered mock data
  searchProducts: async (query: string): Promise<Product[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    try {
      if (!apiService.config.isConnected || !query.trim()) {
        return [];
      }

      console.log('Searching products with query:', query);
      
      // Filter products based on search query
      const searchResults = mockProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      
      console.log(`Search found ${searchResults.length} results for "${query}"`);
      return searchResults;
      
    } catch (error) {
      console.error('Error searching products via API:', error);
      return [];
    }
  },

  // NEW: Process YouTube URL and extract product recommendations
  processYouTubeUrl: async (url: string): Promise<{ products: Product[]; analysis: string }> => {
    // Simulate network delay for YouTube analysis
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    try {
      if (!apiService.config.isConnected || !url.trim()) {
        return { products: [], analysis: '' };
      }

      console.log('Analyzing YouTube URL:', url);
      
      // Extract video ID from URL for mock analysis
      const videoId = extractVideoId(url);
      
      // Mock AI analysis based on URL patterns
      let analysis = '';
      let relevantProducts: Product[] = [];
      
      if (url.toLowerCase().includes('tech') || url.toLowerCase().includes('review') || url.toLowerCase().includes('unbox')) {
        analysis = 'This appears to be a tech review or unboxing video. I found similar electronic products that were mentioned or featured.';
        relevantProducts = mockProducts.filter(p => p.category === 'general' && (
          p.name.toLowerCase().includes('iphone') || 
          p.name.toLowerCase().includes('samsung') || 
          p.name.toLowerCase().includes('macbook')
        ));
      } else if (url.toLowerCase().includes('beauty') || url.toLowerCase().includes('makeup') || url.toLowerCase().includes('skincare')) {
        analysis = 'This seems to be a beauty or skincare related video. Here are similar beauty products that match the content.';
        relevantProducts = mockProducts.filter(p => p.category === 'organic' || p.name.toLowerCase().includes('face'));
      } else if (url.toLowerCase().includes('food') || url.toLowerCase().includes('recipe') || url.toLowerCase().includes('cooking')) {
        analysis = 'This appears to be a food or cooking video. I found related food products and kitchen items.';
        relevantProducts = mockProducts.filter(p => p.category === 'food' || p.name.toLowerCase().includes('kitchen'));
      } else if (url.toLowerCase().includes('fitness') || url.toLowerCase().includes('workout') || url.toLowerCase().includes('yoga')) {
        analysis = 'This looks like a fitness or workout video. Here are related fitness products and health supplements.';
        relevantProducts = mockProducts.filter(p => 
          p.name.toLowerCase().includes('yoga') || 
          p.name.toLowerCase().includes('ashwagandha') ||
          p.category === 'organic'
        );
      } else {
        // Generic analysis
        analysis = 'I analyzed the video content and found these popular products that might interest you based on the video theme.';
        relevantProducts = mockProducts.slice(0, 6); // Return first 6 products
      }
      
      console.log(`YouTube analysis found ${relevantProducts.length} relevant products`);
      return {
        products: relevantProducts,
        analysis: `🎥 YouTube Video Analysis: ${analysis}`
      };
      
    } catch (error) {
      console.error('Error processing YouTube URL:', error);
      return { 
        products: [], 
        analysis: 'Unable to analyze YouTube video. Please check the URL and try again.' 
      };
    }
  },

  // Get real-time dashboard statistics - Returns mock stats
  getDashboardStats: async (): Promise<DashboardStats> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      if (!apiService.config.isConnected) {
        return {
          totalItems: 0,
          avgSavings: 0,
          topCategory: '',
          newItemsToday: 0
        };
      }

      console.log('Fetching dashboard stats with API key:', apiService.config.amazonApiKey);
      
      // Calculate stats from mock data
      const totalItems = mockProducts.length;
      const productsWithDiscount = mockProducts.filter(p => p.discount);
      const avgSavings = productsWithDiscount.length > 0 
        ? productsWithDiscount.reduce((sum, product) => sum + (product.discount || 0), 0) / productsWithDiscount.length
        : 0;
      
      const categoryCount = mockProducts.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const topCategory = Object.entries(categoryCount).sort(([,a], [,b]) => b - a)[0]?.[0] || 'general';
      const newItemsToday = mockProducts.filter(p => p.isNew).length;
      
      const stats = {
        totalItems,
        avgSavings: Math.round(avgSavings),
        topCategory,
        newItemsToday
      };
      
      console.log('Dashboard stats:', stats);
      return stats;
      
    } catch (error) {
      console.error('Error fetching dashboard stats from API:', error);
      return {
        totalItems: 0,
        avgSavings: 0,
        topCategory: '',
        newItemsToday: 0
      };
    }
  },

  // Process AI chat input with multi-language support - Returns mock responses
  processChatInput: async (input: string): Promise<{ suggestion: string; products: Product[] }> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      if (!input.trim() || !apiService.config.isConnected) {
        return { suggestion: '', products: [] };
      }

      console.log('Processing chat input:', input);

      // Generate mock AI responses based on input
      const inputLower = input.toLowerCase();
      let suggestion = '';
      let relevantProducts: Product[] = [];

      if (inputLower.includes('organic') || inputLower.includes('natural')) {
        suggestion = 'I found some excellent organic products that are healthy and environmentally friendly.';
        relevantProducts = mockProducts.filter(p => p.category === 'organic');
      } else if (inputLower.includes('food') || inputLower.includes('eat') || inputLower.includes('fresh')) {
        suggestion = 'Here are some fresh food items available from local suppliers.';
        relevantProducts = mockProducts.filter(p => p.category === 'food');
      } else if (inputLower.includes('clean') || inputLower.includes('wash') || inputLower.includes('soap')) {
        suggestion = 'I found some eco-friendly cleaning products for your home.';
        relevantProducts = mockProducts.filter(p => p.category === 'inorganic');
      } else if (inputLower.includes('tech') || inputLower.includes('electronic') || inputLower.includes('smart') || inputLower.includes('phone') || inputLower.includes('laptop')) {
        suggestion = 'Here are some popular tech and electronic items with great reviews.';
        relevantProducts = mockProducts.filter(p => p.category === 'general' && (p.name.toLowerCase().includes('phone') || p.name.toLowerCase().includes('laptop') || p.name.toLowerCase().includes('watch')));
      } else {
        suggestion = 'Based on your query, here are some popular products you might be interested in.';
        relevantProducts = mockProducts.slice(0, 6); // Return first 6 products
      }
      
      console.log(`Chat AI found ${relevantProducts.length} relevant products`);
      return {
        suggestion,
        products: relevantProducts
      };
      
    } catch (error) {
      console.error('Error processing chat input via API:', error);
      return { suggestion: 'Unable to process request', products: [] };
    }
  },

  // Process image recognition for product search - Returns mock results
  processImageSearch: async (imageFile: File): Promise<Product[]> => {
    // Simulate network delay for image processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      if (!apiService.config.isConnected) {
        return [];
      }

      console.log('Processing image:', imageFile.name);
      
      // Mock image recognition - return products based on file type/name
      const fileName = imageFile.name.toLowerCase();
      let matchedProducts: Product[] = [];
      
      if (fileName.includes('food') || fileName.includes('fruit') || fileName.includes('vegetable')) {
        matchedProducts = mockProducts.filter(p => p.category === 'food' || p.category === 'organic');
      } else if (fileName.includes('tech') || fileName.includes('electronic')) {
        matchedProducts = mockProducts.filter(p => p.category === 'general');
      } else if (fileName.includes('clean') || fileName.includes('bottle')) {
        matchedProducts = mockProducts.filter(p => p.category === 'inorganic');
      } else {
        // Return random selection of products
        matchedProducts = mockProducts.slice(0, 4);
      }
      
      console.log(`Image recognition found ${matchedProducts.length} products`);
      return matchedProducts;
      
    } catch (error) {
      console.error('Error processing image search via API:', error);
      return [];
    }
  },

  // Process voice commands - Returns mock transcription
  processVoiceCommand: async (audioBlob: Blob): Promise<string> => {
    // Simulate network delay for voice processing
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    try {
      if (!apiService.config.isConnected) {
        return '';
      }

      console.log('Processing voice command');
      
      // Mock voice-to-text responses
      const mockTranscriptions = [
        'show me organic products',
        'find fresh food items',
        'search for cleaning supplies',
        'look for electronics deals',
        'what are the trending products',
        'show me products under 500 rupees'
      ];
      
      // Return a random mock transcription
      const randomIndex = Math.floor(Math.random() * mockTranscriptions.length);
      const transcription = mockTranscriptions[randomIndex];
      
      console.log('Voice transcription:', transcription);
      return transcription;
      
    } catch (error) {
      console.error('Error processing voice command via API:', error);
      return '';
    }
  }
};

// Helper function to extract video ID from YouTube URL
function extractVideoId(url: string): string {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : '';
}

// Export for backward compatibility
export const mockApiService = apiService;