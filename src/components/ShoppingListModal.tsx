import React, { useState } from 'react';
import { X, Plus, Trash2, MessageSquare, Upload, Mic } from 'lucide-react';
import { ShoppingListItem } from '../types';

interface ShoppingListModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: ShoppingListItem[];
  onAddItem: (item: Omit<ShoppingListItem, 'id' | 'addedDate'>) => void;
  onRemoveItem: (id: string) => void;
  totalCost: number;
}

export const ShoppingListModal: React.FC<ShoppingListModalProps> = ({
  isOpen,
  onClose,
  items,
  onAddItem,
  onRemoveItem,
  totalCost
}) => {
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<'organic' | 'inorganic' | 'food' | 'general'>('general');
  const [chatInput, setChatInput] = useState('');
  const [activeTab, setActiveTab] = useState<'manual' | 'chat' | 'upload'>('manual');

  if (!isOpen) return null;

  const handleAddItem = () => {
    if (newItemName.trim()) {
      onAddItem({
        name: newItemName,
        estimatedPrice: newItemPrice ? parseFloat(newItemPrice) : undefined,
        quantity: 1,
        category: newItemCategory,
        source: 'text'
      });
      setNewItemName('');
      setNewItemPrice('');
    }
  };

  const handleChatSubmit = () => {
    if (chatInput.trim()) {
      // Mock multi-language processing
      onAddItem({
        name: chatInput,
        quantity: 1,
        category: 'general',
        source: 'chat',
        notes: 'Added via AI chat (multi-language support)'
      });
      setChatInput('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onAddItem({
        name: `Item from ${file.name}`,
        quantity: 1,
        category: 'general',
        source: 'image',
        notes: 'Added via image recognition'
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Shopping List</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Add Item Tabs */}
          <div className="flex space-x-4 mb-6 border-b">
            <button
              onClick={() => setActiveTab('manual')}
              className={`pb-2 px-1 text-sm font-medium transition-colors ${
                activeTab === 'manual' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Manual Entry
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`pb-2 px-1 text-sm font-medium transition-colors ${
                activeTab === 'chat' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              AI Chat
            </button>
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
          </div>

          {/* Add Item Forms */}
          {activeTab === 'manual' && (
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Item name"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Estimated price (₹)"
                  value={newItemPrice}
                  onChange={(e) => setNewItemPrice(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-4">
                <select
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value as any)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="general">General</option>
                  <option value="organic">Organic</option>
                  <option value="food">Food</option>
                  <option value="inorganic">Inorganic</option>
                </select>
                <button
                  onClick={handleAddItem}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 mb-2">
                  🌍 Multi-language support enabled. Type in any language!
                </p>
                <p className="text-xs text-blue-600">
                  Example: "मुझे दूध चाहिए", "I need milk", "النحتاج إلى خبز"
                </p>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Describe what you need... (any language)"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleChatSubmit}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="mb-6">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {/* Shopping List Items */}
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Qty: {item.quantity}</span>
                    {item.estimatedPrice && <span>₹{item.estimatedPrice}</span>}
                    <span className="capitalize">{item.category}</span>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">{item.source}</span>
                  </div>
                  {item.notes && (
                    <p className="text-xs text-gray-400 mt-1">{item.notes}</p>
                  )}
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Total Cost */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total Estimated Cost:</span>
              <span className="text-xl font-bold text-blue-600">₹{totalCost.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};