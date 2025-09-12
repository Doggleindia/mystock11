import React from 'react';
import { Text, View } from 'react-native';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = (current / total) * 100;
  
  return (
    <View className="px-4 py-2 bg-white">
      <View className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <View 
          className="h-full bg-blue-500" 
          style={{ width: `${progress}%` }} 
        />
      </View>
      <Text className="text-xs text-gray-600 mt-1">
        {current}/{total}
      </Text>
    </View>
  );
}
