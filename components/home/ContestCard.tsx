import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ContestHeader from "./ContestHeader";
import PrimaryButton from "./PrimaryButton";

export interface Contest {
  id: string;
  title: string;
  prizePool: number; // e.g., 50000
  entryFee: number; // e.g., 50
  timeLeft: string; // e.g., "1h : 47m"
  startTime?: string; // e.g., "3:20 PM"
  spotsFilled: number; // e.g., 238
  totalSpots: number; // e.g., 250
  winRate?: number; // e.g., 40
  medalPrize?: number; // e.g., 25000
}

const currency = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function ContestCard({
  data,
  onJoin,
}: {
  data: Contest;
  onJoin?: (id: string) => void;
}) {
  const percent = Math.min(
    100,
    Math.round((data.spotsFilled / Math.max(1, data.totalSpots)) * 100)
  );

  const router = useRouter();
  return (
    <View style={styles.container}>
      <ContestHeader
        title={data.title}
        timeLeft={data.timeLeft}
        startTime={data.startTime}
      />

      {/* Prize row */}
      <View style={styles.prizeRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.smallLabel}>Prize Pool</Text>
          <Text style={styles.prizeText}>{currency(data.prizePool)}</Text>
        </View>
      </View>

      {/* Progress */}
      <View style={styles.progressWrap}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${percent}%` }]} />
        </View>
        <Text style={styles.spotsText}>
          {`${data.spotsFilled}/${data.totalSpots} Spots`}
        </Text>
      </View>

      {/* Join button */}
      <View style={styles.joinWrap}>
        <PrimaryButton
          title={`Join ₹${data.entryFee}`}
          onPress={() =>
            router.push(`/contest/${data.id}`)
          }
        />
      </View>

      {/* Bottom meta */}
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="medal" size={16} color="#f59e0b" />
          <Text style={styles.metaBold}>
            {currency(data.medalPrize ?? Math.round(data.prizePool / 2))}
          </Text>
        </View>

        <View style={styles.metaItem}>
          <Ionicons name="trophy-outline" size={16} color="#6b7280" />
          <Text style={styles.metaSub}>{(data.winRate ?? 40) + "%"}</Text>
        </View>

        <View style={styles.metaItem}>
          <Ionicons name="people-outline" size={16} color="#6b7280" />
          <Text style={styles.metaSub}>
            M {Math.max(10, Math.round(data.entryFee / 2))}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    overflow: "hidden",
  },
  prizeRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingTop: 8,
  },
  smallLabel: { color: "#6b7280", marginBottom: 4 },
  prizeText: { fontSize: 26, fontWeight: "800" },
  progressWrap: { paddingHorizontal: 14, marginTop: 8, paddingBottom: 6 },
  progressTrack: {
    height: 8,
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
    overflow: "hidden",
  },
  progressFill: { backgroundColor: "#ef4444", height: 8 },
  spotsText: { fontSize: 12, color: "#6b7280", marginTop: 6 },
  joinWrap: { paddingHorizontal: 14, paddingTop: 10, paddingBottom: 10 },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
  },
  metaItem: { flexDirection: "row", alignItems: "center", marginRight: 18 },
  metaBold: { fontWeight: "700", marginLeft: 6 },
  metaSub: { color: "#6b7280", marginLeft: 6 },
});
