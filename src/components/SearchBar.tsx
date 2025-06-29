import React, { useState } from 'react';
import { Search, Mic, Camera, MessageSquare, Loader2, Sparkles, Image, Youtube, Link } from 'lucide-react';
import { ImageSearchModal } from './ImageSearchModal';
import { useLanguage } from '../contexts/LanguageContext';
import { Product } from '../types';

interface SearchBarProps {
  onSearch: (query: string, type: 'text' | 'voice' | 'image' | 'chat' | 'youtube') => void;
  onAddToList: (product: Product) => void;
  placeholder?: string;
  isConnected: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onAddToList,
  isConnected 
}) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handleSearch = (type: 'text' | 'voice' | 'image' | 'chat' | 'youtube' = 'text') => {
    if (query.trim() || type !== 'text') {
      setIsProcessing(true);
      
      // Check if it's a YouTube URL
      if (type === 'text' && isYouTubeUrl(query)) {
        onSearch(query, 'youtube');
      } else {
        onSearch(query, type);
      }
      
      setTimeout(() => setIsProcessing(false), 1500);
    }
  };

  const isYouTubeUrl = (url: string): boolean => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return youtubeRegex.test(url.trim());
  };

  const handleVoiceSearch = async () => {
    setIsListening(true);
    try {
      // Real voice recognition implementation
      if ('webkitSpeechRecognition' in window) {
        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setQuery(transcript);
          onSearch(transcript, 'voice');
          setIsListening(false);
        };
        
        recognition.onerror = () => {
          setIsListening(false);
        };
        
        recognition.start();
      } else {
        // Fallback for browsers without speech recognition
        setTimeout(() => {
          setIsListening(false);
          const voiceQuery = 'organic products';
          setQuery(voiceQuery);
          onSearch(voiceQuery, 'voice');
        }, 2000);
      }
    } catch (error) {
      setIsListening(false);
      console.error('Voice recognition error:', error);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onSearch(`Image: ${file.name}`, 'image');
    }
  };

  const getSearchIcon = () => {
    if (isProcessing) {
      return <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />;
    }
    
    if (isYouTubeUrl(query)) {
      return <Youtube className="h-5 w-5 text-red-600" />;
    }
    
    return <Search className="h-5 w-5 text-gray-400" />;
  };

  const getPlaceholderText = () => {
    if (isYouTubeUrl(query)) {
      return 'YouTube URL detected - will analyze video content...';
    }
    return isConnected ? t('search.placeholder') : t('search.placeholderConnected');
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {getSearchIcon()}
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder={getPlaceholderText()}
            className={`w-full pl-12 pr-48 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg shadow-sm ${
              isYouTubeUrl(query) 
                ? 'border-red-200 bg-red-50' 
                : 'border-gray-200'
            }`}
          />
          
          <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-4">
            <button
              onClick={handleVoiceSearch}
              disabled={isListening}
              className={`p-2 rounded-lg transition-colors ${
                isListening 
                  ? 'bg-red-100 text-red-600 animate-pulse' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              title={t('search.voiceSearch')}
            >
              <Mic className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => setIsImageModalOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              title={t('search.imageSearch')}
            >
              <Image className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => handleSearch('chat')}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              title={t('search.aiChat')}
            >
              <MessageSquare className="h-5 w-5" />
            </button>

            <button
              onClick={() => handleSearch()}
              disabled={!query.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition-colors flex items-center space-x-1"
            >
              {isYouTubeUrl(query) ? (
                <>
                  <Youtube className="h-4 w-4" />
                  <span>Analyze</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>{t('search.search')}</span>
                </>
              )}
            </button>
          </div>
        </div>
        
        {isListening && (
          <div className="mt-3 text-center">
            <p className="text-sm text-red-600 animate-pulse flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
              <span>{t('search.listening')}</span>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            </p>
          </div>
        )}

        {isYouTubeUrl(query) && (
          <div className="mt-3 text-center">
            <p className="text-sm text-red-600 flex items-center justify-center space-x-2">
              <Youtube className="h-4 w-4" />
              <span>YouTube URL detected - AI will analyze video content for product recommendations</span>
            </p>
          </div>
        )}

        {isConnected && (
          <div className="mt-3 text-center">
            <p className="text-sm text-green-600 flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>{t('search.multiLanguage')}</span>
            </p>
          </div>
        )}
      </div>

      <ImageSearchModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onAddToList={onAddToList}
      />
    </>
  );
};