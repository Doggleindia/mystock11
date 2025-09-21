import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
interface StockDetailHeaderProps {
  stocktitle: string;
}
export default function StockDetailHeader({ stocktitle }: StockDetailHeaderProps) {
  return (
    <View className="bg-[#EA484F]">
      <View className="pt-8 px-4 pb-3 flex-row items-center">
        <Pressable onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <View>
          <Text className="text-white text-lg font-semibold">{stocktitle}</Text>
        </View>
      </View>
    </View>
  );
}
