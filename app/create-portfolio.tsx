import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Stock = {
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
  credits: number;
};

const stocks: Stock[] = [
  { symbol: 'HDFCBANK', price: '2,010.25', change: '+0.75%', isPositive: true, credits: 9.5 },
  { symbol: 'INFY', price: '2,010.25', change: '-1.25%', isPositive: false, credits: 9.5 },
  { symbol: 'TCS', price: '2,010.25', change: '-0.50%', isPositive: false, credits: 9.5 },
  { symbol: 'ONDC', price: '2,010.25', change: '-0.75%', isPositive: false, credits: 9.5 },
  { symbol: 'HINDUNILVR', price: '2,010.25', change: '-1.00%', isPositive: false, credits: 9.5 },
  { symbol: 'GOLDBEES', price: '2,010.25', change: '+1.25%', isPositive: true, credits: 9.5 },
];

export default function CreatePortfolio() {
  const [selectedStocks, setSelectedStocks] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'stock' | 'credits'>('stock');

  const toggleStock = (symbol: string) => {
    const newSelected = new Set(selectedStocks);
    if (newSelected.has(symbol)) {
      newSelected.delete(symbol);
    } else {
      newSelected.add(symbol);
    }
    setSelectedStocks(newSelected);
  };

  return (
    <>
     <Stack.Screen
      options={{
        headerShown: false, // 👈 hides the auto header
      }}
    />
   
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-red-500 px-4 py-3 flex-row items-center">
        <Pressable onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <View>
          <Text className="text-white text-lg font-semibold">Create Portfolio</Text>
          <Text className="text-white opacity-90">1h : 47m</Text>
        </View>
      </View>

      {/* Market Overview */}
      <View className="bg-white px-4 py-3 flex-row justify-between items-center border-b border-gray-100">
        <View>
          <Text className="text-lg font-bold">NIFTY 50</Text>
          <Text className="text-gray-600">24,827.45</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-red-500 mr-1">-28.15</Text>
          <Text className="text-red-500">-0.15%</Text>
        </View>
      </View>

      {/* Progress */}
      <View className="px-4 py-2 bg-white">
        <View className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <View className="h-full bg-blue-500 w-1/5" />
        </View>
        <Text className="text-xs text-gray-600 mt-1">5/11</Text>
      </View>

      {/* Search Bar */}
      <View className="p-4">
        <View className="flex-row items-center bg-white rounded-lg px-4 py-2 border border-gray-200">
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder="Search and add"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Sort Options */}
      <View className="flex-row px-4 mb-2">
        <Pressable
          onPress={() => setSortBy('stock')}
          className={`mr-4 py-1 border-b-2 ${
            sortBy === 'stock' ? 'border-red-500' : 'border-transparent'
          }`}
        >
          <Text className={sortBy === 'stock' ? 'text-red-500' : 'text-gray-600'}>
            Stock Values
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setSortBy('credits')}
          className={`py-1 border-b-2 ${
            sortBy === 'credits' ? 'border-red-500' : 'border-transparent'
          }`}
        >
          <Text className={sortBy === 'credits' ? 'text-red-500' : 'text-gray-600'}>
            Credits
          </Text>
        </Pressable>
      </View>

      {/* Stocks List */}
      <ScrollView className="flex-1">
        {stocks.map((stock) => (
          <View
            key={stock.symbol}
            className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100"
          >
            <View>
              <Text className="font-semibold">{stock.symbol}</Text>
              <View className="flex-row items-center mt-1">
                <Text className="text-gray-900">₹{stock.price}</Text>
                <Text
                  className={`ml-2 ${
                    stock.isPositive ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {stock.change}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center">
              <Text className="text-gray-600 mr-4">{stock.credits}</Text>
              <TouchableOpacity
                onPress={() => toggleStock(stock.symbol)}
                className={`w-8 h-8 rounded-full border-2 items-center justify-center ${
                  selectedStocks.has(stock.symbol)
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-300'
                }`}
              >
                {selectedStocks.has(stock.symbol) && (
                  <Ionicons name="remove" size={20} color="white" />
                )}
                {!selectedStocks.has(stock.symbol) && (
                  <Ionicons name="add" size={20} color="#666" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Button */}
      <View className="p-4 bg-white border-t border-gray-200">
        <TouchableOpacity 
          className="bg-green-600 py-3 rounded-lg items-center"
          onPress={() => {/* Handle next */}}
        >
          <Text className="text-white font-semibold text-base">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
     
    </>
  );
}
