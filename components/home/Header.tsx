import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  return (
    <View
      style={{
        marginTop:20,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: "#EA484F",
      }}
    >
      <Image
        source={{ uri: "https://i.pravatar.cc/100?img=5" }}
        style={{ width: 32, height: 32, borderRadius: 16, marginRight: 10 }}
      />
      <Text style={{ fontSize: 18, fontWeight: "700", flex: 1,color:'#fff' }}>Onestock</Text>

      <Pressable style={{ padding: 6, marginRight: 6 }}>
        <Ionicons name="notifications-outline" color='#fff' size={22} />
      </Pressable>
      <Pressable style={{ padding: 6 }}>
        <Ionicons name="menu"  size={24} color='#fff' />
      </Pressable>
    </View>
  );
}
