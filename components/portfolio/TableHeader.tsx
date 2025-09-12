import React from 'react';
import { Text, View } from 'react-native';

export default function TableHeader() {
  return (
    <View className="flex-row items-center px-4 py-2.5 bg-gray-50 border-y border-gray-200">
      {/* Symbol */}
      <View className="flex-1">
        <Text className="text-gray-500 text-sm font-medium">Symbol</Text>
      </View>

      {/* Price */}
      <View className="w-24 items-center">
        <Text className="text-gray-500 text-sm font-medium">Price</Text>
      </View>

      {/* Set By */}
      <View className="w-20 items-center">
        <Text className="text-gray-500 text-sm font-medium">Set By</Text>
      </View>

      {/* Credits */}
      <View className="w-16 items-center">
        <Text className="text-gray-500 text-sm font-medium">Credits</Text>
      </View>

      {/* Action */}
      <View className="w-10">
        <Text className="text-gray-500 text-sm text-center">+/-</Text>
      </View>
    </View>
  );
}
