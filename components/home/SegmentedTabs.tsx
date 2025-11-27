import React from "react";
import { Pressable, Text, View } from "react-native";

const DEFAULT_TABS = [
  { key: "NIFTY50", label: "NIFTY 50" },
  { key: "BANKNIFTY", label: "BANK NIFTY" },
];

export default function SegmentedTabs({
  tabs = DEFAULT_TABS,
  value,
  onChange,
}: {
  tabs?: Array<{ key: string; label: string }>;
  value: string | null;
  onChange: (t: string) => void;
}) {
  return (
    <View className="flex-row bg-white">
      {tabs.map((tab) => (
        <Pressable
          key={tab.key}
          onPress={() => onChange(tab.key)}
          className={`flex-1 py-4 items-center border-b-2 ${value === tab.key ? "border-red-500" : "border-transparent"}`}
        >
          <Text className={`${value === tab.key ? "text-red-500 font-bold" : "text-gray-600 font-medium"}`}>{tab.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}
