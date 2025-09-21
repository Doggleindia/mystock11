import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export interface Stock {
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
  credits: number;
  setBy?: string;
}

interface StockItemProps {
  stock: Stock;
  isSelected: boolean;
  onToggle: (symbol: string) => void;
}

export default function StockItem({ stock, isSelected, onToggle }: StockItemProps) {
  return (
    <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-100">
      {/* Symbol and Change */}
      <TouchableOpacity 
        className="flex-1" 
        onPress={() => router.push({ pathname: "/stock/[symbol]", params: { symbol: stock.symbol }})}
      >
        <Text className="font-medium text-[15px] text-gray-900">{stock.symbol}</Text>
        <Text className="text-xs text-gray-500 mt-1">{stock.change}</Text>
      </TouchableOpacity>

      {/* Price */}
      <View className="w-24 items-center">
        <Text className="text-gray-900 text-[15px]">₹{stock.price}</Text>
      </View>

      {/* Set By */}
      <View className="w-20 items-center">
        <Text className="text-gray-700 text-[15px]">{stock.setBy}</Text>
      </View>

      {/* Credits */}
      <View className="w-16 items-center">
        <Text className="text-gray-700 text-[15px]">{stock.credits.toFixed(1)}</Text>
      </View>

      {/* Add/Remove Button */}
      <TouchableOpacity
        onPress={() => onToggle(stock.symbol)}
        className={`w-8 h-8 rounded-xl items-center justify-center ${
          isSelected
            ? 'bg-red-400'
            : 'bg-green-400'
        }`}
        style={{
        //   elevation: 2,
        //   shadowColor: '#000',
        //   shadowOffset: { width: 0, height: 1 },
        //   shadowOpacity: 0.2,
        //   shadowRadius: 1,
        }}
      >
        <Ionicons 
          name={isSelected ? "remove" : "add"} 
          size={18} 
          color="white" 
        />
      </TouchableOpacity>
    </View>
  );
}
