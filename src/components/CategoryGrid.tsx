import React from 'react';
import { 
  Smartphone, Laptop, Tv, Camera, Gamepad2, 
  Shirt, Baby, Home, Sofa, Sparkles, 
  Apple, Milk, Coffee, Pill, BookOpen, 
  Dumbbell, Car, Gem, Heart, Plane,
  Tag, ChevronRight, TrendingUp
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  subcategories: string[];
  color: string;
  bgColor: string;
  count?: number;
}

interface CategoryGridProps {
  onCategoryClick: (category: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategoryClick }) => {
  const { t } = useLanguage();

  const categories: Category[] = [
    {
      id: 'electronics',
      name: t('categories.electronics'),
      icon: <Smartphone className="h-6 w-6" />,
      subcategories: [
        t('subcategory.mobilesAccessories'),
        t('subcategory.laptopsTablets'),
        t('subcategory.tvsHomeAppliances'),
        t('subcategory.camerasDrones'),
        t('subcategory.gaming')
      ],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      count: 1250
    },
    {
      id: 'fashion',
      name: t('categories.fashion'),
      icon: <Shirt className="h-6 w-6" />,
      subcategories: [
        t('subcategory.mensClothing'),
        t('subcategory.womensClothing'),
        t('subcategory.kidsBabyWear'),
        t('subcategory.footwear'),
        t('subcategory.watchesAccessories')
      ],
      color: 'text-pink-600',
      bgColor: 'bg-pink-50 hover:bg-pink-100',
      count: 2340
    },
    {
      id: 'home-furniture',
      name: t('categories.homeAndFurniture'),
      icon: <Home className="h-6 w-6" />,
      subcategories: [
        t('subcategory.furniture'),
        t('subcategory.homeDecor'),
        t('subcategory.kitchenDining'),
        t('subcategory.beddingBath'),
        t('subcategory.toolsHardware')
      ],
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 hover:bg-amber-100',
      count: 890
    },
    {
      id: 'beauty-personal-care',
      name: t('categories.beautyPersonalCare'),
      icon: <Sparkles className="h-6 w-6" />,
      subcategories: [
        t('subcategory.skincare'),
        t('subcategory.makeup'),
        t('subcategory.haircare'),
        t('subcategory.fragrances'),
        t('subcategory.mensGrooming')
      ],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 hover:bg-purple-100',
      count: 1560
    },
    {
      id: 'grocery-essentials',
      name: t('categories.groceryEssentials'),
      icon: <Apple className="h-6 w-6" />,
      subcategories: [
        t('subcategory.fruitsVegetables'),
        t('subcategory.dairyBakery'),
        t('subcategory.snacksBeverages'),
        t('subcategory.staplesPackagedFood'),
        t('subcategory.cleaningHousehold')
      ],
      color: 'text-green-600',
      bgColor: 'bg-green-50 hover:bg-green-100',
      count: 3200
    },
    {
      id: 'health-wellness',
      name: t('categories.healthWellness'),
      icon: <Pill className="h-6 w-6" />,
      subcategories: [
        t('subcategory.vitaminsSupplements'),
        t('subcategory.medicalDevices'),
        t('subcategory.firstAidHealthMonitors'),
        t('subcategory.fitnessEquipment')
      ],
      color: 'text-red-600',
      bgColor: 'bg-red-50 hover:bg-red-100',
      count: 780
    },
    {
      id: 'books-stationery',
      name: t('categories.booksStationery'),
      icon: <BookOpen className="h-6 w-6" />,
      subcategories: [
        t('subcategory.academicBooks'),
        t('subcategory.fictionNonFiction'),
        t('subcategory.artSupplies'),
        t('subcategory.officeSupplies')
      ],
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 hover:bg-indigo-100',
      count: 650
    },
    {
      id: 'toys-baby-kids',
      name: t('categories.toysBabyKids'),
      icon: <Baby className="h-6 w-6" />,
      subcategories: [
        t('subcategory.toysGames'),
        t('subcategory.babyCareProducts'),
        t('subcategory.schoolSupplies')
      ],
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 hover:bg-orange-100',
      count: 920
    },
    {
      id: 'sports-fitness',
      name: t('categories.sportsFitness'),
      icon: <Dumbbell className="h-6 w-6" />,
      subcategories: [
        t('subcategory.exerciseGymEquipment'),
        t('subcategory.outdoorSportsGear'),
        t('subcategory.sportswear')
      ],
      color: 'text-teal-600',
      bgColor: 'bg-teal-50 hover:bg-teal-100',
      count: 540
    },
    {
      id: 'automotive',
      name: t('categories.automotive'),
      icon: <Car className="h-6 w-6" />,
      subcategories: [
        t('subcategory.carAccessories'),
        t('subcategory.bikeAccessories'),
        t('subcategory.toolsEquipment'),
        t('subcategory.oilsLubricants')
      ],
      color: 'text-gray-600',
      bgColor: 'bg-gray-50 hover:bg-gray-100',
      count: 430
    },
    {
      id: 'jewelry-accessories',
      name: t('categories.jewelryAccessories'),
      icon: <Gem className="h-6 w-6" />,
      subcategories: [
        t('subcategory.goldSilver'),
        t('subcategory.imitationJewelry'),
        t('subcategory.bagsWallets'),
        t('subcategory.beltsSunglasses')
      ],
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 hover:bg-yellow-100',
      count: 680
    },
    {
      id: 'pet-supplies',
      name: t('categories.petSupplies'),
      icon: <Heart className="h-6 w-6" />,
      subcategories: [
        t('subcategory.petFood'),
        t('subcategory.petToys'),
        t('subcategory.petGrooming'),
        t('subcategory.petAccessories')
      ],
      color: 'text-rose-600',
      bgColor: 'bg-rose-50 hover:bg-rose-100',
      count: 320
    },
    {
      id: 'travel-luggage',
      name: t('categories.travelLuggage'),
      icon: <Plane className="h-6 w-6" />,
      subcategories: [
        t('subcategory.backpacks'),
        t('subcategory.trolleys'),
        t('subcategory.travelAccessories')
      ],
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50 hover:bg-cyan-100',
      count: 290
    },
    {
      id: 'deals-offers',
      name: t('categories.dealsOffers'),
      icon: <Tag className="h-6 w-6" />,
      subcategories: [
        t('subcategory.dailyDeals'),
        t('subcategory.flashSales'),
        t('subcategory.clearance')
      ],
      color: 'text-red-600',
      bgColor: 'bg-gradient-to-r from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100',
      count: 150
    }
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('categories.title')}</h2>
          <p className="text-gray-600">{t('categories.description')}</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <TrendingUp className="h-4 w-4" />
          <span>{t('categories.updatedRealTime')}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => onCategoryClick(category.id)}
            className={`${category.bgColor} rounded-2xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-gray-100`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${category.color} bg-white shadow-sm`}>
                {category.icon}
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">{t('categories.items')}</div>
                <div className="text-lg font-bold text-gray-900">{category.count?.toLocaleString()}</div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">{category.name}</h3>
            
            <div className="space-y-1 mb-4">
              {category.subcategories.slice(0, 3).map((sub, index) => (
                <div key={index} className="text-sm text-gray-600 flex items-center">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                  {sub}
                </div>
              ))}
              {category.subcategories.length > 3 && (
                <div className="text-sm text-gray-500 flex items-center">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                  +{category.subcategories.length - 3} {t('subcategory.more')}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{t('categories.explore')}</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};