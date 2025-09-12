import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TextInput, View } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <View className="px-4 py-2">
      <View className="flex-row items-center bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-200">
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          className="flex-1 ml-2 text-[15px]"
          placeholder="Search for stock"
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="characters"
        />
      </View>
    </View>
  );
}
