import React from 'react';
import { Text, View } from 'react-native';

interface Props {
  stockName: string;
  currentPrice: string;
  dayRange: {
    low: string;
    high: string;
    open: string;
    close: string;
  };
  change?: {
    value: string;
    percentage: string;
    isPositive: boolean;
  };
  lastTraded: string;
  volume: string;
}

export default function StockDetailCard({ 
  stockName, 
  currentPrice, 
  dayRange, 
  lastTraded, 
  volume,
  change 
}: Props) {
  return (
    <View className="bg-white p-4 rounded-lg mb-4">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-3">
        <View>
          <Text className="text-lg font-medium text-gray-900">{stockName}</Text>
          <Text className="text-xs text-gray-500 mt-1">NSE</Text>
        </View>
        <View className="items-end">
          <Text className="text-lg font-medium">Date/Time: {lastTraded}</Text>
          <Text className="text-xs text-gray-500 mt-1">Last Updated</Text>
        </View>
      </View>

      {/* Price Info */}
      <View className="flex-row justify-between items-start mt-2 mb-4">
        <View className="flex-1">
          <View className="flex-row items-baseline">
            <Text className="text-2xl font-semibold">₹{currentPrice}</Text>
            <Text className={`text-sm ml-2 ${change?.isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {change?.value || '0.00'} ({change?.percentage || '0.00%'})
            </Text>
          </View>
          <Text className="text-xs text-gray-500 mt-1">Latest traded at</Text>
        </View>
      </View>

      {/* Trading Info Grid */}
      <View className="flex-row flex-wrap mt-2">
        <View className="w-1/2 mb-3">
          <Text className="text-xs text-gray-500">Open</Text>
          <Text className="text-sm font-medium mt-1">₹{dayRange.open}</Text>
        </View>
        <View className="w-1/2 mb-3">
          <Text className="text-xs text-gray-500">Close</Text>
          <Text className="text-sm font-medium mt-1">₹{dayRange.close}</Text>
        </View>
        <View className="w-1/2 mb-3">
          <Text className="text-xs text-gray-500">High</Text>
          <Text className="text-sm font-medium mt-1">₹{dayRange.high}</Text>
        </View>
        <View className="w-1/2 mb-3">
          <Text className="text-xs text-gray-500">Low</Text>
          <Text className="text-sm font-medium mt-1">₹{dayRange.low}</Text>
        </View>
        <View className="w-1/2">
          <Text className="text-xs text-gray-500">Volume</Text>
          <Text className="text-sm font-medium mt-1">{volume}</Text>
        </View>
      </View>
    </View>
  );
}
