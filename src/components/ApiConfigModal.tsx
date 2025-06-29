import React, { useState } from 'react';
import { X, Key, Shield, CheckCircle, AlertCircle, Zap } from 'lucide-react';

interface ApiConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveConfig: (config: { amazonApiKey?: string; flipkartApiKey?: string }) => void;
  currentConfig: { amazonApiKey?: string; flipkartApiKey?: string; isConnected: boolean };
}

export const ApiConfigModal: React.FC<ApiConfigModalProps> = ({
  isOpen,
  onClose,
  onSaveConfig,
  currentConfig
}) => {
  const [amazonApiKey, setAmazonApiKey] = useState(currentConfig.amazonApiKey || '');
  const [flipkartApiKey, setFlipkartApiKey] = useState(currentConfig.flipkartApiKey || '');

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveConfig({
      amazonApiKey: amazonApiKey.trim() || undefined,
      flipkartApiKey: flipkartApiKey.trim() || undefined
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">API Configuration</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className={`p-4 rounded-lg flex items-center space-x-3 ${
            currentConfig.isConnected ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'
          }`}>
            {currentConfig.isConnected ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-amber-600" />
            )}
            <div>
              <p className={`text-sm font-medium ${
                currentConfig.isConnected ? 'text-green-800' : 'text-amber-800'
              }`}>
                {currentConfig.isConnected ? '✅ APIs Connected & Active' : '⚠️ No APIs Connected'}
              </p>
              <p className={`text-xs ${
                currentConfig.isConnected ? 'text-green-600' : 'text-amber-600'
              }`}>
                {currentConfig.isConnected 
                  ? 'Real-time data streaming • AI search enabled' 
                  : 'Connect APIs to access live product data'
                }
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🛒 Amazon API Key
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={amazonApiKey}
                onChange={(e) => setAmazonApiKey(e.target.value)}
                placeholder="Your API key is already configured"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {currentConfig.amazonApiKey && (
              <p className="text-xs text-green-600 mt-1 flex items-center space-x-1">
                <CheckCircle className="h-3 w-3" />
                <span>Amazon API connected and active</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🛍️ Flipkart API Key
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={flipkartApiKey}
                onChange={(e) => setFlipkartApiKey(e.target.value)}
                placeholder="Enter Flipkart API key (optional)"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-blue-900 mb-1">🔒 Security & Features</h3>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• End-to-end encrypted API connections</li>
                  <li>• Real-time product data synchronization</li>
                  <li>• Multi-language AI search capabilities</li>
                  <li>• Image recognition & voice commands</li>
                  <li>• Smart budget tracking & recommendations</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Zap className="h-4 w-4" />
              <span>Save & Connect</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};