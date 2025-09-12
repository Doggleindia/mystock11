import React from 'react';
import { Pressable, Text, View } from 'react-native';

type SortOption = 'stock' | 'credits';

interface SortTabsProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export default function SortTabs({ sortBy, onSortChange }: SortTabsProps) {
  return (
    <View className="flex-row px-4 mb-2">
      <Pressable
        onPress={() => onSortChange('stock')}
        className={`mr-4 py-1 border-b-2 ${
          sortBy === 'stock' ? 'border-red-500' : 'border-transparent'
        }`}
      >
        <Text className={sortBy === 'stock' ? 'text-red-500' : 'text-gray-600'}>
          Stock Values
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onSortChange('credits')}
        className={`py-1 border-b-2 ${
          sortBy === 'credits' ? 'border-red-500' : 'border-transparent'
        }`}
      >
        <Text className={sortBy === 'credits' ? 'text-red-500' : 'text-gray-600'}>
          Credits
        </Text>
      </Pressable>
    </View>
  );
}
