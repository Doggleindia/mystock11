import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface PortfolioHeaderProps {
  timeLeft: string;
}

export default function PortfolioHeader({ timeLeft }: PortfolioHeaderProps) {
  return (
    <View className="bg-[#EA484F]">
      <View className="pt-8 px-4 pb-3 flex-row items-center">
        <Pressable onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <View>
          <Text className="text-white text-lg font-semibold">Create Portfolio</Text>
          <Text className="text-white text-sm opacity-80">{timeLeft}</Text>
        </View>
      </View>
    </View>
  );
}
