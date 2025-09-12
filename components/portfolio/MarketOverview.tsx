import React from 'react';
import { Text, View } from 'react-native';

interface MarketOverviewProps {
  index: string;
  value: string;
  change: string;
  changePercent: string;
  isPositive?: boolean;
}

export default function MarketOverview({
  index,
  value,
  change,
  changePercent,
  isPositive = false
}: MarketOverviewProps) {
  return (
    <View className="bg-white px-4 py-3 flex-row justify-between items-center border-b border-gray-100">
      <View>
        <Text className="text-lg font-bold">{index}</Text>
        <Text className="text-gray-600">{value}</Text>
      </View>
      <View className="flex-row items-center">
        <Text className={`mr-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </Text>
        <Text className={isPositive ? 'text-green-500' : 'text-red-500'}>
          {changePercent}
        </Text>
      </View>
    </View>
  );
}
