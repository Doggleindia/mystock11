import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";


export default function ContestHeader({ title, timeLeft, startTime }: { title: string; timeLeft: string; startTime?: string }) {
return (
<View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingTop: 12 }}>
<Text style={{ fontWeight: "700", fontSize: 15, flex: 1 }}>{title}</Text>
<Ionicons name="time-outline" size={16} color="#e11d48" />
<Text style={{ marginLeft: 6, color: "#e11d48", fontWeight: "700" }}>{timeLeft}</Text>
{startTime ? <Text style={{ marginLeft: 6, color: "#6b7280" }}>{startTime}</Text> : null}
</View>
);
}