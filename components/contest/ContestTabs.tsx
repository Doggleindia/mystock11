// components/ContestTabs.tsx
import React from "react";
import { View, Pressable, Text } from "react-native";

type TabKey = "WINNINGS" | "LEADERBOARD";

export default function ContestTabs({
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
          paddingVertical: 10,
          alignItems: "center",
          borderBottomWidth: active ? 2 : 0,
          borderBottomColor: active ? "#d00" : "transparent",
        }}
      >
        <Text
          style={{
            color: active ? "#d00" : "#444",
            fontWeight: active ? "700" : "500",
          }}
        >
          {label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={{ flexDirection: "row", marginTop: 12 }}>
      <Item label="Winnings" k="WINNINGS" />
      <Item label="Leaderboard" k="LEADERBOARD" />
    </View>
  );
}
