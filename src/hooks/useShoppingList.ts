import { useState, useEffect } from 'react';
import { ShoppingListItem } from '../types';

export const useShoppingList = () => {
  const [items, setItems] = useState<ShoppingListItem[]>(() => {
    // Load shopping list from localStorage if available
    const savedItems = localStorage.getItem('shoppingList');
    if (savedItems) {
      return JSON.parse(savedItems).map((item: any) => ({
        ...item,
        addedDate: new Date(item.addedDate)
      }));
    }
    return [];
  });

  // Save shopping list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<ShoppingListItem, 'id' | 'addedDate'>) => {
    const newItem: ShoppingListItem = {
      ...item,
      id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      addedDate: new Date()
    };
    setItems(prev => [...prev, newItem]);
    
    // Show success feedback
    console.log('Added to shopping list:', newItem.name);
    return newItem;
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    console.log('Removed from shopping list:', id);
  };

  const updateItem = (id: string, updates: Partial<ShoppingListItem>) => {
    setItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const clearList = () => {
    setItems([]);
  };

  const getTotalEstimatedCost = () => {
    return items.reduce((total, item) => 
      total + (item.estimatedPrice || 0) * item.quantity, 0
    );
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    items,
    addItem,
    removeItem,
    updateItem,
    clearList,
    getTotalEstimatedCost,
    getTotalItems
  };
};