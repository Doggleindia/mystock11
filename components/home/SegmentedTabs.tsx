import React from "react";
import { View, Text, Pressable } from "react-native";

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
        style={{
          flex: 1,
          paddingVertical: 15,
          alignItems: "center",
          borderBottomWidth: active ? 2 : 0, // underline
          borderBottomColor: active ? "#d00" : "transparent", // red underline when active
        }}
      >
        <Text
          style={{
            color: active ? "#d00" : "#444", // active red text
            fontWeight: active ? "700" : "500",
          }}
        >
          {label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 10,
      }}
    >
      <Item label="NIFTY 50" k="NIFTY50" />
      <Item label="BANK NIFTY" k="BANKNIFTY" />
    </View>
  );
}
