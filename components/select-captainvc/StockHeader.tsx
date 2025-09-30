// src/components/StockHeader.tsx
import React from "react";
import { View, Text } from "react-native";

export default function StockHeader() {
  return (
    <View className="flex-row  border-b border-gray-300 px-4 py-3">
      <View className="flex-1">
        <Text className="text-xs font-semibold text-gray-700">% Sel by</Text>
      </View>

      <View className="items-end mr-3">
        <Text className="text-xs font-semibold text-gray-700">Stock Values</Text>
      </View>

      <View className="flex-row">
        <View className="w-12 items-center mr-2">
          <Text className="text-xs font-semibold text-gray-700">%C</Text>
        </View>
        <View className="w-12 items-center">
          <Text className="text-xs font-semibold text-gray-700">%VC</Text>
        </View>
      </View>
    </View>
  );
}
