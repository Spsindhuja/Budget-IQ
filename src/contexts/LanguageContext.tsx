import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi' | 'kn' | 'te' | 'ta' | 'ml' | 'gu' | 'mr' | 'bn' | 'pa' | 'or' | 'as';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// COMPLETE translations for ALL 12 Indian languages including ALL missing keys
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'app.title': 'Budget IQ',
    'app.subtitle': 'Smart Shopping Assistant',
    'header.apiConnected': 'API Connected',
    'header.noApiConnection': 'No API Connection',
    'header.recentPurchases': 'Recent Purchases',
    'header.shoppingList': 'Shopping List',
    'header.budgetSetup': 'Budget Setup',
    'header.apiConfig': 'API Config',

    // Hero Banner
    'hero.smartShopping': 'Smart Shopping Experience',
    'hero.title': 'Discover Amazing',
    'hero.subtitle': 'Products & Deals',
    'hero.description': 'Explore thousands of products across 15+ categories with AI-powered search, real-time price tracking, smart budget management, and flexible EMI options.',
    'hero.startShopping': 'Start Shopping',
    'hero.viewDeals': 'View Deals',
    'hero.categories': '15+ Categories',
    'hero.aiPowered': 'AI-Powered Search',
    'hero.smartBudget': 'Smart Budget + EMI',

    // Search
    'search.placeholder': 'Search products with AI or paste YouTube URL...',
    'search.placeholderConnected': 'API connected! Start searching or paste YouTube URL...',
    'search.voiceSearch': 'Voice Search (Multi-language)',
    'search.imageSearch': 'AI Image Search & Price Analysis',
    'search.aiChat': 'AI Chat Assistant',
    'search.search': 'Search',
    'search.listening': 'Listening... Speak now! (Multi-language supported)',
    'search.multiLanguage': 'Multi-language AI search • Advanced image analysis • Voice commands • Jewelry price tracking • YouTube URL analysis',

    // Categories
    'categories.title': 'Shop by Category',
    'categories.description': 'Discover products across all major categories',
    'categories.updatedRealTime': 'Updated in real-time',
    'categories.items': 'Items',
    'categories.itemsAvailable': 'items available',
    'categories.explore': 'Explore',
    'categories.electronics': 'Electronics',
    'categories.fashion': 'Fashion',
    'categories.homeAndFurniture': 'Home & Furniture',
    'categories.beautyPersonalCare': 'Beauty & Personal Care',
    'categories.groceryEssentials': 'Grocery & Essentials',
    'categories.healthWellness': 'Health & Wellness',
    'categories.booksStationery': 'Books & Stationery',
    'categories.toysBabyKids': 'Toys, Baby & Kids',
    'categories.sportsFitness': 'Sports & Fitness',
    'categories.automotive': 'Automotive',
    'categories.jewelryAccessories': 'Jewelry & Accessories',
    'categories.petSupplies': 'Pet Supplies',
    'categories.travelLuggage': 'Travel & Luggage',
    'categories.dealsOffers': 'Deals & Offers',
    'categories.general': 'General Items',

    // Subcategories - Electronics
    'subcategory.mobilesAccessories': 'Mobiles & Accessories',
    'subcategory.laptopsTablets': 'Laptops & Tablets',
    'subcategory.tvsHomeAppliances': 'TVs & Home Appliances',
    'subcategory.camerasDrones': 'Cameras & Drones',
    'subcategory.gaming': 'Gaming',

    // Subcategories - Fashion
    'subcategory.mensClothing': "Men's Clothing",
    'subcategory.womensClothing': "Women's Clothing",
    'subcategory.kidsBabyWear': 'Kids & Baby Wear',
    'subcategory.footwear': 'Footwear',
    'subcategory.watchesAccessories': 'Watches & Accessories',

    // Subcategories - Home & Furniture
    'subcategory.furniture': 'Furniture',
    'subcategory.homeDecor': 'Home Decor',
    'subcategory.kitchenDining': 'Kitchen & Dining',
    'subcategory.beddingBath': 'Bedding & Bath',
    'subcategory.toolsHardware': 'Tools & Hardware',

    // Subcategories - Beauty & Personal Care
    'subcategory.skincare': 'Skincare',
    'subcategory.makeup': 'Makeup',
    'subcategory.haircare': 'Haircare',
    'subcategory.fragrances': 'Fragrances',
    'subcategory.mensGrooming': "Men's Grooming",

    // Subcategories - Grocery & Essentials
    'subcategory.fruitsVegetables': 'Fruits & Vegetables',
    'subcategory.dairyBakery': 'Dairy & Bakery',
    'subcategory.snacksBeverages': 'Snacks & Beverages',
    'subcategory.staplesPackagedFood': 'Staples & Packaged Food',
    'subcategory.cleaningHousehold': 'Cleaning & Household',

    // Subcategories - Health & Wellness
    'subcategory.vitaminsSupplements': 'Vitamins & Supplements',
    'subcategory.medicalDevices': 'Medical Devices',
    'subcategory.firstAidHealthMonitors': 'First Aid & Health Monitors',
    'subcategory.fitnessEquipment': 'Fitness Equipment',

    // Subcategories - Books & Stationery
    'subcategory.academicBooks': 'Academic Books',
    'subcategory.fictionNonFiction': 'Fiction & Non-Fiction',
    'subcategory.artSupplies': 'Art Supplies',
    'subcategory.officeSupplies': 'Office Supplies',

    // Subcategories - Toys, Baby & Kids
    'subcategory.toysGames': 'Toys & Games',
    'subcategory.babyCareProducts': 'Baby Care Products',
    'subcategory.schoolSupplies': 'School Supplies',

    // Subcategories - Sports & Fitness
    'subcategory.exerciseGymEquipment': 'Exercise & Gym Equipment',
    'subcategory.outdoorSportsGear': 'Outdoor Sports Gear',
    'subcategory.sportswear': 'Sportswear',

    // Subcategories - Automotive
    'subcategory.carAccessories': 'Car Accessories',
    'subcategory.bikeAccessories': 'Bike Accessories',
    'subcategory.toolsEquipment': 'Tools & Equipment',
    'subcategory.oilsLubricants': 'Oils & Lubricants',

    // Subcategories - Jewelry & Accessories
    'subcategory.goldSilver': 'Gold & Silver',
    'subcategory.imitationJewelry': 'Imitation Jewelry',
    'subcategory.bagsWallets': 'Bags & Wallets',
    'subcategory.beltsSunglasses': 'Belts & Sunglasses',

    // Subcategories - Pet Supplies
    'subcategory.petFood': 'Food',
    'subcategory.petToys': 'Toys',
    'subcategory.petGrooming': 'Grooming',
    'subcategory.petAccessories': 'Accessories',

    // Subcategories - Travel & Luggage
    'subcategory.backpacks': 'Backpacks',
    'subcategory.trolleys': 'Trolleys',
    'subcategory.travelAccessories': 'Travel Accessories',

    // Subcategories - Deals & Offers
    'subcategory.dailyDeals': 'Daily Deals',
    'subcategory.flashSales': 'Flash Sales',
    'subcategory.clearance': 'Clearance',

    // Common subcategory text
    'subcategory.more': 'more',

    // PRODUCT NAMES - All products from mockApi.ts
    'product.1': 'iPhone 15 Pro Max 256GB',
    'product.2': 'Samsung Galaxy Watch 6 Classic',
    'product.3': 'MacBook Air M3 13-inch',
    'product.4': 'Nike Air Force 1 Sneakers',
    'product.5': "Levi's 511 Slim Fit Jeans",
    'product.6': 'Mamaearth Tea Tree Face Wash',
    'product.7': 'Lakme Absolute Perfect Radiance Foundation',
    'product.8': 'Organic Quinoa Premium 1kg',
    'product.9': 'Fresh Organic Strawberries 500g',
    'product.10': 'Amul Fresh Milk 1L',
    'product.11': 'IKEA HEMNES Bookcase White',
    'product.12': 'Philips LED Smart Bulb 9W',
    'product.13': 'Himalaya Ashwagandha Tablets',
    'product.14': 'Yoga Mat Anti-Slip 6mm',
    'product.15': 'Eco-Friendly Cleaning Kit',
    'product.16': 'Stainless Steel Water Bottle Set',
    'product.17': 'The Psychology of Money Book',
    'product.18': 'Parker Jotter Ballpoint Pen',
    'product.19': 'Car Dashboard Camera HD',
    'product.20': 'Bike Phone Holder Mount',

    // Budget
    'budget.title': 'Budget Overview',
    'budget.period': 'budget',
    'budget.exceeded': 'Budget Exceeded!',
    'budget.exceededMessage': 'You\'ve exceeded your budget by',
    'budget.getLoanOptions': 'Get Loan Options',
    'budget.totalBudget': 'Total Budget',
    'budget.spent': 'Spent',
    'budget.remaining': 'Remaining',
    'budget.budgetUsed': 'of budget used',
    'budget.activeLoan': 'Active Loan',
    'budget.amount': 'Amount',
    'budget.emi': 'EMI',
    'budget.activeEmis': 'Active EMIs',
    'budget.nextPayment': 'Next payment',
    'budget.monthly': 'monthly',
    'budget.weekly': 'weekly',

    // Products
    'product.new': 'New',
    'product.trending': 'Trending',
    'product.off': 'OFF',
    'product.inStock': 'In Stock',
    'product.outOfStock': 'Out of Stock',
    'product.buyNow': 'Buy Now',
    'product.addToList': 'Add to List',
    'product.processing': 'Processing...',
    'product.adding': 'Adding...',
    'product.added': 'Added!',

    // Stats
    'stats.totalItems': 'Total Items',
    'stats.avgSavings': 'Avg Savings',
    'stats.topCategory': 'Top Category',
    'stats.newToday': 'New Today',
    'stats.browseAll': 'Browse all products',
    'stats.viewDiscounted': 'View discounted items',
    'stats.filterByCategory': 'Filter by category',
    'stats.seeLatest': 'See latest arrivals',

    // Deals
    'deals.flashDeals': 'Flash Deals',
    'deals.limitedTime': 'Limited time offers - grab them before they\'re gone!',
    'deals.endsIn': 'Ends in 2h 45m',
    'deals.hotDeal': 'HOT DEAL',

    // Empty States
    'empty.noConnection': 'No API Connection',
    'empty.noConnectionDesc': 'Connect your e-commerce platform APIs to start browsing real products',
    'empty.noProducts': 'No Products Available',
    'empty.noProductsDesc': 'No products found from your connected APIs. Check your API configuration or try refreshing.',
    'empty.noResults': 'No Results Found',
    'empty.noResultsDesc': 'No products found for your search. Try different keywords or check your API connections.',
    'empty.apiError': 'API Connection Error',
    'empty.apiErrorDesc': 'Unable to fetch data from your connected APIs. Please check your API keys and try again.',
    'empty.configureApis': 'Configure APIs',
    'empty.refreshData': 'Refresh Data',
    'empty.clearSearch': 'Clear Search',
    'empty.checkApiConfig': 'Check API Config',

    // Language Selector - COMPLETE SECTION
    'language.title': 'Select Language',
    'language.subtitle': 'Choose your preferred language',
    'language.changeLanguage': 'Change Language',
    'language.currentLanguage': 'Current Language',
    'language.supportedLanguages': 'Supported Languages',
    'language.interfaceLanguage': 'Interface Language',
    'language.searchLanguage': 'Search in any language',
    'language.voiceSupport': 'Voice commands supported',
    'language.aiTranslation': 'AI-powered translation',

    // Footer
    'footer.description': 'Real-time shopping assistant with live API integration, AI-powered recommendations, smart purchase analysis, and flexible EMI options',
    'footer.liveApi': 'Live API Integration',
    'footer.multiLanguageAi': 'Multi-language AI',
    'footer.realTimeData': 'Real-time Data',
    'footer.securePrivate': 'Secure & Private',
    'footer.jewelryTracking': 'Jewelry Price Tracking',
    'footer.smartEmi': 'Smart EMI Options',
    'footer.smartAnalysis': 'Smart Purchase Analysis',

    // Common
    'common.loading': 'Loading real-time data from APIs...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.warning': 'Warning',
    'common.info': 'Information',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.ok': 'OK',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.close': 'Close',
    'common.currency': '₹',
    'common.perMonth': '/month',
    'common.months': 'months',
    'common.days': 'days',
    'common.hours': 'hours',
    'common.minutes': 'minutes',
  },

  // COMPLETE HINDI TRANSLATIONS INCLUDING ALL MISSING KEYS
  hi: {
    // Header
    'app.title': 'बजट आईक्यू',
    'app.subtitle': 'स्मार्ट शॉपिंग असिस्टेंट',
    'header.apiConnected': 'एपीआई कनेक्टेड',
    'header.noApiConnection': 'कोई एपीआई कनेक्शन नहीं',
    'header.recentPurchases': 'हाल की खरीदारी',
    'header.shoppingList': 'शॉपिंग लिस्ट',
    'header.budgetSetup': 'बजट सेटअप',
    'header.apiConfig': 'एपीआई कॉन्फ़िग',

    // Hero Banner
    'hero.smartShopping': 'स्मार्ट शॉपिंग अनुभव',
    'hero.title': 'अद्भुत खोजें',
    'hero.subtitle': 'उत्पाद और सौदे',
    'hero.description': 'एआई-संचालित खोज, रियल-टाइम मूल्य ट्रैकिंग, स्मार्ट बजट प्रबंधन और लचीले ईएमआई विकल्पों के साथ 15+ श्रेणियों में हजारों उत्पादों का अन्वेषण करें।',
    'hero.startShopping': 'खरीदारी शुरू करें',
    'hero.viewDeals': 'सौदे देखें',
    'hero.categories': '15+ श्रेणियां',
    'hero.aiPowered': 'एआई-संचालित खोज',
    'hero.smartBudget': 'स्मार्ट बजट + ईएमआई',

    // Search
    'search.placeholder': 'एआई के साथ उत्पाद खोजें या YouTube URL पेस्ट करें...',
    'search.placeholderConnected': 'एपीआई कनेक्टेड! खोजना शुरू करें या YouTube URL पेस्ट करें...',
    'search.voiceSearch': 'वॉयस सर्च (बहुभाषी)',
    'search.imageSearch': 'एआई इमेज सर्च और मूल्य विश्लेषण',
    'search.aiChat': 'एआई चैट असिस्टेंट',
    'search.search': 'खोजें',
    'search.listening': 'सुन रहा है... अब बोलें! (बहुभाषी समर्थित)',
    'search.multiLanguage': 'बहुभाषी एआई खोज • उन्नत छवि विश्लेषण • वॉयस कमांड • आभूषण मूल्य ट्रैकिंग • YouTube URL विश्लेषण',

    // Categories
    'categories.title': 'श्रेणी के अनुसार खरीदारी करें',
    'categories.description': 'सभी प्रमुख श्रेणियों में उत्पादों की खोज करें',
    'categories.updatedRealTime': 'रियल-टाइम में अपडेट किया गया',
    'categories.items': 'आइटम',
    'categories.itemsAvailable': 'आइटम उपलब्ध',
    'categories.explore': 'अन्वेषण करें',
    'categories.electronics': 'इलेक्ट्रॉनिक्स',
    'categories.fashion': 'फैशन',
    'categories.homeAndFurniture': 'घर और फर्नीचर',
    'categories.beautyPersonalCare': 'सौंदर्य और व्यक्तिगत देखभाल',
    'categories.groceryEssentials': 'किराना और आवश्यक वस्तुएं',
    'categories.healthWellness': 'स्वास्थ्य और कल्याण',
    'categories.booksStationery': 'किताबें और स्टेशनरी',
    'categories.toysBabyKids': 'खिलौने, बेबी और किड्स',
    'categories.sportsFitness': 'खेल और फिटनेस',
    'categories.automotive': 'ऑटोमोटिव',
    'categories.jewelryAccessories': 'आभूषण और एक्सेसरीज',
    'categories.petSupplies': 'पालतू जानवरों की आपूर्ति',
    'categories.travelLuggage': 'यात्रा और सामान',
    'categories.dealsOffers': 'सौदे और ऑफर',
    'categories.general': 'सामान्य वस्तुएं',

    // Subcategories - Electronics
    'subcategory.mobilesAccessories': 'मोबाइल और एक्सेसरीज',
    'subcategory.laptopsTablets': 'लैपटॉप और टैबलेट',
    'subcategory.tvsHomeAppliances': 'टीवी और घरेलू उपकरण',
    'subcategory.camerasDrones': 'कैमरा और ड्रोन',
    'subcategory.gaming': 'गेमिंग',

    // Subcategories - Fashion
    'subcategory.mensClothing': 'पुरुषों के कपड़े',
    'subcategory.womensClothing': 'महिलाओं के कपड़े',
    'subcategory.kidsBabyWear': 'बच्चों और शिशुओं के कपड़े',
    'subcategory.footwear': 'जूते-चप्पल',
    'subcategory.watchesAccessories': 'घड़ियां और एक्सेसरीज',

    // Subcategories - Home & Furniture
    'subcategory.furniture': 'फर्नीचर',
    'subcategory.homeDecor': 'घर की सजावट',
    'subcategory.kitchenDining': 'रसोई और भोजन',
    'subcategory.beddingBath': 'बिस्तर और स्नान',
    'subcategory.toolsHardware': 'उपकरण और हार्डवेयर',

    // Subcategories - Beauty & Personal Care
    'subcategory.skincare': 'त्वचा की देखभाल',
    'subcategory.makeup': 'मेकअप',
    'subcategory.haircare': 'बालों की देखभाल',
    'subcategory.fragrances': 'इत्र',
    'subcategory.mensGrooming': 'पुरुषों की ग्रूमिंग',

    // Subcategories - Grocery & Essentials
    'subcategory.fruitsVegetables': 'फल और सब्जियां',
    'subcategory.dairyBakery': 'डेयरी और बेकरी',
    'subcategory.snacksBeverages': 'स्नैक्स और पेय',
    'subcategory.staplesPackagedFood': 'मुख्य खाद्य और पैकेज्ड फूड',
    'subcategory.cleaningHousehold': 'सफाई और घरेलू सामान',

    // Subcategories - Health & Wellness
    'subcategory.vitaminsSupplements': 'विटामिन और सप्लीमेंट',
    'subcategory.medicalDevices': 'चिकित्सा उपकरण',
    'subcategory.firstAidHealthMonitors': 'प्राथमिक चिकित्सा और स्वास्थ्य मॉनिटर',
    'subcategory.fitnessEquipment': 'फिटनेस उपकरण',

    // Subcategories - Books & Stationery
    'subcategory.academicBooks': 'शैक्षणिक पुस्तकें',
    'subcategory.fictionNonFiction': 'कथा और गैर-कथा',
    'subcategory.artSupplies': 'कला सामग्री',
    'subcategory.officeSupplies': 'कार्यालय सामग्री',

    // Subcategories - Toys, Baby & Kids
    'subcategory.toysGames': 'खिलौने और खेल',
    'subcategory.babyCareProducts': 'शिशु देखभाल उत्पाद',
    'subcategory.schoolSupplies': 'स्कूल सामग्री',

    // Subcategories - Sports & Fitness
    'subcategory.exerciseGymEquipment': 'व्यायाम और जिम उपकरण',
    'subcategory.outdoorSportsGear': 'आउटडोर खेल गियर',
    'subcategory.sportswear': 'खेल पोशाक',

    // Subcategories - Automotive
    'subcategory.carAccessories': 'कार एक्सेसरीज',
    'subcategory.bikeAccessories': 'बाइक एक्सेसरीज',
    'subcategory.toolsEquipment': 'उपकरण और सामान',
    'subcategory.oilsLubricants': 'तेल और लुब्रिकेंट',

    // Subcategories - Jewelry & Accessories
    'subcategory.goldSilver': 'सोना और चांदी',
    'subcategory.imitationJewelry': 'नकली आभूषण',
    'subcategory.bagsWallets': 'बैग और वॉलेट',
    'subcategory.beltsSunglasses': 'बेल्ट और धूप के चश्मे',

    // Subcategories - Pet Supplies
    'subcategory.petFood': 'भोजन',
    'subcategory.petToys': 'खिलौने',
    'subcategory.petGrooming': 'ग्रूमिंग',
    'subcategory.petAccessories': 'एक्सेसरीज',

    // Subcategories - Travel & Luggage
    'subcategory.backpacks': 'बैकपैक',
    'subcategory.trolleys': 'ट्रॉली',
    'subcategory.travelAccessories': 'यात्रा एक्सेसरीज',

    // Subcategories - Deals & Offers
    'subcategory.dailyDeals': 'दैनिक सौदे',
    'subcategory.flashSales': 'फ्लैश सेल',
    'subcategory.clearance': 'क्लीयरेंस',

    // Common subcategory text
    'subcategory.more': 'और',

    // PRODUCT NAMES IN HINDI
    'product.1': 'आईफोन 15 प्रो मैक्स 256जीबी',
    'product.2': 'सैमसंग गैलेक्सी वॉच 6 क्लासिक',
    'product.3': 'मैकबुक एयर एम3 13-इंच',
    'product.4': 'नाइके एयर फोर्स 1 स्नीकर्स',
    'product.5': 'लेविस 511 स्लिम फिट जींस',
    'product.6': 'मामाअर्थ टी ट्री फेस वॉश',
    'product.7': 'लक्मे एब्सोल्यूट परफेक्ट रेडिएंस फाउंडेशन',
    'product.8': 'ऑर्गेनिक क्विनोआ प्रीमियम 1किग्रा',
    'product.9': 'ताजा ऑर्गेनिक स्ट्रॉबेरी 500ग्राम',
    'product.10': 'अमूल ताजा दूध 1लीटर',
    'product.11': 'आईकिया हेम्नेस बुकशेल्फ सफेद',
    'product.12': 'फिलिप्स एलईडी स्मार्ट बल्ब 9वाट',
    'product.13': 'हिमालया अश्वगंधा टैबलेट',
    'product.14': 'योगा मैट एंटी-स्लिप 6मिमी',
    'product.15': 'इको-फ्रेंडली क्लीनिंग किट',
    'product.16': 'स्टेनलेस स्टील वाटर बॉटल सेट',
    'product.17': 'द साइकोलॉजी ऑफ मनी बुक',
    'product.18': 'पार्कर जॉटर बॉलपॉइंट पेन',
    'product.19': 'कार डैशबोर्ड कैमरा एचडी',
    'product.20': 'बाइक फोन होल्डर माउंट',

    // Budget
    'budget.title': 'बजट अवलोकन',
    'budget.period': 'बजट',
    'budget.exceeded': 'बजट पार हो गया!',
    'budget.exceededMessage': 'आपने अपना बजट पार कर लिया है',
    'budget.getLoanOptions': 'लोन विकल्प प्राप्त करें',
    'budget.totalBudget': 'कुल बजट',
    'budget.spent': 'खर्च किया गया',
    'budget.remaining': 'शेष',
    'budget.budgetUsed': 'बजट का उपयोग किया गया',
    'budget.activeLoan': 'सक्रिय लोन',
    'budget.amount': 'राशि',
    'budget.emi': 'ईएमआई',
    'budget.activeEmis': 'सक्रिय ईएमआई',
    'budget.nextPayment': 'अगला भुगतान',
    'budget.monthly': 'मासिक',
    'budget.weekly': 'साप्ताहिक',

    // Products
    'product.new': 'नया',
    'product.trending': 'ट्रेंडिंग',
    'product.off': 'छूट',
    'product.inStock': 'स्टॉक में',
    'product.outOfStock': 'स्टॉक में नहीं',
    'product.buyNow': 'अभी खरीदें',
    'product.addToList': 'लिस्ट में जोड़ें',
    'product.processing': 'प्रोसेसिंग...',
    'product.adding': 'जोड़ा जा रहा है...',
    'product.added': 'जोड़ा गया!',

    // Stats
    'stats.totalItems': 'कुल आइटम',
    'stats.avgSavings': 'औसत बचत',
    'stats.topCategory': 'शीर्ष श्रेणी',
    'stats.newToday': 'आज नया',
    'stats.browseAll': 'सभी उत्पाद ब्राउज़ करें',
    'stats.viewDiscounted': 'छूट वाले आइटम देखें',
    'stats.filterByCategory': 'श्रेणी के अनुसार फ़िल्टर करें',
    'stats.seeLatest': 'नवीनतम आगमन देखें',

    // Deals
    'deals.flashDeals': 'फ्लैश डील्स',
    'deals.limitedTime': 'सीमित समय के ऑफर - खत्म होने से पहले पकड़ें!',
    'deals.endsIn': '2घ 45मि में समाप्त',
    'deals.hotDeal': 'हॉट डील',

    // Empty States
    'empty.noConnection': 'कोई एपीआई कनेक्शन नहीं',
    'empty.noConnectionDesc': 'वास्तविक उत्पादों को ब्राउज़ करने के लिए अपने ई-कॉमर्स प्लेटफॉर्म एपीआई कनेक्ट करें',
    'empty.noProducts': 'कोई उत्पाद उपलब्ध नहीं',
    'empty.noProductsDesc': 'आपके कनेक्टेड एपीआई से कोई उत्पाद नहीं मिला। अपनी एपीआई कॉन्फ़िगरेशन जांचें या रीफ्रेश करने का प्रयास करें।',
    'empty.noResults': 'कोई परिणाम नहीं मिला',
    'empty.noResultsDesc': 'आपकी खोज के लिए कोई उत्पाद नहीं मिला। विभिन्न कीवर्ड आज़माएं या अपने एपीआई कनेक्शन जांचें।',
    'empty.apiError': 'एपीआई कनेक्शन त्रुटि',
    'empty.apiErrorDesc': 'आपके कनेक्टेड एपीआई से डेटा प्राप्त करने में असमर्थ। कृपया अपनी एपीआई कीज़ जांचें और पुनः प्रयास करें।',
    'empty.configureApis': 'एपीआई कॉन्फ़िगर करें',
    'empty.refreshData': 'डेटा रीफ्रेश करें',
    'empty.clearSearch': 'खोज साफ़ करें',
    'empty.checkApiConfig': 'एपीआई कॉन्फ़िग जांचें',

    // Language Selector - COMPLETE SECTION IN HINDI
    'language.title': 'भाषा चुनें',
    'language.subtitle': 'अपनी पसंदीदा भाषा चुनें',
    'language.changeLanguage': 'भाषा बदलें',
    'language.currentLanguage': 'वर्तमान भाषा',
    'language.supportedLanguages': 'समर्थित भाषाएं',
    'language.interfaceLanguage': 'इंटरफेस भाषा',
    'language.searchLanguage': 'किसी भी भाषा में खोजें',
    'language.voiceSupport': 'वॉयस कमांड समर्थित',
    'language.aiTranslation': 'एआई-संचालित अनुवाद',

    // Footer
    'footer.description': 'लाइव एपीआई एकीकरण, एआई-संचालित सिफारिशें, स्मार्ट खरीदारी विश्लेषण और लचीले ईएमआई विकल्पों के साथ रियल-टाइम शॉपिंग असिस्टेंट',
    'footer.liveApi': 'लाइव एपीआई एकीकरण',
    'footer.multiLanguageAi': 'बहुभाषी एआई',
    'footer.realTimeData': 'रियल-टाइम डेटा',
    'footer.securePrivate': 'सुरक्षित और निजी',
    'footer.jewelryTracking': 'आभूषण मूल्य ट्रैकिंग',
    'footer.smartEmi': 'स्मार्ट ईएमआई विकल्प',
    'footer.smartAnalysis': 'स्मार्ट खरीदारी विश्लेषण',

    // Common
    'common.loading': 'एपीआई से रियल-टाइम डेटा लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता',
    'common.warning': 'चेतावनी',
    'common.info': 'जानकारी',
    'common.yes': 'हां',
    'common.no': 'नहीं',
    'common.ok': 'ठीक है',
    'common.cancel': 'रद्द करें',
    'common.save': 'सेव करें',
    'common.delete': 'डिलीट करें',
    'common.edit': 'संपादित करें',
    'common.view': 'देखें',
    'common.close': 'बंद करें',
    'common.currency': '₹',
    'common.perMonth': '/महीना',
    'common.months': 'महीने',
    'common.days': 'दिन',
    'common.hours': 'घंटे',
    'common.minutes': 'मिनट',
  },

  // COMPLETE KANNADA TRANSLATIONS INCLUDING ALL MISSING KEYS
  kn: {
    // Header
    'app.title': 'ಬಜೆಟ್ ಐಕ್ಯೂ',
    'app.subtitle': 'ಸ್ಮಾರ್ಟ್ ಶಾಪಿಂಗ್ ಅಸಿಸ್ಟೆಂಟ್',
    'header.apiConnected': 'ಎಪಿಐ ಸಂಪರ್ಕಿತ',
    'header.noApiConnection': 'ಯಾವುದೇ ಎಪಿಐ ಸಂಪರ್ಕವಿಲ್ಲ',
    'header.recentPurchases': 'ಇತ್ತೀಚಿನ ಖರೀದಿಗಳು',
    'header.shoppingList': 'ಶಾಪಿಂಗ್ ಪಟ್ಟಿ',
    'header.budgetSetup': 'ಬಜೆಟ್ ಸೆಟಪ್',
    'header.apiConfig': 'ಎಪಿಐ ಕಾನ್ಫಿಗ್',

    // Hero Banner
    'hero.smartShopping': 'ಸ್ಮಾರ್ಟ್ ಶಾಪಿಂಗ್ ಅನುಭವ',
    'hero.title': 'ಅದ್ಭುತವಾದ ಅನ್ವೇಷಿಸಿ',
    'hero.subtitle': 'ಉತ್ಪಾದನೆಗಳು ಮತ್ತು ಒಪ್ಪಂದಗಳು',
    'hero.description': 'ಎಐ-ಚಾಲಿತ ಹುಡುಕಾಟ, ನೈಜ-ಸಮಯದ ಬೆಲೆ ಟ್ರ್ಯಾಕಿಂಗ್, ಸ್ಮಾರ್ಟ್ ಬಜೆಟ್ ನಿರ್ವಹಣೆ ಮತ್ತು ಹೊಂದಿಕೊಳ್ಳುವ ಇಎಮ್ಐ ಆಯ್ಕೆಗಳೊಂದಿಗೆ 15+ ವರ್ಗಗಳಲ್ಲಿ ಸಾವಿರಾರು ಉತ್ಪಾದನೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ।',
    'hero.startShopping': 'ಶಾಪಿಂಗ್ ಪ್ರಾರಂಭಿಸಿ',
    'hero.viewDeals': 'ಒಪ್ಪಂದಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    'hero.categories': '15+ ವರ್ಗಗಳು',
    'hero.aiPowered': 'ಎಐ-ಚಾಲಿತ ಹುಡುಕಾಟ',
    'hero.smartBudget': 'ಸ್ಮಾರ್ಟ್ ಬಜೆಟ್ + ಇಎಮ್ಐ',

    // Search
    'search.placeholder': 'ಎಐ ಯೊಂದಿಗೆ ಉತ್ಪಾದನೆಗಳನ್ನು ಹುಡುಕಿ ಅಥವಾ YouTube URL ಅಂಟಿಸಿ...',
    'search.placeholderConnected': 'ಎಪಿಐ ಸಂಪರ್ಕಿತ! ಹುಡುಕಾಟ ಪ್ರಾರಂಭಿಸಿ ಅಥವಾ YouTube URL ಅಂಟಿಸಿ...',
    'search.voiceSearch': 'ಧ್ವನಿ ಹುಡುಕಾಟ (ಬಹುಭಾಷಾ)',
    'search.imageSearch': 'ಎಐ ಚಿತ್ರ ಹುಡುಕಾಟ ಮತ್ತು ಬೆಲೆ ವಿಶ್ಲೇಷಣೆ',
    'search.aiChat': 'ಎಐ ಚಾಟ್ ಅಸಿಸ್ಟೆಂಟ್',
    'search.search': 'ಹುಡುಕಿ',
    'search.listening': 'ಕೇಳುತ್ತಿದೆ... ಈಗ ಮಾತನಾಡಿ! (ಬಹುಭಾಷಾ ಬೆಂಬಲಿತ)',
    'search.multiLanguage': 'ಬಹುಭಾಷಾ ಎಐ ಹುಡುಕಾಟ • ಸುಧಾರಿತ ಚಿತ್ರ ವಿಶ್ಲೇಷಣೆ • ಧ್ವನಿ ಆಜ್ಞೆಗಳು • ಆಭರಣ ಬೆಲೆ ಟ್ರ್ಯಾಕಿಂಗ್ • YouTube URL ವಿಶ್ಲೇಷಣೆ',

    // Categories
    'categories.title': 'ವರ್ಗದ ಪ್ರಕಾರ ಶಾಪಿಂಗ್ ಮಾಡಿ',
    'categories.description': 'ಎಲ್ಲಾ ಪ್ರಮುಖ ವರ್ಗಗಳಲ್ಲಿ ಉತ್ಪಾದನೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
    'categories.updatedRealTime': 'ನೈಜ-ಸಮಯದಲ್ಲಿ ನವೀಕರಿಸಲಾಗಿದೆ',
    'categories.items': 'ವಸ್ತುಗಳು',
    'categories.itemsAvailable': 'ವಸ್ತುಗಳು ಲಭ್ಯವಿದೆ',
    'categories.explore': 'ಅನ್ವೇಷಿಸಿ',
    'categories.electronics': 'ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್',
    'categories.fashion': 'ಫ್ಯಾಷನ್',
    'categories.homeAndFurniture': 'ಮನೆ ಮತ್ತು ಪೀಠೋಪಕರಣಗಳು',
    'categories.beautyPersonalCare': 'ಸೌಂದರ್ಯ ಮತ್ತು ವೈಯಕ್ತಿಕ ಆರೈಕೆ',
    'categories.groceryEssentials': 'ಕಿರಾಣಿ ಮತ್ತು ಅಗತ್ಯಗಳು',
    'categories.healthWellness': 'ಆರೋಗ್ಯ ಮತ್ತು ಯೋಗಕ್ಷೇಮ',
    'categories.booksStationery': 'ಪುಸ್ತಕಗಳು ಮತ್ತು ಲೇಖನ ಸಾಮಗ್ರಿಗಳು',
    'categories.toysBabyKids': 'ಆಟಿಕೆಗಳು, ಮಗು ಮತ್ತು ಮಕ್ಕಳು',
    'categories.sportsFitness': 'ಕ್ರೀಡೆ ಮತ್ತು ಫಿಟ್‌ನೆಸ್',
    'categories.automotive': 'ಆಟೋಮೋಟಿವ್',
    'categories.jewelryAccessories': 'ಆಭರಣಗಳು ಮತ್ತು ಪರಿಕರಗಳು',
    'categories.petSupplies': 'ಸಾಕುಪ್ರಾಣಿಗಳ ಸರಬರಾಜು',
    'categories.travelLuggage': 'ಪ್ರಯಾಣ ಮತ್ತು ಲಗೇಜ್',
    'categories.dealsOffers': 'ಒಪ್ಪಂದಗಳು ಮತ್ತು ಆಫರ್‌ಗಳು',
    'categories.general': 'ಸಾಮಾನ್ಯ ವಸ್ತುಗಳು',

    // Subcategories - Electronics
    'subcategory.mobilesAccessories': 'ಮೊಬೈಲ್ ಮತ್ತು ಪರಿಕರಗಳು',
    'subcategory.laptopsTablets': 'ಲ್ಯಾಪ್‌ಟಾಪ್ ಮತ್ತು ಟ್ಯಾಬ್ಲೆಟ್‌ಗಳು',
    'subcategory.tvsHomeAppliances': 'ಟಿವಿ ಮತ್ತು ಮನೆಯ ಉಪಕರಣಗಳು',
    'subcategory.camerasDrones': 'ಕ್ಯಾಮೆರಾ ಮತ್ತು ಡ್ರೋನ್‌ಗಳು',
    'subcategory.gaming': 'ಗೇಮಿಂಗ್',

    // Subcategories - Fashion
    'subcategory.mensClothing': 'ಪುರುಷರ ಬಟ್ಟೆಗಳು',
    'subcategory.womensClothing': 'ಮಹಿಳೆಯರ ಬಟ್ಟೆಗಳು',
    'subcategory.kidsBabyWear': 'ಮಕ್ಕಳು ಮತ್ತು ಮಗುವಿನ ಬಟ್ಟೆಗಳು',
    'subcategory.footwear': 'ಪಾದರಕ್ಷೆಗಳು',
    'subcategory.watchesAccessories': 'ಗಡಿಯಾರಗಳು ಮತ್ತು ಪರಿಕರಗಳು',

    // Subcategories - Home & Furniture
    'subcategory.furniture': 'ಪೀಠೋಪಕರಣಗಳು',
    'subcategory.homeDecor': 'ಮನೆಯ ಅಲಂಕಾರ',
    'subcategory.kitchenDining': 'ಅಡುಗೆಮನೆ ಮತ್ತು ಊಟ',
    'subcategory.beddingBath': 'ಹಾಸಿಗೆ ಮತ್ತು ಸ್ನಾನ',
    'subcategory.toolsHardware': 'ಉಪಕರಣಗಳು ಮತ್ತು ಹಾರ್ಡ್‌ವೇರ್',

    // Subcategories - Beauty & Personal Care
    'subcategory.skincare': 'ಚರ್ಮದ ಆರೈಕೆ',
    'subcategory.makeup': 'ಮೇಕಪ್',
    'subcategory.haircare': 'ಕೂದಲಿನ ಆರೈಕೆ',
    'subcategory.fragrances': 'ಸುಗಂಧ ದ್ರವ್ಯಗಳು',
    'subcategory.mensGrooming': 'ಪುರುಷರ ಅಂದಗೊಳಿಸುವಿಕೆ',

    // Subcategories - Grocery & Essentials
    'subcategory.fruitsVegetables': 'ಹಣ್ಣುಗಳು ಮತ್ತು ತರಕಾರಿಗಳು',
    'subcategory.dairyBakery': 'ಡೈರಿ ಮತ್ತು ಬೇಕರಿ',
    'subcategory.snacksBeverages': 'ತಿಂಡಿಗಳು ಮತ್ತು ಪಾನೀಯಗಳು',
    'subcategory.staplesPackagedFood': 'ಮುಖ್ಯ ಆಹಾರ ಮತ್ತು ಪ್ಯಾಕೇಜ್ ಮಾಡಿದ ಆಹಾರ',
    'subcategory.cleaningHousehold': 'ಸ್ವಚ್ಛತೆ ಮತ್ತು ಮನೆಯ ಸಾಮಗ್ರಿಗಳು',

    // Subcategories - Health & Wellness
    'subcategory.vitaminsSupplements': 'ವಿಟಮಿನ್‌ಗಳು ಮತ್ತು ಪೂರಕಗಳು',
    'subcategory.medicalDevices': 'ವೈದ್ಯಕೀಯ ಉಪಕರಣಗಳು',
    'subcategory.firstAidHealthMonitors': 'ಪ್ರಾಥಮಿಕ ಚಿಕಿತ್ಸೆ ಮತ್ತು ಆರೋಗ್ಯ ಮಾನಿಟರ್‌ಗಳು',
    'subcategory.fitnessEquipment': 'ಫಿಟ್‌ನೆಸ್ ಉಪಕರಣಗಳು',

    // Subcategories - Books & Stationery
    'subcategory.academicBooks': 'ಶೈಕ್ಷಣಿಕ ಪುಸ್ತಕಗಳು',
    'subcategory.fictionNonFiction': 'ಕಾಲ್ಪನಿಕ ಮತ್ತು ಅಕಾಲ್ಪನಿಕ',
    'subcategory.artSupplies': 'ಕಲಾ ಸಾಮಗ್ರಿಗಳು',
    'subcategory.officeSupplies': 'ಕಚೇರಿ ಸಾಮಗ್ರಿಗಳು',

    // Subcategories - Toys, Baby & Kids
    'subcategory.toysGames': 'ಆಟಿಕೆಗಳು ಮತ್ತು ಆಟಗಳು',
    'subcategory.babyCareProducts': 'ಮಗುವಿನ ಆರೈಕೆ ಉತ್ಪಾದನೆಗಳು',
    'subcategory.schoolSupplies': 'ಶಾಲಾ ಸಾಮಗ್ರಿಗಳು',

    // Subcategories - Sports & Fitness
    'subcategory.exerciseGymEquipment': 'ವ್ಯಾಯಾಮ ಮತ್ತು ಜಿಮ್ ಉಪಕರಣಗಳು',
    'subcategory.outdoorSportsGear': 'ಹೊರಾಂಗಣ ಕ್ರೀಡಾ ಗೇರ್',
    'subcategory.sportswear': 'ಕ್ರೀಡಾ ಉಡುಪುಗಳು',

    // Subcategories - Automotive
    'subcategory.carAccessories': 'ಕಾರ್ ಪರಿಕರಗಳು',
    'subcategory.bikeAccessories': 'ಬೈಕ್ ಪರಿಕರಗಳು',
    'subcategory.toolsEquipment': 'ಉಪಕರಣಗಳು ಮತ್ತು ಸಾಮಗ್ರಿಗಳು',
    'subcategory.oilsLubricants': 'ತೈಲಗಳು ಮತ್ತು ಲೂಬ್ರಿಕಂಟ್‌ಗಳು',

    // Subcategories - Jewelry & Accessories
    'subcategory.goldSilver': 'ಚಿನ್ನ ಮತ್ತು ಬೆಳ್ಳಿ',
    'subcategory.imitationJewelry': 'ನಕಲಿ ಆಭರಣಗಳು',
    'subcategory.bagsWallets': 'ಬ್ಯಾಗ್‌ಗಳು ಮತ್ತು ವಾಲೆಟ್‌ಗಳು',
    'subcategory.beltsSunglasses': 'ಬೆಲ್ಟ್‌ಗಳು ಮತ್ತು ಸನ್‌ಗ್ಲಾಸ್‌ಗಳು',

    // Subcategories - Pet Supplies
    'subcategory.petFood': 'ಆಹಾರ',
    'subcategory.petToys': 'ಆಟಿಕೆಗಳು',
    'subcategory.petGrooming': 'ಅಂದಗೊಳಿಸುವಿಕೆ',
    'subcategory.petAccessories': 'ಪರಿಕರಗಳು',

    // Subcategories - Travel & Luggage
    'subcategory.backpacks': 'ಬ್ಯಾಕ್‌ಪ್ಯಾಕ್‌ಗಳು',
    'subcategory.trolleys': 'ಟ್ರಾಲಿಗಳು',
    'subcategory.travelAccessories': 'ಪ್ರಯಾಣ ಪರಿಕರಗಳು',

    // Subcategories - Deals & Offers
    'subcategory.dailyDeals': 'ದೈನಂದಿನ ಒಪ್ಪಂದಗಳು',
    'subcategory.flashSales': 'ಫ್ಲ್ಯಾಶ್ ಮಾರಾಟಗಳು',
    'subcategory.clearance': 'ಕ್ಲಿಯರೆನ್ಸ್',

    // Common subcategory text
    'subcategory.more': 'ಇನ್ನಷ್ಟು',

    // PRODUCT NAMES IN KANNADA
    'product.1': 'ಆಯ್‌ಫೋನ್ 15 ಪ್ರೋ ಮ್ಯಾಕ್ಸ್ 256ಜಿಬಿ',
    'product.2': 'ಸ್ಯಾಮ್‌ಸಂಗ್ ಗ್ಯಾಲಕ್ಸಿ ವಾಚ್ 6 ಕ್ಲಾಸಿಕ್',
    'product.3': 'ಮ್ಯಾಕ್‌ಬುಕ್ ಏರ್ ಎಂ3 13-ಇಂಚ್',
    'product.4': 'ನೈಕೆ ಏರ್ ಫೋರ್ಸ್ 1 ಸ್ನೀಕರ್‌ಗಳು',
    'product.5': 'ಲೆವಿಸ್ 511 ಸ್ಲಿಮ್ ಫಿಟ್ ಜೀನ್ಸ್',
    'product.6': 'ಮಾಮಾಅರ್ಥ್ ಟೀ ಟ್ರೀ ಫೇಸ್ ವಾಶ್',
    'product.7': 'ಲಕ್ಮೆ ಅಬ್ಸೊಲ್ಯೂಟ್ ಪರ್ಫೆಕ್ಟ್ ರೇಡಿಯನ್ಸ್ ಫೌಂಡೇಶನ್',
    'product.8': 'ಆರ್ಗ್ಯಾನಿಕ್ ಕ್ವಿನೋವಾ ಪ್ರೀಮಿಯಂ 1ಕಿಲೋ',
    'product.9': 'ತಾಜಾ ಆರ್ಗ್ಯಾನಿಕ್ ಸ್ಟ್ರಾಬೆರಿಗಳು 500ಗ್ರಾಂ',
    'product.10': 'ಅಮೂಲ್ ತಾಜಾ ಹಾಲು 1ಲೀಟರ್',
    'product.11': 'ಐಕಿಯಾ ಹೆಮ್ನೆಸ್ ಪುಸ್ತಕದ ಕಪಾಟು ಬಿಳಿ',
    'product.12': 'ಫಿಲಿಪ್ಸ್ ಎಲ್‌ಇಡಿ ಸ್ಮಾರ್ಟ್ ಬಲ್ಬ್ 9ವಾಟ್',
    'product.13': 'ಹಿಮಾಲಯ ಅಶ್ವಗಂಧಾ ಟ್ಯಾಬ್ಲೆಟ್‌ಗಳು',
    'product.14': 'ಯೋಗ ಮ್ಯಾಟ್ ಆಂಟಿ-ಸ್ಲಿಪ್ 6ಮಿಮೀ',
    'product.15': 'ಇಕೋ-ಫ್ರೆಂಡ್ಲಿ ಕ್ಲೀನಿಂಗ್ ಕಿಟ್',
    'product.16': 'ಸ್ಟೇನ್‌ಲೆಸ್ ಸ್ಟೀಲ್ ವಾಟರ್ ಬಾಟಲ್ ಸೆಟ್',
    'product.17': 'ದ ಸೈಕಾಲಜಿ ಆಫ್ ಮನಿ ಪುಸ್ತಕ',
    'product.18': 'ಪಾರ್ಕರ್ ಜಾಟರ್ ಬಾಲ್‌ಪಾಯಿಂಟ್ ಪೆನ್',
    'product.19': 'ಕಾರ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಕ್ಯಾಮೆರಾ ಎಚ್‌ಡಿ',
    'product.20': 'ಬೈಕ್ ಫೋನ್ ಹೋಲ್ಡರ್ ಮೌಂಟ್',

    // Budget
    'budget.title': 'ಬಜೆಟ್ ಅವಲೋಕನ',
    'budget.period': 'ಬಜೆಟ್',
    'budget.exceeded': 'ಬಜೆಟ್ ಮೀರಿದೆ!',
    'budget.exceededMessage': 'ನೀವು ನಿಮ್ಮ ಬಜೆಟ್ ಅನ್ನು ಮೀರಿದ್ದೀರಿ',
    'budget.getLoanOptions': 'ಸಾಲದ ಆಯ್ಕೆಗಳನ್ನು ಪಡೆಯಿರಿ',
    'budget.totalBudget': 'ಒಟ್ಟು ಬಜೆಟ್',
    'budget.spent': 'ಖರ್ಚು ಮಾಡಲಾಗಿದೆ',
    'budget.remaining': 'ಉಳಿದಿದೆ',
    'budget.budgetUsed': 'ಬಜೆಟ್ ಬಳಸಲಾಗಿದೆ',
    'budget.activeLoan': 'ಸಕ್ರಿಯ ಸಾಲ',
    'budget.amount': 'ಮೊತ್ತ',
    'budget.emi': 'ಇಎಮ್ಐ',
    'budget.activeEmis': 'ಸಕ್ರಿಯ ಇಎಮ್ಐಗಳು',
    'budget.nextPayment': 'ಮುಂದಿನ ಪಾವತಿ',
    'budget.monthly': 'ಮಾಸಿಕ',
    'budget.weekly': 'ಸಾಪ್ತಾಹಿಕ',

    // Products
    'product.new': 'ಹೊಸ',
    'product.trending': 'ಟ್ರೆಂಡಿಂಗ್',
    'product.off': 'ರಿಯಾಯಿತಿ',
    'product.inStock': 'ಸ್ಟಾಕ್‌ನಲ್ಲಿದೆ',
    'product.outOfStock': 'ಸ್ಟಾಕ್‌ನಲ್ಲಿಲ್ಲ',
    'product.buyNow': 'ಈಗ ಖರೀದಿಸಿ',
    'product.addToList': 'ಪಟ್ಟಿಗೆ ಸೇರಿಸಿ',
    'product.processing': 'ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತಿದೆ...',
    'product.adding': 'ಸೇರಿಸಲಾಗುತ್ತಿದೆ...',
    'product.added': 'ಸೇರಿಸಲಾಗಿದೆ!',

    // Stats
    'stats.totalItems': 'ಒಟ್ಟು ವಸ್ತುಗಳು',
    'stats.avgSavings': 'ಸರಾಸರಿ ಉಳಿತಾಯ',
    'stats.topCategory': 'ಪ್ರಮುಖ ವರ್ಗ',
    'stats.newToday': 'ಇಂದು ಹೊಸ',
    'stats.browseAll': 'ಎಲ್ಲಾ ಉತ್ಪಾದನೆಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ',
    'stats.viewDiscounted': 'ರಿಯಾಯಿತಿ ಇರುವ ವಸ್ತುಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    'stats.filterByCategory': 'ವರ್ಗದ ಪ್ರಕಾರ ಫಿಲ್ಟರ್ ಮಾಡಿ',
    'stats.seeLatest': 'ಇತ್ತೀಚಿನ ಆಗಮನಗಳನ್ನು ನೋಡಿ',

    // Deals
    'deals.flashDeals': 'ಫ್ಲ್ಯಾಶ್ ಡೀಲ್‌ಗಳು',
    'deals.limitedTime': 'ಸೀಮಿತ ಸಮಯದ ಆಫರ್‌ಗಳು - ಅವು ಮುಗಿಯುವ ಮೊದಲು ಪಡೆದುಕೊಳ್ಳಿ!',
    'deals.endsIn': '2ಗಂ 45ನಿಮಿಯಲ್ಲಿ ಮುಗಿಯುತ್ತದೆ',
    'deals.hotDeal': 'ಹಾಟ್ ಡೀಲ್',

    // Empty States
    'empty.noConnection': 'ಯಾವುದೇ ಎಪಿಐ ಸಂಪರ್ಕವಿಲ್ಲ',
    'empty.noConnectionDesc': 'ನಿಜವಾದ ಉತ್ಪಾದನೆಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಲು ನಿಮ್ಮ ಇ-ಕಾಮರ್ಸ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಎಪಿಐಗಳನ್ನು ಸಂಪರ್ಕಿಸಿ',
    'empty.noProducts': 'ಯಾವುದೇ ಉತ್ಪಾದನೆಗಳು ಲಭ್ಯವಿಲ್ಲ',
    'empty.noProductsDesc': 'ನಿಮ್ಮ ಸಂಪರ್ಕಿತ ಎಪಿಐಗಳಿಂದ ಯಾವುದೇ ಉತ್ಪಾದನೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ। ನಿಮ್ಮ ಎಪಿಐ ಕಾನ್ಫಿಗರೇಶನ್ ಪರಿಶೀಲಿಸಿ ಅಥವಾ ರಿಫ್ರೆಶ್ ಮಾಡಲು ಪ್ರಯತ್ನಿಸಿ।',
    'empty.noResults': 'ಯಾವುದೇ ಫಲಿತಾಂಶಗಳು ಕಂಡುಬಂದಿಲ್ಲ',
    'empty.noResultsDesc': 'ನಿಮ್ಮ ಹುಡುಕಾಟಕ್ಕೆ ಯಾವುದೇ ಉತ್ಪಾದನೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ। ವಿಭಿನ್ನ ಕೀವರ್ಡ್‌ಗಳನ್ನು ಪ್ರಯತ್ನಿಸಿ ಅಥವಾ ನಿಮ್ಮ ಎಪಿಐ ಸಂಪರ್ಕಗಳನ್ನು ಪರಿಶೀಲಿಸಿ।',
    'empty.apiError': 'ಎಪಿಐ ಸಂಪರ್ಕ ದೋಷ',
    'empty.apiErrorDesc': 'ನಿಮ್ಮ ಸಂಪರ್ಕಿತ ಎಪಿಐಗಳಿಂದ ಡೇಟಾ ಪಡೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ। ದಯವಿಟ್ಟು ನಿಮ್ಮ ಎಪಿಐ ಕೀಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ।',
    'empty.configureApis': 'ಎಪಿಐಗಳನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡಿ',
    'empty.refreshData': 'ಡೇಟಾ ರಿಫ್ರೆಶ್ ಮಾಡಿ',
    'empty.clearSearch': 'ಹುಡುಕಾಟ ತೆರವುಗೊಳಿಸಿ',
    'empty.checkApiConfig': 'ಎಪಿಐ ಕಾನ್ಫಿಗ್ ಪರಿಶೀಲಿಸಿ',

    // Language Selector - COMPLETE SECTION IN KANNADA
    'language.title': 'ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ',
    'language.subtitle': 'ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    'language.changeLanguage': 'ಭಾಷೆ ಬದಲಾಯಿಸಿ',
    'language.currentLanguage': 'ಪ್ರಸ್ತುತ ಭಾಷೆ',
    'language.supportedLanguages': 'ಬೆಂಬಲಿತ ಭಾಷೆಗಳು',
    'language.interfaceLanguage': 'ಇಂಟರ್ಫೇಸ್ ಭಾಷೆ',
    'language.searchLanguage': 'ಯಾವುದೇ ಭಾಷೆಯಲ್ಲಿ ಹುಡುಕಿ',
    'language.voiceSupport': 'ಧ್ವನಿ ಆಜ್ಞೆಗಳು ಬೆಂಬಲಿತ',
    'language.aiTranslation': 'ಎಐ-ಚಾಲಿತ ಅನುವಾದ',

    // Footer
    'footer.description': 'ಲೈವ್ ಎಪಿಐ ಏಕೀಕರಣ, ಎಐ-ಚಾಲಿತ ಶಿಫಾರಸುಗಳು, ಸ್ಮಾರ್ಟ್ ಖರೀದಿ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಹೊಂದಿಕೊಳ್ಳುವ ಇಎಮ್ಐ ಆಯ್ಕೆಗಳೊಂದಿಗೆ ನೈಜ-ಸಮಯದ ಶಾಪಿಂಗ್ ಸಹಾಯಕ',
    'footer.liveApi': 'ಲೈವ್ ಎಪಿಐ ಏಕೀಕರಣ',
    'footer.multiLanguageAi': 'ಬಹುಭಾಷಾ ಎಐ',
    'footer.realTimeData': 'ನೈಜ-ಸಮಯದ ಡೇಟಾ',
    'footer.securePrivate': 'ಸುರಕ್ಷಿತ ಮತ್ತು ಖಾಸಗಿ',
    'footer.jewelryTracking': 'ಆಭರಣ ಬೆಲೆ ಟ್ರ್ಯಾಕಿಂಗ್',
    'footer.smartEmi': 'ಸ್ಮಾರ್ಟ್ ಇಎಮ್ಐ ಆಯ್ಕೆಗಳು',
    'footer.smartAnalysis': 'ಸ್ಮಾರ್ಟ್ ಖರೀದಿ ವಿಶ್ಲೇಷಣೆ',

    // Common
    'common.loading': 'ಎಪಿಐಗಳಿಂದ ನೈಜ-ಸಮಯದ ಡೇಟಾ ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    'common.error': 'ದೋಷ',
    'common.success': 'ಯಶಸ್ಸು',
    'common.warning': 'ಎಚ್ಚರಿಕೆ',
    'common.info': 'ಮಾಹಿತಿ',
    'common.yes': 'ಹೌದು',
    'common.no': 'ಇಲ್ಲ',
    'common.ok': 'ಸರಿ',
    'common.cancel': 'ರದ್ದುಮಾಡಿ',
    'common.save': 'ಉಳಿಸಿ',
    'common.delete': 'ಅಳಿಸಿ',
    'common.edit': 'ಸಂಪಾದಿಸಿ',
    'common.view': 'ವೀಕ್ಷಿಸಿ',
    'common.close': 'ಮುಚ್ಚಿ',
    'common.currency': '₹',
    'common.perMonth': '/ತಿಂಗಳು',
    'common.months': 'ತಿಂಗಳುಗಳು',
    'common.days': 'ದಿನಗಳು',
    'common.hours': 'ಗಂಟೆಗಳು',
    'common.minutes': 'ನಿಮಿಷಗಳು',
  },

  // COMPLETE TELUGU TRANSLATIONS INCLUDING ALL MISSING KEYS
  te: {
    // Header
    'app.title': 'బడ్జెట్ ఐక్యూ',
    'app.subtitle': 'స్మార్ట్ షాపింగ్ అసిస్టెంట్',
    'header.apiConnected': 'ఏపిఐ కనెక్ట్ చేయబడింది',
    'header.noApiConnection': 'ఏపిఐ కనెక్షన్ లేదు',
    'header.recentPurchases': 'ఇటీవలి కొనుగోలులు',
    'header.shoppingList': 'షాపింగ్ లిస్ట్',
    'header.budgetSetup': 'బడ్జెట్ సెటప్',
    'header.apiConfig': 'ఏపిఐ కాన్ఫిగ్',

    // Hero Banner
    'hero.smartShopping': 'స్మార్ట్ షాపింగ్ అనుభవం',
    'hero.title': 'అద్భుతమైన కనుగొనండి',
    'hero.subtitle': 'ఉత్పత్తులు మరియు డీల్స్',
    'hero.description': 'ఏఐ-శక్తితో శోధన, రియల్-టైమ్ ధర ట్రాకింగ్, స్మార్ట్ బడ్జెట్ నిర్వహణ మరియు సరళమైన ఈఎంఐ ఎంపికలతో 15+ వర్గాలలో వేలాది ఉత్పత్తులను అన్వేషించండి।',
    'hero.startShopping': 'షాపింగ్ ప్రారంభించండి',
    'hero.viewDeals': 'డీల్స్ చూడండి',
    'hero.categories': '15+ వర్గాలు',
    'hero.aiPowered': 'ఏఐ-శక్తితో శోధన',
    'hero.smartBudget': 'స్మార్ట్ బడ్జెట్ + ఈఎంఐ',

    // Search
    'search.placeholder': 'AI తో ఉత్పత్తులను వెతకండి లేదా YouTube URL ను పేస్ట్ చేయండి...',
    'search.placeholderConnected': 'ఏపిఐ కనెక్ట్ చేయబడింది! వెతకడం ప్రారంభించండి లేదా YouTube URL పేస్ట్ చేయండి...',
    'search.voiceSearch': 'వాయిస్ సెర్చ్ (బహుభాషా)',
    'search.imageSearch': 'ఏఐ ఇమేజ్ సెర్చ్ మరియు ధర విశ్లేషణ',
    'search.aiChat': 'ఏఐ చాట్ అసిస్టెంట్',
    'search.search': 'వెతకండి',
    'search.listening': 'వింటున్నాను... ఇప్పుడు మాట్లాడండి! (బహుభాషా మద్దతు)',
    'search.multiLanguage': 'బహుభాషా AI శోధన • అధునాతన చిత్ర విశ్లేషణ • వాయిస్ కమాండ్లు • నగల ధర ట్రాకింగ్ • YouTube URL విశ్లేషణ',

    // Categories
    'categories.title': 'వర్గం ప్రకారం షాపింగ్ చేయండి',
    'categories.description': 'అన్ని ప్రధాన వర్గాలలో ఉత్పత్తులను కనుగొనండి',
    'categories.updatedRealTime': 'రియల్-టైమ్‌లో అప్‌డేట్ చేయబడింది',
    'categories.items': 'వస్తువులు',
    'categories.itemsAvailable': 'వస్తువులు అందుబాటులో ఉన్నాయి',
    'categories.explore': 'అన్వేషించండి',
    'categories.electronics': 'ఎలక్ట్రానిక్స్',
    'categories.fashion': 'ఫ్యాషన్',
    'categories.homeAndFurniture': 'ఇల్లు మరియు ఫర్నిచర్',
    'categories.beautyPersonalCare': 'అందం మరియు వ్యక్తిగత సంరక్షణ',
    'categories.groceryEssentials': 'కిరాణా మరియు అవసరాలు',
    'categories.healthWellness': 'ఆరోగ్యం మరియు శ్రేయస్సు',
    'categories.booksStationery': 'పుస్తకాలు మరియు స్టేషనరీ',
    'categories.toysBabyKids': 'బొమ్మలు, బేబీ మరియు పిల్లలు',
    'categories.sportsFitness': 'క్రీడలు మరియు ఫిట్‌నెస్',
    'categories.automotive': 'ఆటోమోటివ్',
    'categories.jewelryAccessories': 'నగలు మరియు ఉపకరణాలు',
    'categories.petSupplies': 'పెంపుడు జంతువుల సామాగ్రి',
    'categories.travelLuggage': 'ప్రయాణం మరియు లగేజీ',
    'categories.dealsOffers': 'డీల్స్ మరియు ఆఫర్లు',
    'categories.general': 'సాధారణ వస్తువులు',

    // Subcategories - Electronics
    'subcategory.mobilesAccessories': 'మొబైల్స్ మరియు ఉపకరణాలు',
    'subcategory.laptopsTablets': 'ల్యాప్‌టాప్‌లు మరియు టాబ్లెట్లు',
    'subcategory.tvsHomeAppliances': 'టీవీలు మరియు గృహ ఉపకరణాలు',
    'subcategory.camerasDrones': 'కెమెరాలు మరియు డ్రోన్లు',
    'subcategory.gaming': 'గేమింగ్',

    // Subcategories - Fashion
    'subcategory.mensClothing': 'పురుషుల దుస్తులు',
    'subcategory.womensClothing': 'మహిళల దుస్తులు',
    'subcategory.kidsBabyWear': 'పిల్లలు మరియు బేబీ దుస్తులు',
    'subcategory.footwear': 'పాదరక్షలు',
    'subcategory.watchesAccessories': 'గడియారాలు మరియు ఉపకరణాలు',

    // Subcategories - Home & Furniture
    'subcategory.furniture': 'ఫర్నిచర్',
    'subcategory.homeDecor': 'ఇంటి అలంకరణ',
    'subcategory.kitchenDining': 'వంటగది మరియు భోజనం',
    'subcategory.beddingBath': 'పడకగది మరియు స్నానం',
    'subcategory.toolsHardware': 'సాధనాలు మరియు హార్డ్‌వేర్',

    // Subcategories - Beauty & Personal Care
    'subcategory.skincare': 'చర్మ సంరక్షణ',
    'subcategory.makeup': 'మేకప్',
    'subcategory.haircare': 'జుట్టు సంరక్షణ',
    'subcategory.fragrances': 'సువాసనలు',
    'subcategory.mensGrooming': 'పురుషుల అందం',

    // Subcategories - Grocery & Essentials
    'subcategory.fruitsVegetables': 'పండ్లు మరియు కూరగాయలు',
    'subcategory.dairyBakery': 'డైరీ మరియు బేకరీ',
    'subcategory.snacksBeverages': 'స్నాక్స్ మరియు పానీయాలు',
    'subcategory.staplesPackagedFood': 'ప్రధాన ఆహారం మరియు ప్యాకేజ్ ఆహారం',
    'subcategory.cleaningHousehold': 'శుభ్రపరచడం మరియు గృహ సామాగ్రి',

    // Subcategories - Health & Wellness
    'subcategory.vitaminsSupplements': 'విటమిన్లు మరియు సప్లిమెంట్లు',
    'subcategory.medicalDevices': 'వైద్య పరికరాలు',
    'subcategory.firstAidHealthMonitors': 'ప్రథమ చికిత్స మరియు ఆరోగ్య మానిటర్లు',
    'subcategory.fitnessEquipment': 'ఫిట్‌నెస్ పరికరాలు',

    // Subcategories - Books & Stationery
    'subcategory.academicBooks': 'విద్యా పుస్తకాలు',
    'subcategory.fictionNonFiction': 'కల్పన మరియు అకల్పన',
    'subcategory.artSupplies': 'కళా సామాగ్రి',
    'subcategory.officeSupplies': 'కార్యాలయ సామాగ్రి',

    // Subcategories - Toys, Baby & Kids
    'subcategory.toysGames': 'బొమ్మలు మరియు ఆటలు',
    'subcategory.babyCareProducts': 'బేబీ కేర్ ఉత్పత్తులు',
    'subcategory.schoolSupplies': 'పాఠశాల సామాగ్రి',

    // Subcategories - Sports & Fitness
    'subcategory.exerciseGymEquipment': 'వ్యాయామం మరియు జిమ్ పరికరాలు',
    'subcategory.outdoorSportsGear': 'అవుట్‌డోర్ స్పోర్ట్స్ గేర్',
    'subcategory.sportswear': 'క్రీడా దుస్తులు',

    // Subcategories - Automotive
    'subcategory.carAccessories': 'కార్ ఉపకరణాలు',
    'subcategory.bikeAccessories': 'బైక్ ఉపకరణాలు',
    'subcategory.toolsEquipment': 'సాధనాలు మరియు పరికరాలు',
    'subcategory.oilsLubricants': 'నూనెలు మరియు లూబ్రికెంట్లు',

    // Subcategories - Jewelry & Accessories
    'subcategory.goldSilver': 'బంగారం మరియు వెండి',
    'subcategory.imitationJewelry': 'నకిలీ నగలు',
    'subcategory.bagsWallets': 'బ్యాగ్‌లు మరియు వాలెట్లు',
    'subcategory.beltsSunglasses': 'బెల్ట్‌లు మరియు సన్‌గ్లాసెస్',

    // Subcategories - Pet Supplies
    'subcategory.petFood': 'ఆహారం',
    'subcategory.petToys': 'బొమ్మలు',
    'subcategory.petGrooming': 'అందం చేయడం',
    'subcategory.petAccessories': 'ఉపకరణాలు',

    // Subcategories - Travel & Luggage
    'subcategory.backpacks': 'బ్యాక్‌ప్యాక్‌లు',
    'subcategory.trolleys': 'ట్రాలీలు',
    'subcategory.travelAccessories': 'ప్రయాణ ఉపకరణాలు',

    // Subcategories - Deals & Offers
    'subcategory.dailyDeals': 'రోజువారీ డీల్స్',
    'subcategory.flashSales': 'ఫ్లాష్ సేల్స్',
    'subcategory.clearance': 'క్లియరెన్స్',

    // Common subcategory text
    'subcategory.more': 'మరిన్ని',

    // PRODUCT NAMES IN TELUGU
    'product.1': 'ఐఫోన్ 15 ప్రో మ్యాక్స్ 256జిబి',
    'product.2': 'సామ్‌సంగ్ గెలాక్సీ వాచ్ 6 క్లాసిక్',
    'product.3': 'మ్యాక్‌బుక్ ఎయిర్ ఎం3 13-ఇంచ్',
    'product.4': 'నైకీ ఎయిర్ ఫోర్స్ 1 స్నీకర్స్',
    'product.5': 'లెవిస్ 511 స్లిమ్ ఫిట్ జీన్స్',
    'product.6': 'మామాఅర్థ్ టీ ట్రీ ఫేస్ వాష్',
    'product.7': 'లక్మే అబ్సొల్యూట్ పర్ఫెక్ట్ రేడియన్స్ ఫౌండేషన్',
    'product.8': 'ఆర్గానిక్ క్వినోవా ప్రీమియం 1కేజీ',
    'product.9': 'తాజా ఆర్గానిక్ స్ట్రాబెర్రీలు 500గ్రా',
    'product.10': 'అమూల్ తాజా పాలు 1లీటర్',
    'product.11': 'ఐకియా హెమ్నెస్ బుక్‌కేస్ వైట్',
    'product.12': 'ఫిలిప్స్ ఎల్ఈడీ స్మార్ట్ బల్బ్ 9వాట్',
    'product.13': 'హిమాలయ అశ్వగంధా టాబ్లెట్స్',
    'product.14': 'యోగా మ్యాట్ యాంటీ-స్లిప్ 6మిమీ',
    'product.15': 'ఎకో-ఫ్రెండ్లీ క్లీనింగ్ కిట్',
    'product.16': 'స్టెయిన్‌లెస్ స్టీల్ వాటర్ బాటిల్ సెట్',
    'product.17': 'ది సైకాలజీ ఆఫ్ మనీ బుక్',
    'product.18': 'పార్కర్ జాటర్ బాల్‌పాయింట్ పెన్',
    'product.19': 'కార్ డ్యాష్‌బోర్డ్ కెమెరా హెచ్‌డీ',
    'product.20': 'బైక్ ఫోన్ హోల్డర్ మౌంట్',

    // Budget
    'budget.title': 'బడ్జెట్ అవలోకనం',
    'budget.period': 'బడ్జెట్',
    'budget.exceeded': 'బడ్జెట్ మించిపోయింది!',
    'budget.exceededMessage': 'మీరు మీ బడ్జెట్‌ను మించిపోయారు',
    'budget.getLoanOptions': 'లోన్ ఎంపికలను పొందండి',
    'budget.totalBudget': 'మొత్తం బడ్జెట్',
    'budget.spent': 'ఖర్చు చేయబడింది',
    'budget.remaining': 'మిగిలినది',
    'budget.budgetUsed': 'బడ్జెట్ ఉపయోగించబడింది',
    'budget.activeLoan': 'క్రియాశీల లోన్',
    'budget.amount': 'మొత్తం',
    'budget.emi': 'ఈఎంఐ',
    'budget.activeEmis': 'క్రియాశీల ఈఎంఐలు',
    'budget.nextPayment': 'తదుపరి చెల్లింపు',
    'budget.monthly': 'నెలవారీ',
    'budget.weekly': 'వారపు',

    // Products
    'product.new': 'కొత్త',
    'product.trending': 'ట్రెండింగ్',
    'product.off': 'తగ్గింపు',
    'product.inStock': 'స్టాక్‌లో ఉంది',
    'product.outOfStock': 'స్టాక్‌లో లేదు',
    'product.buyNow': 'ఇప్పుడే కొనండి',
    'product.addToList': 'లిస్ట్‌కు జోడించండి',
    'product.processing': 'ప్రాసెసింగ్...',
    'product.adding': 'జోడిస్తున్నాము...',
    'product.added': 'జోడించబడింది!',

    // Stats
    'stats.totalItems': 'మొత్తం వస్తువులు',
    'stats.avgSavings': 'సగటు పొదుపు',
    'stats.topCategory': 'టాప్ వర్గం',
    'stats.newToday': 'ఈరోజు కొత్త',
    'stats.browseAll': 'అన్ని ఉత్పత్తులను బ్రౌజ్ చేయండి',
    'stats.viewDiscounted': 'తగ్గింపు వస్తువులను చూడండి',
    'stats.filterByCategory': 'వర్గం ప్రకారం ఫిల్టర్ చేయండి',
    'stats.seeLatest': 'తాజా రాకలను చూడండి',

    // Deals
    'deals.flashDeals': 'ఫ్లాష్ డీల్స్',
    'deals.limitedTime': 'పరిమిత సమయ ఆఫర్లు - అవి అయిపోయే ముందు పట్టుకోండి!',
    'deals.endsIn': '2గం 45ని లో ముగుస్తుంది',
    'deals.hotDeal': 'హాట్ డీల్',

    // Empty States
    'empty.noConnection': 'ఏపిఐ కనెక్షన్ లేదు',
    'empty.noConnectionDesc': 'నిజమైన ఉత్పత్తులను బ్రౌజ్ చేయడానికి మీ ఇ-కామర్స్ ప్లాట్‌ఫారమ్ ఏపిఐలను కనెక్ట్ చేయండి',
    'empty.noProducts': 'ఉత్పత్తులు అందుబాటులో లేవు',
    'empty.noProductsDesc': 'మీ కనెక్ట్ చేసిన ఏపిఐల నుండి ఉత్పత్తులు కనుగొనబడలేదు। మీ ఏపిఐ కాన్ఫిగరేషన్‌ను తనిఖీ చేయండి లేదా రిఫ్రెష్ చేయడానికి ప్రయత్నించండి।',
    'empty.noResults': 'ఫలితాలు కనుగొనబడలేదు',
    'empty.noResultsDesc': 'మీ శోధనకు ఉత్పత్తులు కనుగొనబడలేదు। వేరే కీవర్డ్‌లను ప్రయత్నించండి లేదా మీ ఏపిఐ కనెక్షన్‌లను తనిఖీ చేయండి।',
    'empty.apiError': 'ఏపిఐ కనెక్షన్ లోపం',
    'empty.apiErrorDesc': 'మీ కనెక్ట్ చేసిన ఏపిఐల నుండి డేటాను పొందలేకపోయాము। దయచేసి మీ ఏపిఐ కీలను తనిఖీ చేసి మళ్లీ ప్రయత్నించండి।',
    'empty.configureApis': 'ఏపిఐలను కాన్ఫిగర్ చేయండి',
    'empty.refreshData': 'డేటాను రిఫ్రెష్ చేయండి',
    'empty.clearSearch': 'శోధనను క్లియర్ చేయండి',
    'empty.checkApiConfig': 'ఏపిఐ కాన్ఫిగ్‌ను తనిఖీ చేయండి',

    // Language Selector - COMPLETE SECTION IN TELUGU
    'language.title': 'భాష ఎంచుకోండి',
    'language.subtitle': 'మీ ఇష్టమైన భాషను ఎంచుకోండి',
    'language.changeLanguage': 'భాష మార్చండి',
    'language.currentLanguage': 'ప్రస్తుత భాష',
    'language.supportedLanguages': 'మద్దతు ఉన్న భాషలు',
    'language.interfaceLanguage': 'ఇంటర్‌ఫేస్ భాష',
    'language.searchLanguage': 'ఏ భాషలోనైనా వెతకండి',
    'language.voiceSupport': 'వాయిస్ కమాండ్లకు మద్దతు',
    'language.aiTranslation': 'AI-శక్తితో అనువాదం',

    // Footer
    'footer.description': 'లైవ్ ఏపిఐ ఇంటిగ్రేషన్, ఏఐ-శక్తితో సిఫార్సులు, స్మార్ట్ కొనుగోలు విశ్లేషణ మరియు సరళమైన ఈఎంఐ ఎంపికలతో రియల్-టైమ్ షాపింగ్ అసిస్టెంట్',
    'footer.liveApi': 'లైవ్ ఏపిఐ ఇంటిగ్రేషన్',
    'footer.multiLanguageAi': 'బహుభాషా ఏఐ',
    'footer.realTimeData': 'రియల్-టైమ్ డేటా',
    'footer.securePrivate': 'సురక్షితం మరియు ప్రైవేట్',
    'footer.jewelryTracking': 'నగల ధర ట్రాకింగ్',
    'footer.smartEmi': 'స్మార్ట్ ఈఎంఐ ఎంపికలు',
    'footer.smartAnalysis': 'స్మార్ట్ కొనుగోలు విశ్లేషణ',

    // Common
    'common.loading': 'ఏపిఐల నుండి రియల్-టైమ్ డేటా లోడ్ అవుతోంది...',
    'common.error': 'లోపం',
    'common.success': 'విజయం',
    'common.warning': 'హెచ్చరిక',
    'common.info': 'సమాచారం',
    'common.yes': 'అవును',
    'common.no': 'లేదు',
    'common.ok': 'సరే',
    'common.cancel': 'రద్దు చేయండి',
    'common.save': 'సేవ్ చేయండి',
    'common.delete': 'తొలగించండి',
    'common.edit': 'సవరించండి',
    'common.view': 'చూడండి',
    'common.close': 'మూసివేయండి',
    'common.currency': '₹',
    'common.perMonth': '/నెల',
    'common.months': 'నెలలు',
    'common.days': 'రోజులు',
    'common.hours': 'గంటలు',
    'common.minutes': 'నిమిషాలు',
  },

  // COMPLETE TAMIL TRANSLATIONS INCLUDING ALL MISSING KEYS
  ta: {
    // Header
    'app.title': 'பட்ஜெட் ஐக்யூ',
    'app.subtitle': 'ஸ்மார்ட் ஷாப்பிங் அசிஸ்டெண்ட்',
    'header.apiConnected': 'ஏபிஐ இணைக்கப்பட்டது',
    'header.noApiConnection': 'ஏபிஐ இணைப்பு இல்லை',
    'header.recentPurchases': 'சமீபத்திய வாங்கல்கள்',
    'header.shoppingList': 'ஷாப்பிங் பட்டியல்',
    'header.budgetSetup': 'பட்ஜெட் அமைப்பு',
    'header.apiConfig': 'ஏபிஐ கான்ஃபிக்',

    // Hero Banner
    'hero.smartShopping': 'ஸ்மார்ட் ஷாப்பிங் அனுபவம்',
    'hero.title': 'அற்புதமான கண்டுபிடிக்கவும்',
    'hero.subtitle': 'தயாரிப்புகள் மற்றும் ஒப்பந்தங்கள்',
    'hero.description': 'ஏஐ-இயங்கும் தேடல், நிகழ்நேர விலை கண்காணிப்பு, ஸ்மார்ட் பட்ஜெட் நிர்வாகம் மற்றும் நெகிழ்வான ஈஎம்ஐ விருப்பங்களுடன் 15+ வகைகளில் ஆயிரக்கணக்கான தயாரிப்புகளை ஆராயுங்கள்.',
    'hero.startShopping': 'ஷாப்பிங் தொடங்கவும்',
    'hero.viewDeals': 'ஒப்பந்தங்களைப் பார்க்கவும்',
    'hero.categories': '15+ வகைகள்',
    'hero.aiPowered': 'ஏஐ-இயங்கும் தேடல்',
    'hero.smartBudget': 'ஸ்மார்ட் பட்ஜெட் + ஈஎம்ஐ',

    // Search
    'search.placeholder': 'AI உடன் தயாரிப்புகளைத் தேடுங்கள் அல்லது YouTube URL ஐ ஒட்டுங்கள்...',
    'search.placeholderConnected': 'ஏபிஐ இணைக்கப்பட்டது! தேடலைத் தொடங்கவும் அல்லது YouTube URL ஐ ஒட்டுங்கள்...',
    'search.voiceSearch': 'குரல் தேடல் (பல மொழி)',
    'search.imageSearch': 'ஏஐ படத் தேடல் மற்றும் விலை பகுப்பாய்வு',
    'search.aiChat': 'ஏஐ சாட் அசிஸ்டெண்ட்',
    'search.search': 'தேடுங்கள்',
    'search.listening': 'கேட்டுக்கொண்டிருக்கிறது... இப்போது பேசுங்கள்! (பல மொழி ஆதரவு)',
    'search.multiLanguage': 'பல மொழி AI தேடல் • மேம்பட்ட படம் பகுப்பாய்வு • குரல் கட்டளைகள் • நகை விலை கண்காணிப்பு • YouTube URL பகுப்பாய்வு',

    // Categories
    'categories.title': 'வகை அடிப்படையில் ஷாப்பிங் செய்யுங்கள்',
    'categories.description': 'அனைத்து முக்கிய வகைகளிலும் தயாரிப்புகளைக் கண்டறியுங்கள்',
    'categories.updatedRealTime': 'நிகழ்நேரத்தில் புதுப்பிக்கப்பட்டது',
    'categories.items': 'பொருட்கள்',
    'categories.itemsAvailable': 'பொருட்கள் கிடைக்கின்றன',
    'categories.explore': 'ஆராயுங்கள்',
    'categories.electronics': 'எலக்ட்ரானிக்ஸ்',
    'categories.fashion': 'ஃபேஷன்',
    'categories.homeAndFurniture': 'வீடு மற்றும் மரச்சாமான்கள்',
    'categories.beautyPersonalCare': 'அழகு மற்றும் தனிப்பட்ட பராமரிப்பு',
    'categories.groceryEssentials': 'மளிகை மற்றும் அத்தியாவசியங்கள்',
    'categories.healthWellness': 'ஆரோக்கியம் மற்றும் நல்வாழ்வு',
    'categories.booksStationery': 'புத்தகங்கள் மற்றும் எழுதுபொருட்கள்',
    'categories.toysBabyKids': 'பொம்மைகள், குழந்தை மற்றும் குழந்தைகள்',
    'categories.sportsFitness': 'விளையாட்டு மற்றும் உடற்பயிற்சி',
    'categories.automotive': 'ஆட்டோமோட்டிவ்',
    'categories.jewelryAccessories': 'நகைகள் மற்றும் பாகங்கள்',
    'categories.petSupplies': 'செல்லப்பிராணி பொருட்கள்',
    'categories.travelLuggage': 'பயணம் மற்றும் லக்கேஜ்',
    'categories.dealsOffers': 'ஒப்பந்தங்கள் மற்றும் சலுகைகள்',
    'categories.general': 'பொது பொருட்கள்',

    // Subcategories - Electronics
    'subcategory.mobilesAccessories': 'மொபைல்கள் மற்றும் பாகங்கள்',
    'subcategory.laptopsTablets': 'லேப்டாப்கள் மற்றும் டேப்லெட்கள்',
    'subcategory.tvsHomeAppliances': 'டிவிகள் மற்றும் வீட்டு உபகரணங்கள்',
    'subcategory.camerasDrones': 'கேமராக்கள் மற்றும் ட்ரோன்கள்',
    'subcategory.gaming': 'கேமிங்',

    // Subcategories - Fashion
    'subcategory.mensClothing': 'ஆண்களின் ஆடைகள்',
    'subcategory.womensClothing': 'பெண்களின் ஆடைகள்',
    'subcategory.kidsBabyWear': 'குழந்தைகள் மற்றும் குழந்தை ஆடைகள்',
    'subcategory.footwear': 'காலணிகள்',
    'subcategory.watchesAccessories': 'கடிகாரங்கள் மற்றும் பாகங்கள்',

    // Subcategories - Home & Furniture
    'subcategory.furniture': 'மரச்சாமான்கள்',
    'subcategory.homeDecor': 'வீட்டு அலங்காரம்',
    'subcategory.kitchenDining': 'சமையலறை மற்றும் உணவு',
    'subcategory.beddingBath': 'படுக்கை மற்றும் குளியல்',
    'subcategory.toolsHardware': 'கருவிகள் மற்றும் வன்பொருள்',

    // Subcategories - Beauty & Personal Care
    'subcategory.skincare': 'தோல் பராமரிப்பு',
    'subcategory.makeup': 'ஒப்பனை',
    'subcategory.haircare': 'முடி பராமரிப்பு',
    'subcategory.fragrances': 'வாசனை திரவியங்கள்',
    'subcategory.mensGrooming': 'ஆண்களின் அழகு',

    // Subcategories - Grocery & Essentials
    'subcategory.fruitsVegetables': 'பழங்கள் மற்றும் காய்கறிகள்',
    'subcategory.dairyBakery': 'பால் மற்றும் பேக்கரி',
    'subcategory.snacksBeverages': 'தின்பண்டங்கள் மற்றும் பானங்கள்',
    'subcategory.staplesPackagedFood': 'முக்கிய உணவு மற்றும் பேக்கேஜ் உணவு',
    'subcategory.cleaningHousehold': 'சுத்தம் மற்றும் வீட்டுப் பொருட்கள்',

    // Subcategories - Health & Wellness
    'subcategory.vitaminsSupplements': 'வைட்டமின்கள் மற்றும் சப்ளிமெண்ட்கள்',
    'subcategory.medicalDevices': 'மருத்துவ சாதனங்கள்',
    'subcategory.firstAidHealthMonitors': 'முதலுதவி மற்றும் ஆரோக்கிய மானிட்டர்கள்',
    'subcategory.fitnessEquipment': 'உடற்பயிற்சி உபகரணங்கள்',

    // Subcategories - Books & Stationery
    'subcategory.academicBooks': 'கல்வி புத்தகங்கள்',
    'subcategory.fictionNonFiction': 'கற்பனை மற்றும் உண்மை',
    'subcategory.artSupplies': 'கலைப் பொருட்கள்',
    'subcategory.officeSupplies': 'அலுவலகப் பொருட்கள்',

    // Subcategories - Toys, Baby & Kids
    'subcategory.toysGames': 'பொம்மைகள் மற்றும் விளையாட்டுகள்',
    'subcategory.babyCareProducts': 'குழந்தை பராமரிப்பு தயாரிப்புகள்',
    'subcategory.schoolSupplies': 'பள்ளிப் பொருட்கள்',

    // Subcategories - Sports & Fitness
    'subcategory.exerciseGymEquipment': 'உடற்பயிற்சி மற்றும் ஜிம் உபகரணங்கள்',
    'subcategory.outdoorSportsGear': 'வெளிப்புற விளையாட்டு கியர்',
    'subcategory.sportswear': 'விளையாட்டு ஆடைகள்',

    // Subcategories - Automotive
    'subcategory.carAccessories': 'கார் பாகங்கள்',
    'subcategory.bikeAccessories': 'பைக் பாகங்கள்',
    'subcategory.toolsEquipment': 'கருவிகள் மற்றும் உபகரணங்கள்',
    'subcategory.oilsLubricants': 'எண்ணெய்கள் மற்றும் லூப்ரிகண்ட்கள்',

    // Subcategories - Jewelry & Accessories
    'subcategory.goldSilver': 'தங்கம் மற்றும் வெள்ளி',
    'subcategory.imitationJewelry': 'போலி நகைகள்',
    'subcategory.bagsWallets': 'பைகள் மற்றும் பணப்பைகள்',
    'subcategory.beltsSunglasses': 'பெல்ட்கள் மற்றும் சன்கிளாஸ்கள்',

    // Subcategories - Pet Supplies
    'subcategory.petFood': 'உணவு',
    'subcategory.petToys': 'பொம்மைகள்',
    'subcategory.petGrooming': 'அழகுபடுத்துதல்',
    'subcategory.petAccessories': 'பாகங்கள்',

    // Subcategories - Travel & Luggage
    'subcategory.backpacks': 'பேக்பேக்குகள்',
    'subcategory.trolleys': 'ட்ராலிகள்',
    'subcategory.travelAccessories': 'பயண பாகங்கள்',

    // Subcategories - Deals & Offers
    'subcategory.dailyDeals': 'தினசரி ஒப்பந்தங்கள்',
    'subcategory.flashSales': 'ஃப்ளாஷ் விற்பனைகள்',
    'subcategory.clearance': 'கிளியரன்ஸ்',

    // Common subcategory text
    'subcategory.more': 'மேலும்',

    // PRODUCT NAMES IN TAMIL
    'product.1': 'ஐபோன் 15 ப்ரோ மேக்ஸ் 256ஜிபி',
    'product.2': 'சாம்சங் கேலக்ஸி வாட்ச் 6 கிளாசிக்',
    'product.3': 'மேக்புக் ஏர் எம்3 13-இன்ச்',
    'product.4': 'நைக் ஏர் ஃபோர்ஸ் 1 ஸ்னீக்கர்ஸ்',
    'product.5': 'லெவிஸ் 511 ஸ்லிம் ஃபிட் ஜீன்ஸ்',
    'product.6': 'மாமாஅர்த் டீ ட்ரீ ஃபேஸ் வாஷ்',
    'product.7': 'லக்மே அப்சொல்யூட் பெர்ஃபெக்ட் ரேடியன்ஸ் ஃபவுண்டேஷன்',
    'product.8': 'ஆர்கானிக் குயினோவா பிரீமியம் 1கிலோ',
    'product.9': 'புதிய ஆர்கானிக் ஸ்ட்ராபெர்ரி 500கிராம்',
    'product.10': 'அமுல் புதிய பால் 1லிட்டர்',
    'product.11': 'இகியா ஹெம்னெஸ் புத்தக அலமாரி வெள்ளை',
    'product.12': 'பிலிப்ஸ் எல்இடி ஸ்மார்ட் பல்ப் 9வாட்',
    'product.13': 'இமாலயா அஸ்வகந்தா மாத்திரைகள்',
    'product.14': 'யோகா மேட் ஆன்டி-ஸ்லிப் 6மிமீ',
    'product.15': 'சுற்றுச்சூழல் நட்பு சுத்தம் செய்யும் கிட்',
    'product.16': 'ஸ்டெயின்லெஸ் ஸ்டீல் வாட்டர் பாட்டில் செட்',
    'product.17': 'தி சைக்காலஜி ஆஃப் மனி புத்தகம்',
    'product.18': 'பார்க்கர் ஜாட்டர் பால்பாயிண்ட் பேனா',
    'product.19': 'கார் டாஷ்போர்டு கேமரா எச்டி',
    'product.20': 'பைக் ஃபோன் ஹோல்டர் மவுண்ட்',

    // Budget
    'budget.title': 'பட்ஜெட் கண்ணோட்டம்',
    'budget.period': 'பட்ஜெட்',
    'budget.exceeded': 'பட்ஜெட் மீறப்பட்டது!',
    'budget.exceededMessage': 'நீங்கள் உங்கள் பட்ஜெட்டை மீறிவிட்டீர்கள்',
    'budget.getLoanOptions': 'கடன் விருப்பங்களைப் பெறுங்கள்',
    'budget.totalBudget': 'மொத்த பட்ஜெட்',
    'budget.spent': 'செலவழித்தது',
    'budget.remaining': 'மீதமுள்ளது',
    'budget.budgetUsed': 'பட்ஜெட் பயன்படுத்தப்பட்டது',
    'budget.activeLoan': 'செயலில் உள்ள கடன்',
    'budget.amount': 'தொகை',
    'budget.emi': 'ஈஎம்ஐ',
    'budget.activeEmis': 'செயலில் உள்ள ஈஎம்ஐகள்',
    'budget.nextPayment': 'அடுத்த கட்டணம்',
    'budget.monthly': 'மாதாந்திர',
    'budget.weekly': 'வாராந்திர',

    // Products
    'product.new': 'புதியது',
    'product.trending': 'டிரெண்டிங்',
    'product.off': 'தள்ளுபடி',
    'product.inStock': 'ஸ்டாக்கில் உள்ளது',
    'product.outOfStock': 'ஸ்டாக்கில் இல்லை',
    'product.buyNow': 'இப்போதே வாங்கு',
    'product.addToList': 'பட்டியலில் சேர்',
    'product.processing': 'செயலாக்கப்படுகிறது...',
    'product.adding': 'சேர்க்கப்படுகிறது...',
    'product.added': 'சேர்க்கப்பட்டது!',

    // Stats
    'stats.totalItems': 'மொத்த பொருட்கள்',
    'stats.avgSavings': 'சராசரி சேமிப்பு',
    'stats.topCategory': 'சிறந்த வகை',
    'stats.newToday': 'இன்று புதியது',
    'stats.browseAll': 'அனைத்து தயாரிப்புகளையும் பார்வையிடுங்கள்',
    'stats.viewDiscounted': 'தள்ளுபடி பொருட்களைப் பார்க்கவும்',
    'stats.filterByCategory': 'வகை மூலம் வடிகட்டவும்',
    'stats.seeLatest': 'சமீபத்திய வருகைகளைப் பார்க்கவும்',

    // Deals
    'deals.flashDeals': 'ஃப்ளாஷ் டீல்ஸ்',
    'deals.limitedTime': 'குறுகிய கால சலுகைகள் - அவை போகும் முன் பிடிக்கவும்!',
    'deals.endsIn': '2மணி 45நிமி இல் முடிவடைகிறது',
    'deals.hotDeal': 'ஹாட் டீல்',

    // Empty States
    'empty.noConnection': 'ஏபிஐ இணைப்பு இல்லை',
    'empty.noConnectionDesc': 'உண்மையான தயாரிப்புகளை உலாவத் தொடங்க உங்கள் இ-காமர்ஸ் தளம் ஏபிஐகளை இணைக்கவும்',
    'empty.noProducts': 'தயாரிப்புகள் கிடைக்கவில்லை',
    'empty.noProductsDesc': 'உங்கள் இணைக்கப்பட்ட ஏபிஐகளில் இருந்து தயாரிப்புகள் எதுவும் கிடைக்கவில்லை. உங்கள் ஏபிஐ கான்ஃபிகரேஷனைச் சரிபார்க்கவும் அல்லது புதுப்பிக்க முயற்சிக்கவும்.',
    'empty.noResults': 'முடிவுகள் எதுவும் கிடைக்கவில்லை',
    'empty.noResultsDesc': 'உங்கள் தேடலுக்கு தயாரிப்புகள் எதுவும் கிடைக்கவில்லை. வேறு கீவேர்டுகளை முயற்சிக்கவும் அல்லது உங்கள் ஏபிஐ இணைப்புகளைச் சரிபார்க்கவும்.',
    'empty.apiError': 'ஏபிஐ இணைப்பு பிழை',
    'empty.apiErrorDesc': 'உங்கள் இணைக்கப்பட்ட ஏபிஐகளில் இருந்து தரவைப் பெற முடியவில்லை. உங்கள் ஏபிஐ விசைகளைச் சரிபார்த்து மீண்டும் முயற்சிக்கவும்.',
    'empty.configureApis': 'ஏபிஐகளை கான்ஃபிகர் செய்யவும்',
    'empty.refreshData': 'தரவைப் புதுப்பிக்கவும்',
    'empty.clearSearch': 'தேடலை அழிக்கவும்',
    'empty.checkApiConfig': 'ஏபிஐ கான்ஃபிக்கைச் சரிபார்க்கவும்',

    // Language Selector - COMPLETE SECTION IN TAMIL
    'language.title': 'மொழியைத் தேர்ந்தெடுக்கவும்',
    'language.subtitle': 'உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்',
    'language.changeLanguage': 'மொழியை மாற்றவும்',
    'language.currentLanguage': 'தற்போதைய மொழி',
    'language.supportedLanguages': 'ஆதரிக்கப்படும் மொழிகள்',
    'language.interfaceLanguage': 'இடைமுக மொழி',
    'language.searchLanguage': 'எந்த மொழியிலும் தேடுங்கள்',
    'language.voiceSupport': 'குரல் கட்டளைகள் ஆதரிக்கப்படுகின்றன',
    'language.aiTranslation': 'AI-இயங்கும் மொழிபெயர்ப்பு',

    // Footer
    'footer.description': 'லைவ் ஏபிஐ ஒருங்கிணைப்பு, ஏஐ-இயங்கும் பரிந்துரைகள், ஸ்மார்ட் கொள்முதல் பகுப்பாய்வு மற்றும் நெகிழ்வான ஈஎம்ஐ விருப்பங்களுடன் நிகழ்நேர ஷாப்பிங் உதவியாளர்',
    'footer.liveApi': 'லைவ் ஏபிஐ ஒருங்கிணைப்பு',
    'footer.multiLanguageAi': 'பல மொழி ஏஐ',
    'footer.realTimeData': 'நிகழ்நேர தரவு',
    'footer.securePrivate': 'பாதுகாப்பான மற்றும் தனிப்பட்ட',
    'footer.jewelryTracking': 'நகை விலை கண்காணிப்பு',
    'footer.smartEmi': 'ஸ்மார்ட் ஈஎம்ஐ விருப்பங்கள்',
    'footer.smartAnalysis': 'ஸ்மார்ட் கொள்முதல் பகுப்பாய்வு',

    // Common
    'common.loading': 'ஏபிஐகளில் இருந்து நிகழ்நேர தரவு ஏற்றப்படுகிறது...',
    'common.error': 'பிழை',
    'common.success': 'வெற்றி',
    'common.warning': 'எச்சரிக்கை',
    'common.info': 'தகவல்',
    'common.yes': 'ஆம்',
    'common.no': 'இல்லை',
    'common.ok': 'சரி',
    'common.cancel': 'ரத்து செய்யவும்',
    'common.save': 'சேமிக்கவும்',
    'common.delete': 'நீக்கவும்',
    'common.edit': 'திருத்தவும்',
    'common.view': 'பார்க்கவும்',
    'common.close': 'மூடவும்',
    'common.currency': '₹',
    'common.perMonth': '/மாதம்',
    'common.months': 'மாதங்கள்',
    'common.days': 'நாட்கள்',
    'common.hours': 'மணிநேரங்கள்',
    'common.minutes': 'நிமிடங்கள்',
  },

  // COMPLETE MALAYALAM TRANSLATIONS INCLUDING ALL MISSING KEYS
  ml: {
    // Header
    'app.title': 'ബഡ്ജറ്റ് ഐക്യു',
    'app.subtitle': 'സ്മാർട്ട് ഷോപ്പിംഗ് അസിസ്റ്റന്റ്',
    'header.apiConnected': 'API കണക്റ്റ് ചെയ്തു',
    'header.noApiConnection': 'API കണക്ഷൻ ഇല്ല',
    'header.recentPurchases': 'സമീപകാല വാങ്ങലുകൾ',
    'header.shoppingList': 'ഷോപ്പിംഗ് ലിസ്റ്റ്',
    'header.budgetSetup': 'ബഡ്ജറ്റ് സെറ്റപ്പ്',
    'header.apiConfig': 'API കോൺഫിഗ്',

    // Hero Banner
    'hero.smartShopping': 'സ്മാർട്ട് ഷോപ്പിംഗ് അനുഭവം',
    'hero.title': 'അതിശയകരമായവ കണ്ടെത്തുക',
    'hero.subtitle': 'ഉൽപ്പന്നങ്ങളും ഡീലുകളും',
    'hero.description': 'AI-പവർഡ് തിരയൽ, റിയൽ-ടൈം വില ട്രാക്കിംഗ്, സ്മാർട്ട് ബഡ്ജറ്റ് മാനേജ്മെന്റ്, ഫ്ലെക്സിബിൾ EMI ഓപ്ഷനുകൾ എന്നിവയോടെ 15+ വിഭാഗങ്ങളിലായി ആയിരക്കണക്കിന് ഉൽപ്പന്നങ്ങൾ പര്യവേക്ഷണം ചെയ്യുക.',
    'hero.startShopping': 'ഷോപ്പിംഗ് ആരംഭിക്കുക',
    'hero.viewDeals': 'ഡീലുകൾ കാണുക',
    'hero.categories': '15+ വിഭാഗങ്ങൾ',
    'hero.aiPowered': 'AI-പവർഡ് തിരയൽ',
    'hero.smartBudget': 'സ്മാർട്ട് ബഡ്ജറ്റ് + EMI',

    // Search
    'search.placeholder': 'AI ഉപയോഗിച്ച് ഉൽപ്പന്നങ്ങൾ തിരയുക അല്ലെങ്കിൽ YouTube URL പേസ്റ്റ് ചെയ്യുക...',
    'search.placeholderConnected': 'API കണക്റ്റ് ചെയ്തു! തിരയൽ ആരംഭിക്കുക അല്ലെങ്കിൽ YouTube URL പേസ്റ്റ് ചെയ്യുക...',
    'search.voiceSearch': 'വോയ്സ് തിരയൽ (ബഹുഭാഷാ)',
    'search.imageSearch': 'AI ചിത്ര തിരയലും വില വിശകലനവും',
    'search.aiChat': 'AI ചാറ്റ് അസിസ്റ്റന്റ്',
    'search.search': 'തിരയുക',
    'search.listening': 'കേൾക്കുന്നു... ഇപ്പോൾ സംസാരിക്കുക! (ബഹുഭാഷാ പിന്തുണ)',
    'search.multiLanguage': 'ബഹുഭാഷാ AI തിരയൽ • വിപുലമായ ചിത്ര വിശകലനം • വോയ്സ് കമാൻഡുകൾ • ആഭരണ വില ട്രാക്കിംഗ് • YouTube URL വിശകലനം',

    // Categories
    'categories.title': 'വിഭാഗം അനുസരിച്ച് ഷോപ്പ് ചെയ്യുക',
    'categories.description': 'എല്ലാ പ്രധാന വിഭാഗങ്ങളിലും ഉൽപ്പന്നങ്ങൾ കണ്ടെത്തുക',
    'categories.updatedRealTime': 'റിയൽ-ടൈമിൽ അപ്ഡേറ്റ് ചെയ്തു',
    'categories.items': 'ഇനങ്ങൾ',
    'categories.itemsAvailable': 'ഇനങ്ങൾ ലഭ്യമാണ്',
    'categories.explore': 'പര്യവേക്ഷണം ചെയ്യുക',
    'categories.electronics': 'ഇലക്ട്രോണിക്സ്',
    'categories.fashion': 'ഫാഷൻ',
    'categories.homeAndFurniture': 'വീടും ഫർണിച്ചറും',
    'categories.beautyPersonalCare': 'സൗന്ദര്യവും വ്യക്തിഗത പരിചരണവും',
    'categories.groceryEssentials': 'പലചരക്കും അവശ്യവസ്തുക്കളും',
    'categories.healthWellness': 'ആരോഗ്യവും ക്ഷേമവും',
    'categories.booksStationery': 'പുസ്തകങ്ങളും സ്റ്റേഷനറിയും',
    'categories.toysBabyKids': 'കളിപ്പാട്ടങ്ങൾ, കുഞ്ഞുങ്ങൾ, കുട്ടികൾ',
    'categories.sportsFitness': 'കായികവും ഫിറ്റ്നസും',
    'categories.automotive': 'ഓട്ടോമോട്ടീവ്',
    'categories.jewelryAccessories': 'ആഭരണങ്ങളും ആക്സസറികളും',
    'categories.petSupplies': 'പെറ്റ് സപ്ലൈകൾ',
    'categories.travelLuggage': 'യാത്രയും ലഗേജും',
    'categories.dealsOffers': 'ഡീലുകളും ഓഫറുകളും',
    'categories.general': 'പൊതു വസ്തുക്കൾ',

    // Subcategories - Electronics
    'subcategory.mobilesAccessories': 'മൊബൈലുകളും ആക്സസറികളും',
    'subcategory.laptopsTablets': 'ലാപ്ടോപ്പുകളും ടാബ്‌ലെറ്റുകളും',
    'subcategory.tvsHomeAppliances': 'ടിവികളും ഹോം അപ്ലയൻസുകളും',
    'subcategory.camerasDrones': 'ക്യാമറകളും ഡ്രോണുകളും',
    'subcategory.gaming': 'ഗെയിമിംഗ്',

    // Subcategories - Fashion
    'subcategory.mensClothing': 'പുരുഷന്മാരുടെ വസ്ത്രങ്ങൾ',
    'subcategory.womensClothing': 'സ്ത്രീകളുടെ വസ്ത്രങ്ങൾ',
    'subcategory.kidsBabyWear': 'കുട്ടികളുടെയും കുഞ്ഞുങ്ങളുടെയും വസ്ത്രങ്ങൾ',
    'subcategory.footwear': 'കാലുറകൾ',
    'subcategory.watchesAccessories': 'വാച്ചുകളും ആക്സസറികളും',

    // Subcategories - Home & Furniture
    'subcategory.furniture': 'ഫർണിച്ചർ',
    'subcategory.homeDecor': 'വീട്ടിലെ അലങ്കാരം',
    'subcategory.kitchenDining': 'അടുക്കളയും ഭക്ഷണവും',
    'subcategory.beddingBath': 'കിടക്കയും കുളിയും',
    'subcategory.toolsHardware': 'ഉപകരണങ്ങളും ഹാർഡ്‌വെയറും',

    // Subcategories - Beauty & Personal Care
    'subcategory.skincare': 'ചർമ്മ സംരക്ഷണം',
    'subcategory.makeup': 'മേക്കപ്പ്',
    'subcategory.haircare': 'മുടി സംരക്ഷണം',
    'subcategory.fragrances': 'സുഗന്ധദ്രവ്യങ്ങൾ',
    'subcategory.mensGrooming': 'പുരുഷന്മാരുടെ സൗന്ദര്യം',

    // Subcategories - Grocery & Essentials
    'subcategory.fruitsVegetables': 'പഴങ്ങളും പച്ചക്കറികളും',
    'subcategory.dairyBakery': 'ഡെയറിയും ബേക്കറിയും',
    'subcategory.snacksBeverages': 'ലഘുഭക്ഷണങ്ങളും പാനീയങ്ങളും',
    'subcategory.staplesPackagedFood': 'അവശ്യ ഭക്ഷണവും പാക്കേജ് ചെയ്ത ഭക്ഷണവും',
    'subcategory.cleaningHousehold': 'വൃത്തിയാക്കലും വീട്ടുപകരണങ്ങളും',

    // Subcategories - Health & Wellness
    'subcategory.vitaminsSupplements': 'വിറ്റാമിനുകളും സപ്ലിമെന്റുകളും',
    'subcategory.medicalDevices': 'മെഡിക്കൽ ഉപകരണങ്ങൾ',
    'subcategory.firstAidHealthMonitors': 'ഫസ്റ്റ് എയ്ഡും ആരോഗ്യ മോണിറ്ററുകളും',
    'subcategory.fitnessEquipment': 'ഫിറ്റ്നസ് ഉപകരണങ്ങൾ',

    // Subcategories - Books & Stationery
    'subcategory.academicBooks': 'അക്കാദമിക് പുസ്തകങ്ങൾ',
    'subcategory.fictionNonFiction': 'ഫിക്ഷനും നോൺ-ഫിക്ഷനും',
    'subcategory.artSupplies': 'കലാ സാമഗ്രികൾ',
    'subcategory.officeSupplies': 'ഓഫീസ് സാമഗ്രികൾ',

    // Subcategories - Toys, Baby & Kids
    'subcategory.toysGames': 'കളിപ്പാട്ടങ്ങളും ഗെയിമുകളും',
    'subcategory.babyCareProducts': 'ശിശു പരിചരണ ഉൽപ്പന്നങ്ങൾ',
    'subcategory.schoolSupplies': 'സ്കൂൾ സാമഗ്രികൾ',

    // Subcategories - Sports & Fitness
    'subcategory.exerciseGymEquipment': 'വ്യായാമവും ജിം ഉപകരണങ്ങളും',
    'subcategory.outdoorSportsGear': 'ഔട്ട്ഡോർ സ്പോർട്സ് ഗിയർ',
    'subcategory.sportswear': 'സ്പോർട്സ് വസ്ത്രങ്ങൾ',

    // Subcategories - Automotive
    'subcategory.carAccessories': 'കാർ ആക്സസറികൾ',
    'subcategory.bikeAccessories': 'ബൈക്ക് ആക്സസറികൾ',
    'subcategory.toolsEquipment': 'ഉപകരണങ്ങളും സാമഗ്രികളും',
    'subcategory.oilsLubricants': 'എണ്ണകളും ലൂബ്രിക്കന്റുകളും',

    // Subcategories - Jewelry & Accessories
    'subcategory.goldSilver': 'സ്വർണ്ണവും വെള്ളിയും',
    'subcategory.imitationJewelry': 'കൃത്രിമ ആഭരണങ്ങൾ',
    'subcategory.bagsWallets': 'ബാഗുകളും വാലറ്റുകളും',
    'subcategory.beltsSunglasses': 'ബെൽറ്റുകളും സൺഗ്ലാസുകളും',

    // Subcategories - Pet Supplies
    'subcategory.petFood': 'ഭക്ഷണം',
    'subcategory.petToys': 'കളിപ്പാട്ടങ്ങൾ',
    'subcategory.petGrooming': 'ഗ്രൂമിംഗ്',
    'subcategory.petAccessories': 'ആക്സസറികൾ',

    // Subcategories - Travel & Luggage
    'subcategory.backpacks': 'ബാക്ക്പാക്കുകൾ',
    'subcategory.trolleys': 'ട്രോളികൾ',
    'subcategory.travelAccessories': 'യാത്രാ ആക്സസറികൾ',

    // Subcategories - Deals & Offers
    'subcategory.dailyDeals': 'ദൈനംദിന ഡീലുകൾ',
    'subcategory.flashSales': 'ഫ്ലാഷ് സെയിലുകൾ',
    'subcategory.clearance': 'ക്ലിയറൻസ്',

    // Common subcategory text
    'subcategory.more': 'കൂടുതൽ',

    // PRODUCT NAMES IN MALAYALAM
    'product.1': 'ഐഫോൺ 15 പ്രോ മാക്സ് 256ജിബി',
    'product.2': 'സാംസങ് ഗാലക്സി വാച്ച് 6 ക്ലാസിക്',
    'product.3': 'മാക്ബുക്ക് എയർ എം3 13-ഇഞ്ച്',
    'product.4': 'നൈക്ക് എയർ ഫോഴ്സ് 1 സ്നീക്കേഴ്സ്',
    'product.5': 'ലെവിസ് 511 സ്ലിം ഫിറ്റ് ജീൻസ്',
    'product.6': 'മാമാഅർത്ത് ടീ ട്രീ ഫേസ് വാഷ്',
    'product.7': 'ലക്മേ അബ്സൊല്യൂട്ട് പെർഫെക്റ്റ് റേഡിയൻസ് ഫൗണ്ടേഷൻ',
    'product.8': 'ഓർഗാനിക് ക്വിനോവ പ്രീമിയം 1കിലോ',
    'product.9': 'പുതിയ ഓർഗാനിക് സ്ട്രോബെറി 500ഗ്രാം',
    'product.10': 'അമൂൽ പുതിയ പാൽ 1ലിറ്റർ',
    'product.11': 'ഐകിയ ഹെംനെസ് ബുക്ക്കേസ് വൈറ്റ്',
    'product.12': 'ഫിലിപ്സ് എൽഇഡി സ്മാർട്ട് ബൾബ് 9വാട്ട്',
    'product.13': 'ഹിമാലയ അശ്വഗന്ധ ടാബ്ലെറ്റുകൾ',
    'product.14': 'യോഗ മാറ്റ് ആന്റി-സ്ലിപ് 6മിമി',
    'product.15': 'ഇക്കോ-ഫ്രണ്ട്ലി ക്ലീനിംഗ് കിറ്റ്',
    'product.16': 'സ്റ്റെയിൻലെസ് സ്റ്റീൽ വാട്ടർ ബോട്ടിൽ സെറ്റ്',
    'product.17': 'ദി സൈക്കോളജി ഓഫ് മണി ബുക്ക്',
    'product.18': 'പാർക്കർ ജോട്ടർ ബോൾപോയിന്റ് പെൻ',
    'product.19': 'കാർ ഡാഷ്ബോർഡ് കാമറ എച്ച്ഡി',
    'product.20': 'ബൈക്ക് ഫോൺ ഹോൾഡർ മൗണ്ട്',

    // Budget
    'budget.title': 'ബഡ്ജറ്റ് അവലോകനം',
    'budget.period': 'ബഡ്ജറ്റ്',
    'budget.exceeded': 'ബഡ്ജറ്റ് കവിഞ്ഞു!',
    'budget.exceededMessage': 'നിങ്ങളുടെ ബഡ്ജറ്റ് കവിഞ്ഞിരിക്കുന്നു',
    'budget.getLoanOptions': 'വായ്പാ ഓപ്ഷനുകൾ നേടുക',
    'budget.totalBudget': 'മൊത്തം ബഡ്ജറ്റ്',
    'budget.spent': 'ചെലവഴിച്ചത്',
    'budget.remaining': 'ശേഷിക്കുന്നത്',
    'budget.budgetUsed': 'ബഡ്ജറ്റ് ഉപയോഗിച്ചത്',
    'budget.activeLoan': 'സജീവ വായ്പ',
    'budget.amount': 'തുക',
    'budget.emi': 'ഇഎംഐ',
    'budget.activeEmis': 'സജീവ ഇഎംഐകൾ',
    'budget.nextPayment': 'അടുത്ത പേയ്മെന്റ്',
    'budget.monthly': 'പ്രതിമാസം',
    'budget.weekly': 'ആഴ്ചതോറും',

    // Products
    'product.new': 'പുതിയത്',
    'product.trending': 'ട്രെൻഡിംഗ്',
    'product.off': 'ഓഫ്',
    'product.inStock': 'സ്റ്റോക്കിലുണ്ട്',
    'product.outOfStock': 'സ്റ്റോക്കിലില്ല',
    'product.buyNow': 'ഇപ്പോൾ വാങ്ങുക',
    'product.addToList': 'ലിസ്റ്റിലേക്ക് ചേർക്കുക',
    'product.processing': 'പ്രോസസ്സ് ചെയ്യുന്നു...',
    'product.adding': 'ചേർക്കുന്നു...',
    'product.added': 'ചേർത്തു!',

    // Stats
    'stats.totalItems': 'മൊത്തം ഇനങ്ങൾ',
    'stats.avgSavings': 'ശരാശരി സേവിംഗ്സ്',
    'stats.topCategory': 'മുൻനിര വിഭാഗം',
    'stats.newToday': 'ഇന്ന് പുതിയത്',
    'stats.browseAll': 'എല്ലാ ഉൽപ്പന്നങ്ങളും ബ്രൗസ് ചെയ്യുക',
    'stats.viewDiscounted': 'കിഴിവുള്ള ഇനങ്ങൾ കാണുക',
    'stats.filterByCategory': 'വിഭാഗം അനുസരിച്ച് ഫിൽട്ടർ ചെയ്യുക',
    'stats.seeLatest': 'പുതിയ വരവുകൾ കാണുക',

    // Deals
    'deals.flashDeals': 'ഫ്ലാഷ് ഡീലുകൾ',
    'deals.limitedTime': 'പരിമിത സമയ ഓഫറുകൾ - അവ പോകുന്നതിന് മുമ്പ് പിടിക്കൂ!',
    'deals.endsIn': '2മണി 45മിനിറ്റിൽ അവസാനിക്കുന്നു',
    'deals.hotDeal': 'ഹോട്ട് ഡീൽ',

    // Empty States
    'empty.noConnection': 'API കണക്ഷൻ ഇല്ല',
    'empty.noConnectionDesc': 'യഥാർത്ഥ ഉൽപ്പന്നങ്ങൾ ബ്രൗസ് ചെയ്യാൻ തുടങ്ങാൻ നിങ്ങളുടെ ഇ-കൊമേഴ്സ് പ്ലാറ്റ്ഫോം APIകൾ കണക്റ്റ് ചെയ്യുക',
    'empty.noProducts': 'ഉൽപ്പന്നങ്ങളൊന്നും ലഭ്യമല്ല',
    'empty.noProductsDesc': 'നിങ്ങളുടെ കണക്റ്റ് ചെയ്ത APIകളിൽ നിന്ന് ഉൽപ്പന്നങ്ങളൊന്നും കണ്ടെത്തിയില്ല. നിങ്ങളുടെ API കോൺഫിഗറേഷൻ പരിശോധിക്കുക അല്ലെങ്കിൽ പുതുക്കാൻ ശ്രമിക്കുക.',
    'empty.noResults': 'ഫലങ്ങളൊന്നും കണ്ടെത്തിയില്ല',
    'empty.noResultsDesc': 'നിങ്ങളുടെ തിരയലിന് ഉൽപ്പന്നങ്ങളൊന്നും കണ്ടെത്തിയില്ല. വ്യത്യസ്ത കീവേഡുകൾ ശ്രമിക്കുക അല്ലെങ്കിൽ നിങ്ങളുടെ API കണക്ഷനുകൾ പരിശോധിക്കുക.',
    'empty.apiError': 'API കണക്ഷൻ പിശക്',
    'empty.apiErrorDesc': 'നിങ്ങളുടെ കണക്റ്റ് ചെയ്ത APIകളിൽ നിന്ന് ഡാറ്റ ലഭ്യമാക്കാൻ കഴിഞ്ഞില്ല. ദയവായി നിങ്ങളുടെ API കീകൾ പരിശോധിച്ച് വീണ്ടും ശ്രമിക്കുക.',
    'empty.configureApis': 'APIകൾ കോൺഫിഗർ ചെയ്യുക',
    'empty.refreshData': 'ഡാറ്റ പുതുക്കുക',
    'empty.clearSearch': 'തിരയൽ മായ്ക്കുക',
    'empty.checkApiConfig': 'API കോൺഫിഗ് പരിശോധിക്കുക',

    // Language Selector - COMPLETE SECTION IN MALAYALAM
    'language.title': 'ഭാഷ തിരഞ്ഞെടുക്കുക',
    'language.subtitle': 'നിങ്ങളുടെ ഇഷ്ടമുള്ള ഭാഷ തിരഞ്ഞെടുക്കുക',
    'language.changeLanguage': 'ഭാഷ മാറ്റുക',
    'language.currentLanguage': 'നിലവിലെ ഭാഷ',
    'language.supportedLanguages': 'പിന്തുണയുള്ള ഭാഷകൾ',
    'language.interfaceLanguage': 'ഇന്റർഫേസ് ഭാഷ',
    'language.searchLanguage': 'ഏത് ഭാഷയിലും തിരയുക',
    'language.voiceSupport': 'വോയ്സ് കമാൻഡുകൾക്ക് പിന്തുണ',
    'language.aiTranslation': 'AI-പവർഡ് വിവർത്തനം',

    // Footer
    'footer.description': 'ലൈവ് API ഇന്റഗ്രേഷൻ, AI-പവർഡ് ശുപാർശകൾ, സ്മാർട്ട് പർച്ചേസ് അനാലിസിസ്, ഫ്ലെക്സിബിൾ EMI ഓപ്ഷനുകൾ എന്നിവയുള്ള റിയൽ-ടൈം ഷോപ്പിംഗ് അസിസ്റ്റന്റ്',
    'footer.liveApi': 'ലൈവ് API ഇന്റഗ്രേഷൻ',
    'footer.multiLanguageAi': 'ബഹുഭാഷാ AI',
    'footer.realTimeData': 'റിയൽ-ടൈം ഡാറ്റ',
    'footer.securePrivate': 'സുരക്ഷിതവും സ്വകാര്യവും',
    'footer.jewelryTracking': 'ആഭരണ വില ട്രാക്കിംഗ്',
    'footer.smartEmi': 'സ്മാർട്ട് EMI ഓപ്ഷനുകൾ',
    'footer.smartAnalysis': 'സ്മാർട്ട് പർച്ചേസ് അനാലിസിസ്',

    // Common
    'common.loading': 'APIകളിൽ നിന്ന് റിയൽ-ടൈം ഡാറ്റ ലോഡ് ചെയ്യുന്നു...',
    'common.error': 'പിശക്',
    'common.success': 'വിജയം',
    'common.warning': 'മുന്നറിയിപ്പ്',
    'common.info': 'വിവരം',
    'common.yes': 'അതെ',
    'common.no': 'ഇല്ല',
    'common.ok': 'ശരി',
    'common.cancel': 'റദ്ദാക്കുക',
    'common.save': 'സേവ് ചെയ്യുക',
    'common.delete': 'ഇല്ലാതാക്കുക',
    'common.edit': 'എഡിറ്റ് ചെയ്യുക',
    'common.view': 'കാണുക',
    'common.close': 'അടയ്ക്കുക',
    'common.currency': '₹',
    'common.perMonth': '/മാസം',
    'common.months': 'മാസങ്ങൾ',
    'common.days': 'ദിവസങ്ങൾ',
    'common.hours': 'മണിക്കൂറുകൾ',
    'common.minutes': 'മിനിറ്റുകൾ',
  },

  // COMPLETE GUJARATI TRANSLATIONS INCLUDING ALL MISSING KEYS
  gu: {
    // Header
    'app.title': 'બજેટ આઈક્યુ',
    'app.subtitle': 'સ્માર્ટ શોપિંગ આસિસ્ટન્ટ',
    'header.apiConnected': 'API કનેક્ટેડ',
    'header.noApiConnection': 'કોઈ API કનેક્શન નથી',
    'header.recentPurchases': 'તાજેતરની ખરીદીઓ',
    'header.shoppingList': 'શોપિંગ લિસ્ટ',
    'header.budgetSetup': 'બજેટ સેટઅપ',
    'header.apiConfig': 'API કોન્ફિગ',

    // Hero Banner
    'hero.smartShopping': 'સ્માર્ટ શોપિંગ અનુભવ',
    'hero.title': 'અદ્ભુત શોધો',
    'hero.subtitle': 'પ્રોડક્ટ્સ અને ડીલ્સ',
    'hero.description': 'AI-પાવર્ડ સર્ચ, રીઅલ-ટાઈમ પ્રાઈસ ટ્રેકિંગ, સ્માર્ટ બજેટ મેનેજમેન્ટ અને ફ્લેક્સિબલ EMI ઓપ્શન્સ સાથે 15+ કેટેગરીઝમાં હજારો પ્રોડક્ટ્સ શોધો.',
    'hero.startShopping': 'શોપિંગ શરૂ કરો',
    'hero.viewDeals': 'ડીલ્સ જુઓ',
    'hero.categories': '15+ કેટેગરીઝ',
    'hero.aiPowered': 'AI-પાવર્ડ સર્ચ',
    'hero.smartBudget': 'સ્માર્ટ બજેટ + EMI',

    // Search
    'search.placeholder': 'AI સાથે ઉત્પાદનો શોધો અથવા YouTube URL પેસ્ટ કરો...',
    'search.placeholderConnected': 'API કનેક્ટેડ! શોધવાનું શરૂ કરો અથવા YouTube URL પેસ્ટ કરો...',
    'search.voiceSearch': 'વૉઇસ સર્ચ (બહુભાષી)',
    'search.imageSearch': 'AI ઇમેજ સર્ચ અને પ્રાઇસ એનાલિસિસ',
    'search.aiChat': 'AI ચેટ આસિસ્ટન્ટ',
    'search.search': 'શોધો',
    'search.listening': 'સાંભળી રહ્યું છે... હવે બોલો! (બહુભાષી સપોર્ટેડ)',
    'search.multiLanguage': 'બહુભાષી AI શોધ • અદ્યતન છબી વિશ્લેષણ • વૉઇસ કમાન્ડ્સ • જ્વેલરી કિંમત ટ્રેકિંગ • YouTube URL વિશ્લેષણ',

    // Categories
    'categories.title': 'કેટેગરી દ્વારા શોપિંગ કરો',
    'categories.description': 'તમામ મુખ્ય કેટેગરીઝમાં પ્રોડક્ટ્સ શોધો',
    'categories.updatedRealTime': 'રીઅલ-ટાઈમમાં અપડેટ થયેલ',
    'categories.items': 'આઇટમ્સ',
    'categories.itemsAvailable': 'આઇટમ્સ ઉપલબ્ધ',
    'categories.explore': 'એક્સપ્લોર કરો',
    'categories.electronics': 'ઇલેક્ટ્રોનિક્સ',
    'categories.fashion': 'ફેશન',
    'categories.homeAndFurniture': 'ઘર અને ફર્નિચર',
    'categories.beautyPersonalCare': 'સૌંદર્ય અને વ્યક્તિગત સંભાળ',
    'categories.groceryEssentials': 'કરિયાણા અને આવશ્યક વસ્તુઓ',
    'categories.healthWellness': 'આરોગ્ય અને સુખાકારી',
    'categories.booksStationery': 'પુસ્તકો અને સ્ટેશનરી',
    'categories.toysBabyKids': 'રમકડાં, બાળક અને બાળકો',
    'categories.sportsFitness': 'સ્પોર્ટ્સ અને ફિટનેસ',
    'categories.automotive': 'ઓટોમોટિવ',
    'categories.jewelryAccessories': 'જ્વેલરી અને એક્સેસરીઝ',
    'categories.petSupplies': 'પાલતુ પ્રાણીઓની સામગ્રી',
    'categories.travelLuggage': 'ટ્રાવેલ અને લગેજ',
    'categories.dealsOffers': 'ડીલ્સ અને ઓફર્સ',
    'categories.general': 'સામાન્ય વસ્તુઓ',

    // Subcategories - Electronics
    'subcategory.mobilesAccessories': 'મોબાઇલ્સ અને એક્સેસરીઝ',
    'subcategory.laptopsTablets': 'લેપટોપ્સ અને ટેબ્લેટ્સ',
    'subcategory.tvsHomeAppliances': 'ટીવી અને ઘરેલું ઉપકરણો',
    'subcategory.camerasDrones': 'કેમેરા અને ડ્રોન',
    'subcategory.gaming': 'ગેમિંગ',

    // Subcategories - Fashion
    'subcategory.mensClothing': 'પુરુષોના કપડાં',
    'subcategory.womensClothing': 'મહિલાઓના કપડાં',
    'subcategory.kidsBabyWear': 'બાળકો અને શિશુઓના કપડાં',
    'subcategory.footwear': 'ફૂટવેર',
    'subcategory.watchesAccessories': 'ઘડિયાળો અને એક્સેસરીઝ',

    // Subcategories - Home & Furniture
    'subcategory.furniture': 'ફર્નિચર',
    'subcategory.homeDecor': 'ઘરની સજાવટ',
    'subcategory.kitchenDining': 'રસોડું અને ભોજન',
    'subcategory.beddingBath': 'પથારી અને સ્નાન',
    'subcategory.toolsHardware': 'સાધનો અને હાર્ડવેર',

    // Subcategories - Beauty & Personal Care
    'subcategory.skincare': 'ત્વચાની સંભાળ',
    'subcategory.makeup': 'મેકઅપ',
    'subcategory.haircare': 'વાળની સંભાળ',
    'subcategory.fragrances': 'સુગંધ',
    'subcategory.mensGrooming': 'પુરુષોની સુંદરતા',

    // Subcategories - Grocery & Essentials
    'subcategory.fruitsVegetables': 'ફળો અને શાકભાજી',
    'subcategory.dairyBakery': 'ડેરી અને બેકરી',
    'subcategory.snacksBeverages': 'સ્નેક્સ અને પીણાં',
    'subcategory.staplesPackagedFood': 'મુખ્ય ખાદ્ય અને પેકેજ્ડ ફૂડ',
    'subcategory.cleaningHousehold': 'સફાઈ અને ઘરેલું સામાન',

    // Subcategories - Health & Wellness
    'subcategory.vitaminsSupplements': 'વિટામિન્સ અને સપ્લિમેન્ટ્સ',
    'subcategory.medicalDevices': 'મેડિકલ ડિવાઇસીસ',
    'subcategory.firstAidHealthMonitors': 'પ્રાથમિક સારવાર અને આરોગ્ય મોનિટર્સ',
    'subcategory.fitnessEquipment': 'ફિટનેસ ઉપકરણો',

    // Subcategories - Books & Stationery
    'subcategory.academicBooks': 'શૈક્ષણિક પુસ્તકો',
    'subcategory.fictionNonFiction': 'ફિક્શન અને નોન-ફિક્શન',
    'subcategory.artSupplies': 'આર્ટ સપ્લાઇઝ',
    'subcategory.officeSupplies': 'ઓફિસ સપ્લાઇઝ',

    // Subcategories - Toys, Baby & Kids
    'subcategory.toysGames': 'રમકડાં અને રમતો',
    'subcategory.babyCareProducts': 'બાળ સંભાળ ઉત્પાદનો',
    'subcategory.schoolSupplies': 'શાળા સામગ્રી',

    // Subcategories - Sports & Fitness
    'subcategory.exerciseGymEquipment': 'વ્યાયામ અને જિમ ઉપકરણો',
    'subcategory.outdoorSportsGear': 'આઉટડોર સ્પોર્ટ્સ ગિયર',
    'subcategory.sportswear': 'સ્પોર્ટ્સવેર',

    // Subcategories - Automotive
    'subcategory.carAccessories': 'કાર એક્સેસરીઝ',
    'subcategory.bikeAccessories': 'બાઇક એક્સેસરીઝ',
    'subcategory.toolsEquipment': 'ટૂલ્સ અને ઉપકરણો',
    'subcategory.oilsLubricants': 'તેલ અને લુબ્રિકન્ટ્સ',

    // Subcategories - Jewelry & Accessories
    'subcategory.goldSilver': 'સોનું અને ચાંદી',
    'subcategory.imitationJewelry': 'ઇમિટેશન જ્વેલરી',
    'subcategory.bagsWallets': 'બેગ્સ અને વૉલેટ્સ',
    'subcategory.beltsSunglasses': 'બેલ્ટ્સ અને સનગ્લાસીસ',

    // Subcategories - Pet Supplies
    'subcategory.petFood': 'ખોરાક',
    'subcategory.petToys': 'રમકડાં',
    'subcategory.petGrooming': 'ગ્રૂમિંગ',
    'subcategory.petAccessories': 'એક્સેસરીઝ',

    // Subcategories - Travel & Luggage
    'subcategory.backpacks': 'બેકપેક્સ',
    'subcategory.trolleys': 'ટ્રોલીઝ',
    'subcategory.travelAccessories': 'ટ્રાવેલ એક્સેસરીઝ',

    // Subcategories - Deals & Offers
    'subcategory.dailyDeals': 'દૈનિક ડીલ્સ',
    'subcategory.flashSales': 'ફ્લેશ સેલ્સ',
    'subcategory.clearance': 'ક્લિયરન્સ',

    // Common subcategory text
    'subcategory.more': 'વધુ',

    // PRODUCT NAMES IN GUJARATI
    'product.1': 'આઈફોન 15 પ્રો મેક્સ 256જીબી',
    'product.2': 'સેમસંગ ગેલેક્સી વોચ 6 ક્લાસિક',
    'product.3': 'મેકબુક એર એમ3 13-ઇંચ',
    'product.4': 'નાઇકી એર ફોર્સ 1 સ્નીકર્સ',
    'product.5': 'લેવિસ 511 સ્લિમ ફિટ જીન્સ',
    'product.6': 'મામાઅર્થ ટી ટ્રી ફેસ વોશ',
    'product.7': 'લક્મે એબ્સોલ્યુટ પરફેક્ટ રેડિયન્સ ફાઉન્ડેશન',
    'product.8': 'ઓર્ગેનિક ક્વિનોઆ પ્રીમિયમ 1કિલો',
    'product.9': 'તાજા ઓર્ગેનિક સ્ટ્રોબેરી 500ગ્રામ',
    'product.10': 'અમૂલ તાજું દૂધ 1લિટર',
    'product.11': 'આઇકિયા હેમ્નેસ બુકશેલ્ફ સફેદ',
    'product.12': 'ફિલિપ્સ એલઇડી સ્માર્ટ બલ્બ 9વોટ',
    'product.13': 'હિમાલયા અશ્વગંધા ટેબલેટ્સ',
    'product.14': 'યોગા મેટ એન્ટી-સ્લિપ 6મિમી',
    'product.15': 'ઇકો-ફ્રેન્ડલી ક્લીનિંગ કિટ',
    'product.16': 'સ્ટેનલેસ સ્ટીલ વોટર બોટલ સેટ',
    'product.17': 'ધ સાયકોલોજી ઓફ મની બુક',
    'product.18': 'પાર્કર જોટર બોલપોઇન્ટ પેન',
    'product.19': 'કાર ડેશબોર્ડ કેમેરા એચડી',
    'product.20': 'બાઇક ફોન હોલ્ડર માઉન્ટ',

    // Budget
    'budget.title': 'બજેટ ઓવરવ્યુ',
    'budget.period': 'બજેટ',
    'budget.exceeded': 'બજેટ વટાવી ગયું!',
    'budget.exceededMessage': 'તમે તમારું બજેટ વટાવી ગયા છો',
    'budget.getLoanOptions': 'લોન વિકલ્પો મેળવો',
    'budget.totalBudget': 'કુલ બજેટ',
    'budget.spent': 'ખર્ચ કરેલ',
    'budget.remaining': 'બાકી',
    'budget.budgetUsed': 'બજેટ વપરાયેલ',
    'budget.activeLoan': 'સક્રિય લોન',
    'budget.amount': 'રકમ',
    'budget.emi': 'ઇએમઆઈ',
    'budget.activeEmis': 'સક્રિય ઇએમઆઈઝ',
    'budget.nextPayment': 'આગામી ચુકવણી',
    'budget.monthly': 'માસિક',
    'budget.weekly': 'સાપ્તાહિક',

    // Products
    'product.new': 'નવું',
    'product.trending': 'ટ્રેન્ડિંગ',
    'product.off': 'ઓફ',
    'product.inStock': 'સ્ટોકમાં છે',
    'product.outOfStock': 'સ્ટોકમાં નથી',
    'product.buyNow': 'હમણાં ખરીદો',
    'product.addToList': 'લિસ્ટમાં ઉમેરો',
    'product.processing': 'પ્રોસેસિંગ...',
    'product.adding': 'ઉમેરી રહ્યા છીએ...',
    'product.added': 'ઉમેરાયું!',

    // Stats
    'stats.totalItems': 'કુલ આઇટમ્સ',
    'stats.avgSavings': 'સરેરાશ બચત',
    'stats.topCategory': 'ટોપ કેટેગરી',
    'stats.newToday': 'આજે નવું',
    'stats.browseAll': 'બધા પ્રોડક્ટ્સ બ્રાઉઝ કરો',
    'stats.viewDiscounted': 'ડિસ્કાઉન્ટેડ આઇટમ્સ જુઓ',
    'stats.filterByCategory': 'કેટેગરી દ્વારા ફિલ્ટર કરો',
    'stats.seeLatest': 'નવીનતમ આગમનો જુઓ',

    // Deals
    'deals.flashDeals': 'ફ્લેશ ડીલ્સ',
    'deals.limitedTime': 'મર્યાદિત સમય ઓફર્સ - તે પૂરી થાય તે પહેલાં મેળવી લો!',
    'deals.endsIn': '2કલાક 45મિનિટમાં પૂરું થાય છે',
    'deals.hotDeal': 'હોટ ડીલ',

    // Empty States
    'empty.noConnection': 'કોઈ API કનેક્શન નથી',
    'empty.noConnectionDesc': 'વાસ્તવિક પ્રોડક્ટ્સ બ્રાઉઝ કરવાનું શરૂ કરવા માટે તમારા ઇ-કોમર્સ પ્લેટફોર્મ APIઓ કનેક્ટ કરો',
    'empty.noProducts': 'કોઈ પ્રોડક્ટ્સ ઉપલબ્ધ નથી',
    'empty.noProductsDesc': 'તમારા કનેક્ટેડ APIઓમાંથી કોઈ પ્રોડક્ટ્સ મળી નથી. તમારા API કોન્ફિગરેશન તપાસો અથવા રિફ્રેશ કરવાનો પ્રયાસ કરો.',
    'empty.noResults': 'કોઈ પરિણામો મળ્યા નથી',
    'empty.noResultsDesc': 'તમારી શોધ માટે કોઈ પ્રોડક્ટ્સ મળી નથી. અલગ કીવર્ડ્સ અજમાવો અથવા તમારા API કનેક્શન્સ તપાસો.',
    'empty.apiError': 'API કનેક્શન એરર',
    'empty.apiErrorDesc': 'તમારા કનેક્ટેડ APIઓમાંથી ડેટા મેળવવામાં અસમર્થ. કૃપા કરીને તમારી API કીઓ તપાસો અને ફરી પ્રયાસ કરો.',
    'empty.configureApis': 'APIઓ કોન્ફિગર કરો',
    'empty.refreshData': 'ડેટા રિફ્રેશ કરો',
    'empty.clearSearch': 'શોધ સાફ કરો',
    'empty.checkApiConfig': 'API કોન્ફિગ તપાસો',

    // Language Selector - COMPLETE SECTION IN GUJARATI
    'language.title': 'ભાષા પસંદ કરો',
    'language.subtitle': 'તમારી પસંદીદા ભાષા પસંદ કરો',
    'language.changeLanguage': 'ભાષા બદલો',
    'language.currentLanguage': 'વર્તમાન ભાષા',
    'language.supportedLanguages': 'સપોર્ટેડ ભાષાઓ',
    'language.interfaceLanguage': 'ઇન્ટરફેસ ભાષા',
    'language.searchLanguage': 'કોઈપણ ભાષામાં શોધો',
    'language.voiceSupport': 'વૉઇસ કમાન્ડ્સ સપોર્ટેડ',
    'language.aiTranslation': 'AI-પાવર્ડ અનુવાદ',

    // Footer
    'footer.description': 'લાઇવ API ઇન્ટિગ્રેશન, AI-પાવર્ડ રેકમેન્ડેશન્સ, સ્માર્ટ પરચેઝ એનાલિસિસ અને ફ્લેક્સિબલ EMI ઓપ્શન્સ સાથે રીઅલ-ટાઈમ શોપિંગ આસિસ્ટન્ટ',
    'footer.liveApi': 'લાઇવ API ઇન્ટિગ્રેશન',
    'footer.multiLanguageAi': 'બહુભાષી AI',
    'footer.realTimeData': 'રીઅલ-ટાઈમ ડેટા',
    'footer.securePrivate': 'સુરક્ષિત અને ખાનગી',
    'footer.jewelryTracking': 'જ્વેલરી પ્રાઇસ ટ્રેકિંગ',
    'footer.smartEmi': 'સ્માર્ટ EMI ઓપ્શન્સ',
    'footer.smartAnalysis': 'સ્માર્ટ પરચેઝ એનાલિસિસ',

    // Common
    'common.loading': 'APIઓમાંથી રીઅલ-ટાઈમ ડેટા લોડ થઈ રહ્યો છે...',
    'common.error': 'ભૂલ',
    'common.success': 'સફળતા',
    'common.warning': 'ચેતવણી',
    'common.info': 'માહિતી',
    'common.yes': 'હા',
    'common.no': 'ના',
    'common.ok': 'ઠીક છે',
    'common.cancel': 'રદ કરો',
    'common.save': 'સેવ કરો',
    'common.delete': 'ડિલીટ કરો',
    'common.edit': 'એડિટ કરો',
    'common.view': 'જુઓ',
    'common.close': 'બંધ કરો',
    'common.currency': '₹',
    'common.perMonth': '/મહિનો',
    'common.months': 'મહિના',
    'common.days': 'દિવસો',
    'common.hours': 'કલાક',
    'common.minutes': 'મિનિટ',
  },

  // COMPLETE MARATHI TRANSLATIONS INCLUDING ALL MISSING KEYS
  mr: {
    // Header
    'app.title': 'बजेट आयक्यू',
    'app.subtitle': 'स्मार्ट शॉपिंग असिस्टंट',
    'header.apiConnected': 'API कनेक्टेड',
    'header.noApiConnection': 'कोणतेही API कनेक्शन नाही',
    'header.recentPurchases': 'अलीकडील खरेदी',
    'header.shoppingList': 'शॉपिंग लिस्ट',
    'header.budgetSetup': 'बजेट सेटअप',
    'header.apiConfig': 'API कॉन्फिग',

    // Hero Banner
    'hero.smartShopping': 'स्मार्ट शॉपिंग अनुभव',
    'hero.title': 'अद्भुत शोधा',
    'hero.subtitle': 'प्रोडक्ट्स आणि डील्स',
    'hero.description': 'AI-पॉवर्ड सर्च, रिअल-टाइम प्राइस ट्रॅकिंग, स्मार्ट बजेट मॅनेजमेंट आणि फ्लेक्सिबल EMI ऑप्शन्ससह 15+ कॅटेगरीजमध्ये हजारो प्रोडक्ट्स एक्सप्लोर करा.',
    'hero.startShopping': 'शॉपिंग सुरू करा',
    'hero.viewDeals': 'डील्स पहा',
    'hero.categories': '15+ कॅटेगरीज',
    'hero.aiPowered': 'AI-पॉवर्ड सर्च',
    'hero.smartBudget': 'स्मार्ट बजेट + EMI',

    // Search
    'search.placeholder': 'AI सह उत्पादने शोधा किंवा YouTube URL पेस्ट करा...',
    'search.placeholderConnected': 'API कनेक्टेड! शोधणे सुरू करा किंवा YouTube URL पेस्ट करा...',
    'search.voiceSearch': 'व्हॉइस सर्च (बहुभाषिक)',
    'search.imageSearch': 'AI इमेज सर्च आणि प्राइस अॅनालिसिस',
    'search.aiChat': 'AI चॅट असिस्टंट',
    'search.search': 'शोधा',
    'search.listening': 'ऐकत आहे... आता बोला! (बहुभाषिक समर्थित)',
    'search.multiLanguage': 'बहुभाषिक AI शोध • प्रगत प्रतिमा विश्लेषण • व्हॉइस कमांड • दागिने किंमत ट्रॅकिंग • YouTube URL विश्लेषण',

    // Categories
    'categories.title': 'कॅटेगरीनुसार शॉपिंग करा',
    'categories.description': 'सर्व प्रमुख कॅटेगरीजमध्ये प्रोडक्ट्स शोधा',
    'categories.updatedRealTime': 'रिअल-टाइममध्ये अपडेट केलेले',
    'categories.items': 'आयटम्स',
    'categories.itemsAvailable': 'आयटम्स उपलब्ध',
    'categories.explore': 'एक्सप्लोर करा',
    'categories.electronics': 'इलेक्ट्रॉनिक्स',
    'categories.fashion': 'फॅशन',
    'categories.homeAndFurniture': 'घर आणि फर्निचर',
    'categories.beautyPersonalCare': 'सौंदर्य आणि वैयक्तिक काळजी',
    'categories.groceryEssentials': 'किराणा आणि आवश्यक वस्तू',
    'categories.healthWellness': 'आरोग्य आणि कल्याण',
    'categories.booksStationery': 'पुस्तके आणि स्टेशनरी',
    'categories.toysBabyKids': 'खेळणी, बाळ आणि मुले',
    'categories.sportsFitness': 'स्पोर्ट्स आणि फिटनेस',
    'categories.automotive': 'ऑटोमोटिव्ह',
    'categories.jewelryAccessories': 'दागिने आणि अॅक्सेसरीज',
    'categories.petSupplies': 'पाळीव प्राण्यांचे सामान',
    'categories.travelLuggage': 'प्रवास आणि लगेज',
    'categories.dealsOffers': 'डील्स आणि ऑफर्स',
    'categories.general': 'सामान्य वस्तू',

    // Subcategories - Electronics
    'subcategory.mobilesAccessories': 'मोबाईल्स आणि अॅक्सेसरीज',
    'subcategory.laptopsTablets': 'लॅपटॉप्स आणि टॅबलेट्स',
    'subcategory.tvsHomeAppliances': 'टीव्ही आणि घरगुती उपकरणे',
    'subcategory.camerasDrones': 'कॅमेरे आणि ड्रोन',
    'subcategory.gaming': 'गेमिंग',

    // Subcategories - Fashion
    'subcategory.mensClothing': 'पुरुषांचे कपडे',
    'subcategory.womensClothing': 'महिलांचे कपडे',
    'subcategory.kidsBabyWear': 'मुलांचे आणि बाळांचे कपडे',
    'subcategory.footwear': 'फुटवेअर',
    'subcategory.watchesAccessories': 'घड्याळे आणि अॅक्सेसरीज',

    // Subcategories - Home & Furniture
    'subcategory.furniture': 'फर्निचर',
    'subcategory.homeDecor': 'घराची सजावट',
    'subcategory.kitchenDining': 'स्वयंपाकघर आणि जेवण',
    'subcategory.beddingBath': 'अंथरूण आणि स्नान',
    'subcategory.toolsHardware': 'साधने आणि हार्डवेअर',

    // Subcategories - Beauty & Personal Care
    'subcategory.skincare': 'त्वचेची काळजी',
    'subcategory.makeup': 'मेकअप',
    'subcategory.haircare': 'केसांची काळजी',
    'subcategory.fragrances': 'सुगंध',
    'subcategory.mensGrooming': 'पुरुषांचे सौंदर्य',

    // Subcategories - Grocery & Essentials
    'subcategory.fruitsVegetables': 'फळे आणि भाज्या',
    'subcategory.dairyBakery': 'डेअरी आणि बेकरी',
    'subcategory.snacksBeverages': 'स्नॅक्स आणि पेय',
    'subcategory.staplesPackagedFood': 'मुख्य अन्न आणि पॅकेज्ड फूड',
    'subcategory.cleaningHousehold': 'सफाई आणि घरगुती सामान',

    // Subcategories - Health & Wellness
    'subcategory.vitaminsSupplements': 'व्हिटॅमिन्स आणि सप्लिमेंट्स',
    'subcategory.medicalDevices': 'मेडिकल डिव्हाइसेस',
    'subcategory.firstAidHealthMonitors': 'प्रथमोपचार आणि आरोग्य मॉनिटर्स',
    'subcategory.fitnessEquipment': 'फिटनेस उपकरणे',

    // Subcategories - Books & Stationery
    'subcategory.academicBooks': 'शैक्षणिक पुस्तके',
    'subcategory.fictionNonFiction': 'कथा आणि नॉन-फिक्शन',
    'subcategory.artSupplies': 'कला सामग्री',
    'subcategory.officeSupplies': 'कार्यालयीन सामग्री',

    // Subcategories - Toys, Baby & Kids
    'subcategory.toysGames': 'खेळणी आणि खेळ',
    'subcategory.babyCareProducts': 'बाळ काळजी उत्पादने',
    'subcategory.schoolSupplies': 'शाळेची सामग्री',

    // Subcategories - Sports & Fitness
    'subcategory.exerciseGymEquipment': 'व्यायाम आणि जिम उपकरणे',
    'subcategory.outdoorSportsGear': 'आउटडोर स्पोर्ट्स गिअर',
    'subcategory.sportswear': 'स्पोर्ट्सवेअर',

    // Subcategories - Automotive
    'subcategory.carAccessories': 'कार अॅक्सेसरीज',
    'subcategory.bikeAccessories': 'बाइक अॅक्सेसरीज',
    'subcategory.toolsEquipment': 'टूल्स आणि उपकरणे',
    'subcategory.oilsLubricants': 'तेल आणि लुब्रिकंट्स',

    // Subcategories - Jewelry & Accessories
    'subcategory.goldSilver': 'सोने आणि चांदी',
    'subcategory.imitationJewelry': 'इमिटेशन ज्वेलरी',
    'subcategory.bagsWallets': 'बॅग्ज आणि वॉलेट्स',
    'subcategory.beltsSunglasses': 'बेल्ट्स आणि सनग्लासेस',

    // Subcategories - Pet Supplies
    'subcategory.petFood': 'अन्न',
    'subcategory.petToys': 'खेळणी',
    'subcategory.petGrooming': 'ग्रूमिंग',
    'subcategory.petAccessories': 'अॅक्सेसरीज',

    // Subcategories - Travel & Luggage
    'subcategory.backpacks': 'बॅकपॅक्स',
    'subcategory.trolleys': 'ट्रॉलीज',
    'subcategory.travelAccessories': 'प्रवास अॅक्सेसरीज',

    // Subcategories - Deals & Offers
    'subcategory.dailyDeals': 'दैनिक डील्स',
    'subcategory.flashSales': 'फ्लॅश सेल्स',
    'subcategory.clearance': 'क्लिअरन्स',

    // Common subcategory text
    'subcategory.more': 'अधिक',

    // PRODUCT NAMES IN MARATHI
    'product.1': 'आयफोन 15 प्रो मॅक्स 256जीबी',
    'product.2': 'सॅमसंग गॅलेक्सी वॉच 6 क्लासिक',
    'product.3': 'मॅकबुक एअर एम3 13-इंच',
    'product.4': 'नायकी एअर फोर्स 1 स्नीकर्स',
    'product.5': 'लेव्हिस 511 स्लिम फिट जीन्स',
    'product.6': 'मामाअर्थ टी ट्री फेस वॉश',
    'product.7': 'लक्मे अॅब्सोल्युट परफेक्ट रेडिअन्स फाउंडेशन',
    'product.8': 'ऑर्गॅनिक क्विनोआ प्रीमियम 1किलो',
    'product.9': 'ताजे ऑर्गॅनिक स्ट्रॉबेरी 500ग्राम',
    'product.10': 'अमूल ताजे दूध 1लिटर',
    'product.11': 'आयकिया हेम्नेस बुकशेल्फ पांढरा',
    'product.12': 'फिलिप्स एलईडी स्मार्ट बल्ब 9वॅट',
    'product.13': 'हिमालया अश्वगंधा टॅब्लेट्स',
    'product.14': 'योगा मॅट अँटी-स्लिप 6मिमी',
    'product.15': 'इको-फ्रेंडली क्लीनिंग किट',
    'product.16': 'स्टेनलेस स्टील वॉटर बॉटल सेट',
    'product.17': 'द सायकॉलॉजी ऑफ मनी बुक',
    'product.18': 'पार्कर जॉटर बॉलपॉइंट पेन',
    'product.19': 'कार डॅशबोर्ड कॅमेरा एचडी',
    'product.20': 'बाइक फोन होल्डर माउंट',

    // Budget
    'budget.title': 'बजेट ओव्हरव्ह्यू',
    'budget.period': 'बजेट',
    'budget.exceeded': 'बजेट ओलांडले!',
    'budget.exceededMessage': 'तुम्ही तुमचे बजेट ओलांडले आहे',
    'budget.getLoanOptions': 'कर्ज विकल्प मिळवा',
    'budget.totalBudget': 'एकूण बजेट',
    'budget.spent': 'खर्च केलेले',
    'budget.remaining': 'शिल्लक',
    'budget.budgetUsed': 'बजेट वापरले',
    'budget.activeLoan': 'सक्रिय कर्ज',
    'budget.amount': 'रक्कम',
    'budget.emi': 'ईएमआय',
    'budget.activeEmis': 'सक्रिय ईएमआय',
    'budget.nextPayment': 'पुढील पेमेंट',
    'budget.monthly': 'मासिक',
    'budget.weekly': 'साप्ताहिक',

    // Products
    'product.new': 'नवीन',
    'product.trending': 'ट्रेंडिंग',
    'product.off': 'सूट',
    'product.inStock': 'स्टॉकमध्ये',
    'product.outOfStock': 'स्टॉकमध्ये नाही',
    'product.buyNow': 'आता खरेदी करा',
    'product.addToList': 'लिस्टमध्ये जोडा',
    'product.processing': 'प्रोसेसिंग...',
    'product.adding': 'जोडत आहे...',
    'product.added': 'जोडले!',

    // Stats
    'stats.totalItems': 'एकूण आयटम्स',
    'stats.avgSavings': 'सरासरी बचत',
    'stats.topCategory': 'टॉप कॅटेगरी',
    'stats.newToday': 'आज नवीन',
    'stats.browseAll': 'सर्व प्रोडक्ट्स ब्राउज करा',
    'stats.viewDiscounted': 'सवलतीच्या आयटम्स पहा',
    'stats.filterByCategory': 'कॅटेगरीनुसार फिल्टर करा',
    'stats.seeLatest': 'नवीनतम आगमने पहा',

    // Deals
    'deals.flashDeals': 'फ्लॅश डील्स',
    'deals.limitedTime': 'मर्यादित वेळेच्या ऑफर्स - त्या संपण्यापूर्वी मिळवा!',
    'deals.endsIn': '2तास 45मिनिटांमध्ये संपते',
    'deals.hotDeal': 'हॉट डील',

    // Empty States
    'empty.noConnection': 'कोणतेही API कनेक्शन नाही',
    'empty.noConnectionDesc': 'वास्तविक प्रोडक्ट्स ब्राउज करण्यास सुरुवात करण्यासाठी तुमचे ई-कॉमर्स प्लॅटफॉर्म API कनेक्ट करा',
    'empty.noProducts': 'कोणतेही प्रोडक्ट्स उपलब्ध नाहीत',
    'empty.noProductsDesc': 'तुमच्या कनेक्टेड API मधून कोणतेही प्रोडक्ट्स सापडले नाहीत. तुमचे API कॉन्फिगरेशन तपासा किंवा रिफ्रेश करण्याचा प्रयत्न करा.',
    'empty.noResults': 'कोणतेही परिणाम सापडले नाहीत',
    'empty.noResultsDesc': 'तुमच्या शोधासाठी कोणतेही प्रोडक्ट्स सापडले नाहीत. वेगळे कीवर्ड्स वापरून पहा किंवा तुमचे API कनेक्शन्स तपासा.',
    'empty.apiError': 'API कनेक्शन एरर',
    'empty.apiErrorDesc': 'तुमच्या कनेक्टेड API मधून डेटा आणण्यात अक्षम. कृपया तुमच्या API की तपासा आणि पुन्हा प्रयत्न करा.',
    'empty.configureApis': 'API कॉन्फिगर करा',
    'empty.refreshData': 'डेटा रिफ्रेश करा',
    'empty.clearSearch': 'शोध क्लिअर करा',
    'empty.checkApiConfig': 'API कॉन्फिग तपासा',

    // Language Selector - COMPLETE SECTION IN MARATHI
    'language.title': 'भाषा निवडा',
    'language.subtitle': 'तुमची आवडती भाषा निवडा',
    'language.changeLanguage': 'भाषा बदला',
    'language.currentLanguage': 'सध्याची भाषा',
    'language.supportedLanguages': 'समर्थित भाषा',
    'language.interfaceLanguage': 'इंटरफेस भाषा',
    'language.searchLanguage': 'कोणत्याही भाषेत शोधा',
    'language.voiceSupport': 'व्हॉइस कमांड समर्थित',
    'language.aiTranslation': 'AI-चालित भाषांतर',

    // Footer
    'footer.description': 'लाइव्ह API इंटिग्रेशन, AI-चालित शिफारसी, स्मार्ट खरेदी विश्लेषण आणि फ्लेक्सिबल EMI पर्यायांसह रिअल-टाइम शॉपिंग असिस्टंट',
    'footer.liveApi': 'लाइव्ह API इंटिग्रेशन',
    'footer.multiLanguageAi': 'बहुभाषिक AI',
    'footer.realTimeData': 'रिअल-टाइम डेटा',
    'footer.securePrivate': 'सुरक्षित आणि खाजगी',
    'footer.jewelryTracking': 'दागिने किंमत ट्रॅकिंग',
    'footer.smartEmi': 'स्मार्ट EMI पर्याय',
    'footer.smartAnalysis': 'स्मार्ट खरेदी विश्लेषण',

    // Common
    'common.loading': 'API मधून रिअल-टाइम डेटा लोड होत आहे...',
    'common.error': 'त्रुटी',
    'common.success': 'यश',
    'common.warning': 'चेतावणी',
    'common.info': 'माहिती',
    'common.yes': 'होय',
    'common.no': 'नाही',
    'common.ok': 'ठीक आहे',
    'common.cancel': 'रद्द करा',
    'common.save': 'सेव्ह करा',
    'common.delete': 'डिलीट करा',
    'common.edit': 'संपादित करा',
    'common.view': 'पहा',
    'common.close': 'बंद करा',
    'common.currency': '₹',
    'common.perMonth': '/महिना',
    'common.months': 'महिने',
    'common.days': 'दिवस',
    'common.hours': 'तास',
    'common.minutes': 'मिनिटे',
  },

  // COMPLETE PUNJABI TRANSLATIONS INCLUDING ALL MISSING KEYS
  pa: {
    // Header
    'app.title': 'ਬਜਟ ਆਈਕਿਊ',
    'app.subtitle': 'ਸਮਾਰਟ ਸ਼ੌਪਿੰਗ ਅਸਿਸਟੈਂਟ',
    'header.apiConnected': 'API ਕਨੈਕਟਡ',
    'header.noApiConnection': 'ਕੋਈ API ਕਨੈਕਸ਼ਨ ਨਹੀਂ',
    'header.recentPurchases': 'ਹਾਲੀਆ ਖਰੀਦਾਰੀਆਂ',
    'header.shoppingList': 'ਸ਼ੌਪਿੰਗ ਲਿਸਟ',
    'header.budgetSetup': 'ਬਜਟ ਸੈਟਅੱਪ',
    'header.apiConfig': 'API ਕੌਨਫਿਗ',

    // Hero Banner
    'hero.smartShopping': 'ਸਮਾਰਟ ਸ਼ੌਪਿੰਗ ਅਨੁਭਵ',
    'hero.title': 'ਸ਼ਾਨਦਾਰ ਖੋਜੋ',
    'hero.subtitle': 'ਉਤਪਾਦ ਅਤੇ ਡੀਲਾਂ',
    'hero.description': 'AI-ਸੰਚਾਲਿਤ ਖੋਜ, ਰੀਅਲ-ਟਾਈਮ ਕੀਮਤ ਟਰੈਕਿੰਗ, ਸਮਾਰਟ ਬਜਟ ਪ੍ਰਬੰਧਨ ਅਤੇ ਲਚਕਦਾਰ EMI ਵਿਕਲਪਾਂ ਨਾਲ 15+ ਸ਼੍ਰੇਣੀਆਂ ਵਿੱਚ ਹਜ਼ਾਰਾਂ ਉਤਪਾਦਾਂ ਦੀ ਖੋਜ ਕਰੋ।',
    'hero.startShopping': 'ਸ਼ੌਪਿੰਗ ਸ਼ੁਰੂ ਕਰੋ',
    'hero.viewDeals': 'ਡੀਲਾਂ ਵੇਖੋ',
    'hero.categories': '15+ ਸ਼੍ਰੇਣੀਆਂ',
    'hero.aiPowered': 'AI-ਸੰਚਾਲਿਤ ਖੋਜ',
    'hero.smartBudget': 'ਸਮਾਰਟ ਬਜਟ + EMI',

    // Search
    'search.placeholder': 'AI ਨਾਲ ਉਤਪਾਦ ਖੋਜੋ ਜਾਂ YouTube URL ਪੇਸਟ ਕਰੋ...',
    'search.placeholderConnected': 'API ਕਨੈਕਟਡ! ਖੋਜਣਾ ਸ਼ੁਰੂ ਕਰੋ ਜਾਂ YouTube URL ਪੇਸਟ ਕਰੋ...',
    'search.voiceSearch': 'ਵੌਇਸ ਸਰਚ (ਬਹੁਭਾਸ਼ੀ)',
    'search.imageSearch': 'AI ਇਮੇਜ ਸਰਚ ਅਤੇ ਕੀਮਤ ਵਿਸ਼ਲੇਸ਼ਣ',
    'search.aiChat': 'AI ਚੈਟ ਅਸਿਸਟੈਂਟ',
    'search.search': 'ਖੋਜੋ',
    'search.listening': 'ਸੁਣ ਰਿਹਾ ਹੈ... ਹੁਣ ਬੋਲੋ! (ਬਹੁਭਾਸ਼ੀ ਸਮਰਥਿਤ)',
    'search.multiLanguage': 'ਬਹੁਭਾਸ਼ੀ AI ਖੋਜ • ਉੱਨਤ ਚਿੱਤਰ ਵਿਸ਼ਲੇਸ਼ਣ • ਆਵਾਜ਼ ਕਮਾਂਡ • ਗਹਿਣਿਆਂ ਦੀ ਕੀਮਤ ਟਰੈਕਿੰਗ • YouTube URL ਵਿਸ਼ਲੇਸ਼ਣ',

    // Categories
    'categories.title': 'ਸ਼੍ਰੇਣੀ ਅਨੁਸਾਰ ਸ਼ੌਪਿੰਗ ਕਰੋ',
    'categories.description': 'ਸਾਰੀਆਂ ਮੁੱਖ ਸ਼੍ਰੇਣੀਆਂ ਵਿੱਚ ਉਤਪਾਦ ਖੋਜੋ',
    'categories.updatedRealTime': 'ਰੀਅਲ-ਟਾਈਮ ਵਿੱਚ ਅਪਡੇਟ ਕੀਤਾ ਗਿਆ',
    'categories.items': 'ਆਈਟਮਾਂ',
    'categories.itemsAvailable': 'ਆਈਟਮਾਂ ਉਪਲਬਧ',
    'categories.explore': 'ਖੋਜੋ',
    'categories.electronics': 'ਇਲੈਕਟ੍ਰੋਨਿਕਸ',
    'categories.fashion': 'ਫੈਸ਼ਨ',
    'categories.homeAndFurniture': 'ਘਰ ਅਤੇ ਫਰਨੀਚਰ',
    'categories.beautyPersonalCare': 'ਸੁੰਦਰਤਾ ਅਤੇ ਨਿੱਜੀ ਦੇਖਭਾਲ',
    'categories.groceryEssentials': 'ਕਰਿਆਨਾ ਅਤੇ ਜ਼ਰੂਰੀ ਵਸਤੂਆਂ',
    'categories.healthWellness': 'ਸਿਹਤ ਅਤੇ ਤੰਦਰੁਸਤੀ',
    'categories.booksStationery': 'ਕਿਤਾਬਾਂ ਅਤੇ ਸਟੇਸ਼ਨਰੀ',
    'categories.toysBabyKids': 'ਖਿਡੌਣੇ, ਬੱਚੇ ਅਤੇ ਬਾਲ',
    'categories.sportsFitness': 'ਖੇਡਾਂ ਅਤੇ ਫਿਟਨੈਸ',
    'categories.automotive': 'ਆਟੋਮੋਟਿਵ',
    'categories.jewelryAccessories': 'ਗਹਿਣੇ ਅਤੇ ਐਕਸੈਸਰੀਜ਼',
    'categories.petSupplies': 'ਪਾਲਤੂ ਜਾਨਵਰਾਂ ਦੀਆਂ ਸਪਲਾਈਆਂ',
    'categories.travelLuggage': 'ਯਾਤਰਾ ਅਤੇ ਲਗੇਜ',
    'categories.dealsOffers': 'ਡੀਲਾਂ ਅਤੇ ਆਫਰ',
    'categories.general': 'ਆਮ ਵਸਤੂਆਂ',

    // Subcategories - Electronics
    'subcategory.mobilesAccessories': 'ਮੋਬਾਈਲ ਅਤੇ ਐਕਸੈਸਰੀਜ਼',
    'subcategory.laptopsTablets': 'ਲੈਪਟਾਪ ਅਤੇ ਟੈਬਲੇਟ',
    'subcategory.tvsHomeAppliances': 'ਟੀਵੀ ਅਤੇ ਘਰੇਲੂ ਉਪਕਰਣ',
    'subcategory.camerasDrones': 'ਕੈਮਰੇ ਅਤੇ ਡਰੋਨ',
    'subcategory.gaming': 'ਗੇਮਿੰਗ',

    // Subcategories - Fashion
    'subcategory.mensClothing': 'ਪੁਰਸ਼ਾਂ ਦੇ ਕੱਪੜੇ',
    'subcategory.womensClothing': 'ਔਰਤਾਂ ਦੇ ਕੱਪੜੇ',
    'subcategory.kidsBabyWear': 'ਬੱਚਿਆਂ ਅਤੇ ਬੇਬੀ ਦੇ ਕੱਪੜੇ',
    'subcategory.footwear': 'ਜੁੱਤੇ',
    'subcategory.watchesAccessories': 'ਘੜੀਆਂ ਅਤੇ ਐਕਸੈਸਰੀਜ਼',

    // Subcategories - Home & Furniture
    'subcategory.furniture': 'ਫਰਨੀਚਰ',
    'subcategory.homeDecor': 'ਘਰ ਦੀ ਸਜਾਵਟ',
    'subcategory.kitchenDining': 'ਰਸੋਈ ਅਤੇ ਖਾਣਾ',
    'subcategory.beddingBath': 'ਬਿਸਤਰਾ ਅਤੇ ਨਹਾਉਣਾ',
    'subcategory.toolsHardware': 'ਔਜ਼ਾਰ ਅਤੇ ਹਾਰਡਵੇਅਰ',

    // Subcategories - Beauty & Personal Care
    'subcategory.skincare': 'ਚਮੜੀ ਦੀ ਦੇਖਭਾਲ',
    'subcategory.makeup': 'ਮੇਕਅਪ',
    'subcategory.haircare': 'ਵਾਲਾਂ ਦੀ ਦੇਖਭਾਲ',
    'subcategory.fragrances': 'ਸੁਗੰਧ',
    'subcategory.mensGrooming': 'ਮਰਦਾਂ ਦੀ ਸੁੰਦਰਤਾ',

    // Subcategories - Grocery & Essentials
    'subcategory.fruitsVegetables': 'ਫਲ ਅਤੇ ਸਬਜ਼ੀਆਂ',
    'subcategory.dairyBakery': 'ਡੇਅਰੀ ਅਤੇ ਬੇਕਰੀ',
    'subcategory.snacksBeverages': 'ਸਨੈਕਸ ਅਤੇ ਪੇਯ ਪਦਾਰਥ',
    'subcategory.staplesPackagedFood': 'ਮੁੱਖ ਭੋਜਨ ਅਤੇ ਪੈਕੇਜਡ ਭੋਜਨ',
    'subcategory.cleaningHousehold': 'ਸਫਾਈ ਅਤੇ ਘਰੇਲੂ ਸਮਾਨ',

    // Subcategories - Health & Wellness
    'subcategory.vitaminsSupplements': 'ਵਿਟਾਮਿਨ ਅਤੇ ਸਪਲੀਮੈਂਟਸ',
    'subcategory.medicalDevices': 'ਮੈਡੀਕਲ ਡਿਵਾਈਸਿਜ਼',
    'subcategory.firstAidHealthMonitors': 'ਫਸਟ ਏਡ ਅਤੇ ਹੈਲਥ ਮੌਨੀਟਰਜ਼',
    'subcategory.fitnessEquipment': 'ਫਿਟਨੈਸ ਉਪਕਰਣ',

    // Subcategories - Books & Stationery
    'subcategory.academicBooks': 'ਅਕਾਦਮਿਕ ਕਿਤਾਬਾਂ',
    'subcategory.fictionNonFiction': 'ਕਲਪਨਾ ਅਤੇ ਗੈਰ-ਕਲਪਨਾ',
    'subcategory.artSupplies': 'ਕਲਾ ਸਮੱਗਰੀ',
    'subcategory.officeSupplies': 'ਦਫਤਰ ਸਮੱਗਰੀ',

    // Subcategories - Toys, Baby & Kids
    'subcategory.toysGames': 'ਖਿਡੌਣੇ ਅਤੇ ਖੇਡਾਂ',
    'subcategory.babyCareProducts': 'ਬੱਚੇ ਦੀ ਦੇਖਭਾਲ ਉਤਪਾਦ',
    'subcategory.schoolSupplies': 'ਸਕੂਲ ਸਮੱਗਰੀ',

    // Subcategories - Sports & Fitness
    'subcategory.exerciseGymEquipment': 'ਵਰਜਸ਼ ਅਤੇ ਜਿਮ ਉਪਕਰਣ',
    'subcategory.outdoorSportsGear': 'ਆਊਟਡੋਰ ਸਪੋਰਟਸ ਗੀਅਰ',
    'subcategory.sportswear': 'ਖੇਡ ਪਹਿਰਾਵਾ',

    // Subcategories - Automotive
    'subcategory.carAccessories': 'ਕਾਰ ਐਕਸੈਸਰੀਜ਼',
    'subcategory.bikeAccessories': 'ਬਾਈਕ ਐਕਸੈਸਰੀਜ਼',
    'subcategory.toolsEquipment': 'ਔਜ਼ਾਰ ਅਤੇ ਉਪਕਰਣ',
    'subcategory.oilsLubricants': 'ਤੇਲ ਅਤੇ ਲੁਬਰੀਕੈਂਟਸ',

    // Subcategories - Jewelry & Accessories
    'subcategory.goldSilver': 'ਸੋਨਾ ਅਤੇ ਚਾਂਦੀ',
    'subcategory.imitationJewelry': 'ਨਕਲੀ ਗਹਿਣੇ',
    'subcategory.bagsWallets': 'ਬੈਗ ਅਤੇ ਵਾਲੇਟ',
    'subcategory.beltsSunglasses': 'ਬੈਲਟ ਅਤੇ ਸਨਗਲਾਸ',

    // Subcategories - Pet Supplies
    'subcategory.petFood': 'ਭੋਜਨ',
    'subcategory.petToys': 'ਖਿਡੌਣੇ',
    'subcategory.petGrooming': 'ਗਰੂਮਿੰਗ',
    'subcategory.petAccessories': 'ਐਕਸੈਸਰੀਜ਼',

    // Subcategories - Travel & Luggage
    'subcategory.backpacks': 'ਬੈਕਪੈਕਸ',
    'subcategory.trolleys': 'ਟਰਾਲੀਆਂ',
    'subcategory.travelAccessories': 'ਯਾਤਰਾ ਐਕਸੈਸਰੀਜ਼',

    // Subcategories - Deals & Offers
    'subcategory.dailyDeals': 'ਰੋਜ਼ਾਨਾ ਡੀਲਾਂ',
    'subcategory.flashSales': 'ਫਲੈਸ਼ ਸੇਲਜ਼',
    'subcategory.clearance': 'ਕਲੀਅਰੈਂਸ',

    // Common subcategory text
    'subcategory.more': 'ਹੋਰ',

    // PRODUCT NAMES IN PUNJABI
    'product.1': 'ਆਈਫੋਨ 15 ਪ੍ਰੋ ਮੈਕਸ 256ਜੀਬੀ',
    'product.2': 'ਸੈਮਸੰਗ ਗੈਲੇਕਸੀ ਵਾਚ 6 ਕਲਾਸਿਕ',
    'product.3': 'ਮੈਕਬੁੱਕ ਏਅਰ ਐਮ3 13-ਇੰਚ',
    'product.4': 'ਨਾਈਕੀ ਏਅਰ ਫੋਰਸ 1 ਸਨੀਕਰਜ਼',
    'product.5': 'ਲੇਵਿਸ 511 ਸਲਿਮ ਫਿਟ ਜੀਨਜ਼',
    'product.6': 'ਮਾਮਾਅਰਥ ਟੀ ਟ੍ਰੀ ਫੇਸ ਵਾਸ਼',
    'product.7': 'ਲਕਮੇ ਐਬਸੋਲਿਊਟ ਪਰਫੈਕਟ ਰੇਡੀਅੰਸ ਫਾਊਂਡੇਸ਼ਨ',
    'product.8': 'ਆਰਗੈਨਿਕ ਕੁਇਨੋਆ ਪ੍ਰੀਮੀਅਮ 1ਕਿਲੋ',
    'product.9': 'ਤਾਜ਼ੇ ਆਰਗੈਨਿਕ ਸਟ੍ਰਾਬੇਰੀ 500ਗ੍ਰਾਮ',
    'product.10': 'ਅਮੂਲ ਤਾਜ਼ਾ ਦੁੱਧ 1ਲਿਟਰ',
    'product.11': 'ਆਈਕੀਆ ਹੇਮਨੇਸ ਬੁੱਕਸ਼ੈਲਫ ਚਿੱਟਾ',
    'product.12': 'ਫਿਲਿਪਸ ਐਲਈਡੀ ਸਮਾਰਟ ਬਲਬ 9ਵਾਟ',
    'product.13': 'ਹਿਮਾਲਿਆ ਅਸ਼ਵਗੰਧਾ ਟੈਬਲੇਟਸ',
    'product.14': 'ਯੋਗਾ ਮੈਟ ਐਂਟੀ-ਸਲਿਪ 6ਮਿਮੀ',
    'product.15': 'ਈਕੋ-ਫ੍ਰੈਂਡਲੀ ਕਲੀਨਿੰਗ ਕਿਟ',
    'product.16': 'ਸਟੇਨਲੈਸ ਸਟੀਲ ਵਾਟਰ ਬੋਤਲ ਸੈਟ',
    'product.17': 'ਦ ਸਾਈਕੋਲੋਜੀ ਆਫ ਮਨੀ ਬੁੱਕ',
    'product.18': 'ਪਾਰਕਰ ਜੋਟਰ ਬਾਲਪੁਆਇੰਟ ਪੈਨ',
    'product.19': 'ਕਾਰ ਡੈਸ਼ਬੋਰਡ ਕੈਮਰਾ ਐਚਡੀ',
    'product.20': 'ਬਾਈਕ ਫੋਨ ਹੋਲਡਰ ਮਾਊਂਟ',

    // Budget
    'budget.title': 'ਬਜਟ ਓਵਰਵਿਊ',
    'budget.period': 'ਬਜਟ',
    'budget.exceeded': 'ਬਜਟ ਵੱਧ ਗਿਆ!',
    'budget.exceededMessage': 'ਤੁਸੀਂ ਆਪਣਾ ਬਜਟ ਵੱਧ ਕਰ ਲਿਆ ਹੈ',
    'budget.getLoanOptions': 'ਲੋਨ ਵਿਕਲਪ ਪ੍ਰਾਪਤ ਕਰੋ',
    'budget.totalBudget': 'ਕੁੱਲ ਬਜਟ',
    'budget.spent': 'ਖਰਚ ਕੀਤਾ',
    'budget.remaining': 'ਬਾਕੀ',
    'budget.budgetUsed': 'ਬਜਟ ਵਰਤਿਆ ਗਿਆ',
    'budget.activeLoan': 'ਐਕਟਿਵ ਲੋਨ',
    'budget.amount': 'ਰਕਮ',
    'budget.emi': 'ਈਐਮਆਈ',
    'budget.activeEmis': 'ਐਕਟਿਵ ਈਐਮਆਈਜ਼',
    'budget.nextPayment': 'ਅਗਲੀ ਅਦਾਇਗੀ',
    'budget.monthly': 'ਮਹੀਨਾਵਾਰ',
    'budget.weekly': 'ਹਫਤਾਵਾਰੀ',

    // Products
    'product.new': 'ਨਵਾਂ',
    'product.trending': 'ਟ੍ਰੈਂਡਿੰਗ',
    'product.off': 'ਛੂਟ',
    'product.inStock': 'ਸਟਾਕ ਵਿੱਚ',
    'product.outOfStock': 'ਸਟਾਕ ਵਿੱਚ ਨਹੀਂ',
    'product.buyNow': 'ਹੁਣੇ ਖਰੀਦੋ',
    'product.addToList': 'ਲਿਸਟ ਵਿੱਚ ਸ਼ਾਮਲ ਕਰੋ',
    'product.processing': 'ਪ੍ਰੋਸੈਸਿੰਗ...',
    'product.adding': 'ਸ਼ਾਮਲ ਕਰ ਰਿਹਾ ਹੈ...',
    'product.added': 'ਸ਼ਾਮਲ ਕੀਤਾ ਗਿਆ!',

    // Stats
    'stats.totalItems': 'ਕੁੱਲ ਆਈਟਮਾਂ',
    'stats.avgSavings': 'ਔਸਤ ਬਚਤ',
    'stats.topCategory': 'ਟੌਪ ਸ਼੍ਰੇਣੀ',
    'stats.newToday': 'ਅੱਜ ਨਵਾਂ',
    'stats.browseAll': 'ਸਾਰੇ ਉਤਪਾਦ ਬ੍ਰਾਊਜ਼ ਕਰੋ',
    'stats.viewDiscounted': 'ਛੂਟ ਵਾਲੀਆਂ ਆਈਟਮਾਂ ਵੇਖੋ',
    'stats.filterByCategory': 'ਸ਼੍ਰੇਣੀ ਅਨੁਸਾਰ ਫਿਲਟਰ ਕਰੋ',
    'stats.seeLatest': 'ਨਵੀਨਤਮ ਆਗਮਨ ਵੇਖੋ',

    // Deals
    'deals.flashDeals': 'ਫਲੈਸ਼ ਡੀਲਜ਼',
    'deals.limitedTime': 'ਸੀਮਿਤ ਸਮੇਂ ਦੀਆਂ ਪੇਸ਼ਕਸ਼ਾਂ - ਉਹਨਾਂ ਦੇ ਖਤਮ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਪ੍ਰਾਪਤ ਕਰੋ!',
    'deals.endsIn': '2ਘੰਟੇ 45ਮਿੰਟ ਵਿੱਚ ਖਤਮ ਹੁੰਦਾ ਹੈ',
    'deals.hotDeal': 'ਹੌਟ ਡੀਲ',

    // Empty States
    'empty.noConnection': 'ਕੋਈ API ਕਨੈਕਸ਼ਨ ਨਹੀਂ',
    'empty.noConnectionDesc': 'ਅਸਲ ਉਤਪਾਦਾਂ ਨੂੰ ਬ੍ਰਾਊਜ਼ ਕਰਨਾ ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਆਪਣੇ ਈ-ਕਾਮਰਸ ਪਲੇਟਫਾਰਮ API ਕਨੈਕਟ ਕਰੋ',
    'empty.noProducts': 'ਕੋਈ ਉਤਪਾਦ ਉਪਲਬਧ ਨਹੀਂ',
    'empty.noProductsDesc': 'ਤੁਹਾਡੇ ਕਨੈਕਟਡ API ਤੋਂ ਕੋਈ ਉਤਪਾਦ ਨਹੀਂ ਮਿਲੇ। ਆਪਣੇ API ਕੌਨਫਿਗਰੇਸ਼ਨ ਦੀ ਜਾਂਚ ਕਰੋ ਜਾਂ ਰਿਫਰੈਸ਼ ਕਰਨ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰੋ।',
    'empty.noResults': 'ਕੋਈ ਨਤੀਜੇ ਨਹੀਂ ਮਿਲੇ',
    'empty.noResultsDesc': 'ਤੁਹਾਡੀ ਖੋਜ ਲਈ ਕੋਈ ਉਤਪਾਦ ਨਹੀਂ ਮਿਲੇ। ਵੱਖਰੇ ਕੀਵਰਡ ਅਜ਼ਮਾਓ ਜਾਂ ਆਪਣੇ API ਕਨੈਕਸ਼ਨਾਂ ਦੀ ਜਾਂਚ ਕਰੋ।',
    'empty.apiError': 'API ਕਨੈਕਸ਼ਨ ਗਲਤੀ',
    'empty.apiErrorDesc': 'ਤੁਹਾਡੇ ਕਨੈਕਟਡ API ਤੋਂ ਡਾਟਾ ਪ੍ਰਾਪਤ ਕਰਨ ਵਿੱਚ ਅਸਮਰੱਥ। ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀਆਂ API ਕੁੰਜੀਆਂ ਦੀ ਜਾਂਚ ਕਰੋ ਅਤੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।',
    'empty.configureApis': 'API ਕੌਨਫਿਗਰ ਕਰੋ',
    'empty.refreshData': 'ਡਾਟਾ ਰਿਫਰੈਸ਼ ਕਰੋ',
    'empty.clearSearch': 'ਖੋਜ ਸਾਫ਼ ਕਰੋ',
    'empty.checkApiConfig': 'API ਕੌਨਫਿਗ ਚੈੱਕ ਕਰੋ',

    // Language Selector - COMPLETE SECTION IN PUNJABI
    'language.title': 'ਭਾਸ਼ਾ ਚੁਣੋ',
    'language.subtitle': 'ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਚੁਣੋ',
    'language.changeLanguage': 'ਭਾਸ਼ਾ ਬਦਲੋ',
    'language.currentLanguage': 'ਮੌਜੂਦਾ ਭਾਸ਼ਾ',
    'language.supportedLanguages': 'ਸਮਰਥਿਤ ਭਾਸ਼ਾਵਾਂ',
    'language.interfaceLanguage': 'ਇੰਟਰਫੇਸ ਭਾਸ਼ਾ',
    'language.searchLanguage': 'ਕਿਸੇ ਵੀ ਭਾਸ਼ਾ ਵਿੱਚ ਖੋਜੋ',
    'language.voiceSupport': 'ਆਵਾਜ਼ ਕਮਾਂਡ ਸਮਰਥਿਤ',
    'language.aiTranslation': 'AI-ਸੰਚਾਲਿਤ ਅਨੁਵਾਦ',

    // Footer
    'footer.description': 'ਲਾਈਵ API ਇੰਟੀਗ੍ਰੇਸ਼ਨ, AI-ਸੰਚਾਲਿਤ ਸਿਫਾਰਸ਼ਾਂ, ਸਮਾਰਟ ਖਰੀਦ ਵਿਸ਼ਲੇਸ਼ਣ, ਅਤੇ ਲਚਕਦਾਰ EMI ਵਿਕਲਪਾਂ ਨਾਲ ਰੀਅਲ-ਟਾਈਮ ਸ਼ੌਪਿੰਗ ਅਸਿਸਟੈਂਟ',
    'footer.liveApi': 'ਲਾਈਵ API ਇੰਟੀਗ੍ਰੇਸ਼ਨ',
    'footer.multiLanguageAi': 'ਬਹੁਭਾਸ਼ੀ AI',
    'footer.realTimeData': 'ਰੀਅਲ-ਟਾਈਮ ਡਾਟਾ',
    'footer.securePrivate': 'ਸੁਰੱਖਿਅਤ ਅਤੇ ਨਿੱਜੀ',
    'footer.jewelryTracking': 'ਗਹਿਣਿਆਂ ਦੀ ਕੀਮਤ ਟਰੈਕਿੰਗ',
    'footer.smartEmi': 'ਸਮਾਰਟ EMI ਵਿਕਲਪ',
    'footer.smartAnalysis': 'ਸਮਾਰਟ ਖਰੀਦ ਵਿਸ਼ਲੇਸ਼ਣ',

    // Common
    'common.loading': 'API ਤੋਂ ਰੀਅਲ-ਟਾਈਮ ਡਾਟਾ ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
    'common.error': 'ਗਲਤੀ',
    'common.success': 'ਸਫਲਤਾ',
    'common.warning': 'ਚੇਤਾਵਨੀ',
    'common.info': 'ਜਾਣਕਾਰੀ',
    'common.yes': 'ਹਾਂ',
    'common.no': 'ਨਹੀਂ',
    'common.ok': 'ਠੀਕ ਹੈ',
    'common.cancel': 'ਰੱਦ ਕਰੋ',
    'common.save': 'ਸੇਵ ਕਰੋ',
    'common.delete': 'ਮਿਟਾਓ',
    'common.edit': 'ਸੰਪਾਦਿਤ ਕਰੋ',
    'common.view': 'ਦੇਖੋ',
    'common.close': 'ਬੰਦ ਕਰੋ',
    'common.currency': '₹',
    'common.perMonth': '/ਮਹੀਨਾ',
    'common.months': 'ਮਹੀਨੇ',
    'common.days': 'ਦਿਨ',
    'common.hours': 'ਘੰਟੇ',
    'common.minutes': 'ਮਿੰਟ',
  },

  // COMPLETE ODIA TRANSLATIONS INCLUDING ALL MISSING KEYS
  or: {
    // Header
    'app.title': 'ବଜେଟ୍ ଆଇକ୍ୟୁ',
    'app.subtitle': 'ସ୍ମାର୍ଟ ସପିଂ ଆସିଷ୍ଟାଣ୍ଟ',
    'header.apiConnected': 'API ସଂଯୋଗ ହୋଇଛି',
    'header.noApiConnection': 'କୌଣସି API ସଂଯୋଗ ନାହିଁ',
    'header.recentPurchases': 'ସାମ୍ପ୍ରତିକ କିଣାକିଣି',
    'header.shoppingList': 'ସପିଂ ତାଲିକା',
    'header.budgetSetup': 'ବଜେଟ୍ ସେଟଅପ୍',
    'header.apiConfig': 'API କନଫିଗ୍',

    // Hero Banner
    'hero.smartShopping': 'ସ୍ମାର୍ଟ ସପିଂ ଅନୁଭୂତି',
    'hero.title': 'ଅଦ୍ଭୁତ ଆବିଷ୍କାର କରନ୍ତୁ',
    'hero.subtitle': 'ଉତ୍ପାଦ ଏବଂ ଡିଲ୍ସ',
    'hero.description': 'AI-ଚାଳିତ ଖୋଜ, ରିଅଲ-ଟାଇମ୍ ମୂଲ୍ୟ ଟ୍ରାକିଂ, ସ୍ମାର୍ଟ ବଜେଟ୍ ପରିଚାଳନା ଏବଂ ନମନୀୟ EMI ବିକଳ୍ପ ସହିତ 15+ ବର୍ଗରେ ହଜାର ହଜାର ଉତ୍ପାଦ ଅନ୍ୱେଷଣ କରନ୍ତୁ।',
    'hero.startShopping': 'ସପିଂ ଆରମ୍ଭ କରନ୍ତୁ',
    'hero.viewDeals': 'ଡିଲ୍ସ ଦେଖନ୍ତୁ',
    'hero.categories': '15+ ବର୍ଗ',
    'hero.aiPowered': 'AI-ଚାଳିତ ଖୋଜ',
    'hero.smartBudget': 'ସ୍ମାର୍ଟ ବଜେଟ୍ + EMI',

    // Search
    'search.placeholder': 'AI ସହିତ ଉତ୍ପାଦ ଖୋଜନ୍ତୁ କିମ୍ବା YouTube URL ପେଷ୍ଟ କରନ୍ତୁ...',
    'search.placeholderConnected': 'API ସଂଯୋଗ ହୋଇଛି! ଖୋଜିବା ଆରମ୍ଭ କରନ୍ତୁ ବା YouTube URL ପେଷ୍ଟ କରନ୍ତୁ...',
    'search.voiceSearch': 'ଭଏସ୍ ସର୍ଚ୍ଚ (ବହୁଭାଷୀ)',
    'search.imageSearch': 'AI ଇମେଜ୍ ସର୍ଚ୍ଚ ଏବଂ ମୂଲ୍ୟ ବିଶ୍ଳେଷଣ',
    'search.aiChat': 'AI ଚାଟ୍ ଆସିଷ୍ଟାଣ୍ଟ',
    'search.search': 'ଖୋଜନ୍ତୁ',
    'search.listening': 'ଶୁଣୁଛି... ଏବେ କୁହନ୍ତୁ! (ବହୁଭାଷୀ ସମର୍ଥିତ)',
    'search.multiLanguage': 'ବହୁଭାଷୀ AI ଖୋଜ • ଉନ୍ନତ ଚିତ୍ର ବିଶ୍ଳେଷଣ • ସ୍ୱର ନିର୍ଦ୍ଦେଶ • ଅଳଙ୍କାର ମୂଲ୍ୟ ଟ୍ରାକିଂ • YouTube URL ବିଶ୍ଳେଷଣ',

    // Categories
    'categories.title': 'ବର୍ଗ ଅନୁଯାୟୀ ସପିଂ କରନ୍ତୁ',
    'categories.description': 'ସମସ୍ତ ପ୍ରମୁଖ ବର୍ଗରେ ଉତ୍ପାଦ ଆବିଷ୍କାର କରନ୍ତୁ',
    'categories.updatedRealTime': 'ରିଅଲ-ଟାଇମରେ ଅପଡେଟ୍ ହୋଇଛି',
    'categories.items': 'ଆଇଟମ୍',
    'categories.itemsAvailable': 'ଆଇଟମ୍ ଉପଲବ୍ଧ',
    'categories.explore': 'ଅନ୍ୱେଷଣ କରନ୍ତୁ',
    'categories.electronics': 'ଇଲେକ୍ଟ୍ରୋନିକ୍ସ',
    'categories.fashion': 'ଫ୍ୟାସନ୍',
    'categories.homeAndFurniture': 'ଘର ଏବଂ ଆସବାବପତ୍ର',
    'categories.beautyPersonalCare': 'ସୌନ୍ଦର୍ଯ୍ୟ ଏବଂ ବ୍ୟକ୍ତିଗତ ଯତ୍ନ',
    'categories.groceryEssentials': 'ଗ୍ରୋସରୀ ଏବଂ ଅତ୍ୟାବଶ୍ୟକ',
    'categories.healthWellness': 'ସ୍ୱାସ୍ଥ୍ୟ ଏବଂ କଲ୍ୟାଣ',
    'categories.booksStationery': 'ପୁସ୍ତକ ଏବଂ ଷ୍ଟେଶନରୀ',
    'categories.toysBabyKids': 'ଖେଳନା, ଶିଶୁ ଏବଂ ପିଲାମାନେ',
    'categories.sportsFitness': 'କ୍ରୀଡ଼ା ଏବଂ ଫିଟନେସ୍',
    'categories.automotive': 'ଅଟୋମୋଟିଭ୍',
    'categories.jewelryAccessories': 'ଅଳଙ୍କାର ଏବଂ ଆକ୍ସେସୋରୀଜ୍',
    'categories.petSupplies': 'ପାଳିବା ପ୍ରାଣୀ ସରବରାହ',
    'categories.travelLuggage': 'ଯାତ୍ରା ଏବଂ ଲଗେଜ୍',
    'categories.dealsOffers': 'ଡିଲ୍ସ ଏବଂ ଅଫର୍',
    'categories.general': 'ସାଧାରଣ ବସ୍ତୁ',

    // Subcategories - Electronics
    'subcategory.mobilesAccessories': 'ମୋବାଇଲ୍ ଏବଂ ଆକ୍ସେସୋରୀଜ୍',
    'subcategory.laptopsTablets': 'ଲ୍ୟାପଟପ୍ ଏବଂ ଟାବଲେଟ୍',
    'subcategory.tvsHomeAppliances': 'ଟିଭି ଏବଂ ଘରୋଇ ଉପକରଣ',
    'subcategory.camerasDrones': 'କ୍ୟାମେରା ଏବଂ ଡ୍ରୋନ୍',
    'subcategory.gaming': 'ଗେମିଂ',

    // Subcategories - Fashion
    'subcategory.mensClothing': 'ପୁରୁଷଙ୍କ ପୋଷାକ',
    'subcategory.womensClothing': 'ମହିଳାଙ୍କ ପୋଷାକ',
    'subcategory.kidsBabyWear': 'ପିଲା ଏବଂ ଶିଶୁ ପୋଷାକ',
    'subcategory.footwear': 'ପାଦୁକା',
    'subcategory.watchesAccessories': 'ଘଡି ଏବଂ ଆକ୍ସେସୋରୀଜ୍',

    // Subcategories - Home & Furniture
    'subcategory.furniture': 'ଆସବାବପତ୍ର',
    'subcategory.homeDecor': 'ଘର ସଜାଇବା',
    'subcategory.kitchenDining': 'ରୋଷେଇ ଘର ଏବଂ ଖାଦ୍ୟ',
    'subcategory.beddingBath': 'ଶଯ୍ୟା ଏବଂ ସ୍ନାନ',
    'subcategory.toolsHardware': 'ଯନ୍ତ୍ର ଏବଂ ହାର୍ଡୱେର',

    // Subcategories - Beauty & Personal Care
    'subcategory.skincare': 'ଚର୍ମ ଯତ୍ନ',
    'subcategory.makeup': 'ମେକଅପ୍',
    'subcategory.haircare': 'କେଶ ଯତ୍ନ',
    'subcategory.fragrances': 'ସୁଗନ୍ଧ',
    'subcategory.mensGrooming': 'ପୁରୁଷଙ୍କ ସୌନ୍ଦର୍ଯ୍ୟ',

    // Subcategories - Grocery & Essentials
    'subcategory.fruitsVegetables': 'ଫଳ ଏବଂ ପନିପରିବା',
    'subcategory.dairyBakery': 'ଡେରୀ ଏବଂ ବେକରୀ',
    'subcategory.snacksBeverages': 'ସ୍ନାକ୍ସ ଏବଂ ପାନୀୟ',
    'subcategory.staplesPackagedFood': 'ମୁଖ୍ୟ ଖାଦ୍ୟ ଏବଂ ପ୍ୟାକେଜ୍ ଖାଦ୍ୟ',
    'subcategory.cleaningHousehold': 'ସଫା ଏବଂ ଘରୋଇ ସାମଗ୍ରୀ',

    // Subcategories - Health & Wellness
    'subcategory.vitaminsSupplements': 'ଭିଟାମିନ୍ ଏବଂ ସପ୍ଲିମେଣ୍ଟ',
    'subcategory.medicalDevices': 'ମେଡିକାଲ୍ ଡିଭାଇସ୍',
    'subcategory.firstAidHealthMonitors': 'ପ୍ରାଥମିକ ଚିକିତ୍ସା ଏବଂ ସ୍ୱାସ୍ଥ୍ୟ ମନିଟର୍',
    'subcategory.fitnessEquipment': 'ଫିଟନେସ୍ ଉପକରଣ',

    // Subcategories - Books & Stationery
    'subcategory.academicBooks': 'ଶୈକ୍ଷିକ ପୁସ୍ତକ',
    'subcategory.fictionNonFiction': 'କଳ୍ପନା ଏବଂ ଅଣ-କଳ୍ପନା',
    'subcategory.artSupplies': 'କଳା ସାମଗ୍ରୀ',
    'subcategory.officeSupplies': 'କାର୍ଯ୍ୟାଳୟ ସାମଗ୍ରୀ',

    // Subcategories - Toys, Baby & Kids
    'subcategory.toysGames': 'ଖେଳନା ଏବଂ ଖେଳ',
    'subcategory.babyCareProducts': 'ଶିଶୁ ଯତ୍ନ ଉତ୍ପାଦ',
    'subcategory.schoolSupplies': 'ସ୍କୁଲ୍ ସାମଗ୍ରୀ',

    // Subcategories - Sports & Fitness
    'subcategory.exerciseGymEquipment': 'ବ୍ୟାୟାମ ଏବଂ ଜିମ୍ ଉପକରଣ',
    'subcategory.outdoorSportsGear': 'ଆଉଟଡୋର୍ ସ୍ପୋର୍ଟସ୍ ଗିଅର୍',
    'subcategory.sportswear': 'ଖେଳ ପୋଷାକ',

    // Subcategories - Automotive
    'subcategory.carAccessories': 'କାର୍ ଆକ୍ସେସୋରୀଜ୍',
    'subcategory.bikeAccessories': 'ବାଇକ୍ ଆକ୍ସେସୋରୀଜ୍',
    'subcategory.toolsEquipment': 'ଯନ୍ତ୍ର ଏବଂ ଉପକରଣ',
    'subcategory.oilsLubricants': 'ତେଲ ଏବଂ ଲୁବ୍ରିକାଣ୍ଟ',

    // Subcategories - Jewelry & Accessories
    'subcategory.goldSilver': 'ସୁନା ଏବଂ ରୂପା',
    'subcategory.imitationJewelry': 'ନକଲି ଅଳଙ୍କାର',
    'subcategory.bagsWallets': 'ବ୍ୟାଗ୍ ଏବଂ ୱାଲେଟ୍',
    'subcategory.beltsSunglasses': 'ବେଲ୍ଟ ଏବଂ ସନଗ୍ଲାସ୍',

    // Subcategories - Pet Supplies
    'subcategory.petFood': 'ଖାଦ୍ୟ',
    'subcategory.petToys': 'ଖେଳନା',
    'subcategory.petGrooming': 'ଗ୍ରୁମିଂ',
    'subcategory.petAccessories': 'ଆକ୍ସେସୋରୀଜ୍',

    // Subcategories - Travel & Luggage
    'subcategory.backpacks': 'ବ୍ୟାକପ୍ୟାକ୍',
    'subcategory.trolleys': 'ଟ୍ରଲି',
    'subcategory.travelAccessories': 'ଯାତ୍ରା ଆକ୍ସେସୋରୀଜ୍',

    // Subcategories - Deals & Offers
    'subcategory.dailyDeals': 'ଦୈନିକ ଡିଲ୍ସ',
    'subcategory.flashSales': 'ଫ୍ଲାଶ୍ ସେଲ୍ସ',
    'subcategory.clearance': 'କ୍ଲିଅରେନ୍ସ',

    // Common subcategory text
    'subcategory.more': 'ଅଧିକ',

    // PRODUCT NAMES IN ODIA
    'product.1': 'ଆଇଫୋନ୍ 15 ପ୍ରୋ ମ୍ୟାକ୍ସ 256ଜିବି',
    'product.2': 'ସାମସଙ୍ଗ ଗ୍ୟାଲାକ୍ସି ୱାଚ୍ 6 କ୍ଲାସିକ୍',
    'product.3': 'ମ୍ୟାକବୁକ୍ ଏୟାର୍ ଏମ3 13-ଇଞ୍ଚ',
    'product.4': 'ନାଇକି ଏୟାର୍ ଫୋର୍ସ 1 ସ୍ନିକର୍ସ',
    'product.5': 'ଲେଭିସ୍ 511 ସ୍ଲିମ୍ ଫିଟ୍ ଜିନ୍ସ',
    'product.6': 'ମାମାଆର୍ଥ ଟି ଟ୍ରି ଫେସ୍ ୱାଶ୍',
    'product.7': 'ଲକ୍ମେ ଅବସୋଲ୍ୟୁଟ୍ ପରଫେକ୍ଟ ରେଡିଆନ୍ସ ଫାଉଣ୍ଡେସନ୍',
    'product.8': 'ଅର୍ଗାନିକ୍ କୁଇନୋଆ ପ୍ରିମିୟମ୍ 1କିଲୋ',
    'product.9': 'ତାଜା ଅର୍ଗାନିକ୍ ଷ୍ଟ୍ରବେରି 500ଗ୍ରାମ',
    'product.10': 'ଅମୂଲ୍ ତାଜା କ୍ଷୀର 1ଲିଟର',
    'product.11': 'ଆଇକିଆ ହେମନେସ୍ ବୁକସେଲଫ୍ ଧଳା',
    'product.12': 'ଫିଲିପ୍ସ ଏଲଇଡି ସ୍ମାର୍ଟ ବଲ୍ବ 9ୱାଟ',
    'product.13': 'ହିମାଳୟ ଅଶ୍ୱଗନ୍ଧା ଟାବଲେଟ୍',
    'product.14': 'ଯୋଗ ମ୍ୟାଟ୍ ଆଣ୍ଟି-ସ୍ଲିପ୍ 6ମିମି',
    'product.15': 'ଇକୋ-ଫ୍ରେଣ୍ଡଲି କ୍ଲିନିଂ କିଟ୍',
    'product.16': 'ଷ୍ଟେନଲେସ୍ ଷ୍ଟିଲ୍ ୱାଟର ବୋତଲ ସେଟ୍',
    'product.17': 'ଦ ସାଇକୋଲୋଜି ଅଫ୍ ମନି ବୁକ୍',
    'product.18': 'ପାର୍କର ଜୋଟର ବଲପଏଣ୍ଟ ପେନ୍',
    'product.19': 'କାର ଡ୍ୟାସବୋର୍ଡ କ୍ୟାମେରା ଏଚଡି',
    'product.20': 'ବାଇକ୍ ଫୋନ୍ ହୋଲଡର ମାଉଣ୍ଟ',

    // Budget
    'budget.title': 'ବଜେଟ୍ ଅବଲୋକନ',
    'budget.period': 'ବଜେଟ୍',
    'budget.exceeded': 'ବଜେଟ୍ ଅତିକ୍ରମ ହୋଇଛି!',
    'budget.exceededMessage': 'ଆପଣ ଆପଣଙ୍କର ବଜେଟ୍ ଅତିକ୍ରମ କରିଛନ୍ତି',
    'budget.getLoanOptions': 'ଋଣ ବିକଳ୍ପ ପାଆନ୍ତୁ',
    'budget.totalBudget': 'ମୋଟ ବଜେଟ୍',
    'budget.spent': 'ଖର୍ଚ୍ଚ ହୋଇଛି',
    'budget.remaining': 'ଅବଶିଷ୍ଟ',
    'budget.budgetUsed': 'ବଜେଟ୍ ବ୍ୟବହୃତ',
    'budget.activeLoan': 'ସକ୍ରିୟ ଋଣ',
    'budget.amount': 'ପରିମାଣ',
    'budget.emi': 'ଇଏମଆଇ',
    'budget.activeEmis': 'ସକ୍ରିୟ ଇଏମଆଇ',
    'budget.nextPayment': 'ପରବର୍ତ୍ତୀ ଦେୟ',
    'budget.monthly': 'ମାସିକ',
    'budget.weekly': 'ସାପ୍ତାହିକ',

    // Products
    'product.new': 'ନୂଆ',
    'product.trending': 'ଟ୍ରେଣ୍ଡିଂ',
    'product.off': 'ଛାଡ଼',
    'product.inStock': 'ଷ୍ଟକରେ ଅଛି',
    'product.outOfStock': 'ଷ୍ଟକରେ ନାହିଁ',
    'product.buyNow': 'ଏବେ କିଣନ୍ତୁ',
    'product.addToList': 'ତାଲିକାରେ ଯୋଡନ୍ତୁ',
    'product.processing': 'ପ୍ରକ୍ରିୟାକରଣ ହେଉଛି...',
    'product.adding': 'ଯୋଡୁଛି...',
    'product.added': 'ଯୋଡ଼ା ଯାଇଛି!',

    // Stats
    'stats.totalItems': 'ମୋଟ ଆଇଟମ୍',
    'stats.avgSavings': 'ହାରାହାରି ସଞ୍ଚୟ',
    'stats.topCategory': 'ଶୀର୍ଷ ବର୍ଗ',
    'stats.newToday': 'ଆଜି ନୂଆ',
    'stats.browseAll': 'ସମସ୍ତ ଉତ୍ପାଦ ବ୍ରାଉଜ୍ କରନ୍ତୁ',
    'stats.viewDiscounted': 'ଡିସ୍କାଉଣ୍ଟେଡ୍ ଆଇଟମ୍ ଦେଖନ୍ତୁ',
    'stats.filterByCategory': 'ବର୍ଗ ଅନୁଯାୟୀ ଫିଲ୍ଟର୍ କରନ୍ତୁ',
    'stats.seeLatest': 'ନବୀନତମ ଆଗମନ ଦେଖନ୍ତୁ',

    // Deals
    'deals.flashDeals': 'ଫ୍ଲାଶ୍ ଡିଲ୍ସ',
    'deals.limitedTime': 'ସୀମିତ ସମୟ ଅଫର୍ - ସେମାନେ ଯିବା ପୂର୍ବରୁ ଧରନ୍ତୁ!',
    'deals.endsIn': '2ଘଣ୍ଟା 45ମିନିଟରେ ଶେଷ ହେବ',
    'deals.hotDeal': 'ହଟ୍ ଡିଲ୍',

    // Empty States
    'empty.noConnection': 'କୌଣସି API ସଂଯୋଗ ନାହିଁ',
    'empty.noConnectionDesc': 'ବାସ୍ତବ ଉତ୍ପାଦ ବ୍ରାଉଜ୍ କରିବା ଆରମ୍ଭ କରିବାକୁ ଆପଣଙ୍କର ଇ-କମର୍ସ ପ୍ଲାଟଫର୍ମ APIଗୁଡ଼ିକ ସଂଯୋଗ କରନ୍ତୁ',
    'empty.noProducts': 'କୌଣସି ଉତ୍ପାଦ ଉପଲବ୍ଧ ନାହିଁ',
    'empty.noProductsDesc': 'ଆପଣଙ୍କର ସଂଯୋଗ ହୋଇଥିବା APIରୁ କୌଣସି ଉତ୍ପାଦ ମିଳିଲା ନାହିଁ। ଆପଣଙ୍କର API କନଫିଗରେସନ୍ ଯାଞ୍ଚ କରନ୍ତୁ କିମ୍ବା ରିଫ୍ରେଶ୍ କରିବାକୁ ଚେଷ୍ଟା କରନ୍ତୁ।',
    'empty.noResults': 'କୌଣସି ଫଳାଫଳ ମିଳିଲା ନାହିଁ',
    'empty.noResultsDesc': 'ଆପଣଙ୍କର ଖୋଜ ପାଇଁ କୌଣସି ଉତ୍ପାଦ ମିଳିଲା ନାହିଁ। ଭିନ୍ନ କୀୱର୍ଡ ଚେଷ୍ଟା କରନ୍ତୁ କିମ୍ବା ଆପଣଙ୍କର API ସଂଯୋଗଗୁଡ଼ିକ ଯାଞ୍ଚ କରନ୍ତୁ।',
    'empty.apiError': 'API ସଂଯୋଗ ତ୍ରୁଟି',
    'empty.apiErrorDesc': 'ଆପଣଙ୍କର ସଂଯୋଗ ହୋଇଥିବା APIରୁ ଡାଟା ପ୍ରାପ୍ତ କରିବାରେ ଅସମର୍ଥ। ଦୟାକରି ଆପଣଙ୍କର API କୀଗୁଡ଼ିକ ଯାଞ୍ଚ କରନ୍ତୁ ଏବଂ ପୁନଃଚେଷ୍ଟା କରନ୍ତୁ।',
    'empty.configureApis': 'APIଗୁଡ଼ିକ କନଫିଗର୍ କରନ୍ତୁ',
    'empty.refreshData': 'ଡାଟା ରିଫ୍ରେଶ୍ କରନ୍ତୁ',
    'empty.clearSearch': 'ଖୋଜ ସଫା କରନ୍ତୁ',
    'empty.checkApiConfig': 'API କନଫିଗ୍ ଯାଞ୍ଚ କରନ୍ତୁ',

    // Language Selector - COMPLETE SECTION IN ODIA
    'language.title': 'ଭାଷା ବାଛନ୍ତୁ',
    'language.subtitle': 'ଆପଣଙ୍କର ପସନ୍ଦର ଭାଷା ବାଛନ୍ତୁ',
    'language.changeLanguage': 'ଭାଷା ବଦଳାନ୍ତୁ',
    'language.currentLanguage': 'ବର୍ତ୍ତମାନର ଭାଷା',
    'language.supportedLanguages': 'ସମର୍ଥିତ ଭାଷାଗୁଡ଼ିକ',
    'language.interfaceLanguage': 'ଇଣ୍ଟରଫେସ୍ ଭାଷା',
    'language.searchLanguage': 'ଯେକୌଣସି ଭାଷାରେ ଖୋଜନ୍ତୁ',
    'language.voiceSupport': 'ସ୍ୱର ନିର୍ଦ୍ଦେଶ ସମର୍ଥିତ',
    'language.aiTranslation': 'AI-ଚାଳିତ ଅନୁବାଦ',

    // Footer
    'footer.description': 'ଲାଇଭ୍ API ଏକୀକରଣ, AI-ଚାଳିତ ସୁପାରିଶ, ସ୍ମାର୍ଟ କ୍ରୟ ବିଶ୍ଳେଷଣ, ଏବଂ ନମନୀୟ EMI ବିକଳ୍ପ ସହିତ ରିଅଲ-ଟାଇମ୍ ସପିଂ ସହାୟକ',
    'footer.liveApi': 'ଲାଇଭ୍ API ଏକୀକରଣ',
    'footer.multiLanguageAi': 'ବହୁଭାଷୀ AI',
    'footer.realTimeData': 'ରିଅଲ-ଟାଇମ୍ ଡାଟା',
    'footer.securePrivate': 'ସୁରକ୍ଷିତ ଏବଂ ବ୍ୟକ୍ତିଗତ',
    'footer.jewelryTracking': 'ଅଳଙ୍କାର ମୂଲ୍ୟ ଟ୍ରାକିଂ',
    'footer.smartEmi': 'ସ୍ମାର୍ଟ EMI ବିକଳ୍ପ',
    'footer.smartAnalysis': 'ସ୍ମାର୍ଟ କ୍ରୟ ବିଶ୍ଳେଷଣ',

    // Common
    'common.loading': 'APIରୁ ରିଅଲ-ଟାଇମ୍ ଡାଟା ଲୋଡ୍ ହେଉଛି...',
    'common.error': 'ତ୍ରୁଟି',
    'common.success': 'ସଫଳତା',
    'common.warning': 'ଚେତାବନୀ',
    'common.info': 'ସୂଚନା',
    'common.yes': 'ହଁ',
    'common.no': 'ନା',
    'common.ok': 'ଠିକ୍ ଅଛି',
    'common.cancel': 'ବାତିଲ କରନ୍ତୁ',
    'common.save': 'ସେଭ୍ କରନ୍ତୁ',
    'common.delete': 'ଡିଲିଟ୍ କରନ୍ତୁ',
    'common.edit': 'ସମ୍ପାଦନା କରନ୍ତୁ',
    'common.view': 'ଦେଖନ୍ତୁ',
    'common.close': 'ବନ୍ଦ କରନ୍ତୁ',
    'common.currency': '₹',
    'common.perMonth': '/ମାସ',
    'common.months': 'ମାସ',
    'common.days': 'ଦିନ',
    'common.hours': 'ଘଣ୍ଟା',
    'common.minutes': 'ମିନିଟ୍',
  },

  // COMPLETE ASSAMESE TRANSLATIONS INCLUDING ALL MISSING KEYS
  as: {
    // Header
    'app.title': 'বাজেট আইকিউ',
    'app.subtitle': 'স্মাৰ্ট শ্বপিং সহায়ক',
    'header.apiConnected': 'API সংযোগ হৈছে',
    'header.noApiConnection': 'কোনো API সংযোগ নাই',
    'header.recentPurchases': 'শেহতীয়া কিনা-কটা',
    'header.shoppingList': 'শ্বপিং তালিকা',
    'header.budgetSetup': 'বাজেট চেটআপ',
    'header.apiConfig': 'API কনফিগ',

    // Hero Banner
    'hero.smartShopping': 'স্মাৰ্ট শ্বপিং অভিজ্ঞতা',
    'hero.title': 'আচৰিত আৱিষ্কাৰ কৰক',
    'hero.subtitle': 'সামগ্ৰী আৰু ডিলসমূহ',
    'hero.description': 'AI-চালিত অনুসন্ধান, ৰিয়েল-টাইম মূল্য ট্ৰেকিং, স্মাৰ্ট বাজেট পৰিচালনা আৰু নমনীয় EMI বিকল্পৰ সৈতে 15+ শ্ৰেণীত হাজাৰ হাজাৰ সামগ্ৰী অন্বেষণ কৰক।',
    'hero.startShopping': 'শ্বপিং আৰম্ভ কৰক',
    'hero.viewDeals': 'ডিলসমূহ চাওক',
    'hero.categories': '15+ শ্ৰেণী',
    'hero.aiPowered': 'AI-চালিত অনুসন্ধান',
    'hero.smartBudget': 'স্মাৰ্ট বাজেট + EMI',

    // Search
    'search.placeholder': 'AI ৰ সৈতে পণ্য বিচাৰক বা YouTube URL পেষ্ট কৰক...',
    'search.placeholderConnected': 'API সংযোগ হৈছে! অনুসন্ধান আৰম্ভ কৰক বা YouTube URL পেষ্ট কৰক...',
    'search.voiceSearch': 'ভয়েচ অনুসন্ধান (বহুভাষিক)',
    'search.imageSearch': 'AI ছবি অনুসন্ধান আৰু মূল্য বিশ্লেষণ',
    'search.aiChat': 'AI চেট সহায়ক',
    'search.search': 'বিচাৰক',
    'search.listening': 'শুনি আছে... এতিয়া কথা কওক! (বহুভাষিক সমৰ্থিত)',
    'search.multiLanguage': 'বহুভাষিক AI অনুসন্ধান • উন্নত চিত্ৰ বিশ্লেষণ • কণ্ঠস্বৰ আদেশ • অলংকাৰৰ দাম ট্ৰেকিং • YouTube URL বিশ্লেষণ',

    // Categories
    'categories.title': 'শ্ৰেণী অনুসৰি শ্বপিং কৰক',
    'categories.description': 'সকলো প্ৰধান শ্ৰেণীত সামগ্ৰী আৱিষ্কাৰ কৰক',
    'categories.updatedRealTime': 'ৰিয়েল-টাইমত আপডেট কৰা হৈছে',
    'categories.items': 'সামগ্ৰী',
    'categories.itemsAvailable': 'সামগ্ৰী উপলব্ধ',
    'categories.explore': 'অন্বেষণ কৰক',
    'categories.electronics': 'ইলেকট্ৰনিক্স',
    'categories.fashion': 'ফেশ্বন',
    'categories.homeAndFurniture': 'ঘৰ আৰু আচবাব',
    'categories.beautyPersonalCare': 'সৌন্দৰ্য্য আৰু ব্যক্তিগত যত্ন',
    'categories.groceryEssentials': 'মুদি আৰু অত্যাৱশ্যকীয়',
    'categories.healthWellness': 'স্বাস্থ্য আৰু সুস্থতা',
    'categories.booksStationery': 'কিতাপ আৰু ষ্টেচনাৰী',
    'categories.toysBabyKids': 'খেলনা, শিশু আৰু ল\'ৰা-ছোৱালী',
    'categories.sportsFitness': 'খেল আৰু ফিটনেছ',
    'categories.automotive': 'অট\'মটিভ',
    'categories.jewelryAccessories': 'অলংকাৰ আৰু এক্সেছৰিজ',
    'categories.petSupplies': 'পোহনীয়া জন্তুৰ সামগ্ৰী',
    'categories.travelLuggage': 'ভ্ৰমণ আৰু লাগেজ',
    'categories.dealsOffers': 'ডিল আৰু অফাৰ',
    'categories.general': 'সাধাৰণ বস্তু',

    // Subcategories - Electronics
    'subcategory.mobilesAccessories': 'ম\'বাইল আৰু এক্সেছৰিজ',
    'subcategory.laptopsTablets': 'লেপটপ আৰু টেবলেট',
    'subcategory.tvsHomeAppliances': 'টিভি আৰু ঘৰুৱা যন্ত্ৰ',
    'subcategory.camerasDrones': 'কেমেৰা আৰু ড্ৰোন',
    'subcategory.gaming': 'গেমিং',

    // Subcategories - Fashion
    'subcategory.mensClothing': 'পুৰুষৰ পোছাক',
    'subcategory.womensClothing': 'মহিলাৰ পোছাক',
    'subcategory.kidsBabyWear': 'ল\'ৰা-ছোৱালী আৰু শিশুৰ পোছাক',
    'subcategory.footwear': 'জোতা',
    'subcategory.watchesAccessories': 'ঘড়ী আৰু এক্সেছৰিজ',

    // Subcategories - Home & Furniture
    'subcategory.furniture': 'আচবাব',
    'subcategory.homeDecor': 'ঘৰৰ সজ্জা',
    'subcategory.kitchenDining': 'পাকঘৰ আৰু খাদ্য',
    'subcategory.beddingBath': 'শয্যা আৰু গা ধোৱা',
    'subcategory.toolsHardware': 'সঁজুলি আৰু হাৰ্ডৱেৰ',

    // Subcategories - Beauty & Personal Care
    'subcategory.skincare': 'ছালৰ যত্ন',
    'subcategory.makeup': 'মেকআপ',
    'subcategory.haircare': 'চুলিৰ যত্ন',
    'subcategory.fragrances': 'সুগন্ধি',
    'subcategory.mensGrooming': 'পুৰুষৰ সৌন্দৰ্য',

    // Subcategories - Grocery & Essentials
    'subcategory.fruitsVegetables': 'ফল আৰু শাক-পাচলি',
    'subcategory.dairyBakery': 'দুগ্ধজাত আৰু বেকাৰী',
    'subcategory.snacksBeverages': 'জলপান আৰু পানীয়',
    'subcategory.staplesPackagedFood': 'মূল খাদ্য আৰু পেকেজ খাদ্য',
    'subcategory.cleaningHousehold': 'চাফ-চিকুণতা আৰু ঘৰুৱা সামগ্ৰী',

    // Subcategories - Health & Wellness
    'subcategory.vitaminsSupplements': 'ভিটামিন আৰু পৰিপূৰক',
    'subcategory.medicalDevices': 'চিকিৎসা যন্ত্ৰ',
    'subcategory.firstAidHealthMonitors': 'প্ৰাথমিক চিকিৎসা আৰু স্বাস্থ্য মনিটৰ',
    'subcategory.fitnessEquipment': 'ফিটনেছ যন্ত্ৰ',

    // Subcategories - Books & Stationery
    'subcategory.academicBooks': 'শৈক্ষিক কিতাপ',
    'subcategory.fictionNonFiction': 'কল্পনা আৰু অকল্পনা',
    'subcategory.artSupplies': 'শিল্প সামগ্ৰী',
    'subcategory.officeSupplies': 'কাৰ্যালয় সামগ্ৰী',

    // Subcategories - Toys, Baby & Kids
    'subcategory.toysGames': 'খেলনা আৰু খেল',
    'subcategory.babyCareProducts': 'শিশু যত্ন সামগ্ৰী',
    'subcategory.schoolSupplies': 'স্কুল সামগ্ৰী',

    // Subcategories - Sports & Fitness
    'subcategory.exerciseGymEquipment': 'ব্যায়াম আৰু জিম যন্ত্ৰ',
    'subcategory.outdoorSportsGear': 'বাহিৰৰ খেল সামগ্ৰী',
    'subcategory.sportswear': 'খেল পোছাক',

    // Subcategories - Automotive
    'subcategory.carAccessories': 'কাৰ এক্সেছৰিজ',
    'subcategory.bikeAccessories': 'বাইক এক্সেছৰিজ',
    'subcategory.toolsEquipment': 'সঁজুলি আৰু যন্ত্ৰ',
    'subcategory.oilsLubricants': 'তেল আৰু লুব্ৰিকেণ্ট',

    // Subcategories - Jewelry & Accessories
    'subcategory.goldSilver': 'সোণ আৰু ৰূপ',
    'subcategory.imitationJewelry': 'নকল অলংকাৰ',
    'subcategory.bagsWallets': 'বেগ আৰু ৱালেট',
    'subcategory.beltsSunglasses': 'বেল্ট আৰু চানগ্লাছ',

    // Subcategories - Pet Supplies
    'subcategory.petFood': 'খাদ্য',
    'subcategory.petToys': 'খেলনা',
    'subcategory.petGrooming': 'গ্ৰুমিং',
    'subcategory.petAccessories': 'এক্সেছৰিজ',

    // Subcategories - Travel & Luggage
    'subcategory.backpacks': 'বেকপেক',
    'subcategory.trolleys': 'ট্ৰলি',
    'subcategory.travelAccessories': 'ভ্ৰমণ এক্সেছৰিজ',

    // Subcategories - Deals & Offers
    'subcategory.dailyDeals': 'দৈনিক ডিল',
    'subcategory.flashSales': 'ফ্লেছ ছেল',
    'subcategory.clearance': 'ক্লিয়াৰেন্স',

    // Common subcategory text
    'subcategory.more': 'অধিক',

    // PRODUCT NAMES IN ASSAMESE
    'product.1': 'আইফোন ১৫ প্ৰো মেক্স ২৫৬জিবি',
    'product.2': 'চেমচাং গেলেক্সি ৱাচ ৬ ক্লাছিক',
    'product.3': 'মেকবুক এয়াৰ এম৩ ১৩-ইঞ্চি',
    'product.4': 'নাইকি এয়াৰ ফোৰ্চ ১ স্নিকাৰ্চ',
    'product.5': 'লেভিছ ৫১১ স্লিম ফিট জিন্স',
    'product.6': 'মামাআৰ্থ টি ট্ৰি ফেচ ৱাশ',
    'product.7': 'লক্মে এবছলিউট পাৰফেক্ট ৰেডিয়েন্স ফাউণ্ডেশ্যন',
    'product.8': 'অৰ্গেনিক কুইনোৱা প্ৰিমিয়াম ১কিলো',
    'product.9': 'তাজা অৰ্গেনিক ষ্ট্ৰবেৰী ৫০০গ্ৰাম',
    'product.10': 'অমূল তাজা গাখীৰ ১লিটাৰ',
    'product.11': 'আইকিয়া হেমনেছ বুকশ্বেলফ বগা',
    'product.12': 'ফিলিপছ এলইডি স্মাৰ্ট বাল্ব ৯ৱাট',
    'product.13': 'হিমালয় অশ্বগন্ধা টেবলেট',
    'product.14': 'যোগা মেট এণ্টি-স্লিপ ৬মিমি',
    'product.15': 'ইকো-ফ্ৰেণ্ডলি ক্লিনিং কিট',
    'product.16': 'ষ্টেইনলেছ ষ্টিল ৱাটাৰ বটল ছেট',
    'product.17': 'দ ছাইকলজি অফ মানি বুক',
    'product.18': 'পাৰ্কাৰ জটাৰ বলপইণ্ট পেন',
    'product.19': 'কাৰ ডেশ্ববৰ্ড কেমেৰা এইচডি',
    'product.20': 'বাইক ফোন হোল্ডাৰ মাউণ্ট',

    // Budget
    'budget.title': 'বাজেট অৱলোকন',
    'budget.period': 'বাজেট',
    'budget.exceeded': 'বাজেট অতিক্ৰম হৈছে!',
    'budget.exceededMessage': 'আপুনি আপোনাৰ বাজেট অতিক্ৰম কৰিছে',
    'budget.getLoanOptions': 'ঋণৰ বিকল্প পাওক',
    'budget.totalBudget': 'মুঠ বাজেট',
    'budget.spent': 'খৰচ কৰা হৈছে',
    'budget.remaining': 'অৱশিষ্ট',
    'budget.budgetUsed': 'বাজেট ব্যৱহাৰ কৰা হৈছে',
    'budget.activeLoan': 'সক্ৰিয় ঋণ',
    'budget.amount': 'পৰিমাণ',
    'budget.emi': 'ইএমআই',
    'budget.activeEmis': 'সক্ৰিয় ইএমআই',
    'budget.nextPayment': 'পৰৱৰ্তী পৰিশোধ',
    'budget.monthly': 'মাহেকীয়া',
    'budget.weekly': 'সাপ্তাহিক',

    // Products
    'product.new': 'নতুন',
    'product.trending': 'ট্ৰেণ্ডিং',
    'product.off': 'ৰেহাই',
    'product.inStock': 'ষ্টকত আছে',
    'product.outOfStock': 'ষ্টকত নাই',
    'product.buyNow': 'এতিয়াই কিনক',
    'product.addToList': 'তালিকাত যোগ কৰক',
    'product.processing': 'প্ৰক্ৰিয়াকৰণ হৈ আছে...',
    'product.adding': 'যোগ কৰি আছে...',
    'product.added': 'যোগ কৰা হ\'ল!',

    // Stats
    'stats.totalItems': 'মুঠ সামগ্ৰী',
    'stats.avgSavings': 'গড় সঞ্চয়',
    'stats.topCategory': 'শীৰ্ষ শ্ৰেণী',
    'stats.newToday': 'আজি নতুন',
    'stats.browseAll': 'সকলো সামগ্ৰী ব্ৰাউজ কৰক',
    'stats.viewDiscounted': 'ৰেহাই সামগ্ৰী চাওক',
    'stats.filterByCategory': 'শ্ৰেণী অনুসৰি ফিল্টাৰ কৰক',
    'stats.seeLatest': 'শেহতীয়া আগমন চাওক',

    // Deals
    'deals.flashDeals': 'ফ্লেছ ডিল',
    'deals.limitedTime': 'সীমিত সময়ৰ অফাৰ - সেইবোৰ শেষ হোৱাৰ আগতে ধৰক!',
    'deals.endsIn': '2ঘণ্টা 45মিনিটত শেষ হ\'ব',
    'deals.hotDeal': 'হট ডিল',

    // Empty States
    'empty.noConnection': 'কোনো API সংযোগ নাই',
    'empty.noConnectionDesc': 'বাস্তৱ সামগ্ৰী ব্ৰাউজ কৰা আৰম্ভ কৰিবলৈ আপোনাৰ ই-কমাৰ্চ প্লেটফৰ্ম APIসমূহ সংযোগ কৰক',
    'empty.noProducts': 'কোনো সামগ্ৰী উপলব্ধ নাই',
    'empty.noProductsDesc': 'আপোনাৰ সংযোগ কৰা APIৰ পৰা কোনো সামগ্ৰী পোৱা নগ\'ল। আপোনাৰ API কনফিগাৰেচন পৰীক্ষা কৰক বা ৰিফ্ৰেছ কৰিবলৈ চেষ্টা কৰক।',
    'empty.noResults': 'কোনো ফলাফল পোৱা নগ\'ল',
    'empty.noResultsDesc': 'আপোনাৰ অনুসন্ধানৰ বাবে কোনো সামগ্ৰী পোৱা নগ\'ল। বিভিন্ন কীৱৰ্ড চেষ্টা কৰক বা আপোনাৰ API সংযোগসমূহ পৰীক্ষা কৰক।',
    'empty.apiError': 'API সংযোগ ত্ৰুটি',
    'empty.apiErrorDesc': 'আপোনাৰ সংযোগ কৰা APIৰ পৰা ডাটা প্ৰাপ্ত কৰিবলৈ অক্ষম। অনুগ্ৰহ কৰি আপোনাৰ API কীসমূহ পৰীক্ষা কৰক আৰু পুনৰ চেষ্টা কৰক।',
    'empty.configureApis': 'APIসমূহ কনফিগাৰ কৰক',
    'empty.refreshData': 'ডাটা ৰিফ্ৰেছ কৰক',
    'empty.clearSearch': 'অনুসন্ধান মচি পেলাওক',
    'empty.checkApiConfig': 'API কনফিগ পৰীক্ষা কৰক',

    // Language Selector - COMPLETE SECTION IN ASSAMESE
    'language.title': 'ভাষা নিৰ্বাচন কৰক',
    'language.subtitle': 'আপোনাৰ পছন্দৰ ভাষা নিৰ্বাচন কৰক',
    'language.changeLanguage': 'ভাষা সলনি কৰক',
    'language.currentLanguage': 'বৰ্তমানৰ ভাষা',
    'language.supportedLanguages': 'সমৰ্থিত ভাষাসমূহ',
    'language.interfaceLanguage': 'ইণ্টাৰফেচ ভাষা',
    'language.searchLanguage': 'যিকোনো ভাষাত বিচাৰক',
    'language.voiceSupport': 'কণ্ঠস্বৰ আদেশ সমৰ্থিত',
    'language.aiTranslation': 'AI-চালিত অনুবাদ',

    // Footer
    'footer.description': 'লাইভ API ইণ্টিগ্ৰেচন, AI-চালিত পৰামৰ্শ, স্মাৰ্ট ক্ৰয় বিশ্লেষণ, আৰু নমনীয় EMI বিকল্পৰ সৈতে ৰিয়েল-টাইম শ্বপিং সহায়ক',
    'footer.liveApi': 'লাইভ API ইণ্টিগ্ৰেচন',
    'footer.multiLanguageAi': 'বহুভাষিক AI',
    'footer.realTimeData': 'ৰিয়েল-টাইম ডাটা',
    'footer.securePrivate': 'সুৰক্ষিত আৰু ব্যক্তিগত',
    'footer.jewelryTracking': 'অলংকাৰৰ দাম ট্ৰেকিং',
    'footer.smartEmi': 'স্মাৰ্ট EMI বিকল্প',
    'footer.smartAnalysis': 'স্মাৰ্ট ক্ৰয় বিশ্লেষণ',

    // Common
    'common.loading': 'APIৰ পৰা ৰিয়েল-টাইম ডাটা ল\'ড হৈ আছে...',
    'common.error': 'ত্ৰুটি',
    'common.success': 'সফলতা',
    'common.warning': 'সতৰ্কতা',
    'common.info': 'তথ্য',
    'common.yes': 'হয়',
    'common.no': 'নহয়',
    'common.ok': 'ঠিক আছে',
    'common.cancel': 'বাতিল কৰক',
    'common.save': 'ছেভ কৰক',
    'common.delete': 'মচি পেলাওক',
    'common.edit': 'সম্পাদনা কৰক',
    'common.view': 'চাওক',
    'common.close': 'বন্ধ কৰক',
    'common.currency': '₹',
    'common.perMonth': '/মাহ',
    'common.months': 'মাহ',
    'common.days': 'দিন',
    'common.hours': 'ঘণ্টা',
    'common.minutes': 'মিনিট',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Load saved language from localStorage or default to English
    const savedLanguage = localStorage.getItem('selectedLanguage') as Language;
    return savedLanguage || 'en';
  });

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('selectedLanguage', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};