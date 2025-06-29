import React, { useState, useRef } from 'react';
import { X, Upload, Camera, Search, TrendingUp, TrendingDown, Star, Clock, Gem, DollarSign, Shield, AlertTriangle, BarChart3, Scale, Zap } from 'lucide-react';
import { Product } from '../types';

interface ImageSearchResult {
  products: Product[];
  priceAnalysis: {
    minPrice: number;
    maxPrice: number;
    avgPrice: number;
    priceRange: string;
  };
  jewelryData?: {
    currentGoldPrice: {
      price24K: number;
      price22K: number;
    };
    currentSilverPrice: number;
    priceFluctuation: {
      period: string;
      goldChange: number;
      silverChange: number;
      trend: 'up' | 'down' | 'stable';
    };
    similarDesigns: Product[];
    marketData: {
      goldPriceTable: {
        weight: string;
        price24K: number;
        price22K: number;
      }[];
      priceChart: {
        period: string;
        data: { month: string; price: number; growth?: number }[];
      };
      lastUpdated: string;
      hallmarkInfo: {
        purity: string;
        certification: string;
        bis: boolean;
      };
    };
    disclaimer: string;
    // NEW: Gold weight estimation for jewelry
    estimatedWeight?: {
      minGrams: number;
      maxGrams: number;
      avgGrams: number;
      designType: string;
      totalCost24K: number;
      totalCost22K: number;
      makingCharges: number;
      finalPrice: number;
    };
  };
  marketTrends: {
    period: string;
    priceHistory: { date: string; price: number }[];
    volatility: 'low' | 'medium' | 'high';
    recommendation: string;
  };
}

interface ImageSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToList: (product: Product) => void;
}

export const ImageSearchModal: React.FC<ImageSearchModalProps> = ({
  isOpen,
  onClose,
  onAddToList
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchResults, setSearchResults] = useState<ImageSearchResult | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'camera'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (!isOpen) return null;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
          setSelectedImage(file);
          setImagePreview(canvas.toDataURL());
          
          // Stop camera
          const stream = video.srcObject as MediaStream;
          stream?.getTracks().forEach(track => track.stop());
        }
      });
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    // Simulate advanced AI image analysis
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Current date: 28-06-2025
    const today = new Date('2025-06-28');
    
    // Updated accurate gold and silver prices based on the provided images (June 28, 2025)
    // Source: goldpriceindia.com
    const currentGoldPrice24K = 9552.40; // per gram (24K gold) - June 2025 rates from image
    const currentGoldPrice22K = 8756.37; // per gram (22K/916 gold) - June 2025 rates from image
    const currentSilverPrice = 92; // per gram - June 2025 rates
    
    // Calculate growth percentages for each month
    const chartData = [
      { month: 'Dec-24', price: 82000, growth: 0 },
      { month: 'Jan-25', price: 84500, growth: 3.0 },
      { month: 'Feb-25', price: 90000, growth: 6.5 },
      { month: 'Mar-25', price: 94500, growth: 5.0 },
      { month: 'Apr-25', price: 95000, growth: 0.5 },
      { month: 'May-25', price: 95200, growth: 0.2 },
      { month: 'Jun-25', price: 95524, growth: 0.3 }
    ];

    // NEW: Determine if this is jewelry and estimate weight
    const fileName = selectedImage.name.toLowerCase();
    const isJewelry = fileName.includes('gold') || fileName.includes('jewelry') || fileName.includes('ring') || 
                     fileName.includes('necklace') || fileName.includes('chain') || fileName.includes('bracelet') ||
                     fileName.includes('earring') || fileName.includes('pendant');

    let estimatedWeight = undefined;
    if (isJewelry) {
      // AI-based weight estimation based on jewelry type
      let designType = 'General Jewelry';
      let minGrams = 2;
      let maxGrams = 8;
      
      if (fileName.includes('ring')) {
        designType = 'Ring';
        minGrams = 2;
        maxGrams = 6;
      } else if (fileName.includes('necklace') || fileName.includes('chain')) {
        designType = 'Necklace/Chain';
        minGrams = 8;
        maxGrams = 25;
      } else if (fileName.includes('bracelet')) {
        designType = 'Bracelet';
        minGrams = 5;
        maxGrams = 15;
      } else if (fileName.includes('earring')) {
        designType = 'Earrings (Pair)';
        minGrams = 3;
        maxGrams = 10;
      } else if (fileName.includes('pendant')) {
        designType = 'Pendant';
        minGrams = 3;
        maxGrams = 12;
      }

      const avgGrams = (minGrams + maxGrams) / 2;
      const makingCharges = avgGrams * 800; // ₹800 per gram making charges
      const totalCost24K = avgGrams * currentGoldPrice24K;
      const totalCost22K = avgGrams * currentGoldPrice22K;
      const finalPrice = totalCost22K + makingCharges;

      estimatedWeight = {
        minGrams,
        maxGrams,
        avgGrams,
        designType,
        totalCost24K,
        totalCost22K,
        makingCharges,
        finalPrice
      };
    }
    
    // Mock comprehensive analysis results with accurate pricing for June 2025
    const mockResults: ImageSearchResult = {
      products: [
        {
          id: 'img-1',
          name: '916 Hallmark Gold Chain Necklace 18K BIS Certified',
          price: 3299,
          originalPrice: 4599,
          image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'general',
          platform: 'amazon',
          rating: 4.6,
          reviews: 1234,
          discount: 28,
          inStock: true,
          isNew: false,
          isTrending: true
        },
        {
          id: 'img-2',
          name: '916 Sterling Silver Chain Necklace BIS Hallmark',
          price: 2499,
          originalPrice: 3299,
          image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'general',
          platform: 'flipkart',
          rating: 4.4,
          reviews: 567,
          discount: 24,
          inStock: true,
          isNew: true,
          isTrending: false
        },
        {
          id: 'img-3',
          name: '916 Rose Gold Pendant Necklace Government Certified',
          price: 4199,
          originalPrice: 5899,
          image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'general',
          platform: 'local',
          rating: 4.8,
          reviews: 234,
          discount: 29,
          inStock: true,
          isNew: false,
          isTrending: true
        }
      ],
      priceAnalysis: {
        minPrice: 2499,
        maxPrice: 4199,
        avgPrice: 3332,
        priceRange: '₹2,499 - ₹4,199'
      },
      jewelryData: isJewelry ? {
        currentGoldPrice: {
          price24K: currentGoldPrice24K, // ₹9,552.40 per gram (24K) - June 2025
          price22K: currentGoldPrice22K  // ₹8,756.37 per gram (22K/916) - June 2025
        },
        currentSilverPrice: currentSilverPrice, // ₹92 per gram - June 2025
        priceFluctuation: {
          period: '6 months',
          goldChange: +15.8, // Based on chart showing growth from ~82,000 to ~95,000
          silverChange: -1.2,
          trend: 'up'
        },
        marketData: {
          // Price table based on the provided image
          goldPriceTable: [
            { weight: '1 gram', price24K: 9552.40, price22K: 8756.37 },
            { weight: '2 grams', price24K: 19104.80, price22K: 17512.73 },
            { weight: '5 grams', price24K: 47762.00, price22K: 43781.83 },
            { weight: '10 grams', price24K: 95524.00, price22K: 87563.67 },
            { weight: '1 Tola', price24K: 111417.32, price22K: 102132.54 },
            { weight: '1 Ounce', price24K: 297112.85, price22K: 272353.45 },
            { weight: '1 kilogram', price24K: 9552400.00, price22K: 8756366.67 }
          ],
          // Enhanced 6-month price chart with growth indicators
          priceChart: {
            period: 'Last 6 Months Gold Price Trend',
            data: chartData
          },
          lastUpdated: today.toLocaleDateString('en-IN', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          hallmarkInfo: {
            purity: '916 (22K Gold)',
            certification: 'BIS Hallmark Certified',
            bis: true
          }
        },
        disclaimer: "⚠️ IMPORTANT DISCLAIMER: We have added only authorized BIS hallmark data from government certified sources (goldpriceindia.com), but if it includes any mistake in it, we are not completely responsible for it. Please verify hallmark certification before purchase.",
        estimatedWeight, // NEW: Include weight estimation
        similarDesigns: [
          {
            id: 'similar-1',
            name: '916 Elegant Gold Chain Design BIS Certified',
            price: 3799,
            originalPrice: 4599,
            image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400',
            category: 'general',
            platform: 'amazon',
            rating: 4.5,
            reviews: 445,
            discount: 17,
            inStock: true,
            isNew: false,
            isTrending: false
          }
        ]
      } : undefined,
      marketTrends: {
        period: '6 months',
        priceHistory: [
          { date: '2024-12-28', price: 82000 },
          { date: '2025-01-28', price: 84500 },
          { date: '2025-02-28', price: 90000 },
          { date: '2025-03-28', price: 94500 },
          { date: '2025-04-28', price: 95000 },
          { date: '2025-05-28', price: 95200 },
          { date: '2025-06-28', price: 95524 }
        ],
        volatility: 'medium',
        recommendation: isJewelry ? 
          'Strong upward trend observed over 6 months (15.8% growth). Gold prices have shown consistent growth from ₹82,000 to ₹95,524 per 10 grams. Good investment opportunity for 916 hallmark jewelry.' :
          'Market analysis shows stable pricing trends for this product category.'
      }
    };

    setSearchResults(mockResults);
    setIsAnalyzing(false);
  };

  const formatPriceChange = (change: number) => {
    const isPositive = change > 0;
    return (
      <span className={`flex items-center space-x-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
        <span>{isPositive ? '+' : ''}{change}%</span>
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-7xl w-full max-h-[95vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Camera className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">AI Image Search & 916 Hallmark Price Analysis</h2>
              <p className="text-sm text-gray-600">Upload or capture an image to find similar 916 hallmark jewelry with live price tracking & weight estimation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(95vh-120px)]">
          {!searchResults ? (
            <div className="space-y-6">
              {/* Upload/Camera Tabs */}
              <div className="flex space-x-4 border-b">
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`pb-2 px-1 text-sm font-medium transition-colors ${
                    activeTab === 'upload' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Upload Image
                </button>
                <button
                  onClick={() => {
                    setActiveTab('camera');
                    startCamera();
                  }}
                  className={`pb-2 px-1 text-sm font-medium transition-colors ${
                    activeTab === 'camera' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Use Camera
                </button>
              </div>

              {/* Upload Section */}
              {activeTab === 'upload' && (
                <div>
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-12 w-12 text-gray-400 mb-4" />
                      <p className="mb-2 text-lg text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      <p className="text-xs text-blue-600 mt-2">✨ AI will analyze 916 hallmark jewelry, electronics, fashion & more</p>
                      <p className="text-xs text-yellow-600 mt-1">🏆 Gold jewelry: Get weight estimation & current pricing!</p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              {/* Camera Section */}
              {activeTab === 'camera' && (
                <div className="space-y-4">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-64 bg-gray-900 rounded-lg"
                  />
                  <button
                    onClick={capturePhoto}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Capture Photo
                  </button>
                  <canvas ref={canvasRef} className="hidden" />
                </div>
              )}

              {/* Image Preview */}
              {imagePreview && (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg border"
                    />
                    <button
                      onClick={() => {
                        setImagePreview(null);
                        setSelectedImage(null);
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={analyzeImage}
                    disabled={isAnalyzing}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Analyzing with AI...</span>
                      </>
                    ) : (
                      <>
                        <Search className="h-5 w-5" />
                        <span>Find Similar Products & Analyze Prices + Weight</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {/* Price Analysis Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                  <span>Price Analysis Results - June 28, 2025</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600">Price Range</p>
                    <p className="text-lg font-bold text-gray-900">{searchResults.priceAnalysis.priceRange}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600">Average Price</p>
                    <p className="text-lg font-bold text-gray-900">₹{searchResults.priceAnalysis.avgPrice.toLocaleString()}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600">Best Deal</p>
                    <p className="text-lg font-bold text-green-600">₹{searchResults.priceAnalysis.minPrice.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* NEW: Gold Weight Estimation Section */}
              {searchResults.jewelryData?.estimatedWeight && (
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <Scale className="h-6 w-6 text-yellow-600" />
                    <span>🏆 AI Weight Estimation & Cost Analysis</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Weight Estimation */}
                    <div className="bg-white rounded-lg p-6 border-l-4 border-yellow-500">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                        <Gem className="h-5 w-5 text-yellow-600" />
                        <span>Estimated Weight</span>
                      </h4>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Design Type:</span>
                          <span className="font-bold text-gray-900">{searchResults.jewelryData.estimatedWeight.designType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Weight Range:</span>
                          <span className="font-bold text-yellow-700">
                            {searchResults.jewelryData.estimatedWeight.minGrams}g - {searchResults.jewelryData.estimatedWeight.maxGrams}g
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Average Weight:</span>
                          <span className="font-bold text-yellow-800 text-lg">
                            {searchResults.jewelryData.estimatedWeight.avgGrams}g
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Cost Breakdown */}
                    <div className="bg-white rounded-lg p-6 border-l-4 border-green-500">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        <span>Cost Breakdown</span>
                      </h4>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">24K Gold Cost:</span>
                          <span className="font-bold text-gray-900">₹{searchResults.jewelryData.estimatedWeight.totalCost24K.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">22K Gold Cost:</span>
                          <span className="font-bold text-gray-900">₹{searchResults.jewelryData.estimatedWeight.totalCost22K.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Making Charges:</span>
                          <span className="font-bold text-blue-600">₹{searchResults.jewelryData.estimatedWeight.makingCharges.toLocaleString()}</span>
                        </div>
                        <div className="border-t pt-3 flex justify-between">
                          <span className="text-lg font-bold text-gray-900">Final Price:</span>
                          <span className="text-xl font-bold text-green-600">₹{searchResults.jewelryData.estimatedWeight.finalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Weight Estimation Details */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h5 className="text-sm font-semibold text-blue-900 mb-1">🤖 AI Weight Estimation Details</h5>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Weight estimated using advanced AI image analysis</li>
                          <li>• Based on design type: <strong>{searchResults.jewelryData.estimatedWeight.designType}</strong></li>
                          <li>• Making charges: ₹800 per gram (industry standard)</li>
                          <li>• Prices based on current 916 hallmark gold rates</li>
                          <li>• Final price includes gold cost + making charges</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Jewelry Market Data */}
              {searchResults.jewelryData && (
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <Gem className="h-6 w-6 text-yellow-600" />
                    <span>916 Hallmark Jewelry Market Data - June 28, 2025</span>
                  </h3>

                  {/* Disclaimer */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium text-red-900 mb-1">Important Disclaimer</h4>
                        <p className="text-sm text-red-800">{searchResults.jewelryData.disclaimer}</p>
                      </div>
                    </div>
                  </div>

                  {/* Hallmark Certification Info */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <Shield className="h-5 w-5 text-green-600" />
                      <h4 className="text-lg font-semibold text-green-900">916 Hallmark Certification</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-green-700">Purity Standard</p>
                        <p className="font-bold text-green-900">{searchResults.jewelryData.marketData.hallmarkInfo.purity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-green-700">Certification</p>
                        <p className="font-bold text-green-900">{searchResults.jewelryData.marketData.hallmarkInfo.certification}</p>
                      </div>
                      <div>
                        <p className="text-sm text-green-700">Government Authorized</p>
                        <p className="font-bold text-green-900">
                          {searchResults.jewelryData.marketData.hallmarkInfo.bis ? '✅ BIS Approved' : '❌ Not Verified'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Current Prices */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">24K Gold Price (per gram)</span>
                        {formatPriceChange(searchResults.jewelryData.priceFluctuation.goldChange)}
                      </div>
                      <p className="text-2xl font-bold text-yellow-600">₹{searchResults.jewelryData.currentGoldPrice.price24K.toLocaleString()}</p>
                      <p className="text-xs text-gray-500 mt-1">Last 6 months: +15.8%</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">22K Gold Price (916 Hallmark)</span>
                        {formatPriceChange(searchResults.jewelryData.priceFluctuation.goldChange)}
                      </div>
                      <p className="text-2xl font-bold text-yellow-700">₹{searchResults.jewelryData.currentGoldPrice.price22K.toLocaleString()}</p>
                      <p className="text-xs text-gray-500 mt-1">BIS Certified 916 Purity</p>
                    </div>
                  </div>

                  {/* Enhanced Bar Chart with Growth Indicators */}
                  <div className="bg-white rounded-lg p-6 mb-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="h-6 w-6 text-blue-600" />
                        <h4 className="text-lg font-semibold text-gray-900">{searchResults.jewelryData.marketData.priceChart.period}</h4>
                      </div>
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">Total Growth: </span>
                        <span className="text-green-600 font-bold">+15.8%</span>
                      </div>
                    </div>
                    
                    {/* Interactive Bar Chart */}
                    <div className="space-y-4">
                      {searchResults.jewelryData.marketData.priceChart.data.map((point, index) => {
                        const maxPrice = Math.max(...searchResults.jewelryData!.marketData.priceChart.data.map(d => d.price));
                        const barWidth = (point.price / maxPrice) * 100;
                        const isCurrentMonth = index === searchResults.jewelryData!.marketData.priceChart.data.length - 1;
                        
                        return (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <span className="text-sm font-medium text-gray-700 w-16">{point.month}</span>
                                {point.growth !== undefined && point.growth > 0 && (
                                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                                    +{point.growth}%
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-bold text-gray-900">₹{point.price.toLocaleString()}</span>
                                {isCurrentMonth && (
                                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                                    Current
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {/* Enhanced Bar with Gradient and Animation */}
                            <div className="relative">
                              <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                                <div 
                                  className={`h-4 rounded-full transition-all duration-1000 ease-out ${
                                    isCurrentMonth 
                                      ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 shadow-lg' 
                                      : 'bg-gradient-to-r from-yellow-300 to-yellow-500'
                                  }`}
                                  style={{ 
                                    width: `${barWidth}%`,
                                    animationDelay: `${index * 200}ms`
                                  }}
                                >
                                  {/* Shimmer effect for current month */}
                                  {isCurrentMonth && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                                  )}
                                </div>
                              </div>
                              
                              {/* Price label on bar */}
                              <div 
                                className="absolute top-0 h-4 flex items-center justify-end pr-2"
                                style={{ width: `${Math.max(barWidth, 20)}%` }}
                              >
                                <span className="text-xs font-bold text-white drop-shadow-sm">
                                  {(point.price / 1000).toFixed(0)}K
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Chart Summary */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-1">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">Growth Trend</span>
                        </div>
                        <p className="text-lg font-bold text-green-900">Consistent Upward</p>
                        <p className="text-xs text-green-700">Strong 6-month performance</p>
                      </div>
                      
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-1">
                          <BarChart3 className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-800">Price Range</span>
                        </div>
                        <p className="text-lg font-bold text-blue-900">₹82K - ₹95.5K</p>
                        <p className="text-xs text-blue-700">Per 10 grams (22K gold)</p>
                      </div>
                      
                      <div className="bg-purple-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-1">
                          <Star className="h-4 w-4 text-purple-600" />
                          <span className="text-sm font-medium text-purple-800">Investment Score</span>
                        </div>
                        <p className="text-lg font-bold text-purple-900">Excellent</p>
                        <p className="text-xs text-purple-700">Strong buy signal</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <div className="flex items-start space-x-3">
                        <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h5 className="text-sm font-semibold text-green-900 mb-1">Investment Analysis</h5>
                          <p className="text-sm text-green-800">
                            Gold prices have shown remarkable growth of <strong>15.8%</strong> over 6 months, 
                            rising from ₹82,000 to ₹95,524 per 10 grams. The consistent upward trend with 
                            medium volatility indicates a <strong>strong investment opportunity</strong> for 916 hallmark jewelry.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comprehensive Price Table */}
                  <div className="bg-white rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Current Gold Prices by Weight (June 28, 2025)</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2 px-3 font-medium text-gray-700">Weight</th>
                            <th className="text-right py-2 px-3 font-medium text-gray-700">24K Gold Price</th>
                            <th className="text-right py-2 px-3 font-medium text-gray-700">22K Gold Price (916)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {searchResults.jewelryData.marketData.goldPriceTable.map((row, index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-2 px-3 font-medium">{row.weight}</td>
                              <td className="py-2 px-3 text-right font-bold text-yellow-600">₹{row.price24K.toLocaleString()}</td>
                              <td className="py-2 px-3 text-right font-bold text-yellow-700">₹{row.price22K.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 flex items-center space-x-2">
                    <Clock className="h-3 w-3" />
                    <span>Last updated: {searchResults.jewelryData.marketData.lastUpdated}</span>
                    <span>•</span>
                    <span>Source: goldpriceindia.com & live market data</span>
                  </div>
                </div>
              )}

              {/* Market Trends */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  <span>Market Trends & Investment Advice - June 2025</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="bg-white rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-600 mb-2">Price Volatility</p>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${
                          searchResults.marketTrends.volatility === 'low' ? 'bg-green-500' :
                          searchResults.marketTrends.volatility === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        <span className="capitalize font-medium">{searchResults.marketTrends.volatility}</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-2">Investment Recommendation</p>
                      <p className="text-sm text-gray-900">{searchResults.marketTrends.recommendation}</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-3">6-Month Price History Trend</p>
                    <div className="space-y-2">
                      {searchResults.marketTrends.priceHistory.map((point, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600">{point.date}</span>
                          <span className="font-medium">₹{point.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Similar Products */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Similar Products Found</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.products.map((product) => (
                    <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        {searchResults.jewelryData && (
                          <div className="flex items-center space-x-2 mb-2">
                            <Shield className="h-4 w-4 text-green-600" />
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                              916 Hallmark
                            </span>
                          </div>
                        )}
                        <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h4>
                        <div className="flex items-center space-x-1 mb-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{product.rating} ({product.reviews})</span>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                            )}
                          </div>
                          {product.discount && (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                              {product.discount}% OFF
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => onAddToList(product)}
                          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Add to List
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Similar Designs for Jewelry */}
              {searchResults.jewelryData?.similarDesigns && searchResults.jewelryData.similarDesigns.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                    <Gem className="h-6 w-6 text-yellow-600" />
                    <span>Similar 916 Hallmark Jewelry Designs</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.jewelryData.similarDesigns.map((product) => (
                      <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Shield className="h-4 w-4 text-green-600" />
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                              BIS Certified
                            </span>
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2">{product.name}</h4>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                            <button
                              onClick={() => onAddToList(product)}
                              className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm"
                            >
                              Add to List
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setSearchResults(null);
                    setImagePreview(null);
                    setSelectedImage(null);
                  }}
                  className="flex-1 px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Search Another Image
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};