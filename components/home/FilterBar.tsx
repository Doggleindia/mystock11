import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import FilterScreen from "./FilterScreen";

type SortKey = "recommended" | "popular";

type FilterRange = {
  min: number;
  max: number | null;
  label: string;
} | null;

interface FilterBarProps {
  sort: SortKey;
  onChangeSort: (s: SortKey) => void;
  onFiltersChange: (filters: {
    entryRange: FilterRange | null;
    maxEntryRange: FilterRange | null;
    prizePoolRange: FilterRange | null;
    spotsRange: FilterRange | null;
  }) => void;
}

export default function FilterBar({ sort, onChangeSort, onFiltersChange }: FilterBarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const Chip = ({ label, active, onPress }: { label: string; active?: boolean; onPress?: () => void }) => (
    <Pressable 
      onPress={onPress} 
      className={`px-3 mx-1 py-1.5 rounded-full border ${
        active ? "border-red-500 bg-red-50" : "border-gray-200 bg-white"
      }`}
    >
      <Text className={`font-semibold ${active ? "text-red-600" : "text-gray-700"}`}>
        {label}
      </Text>
    </Pressable>
  );

  return (
    <>
      <View className="flex-row items-center gap-1 px-2 py-2.5 bg-white">
        <Chip 
     
          label="Recommended" 
          active={sort === "recommended"} 
          onPress={() => onChangeSort("recommended")} 
        />
        <Chip 
          label="Popular" 
          active={sort === "popular"} 
          onPress={() => onChangeSort("popular")} 
        />
        <Pressable 
          onPress={() => setIsFilterOpen(true)} 
          className="ml-auto my-auto flex-row flex justify-end items-center gap-1"
        >
          <Text className="font-semibold text-gray-700">Select Range</Text>
          <Ionicons name="filter" size={18} color="#444" />
        </Pressable>
      </View>

      <Modal
        visible={isFilterOpen}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <FilterScreen
          onClose={() => setIsFilterOpen(false)}
          onApplyFilters={(filters) => {
            onFiltersChange(filters);
            setIsFilterOpen(false);
          }}
        />
      </Modal>
    </>
  );
}