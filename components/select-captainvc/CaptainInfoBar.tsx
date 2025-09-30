// src/components/CaptainInfoBar.tsx
import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function CaptainInfoBar() {
  return (
    <LinearGradient
      // 👇 Your gradient
      colors={["#0E1116", "#4F0905", "#0E1116"]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      className="px-4 py-9"
    >
      {/* Title */}
      <Text className="text-center text-white font-semibold mb-3">
        Select Captain Stock and Vice Captain Stock
      </Text>

      {/* Captain / Vice Captain info */}
      <View className="flex-row justify-center items-center">
        {/* Captain */}
        <View className="flex-row items-center mr-6">
          <View className="border border-white rounded-full w-8 h-8 items-center justify-center mr-2">
            <Text className="text-white text-xs">C</Text>
          </View>
          <View>
            <Text className="text-yellow-400 text-sm font-semibold">
              Captain Stock
            </Text>
            <Text className="text-white text-xs">2X Points</Text>
          </View>
        </View>

        {/* Divider */}
        <View className="w-px h-10 bg-gray-600 mx-2" />

        {/* Vice Captain */}
        <View className="flex-row items-center ml-6">
          <View className="border border-white rounded-full w-8 h-8 items-center justify-center mr-2">
            <Text className="text-white text-xs">VC</Text>
          </View>
          <View>
            <Text className="text-yellow-400 text-sm font-semibold">
              Vice Captain Stock
            </Text>
            <Text className="text-white text-xs">1.5X Points</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}
