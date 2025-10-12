import React from 'react';
import { View, Text } from 'react-native';

export default function DateHeader({ date }) {
  return (
    <View className="bg-gray-100 px-3 py-3">
      <Text className="text-xs text-[#747474] font-semibold">{date}</Text>
    </View>
  );
}
