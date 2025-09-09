import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const ContestDetailCard = () => {
  return (
    <View  style={styles.card}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <Text className="text-xl font-bold text-red"  style={styles.title}>Daily Trading Challenge</Text>
        <Ionicons name="notifications-outline" size={20} color="#444" />
      </View>

      {/* Price Pool & Entry Fee */}
      <View style={styles.priceRow}>
        <View>
          <Text style={styles.label}>Price Pool</Text>
          <Text style={styles.price}>₹50,000</Text>
        </View>
        <TouchableOpacity style={styles.entryBtn}>
          <Text style={styles.entryText}>₹50</Text>
        </TouchableOpacity>
      </View>

      {/* Contest Info */}
      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Ionicons name="people-outline" size={16} color="#444" />
          <Text style={styles.infoText}>Spots</Text>
          <Text style={styles.infoValue}>1200/2000</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="flag-outline" size={16} color="#444" />
          <Text style={styles.infoText}>Contest</Text>
          <Text style={styles.infoValue}>NIFTY 50</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="trophy-outline" size={16} color="#444" />
          <Text style={styles.infoText}>First Prize</Text>
          <Text style={styles.infoValue}>₹10,000</Text>
        </View>
      </View>

      {/* Timer Section */}
      <View style={styles.timerRow}>
        <Text style={styles.timerInfo}>
          Contest runs during live market hours{"\n"}
          (9:15 AM – 3:30 PM)
        </Text>
        <View>
          <Text style={styles.timer}>1h : 47m</Text>
          <Text style={styles.endTime}>3:30 PM</Text>
        </View>
      </View>
    </View>
  );
};

export default ContestDetailCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: { fontSize: 16, fontWeight: "700", color: "#000" },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  label: { fontSize: 12, color: "#555" },
  price: { fontSize: 22, fontWeight: "700", color: "#000" },
  entryBtn: {
    backgroundColor: "#3C8945",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 7,
  },
  entryText: { color: "#fff", fontSize: 14, fontWeight: "600" },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  infoItem: { alignItems: "center", flex: 1 },
  infoText: { fontSize: 12, color: "#666", marginTop: 4 },
  infoValue: { fontSize: 13, fontWeight: "600", marginTop: 2, color: "#000" },
  timerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 12,
  },
  timerInfo: { fontSize: 12, color: "#444" },
  timer: { fontSize: 16, fontWeight: "700", color: "#d00" },
  endTime: { fontSize: 12, color: "#444", textAlign: "right" },
});
