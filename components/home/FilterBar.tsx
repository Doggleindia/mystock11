import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";


type SortKey = "recommended" | "popular";


export default function FilterBar({ sort, onChangeSort, onOpenRange }: { sort: SortKey; onChangeSort: (s: SortKey) => void; onOpenRange: () => void; }) {
const Chip = ({ label, active, onPress }: { label: string; active?: boolean; onPress?: () => void }) => (
<Pressable onPress={onPress} style={({ pressed }) => ({
paddingHorizontal: 12,
paddingVertical: 6,
borderRadius: 14,
borderWidth: 1,
borderColor: active ? "#ff4545" : "#e5e5e5",
backgroundColor: active ? "#ffecec" : "#fff",
opacity: pressed ? 0.9 : 1,
})}>
<Text style={{ color: active ? "#cc1f1f" : "#444", fontWeight: "600" }}>{label}</Text>
</Pressable>
);


return (
<View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 16, paddingVertical: 10, backgroundColor: "#fff" }}>
<Chip label="Recommended" active={sort === "recommended"} onPress={() => onChangeSort("recommended")} />
<Chip label="Popular" active={sort === "popular"} onPress={() => onChangeSort("popular")} />
<Pressable onPress={onOpenRange} style={{ marginLeft: "auto", flexDirection: "row", alignItems: "center", gap: 6 }}>
<Text style={{ fontWeight: "600" }}>Select Range</Text>
<Ionicons name="filter" size={18} />
</Pressable>
</View>
);
}