import React from "react";
import { ActivityIndicator, Pressable, Text, ViewStyle } from "react-native";

interface Props {
  title: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export default function PrimaryButton({
  title,
  onPress,
  loading,
  disabled,
  style,
}: Props) {
  const isDisabled = disabled || loading;
  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        {
          backgroundColor: isDisabled ? "#a7e0b2" : "#19a04d", // green
          paddingVertical: 12,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 6,
          elevation: 2,
          opacity: pressed ? 0.92 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}
