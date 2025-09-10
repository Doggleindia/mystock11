import { Ionicons } from "@expo/vector-icons";
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

type RangeOption = {
  min: number;
  max: number | null;
  label: string;
};

const entryRanges: RangeOption[] = [
  { min: 0, max: 100, label: '₹1 - ₹100' },
  { min: 100, max: 1000, label: '₹101 - ₹1,000' },
  { min: 1000, max: null, label: '₹1,000 & above' },
];

const spotsRanges: RangeOption[] = [
  { min: 2, max: 5, label: '2 - 5' },
  { min: 5, max: 10, label: '5-10' },
  { min: 10, max: 50, label: '11-50' },
  { min: 50, max: 100, label: '50-100' },
];

interface FilterScreenProps {
  onClose: () => void;
  onApplyFilters: (filters: {
    entryRange: RangeOption | null;
    spotsRange: RangeOption | null;
  }) => void;
}

export default function FilterScreen({ onClose, onApplyFilters }: FilterScreenProps) {
  const [selectedEntryRange, setSelectedEntryRange] = useState<RangeOption | null>(null);
  const [selectedSpotsRange, setSelectedSpotsRange] = useState<RangeOption | null>(null);

  const RangeChip = ({ range, isSelected, onSelect }: { 
    range: RangeOption; 
    isSelected: boolean; 
    onSelect: () => void;
  }) => (
    <Pressable 
      onPress={onSelect}
      className={`px-4 py-2 rounded-full border ${
        isSelected ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
      }`}
    >
      <Text className={`font-semibold ${
        isSelected ? 'text-red-600' : 'text-gray-700'
      }`}>
        {range.label}
      </Text>
    </Pressable>
  );

  const handleApply = () => {
    onApplyFilters({
      entryRange: selectedEntryRange,
      spotsRange: selectedSpotsRange,
    });
    onClose();
  };

  return (
    <View className="flex-1 bg-gray-50">
      <View className="flex-row items-center justify-between p-4 bg-white border-b border-gray-200">
        <Pressable onPress={onClose}>
          <Ionicons name="close" size={24} color="#666" />
        </Pressable>
        <Text className="text-lg font-bold">Filter</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView className="flex-1 p-4">
        <View className="mb-6">
          <Text className="text-base font-semibold mb-3">Entry</Text>
          <View className="flex-row flex-wrap gap-2">
            {entryRanges.map((range) => (
              <RangeChip
                key={range.label}
                range={range}
                isSelected={selectedEntryRange?.label === range.label}
                onSelect={() => setSelectedEntryRange(range)}
              />
            ))}
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-base font-semibold mb-3">Spots</Text>
          <View className="flex-row flex-wrap gap-2">
            {spotsRanges.map((range) => (
              <RangeChip
                key={range.label}
                range={range}
                isSelected={selectedSpotsRange?.label === range.label}
                onSelect={() => setSelectedSpotsRange(range)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <View className="p-4 bg-white border-t border-gray-200">
        <Pressable
          onPress={handleApply}
          className="bg-green-600 py-3 rounded-lg items-center"
        >
          <Text className="text-white font-semibold text-base">Apply</Text>
        </Pressable>
      </View>
    </View>
  );
}
