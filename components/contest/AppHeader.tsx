// components/AppHeader.tsx
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AppHeader({
  title,
  balance,
  onBack,
}: {
  title: string;
  balance?: number;
  onBack?: () => void;
}) {
  return (
    <View  style={{
        marginTop:20,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: "#EA484F",
      }}>
      {/* Back button */}
      <Pressable onPress={onBack} style={{ padding: 8 }}>
        <Ionicons name="arrow-back" size={22} color="#fff" />
      </Pressable>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Wallet */}
      <View style={styles.walletBox}>
        <Ionicons name="wallet-outline" size={16} color="#fff" />
        <Text style={styles.walletText}>₹{balance ?? 0}</Text>
     <Ionicons name="add-circle-outline" size={16} color="#fff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#EA484F",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  walletBox: {
    flexDirection: "row",
    justifyContent:"flex-end",
    marginLeft: "auto",
    alignItems: "center",
    backgroundColor: "#b91c1c",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  walletText: {
    color: "#fff",
    marginLeft: 4,
    fontWeight: "600",
  },
});
