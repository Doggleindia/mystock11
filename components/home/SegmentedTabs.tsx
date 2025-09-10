import React from "react";
import { Pressable, Text, View } from "react-native";

type TabKey = "NIFTY50" | "BANKNIFTY";

export default function SegmentedTabs({
  value,
  onChange,
}: {
  value: TabKey;
  onChange: (t: TabKey) => void;
}) {
  const Item = ({ label, k }: { label: string; k: TabKey }) => {
    const active = value === k;
    return (
      <Pressable
        onPress={() => onChange(k)}
        className={`flex-1 py-4 items-center border-b-2 ${
          active ? "border-red-500" : "border-transparent"
        }`}
      >
        <Text
          className={`${
            active ? "text-red-500 font-bold" : "text-gray-600 font-medium"
          }`}
        >
          {label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View className="flex-row bg-white">
      <Item label="NIFTY 50" k="NIFTY50" />
      <Item label="BANK NIFTY" k="BANKNIFTY" />
    </View>
  );
}
