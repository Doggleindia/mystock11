// screens/ContestDetails.tsx
import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";
import ContestTabs from "./ContestTabs";
import ContestDetailCard from "./ContestDetailCard";
import ContestRules from "./ContestRules";

export default function ContestDetails() {
  const [tab, setTab] = useState<"WINNINGS" | "LEADERBOARD">("WINNINGS");

  return (
    <ScrollView style={styles.container}>
      <ContestDetailCard />
  <ContestRules/>
      {/* Tabs */}
      <ContestTabs value={tab} onChange={setTab} />

      {/* Tab Content */}
      {tab === "WINNINGS" ? (
        <View style={styles.content}>
          <Text>🏆 Rank 1 → ₹25,000</Text>
          <Text>🏆 Rank 2 → ₹15,000</Text>
          <Text>🏆 Rank 3 → ₹10,000</Text>
        </View>
      ) : (
        <View style={styles.content}>
          <Text>#1 Player123 — ₹25,000</Text>
          <Text>#2 StockKing — ₹15,000</Text>
          <Text>#3 TraderPro — ₹10,000</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#d00" },
  wallet: { fontSize: 16, fontWeight: "600", color: "#16a34a" },
  card: {
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    marginBottom: 16,
  },
  title: { fontSize: 16, fontWeight: "700", marginBottom: 6 },
  price: { fontSize: 22, fontWeight: "700", color: "#000" },
  entry: { fontSize: 14, color: "#444" },
  timerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  timer: { fontSize: 16, fontWeight: "700", color: "#d00" },
  content: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#f4f4f4",
    borderRadius: 8,
  },
  rules: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#fff7f7",
    borderRadius: 8,
  },
  ruleTitle: { fontWeight: "700", marginBottom: 6 },
});
