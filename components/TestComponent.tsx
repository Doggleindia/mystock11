import React from 'react';
import { View, Text } from 'react-native';

export default function TestComponent() {
  return (
    <View className="flex-1 items-center justify-center bg-blue-500 p-4">
      <Text className="text-white text-xl font-bold">
        Testing Tailwind CSS
      </Text>
      <View className="bg-white rounded-lg p-4 mt-4">
        <Text className="text-blue-500">
          This should be styled with Tailwind
        </Text>
      </View>
    </View>
  );
}
