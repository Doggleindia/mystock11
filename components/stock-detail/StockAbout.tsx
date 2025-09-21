import React from 'react';
import { Text, View } from 'react-native';

interface Props {
  description: string;
}

export default function StockAbout({ description }: Props) {
  return (
    <View className="bg-white p-4 rounded-lg mb-4">
      <Text className="text-lg font-medium mb-3">About</Text>
      <Text className="text-gray-600 leading-6">{description}</Text>
    </View>
  );
}
