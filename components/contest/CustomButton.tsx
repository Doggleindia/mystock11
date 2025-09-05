// components/CustomButton.tsx
import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export default function CustomButton({
  title,
  onPress,
  color = "#16a34a", // green default
}: {
  title: string;
  onPress: () => void;
  color?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.btn, { backgroundColor: color }]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginVertical: 4,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
