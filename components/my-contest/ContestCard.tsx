import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { View, Text, Platform, TouchableOpacity } from "react-native";

const currency = (n?: number) => `₹${(n ?? 0).toLocaleString("en-IN")}`;

const ContestCard = ({ data }: any) => {
  const pnl = data?.pnl ?? 0;
const handleJoin = () => {
  // Navigate to create-portfolio screen
  router.push(data?.url || '/create-portfolio');
}
  return (
     <TouchableOpacity
      activeOpacity={0.93}
      onPress={handleJoin}
      className="mb-4"
    >
    <View
      className="bg-white rounded-xl m-3 overflow-hidden border border-gray-100"
      style={{
        // shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        // elevation for Android
        elevation: 5,
      }}
    >
      {/* ======= Header ======= */}
      <View className="flex-row justify-between items-center px-4 pt-3 pb-2">
        <Text className="text-base font-semibold text-black">
          {data?.title ?? ""}
        </Text>

        {/* Bell icon */}
        <Ionicons name="notifications-outline" size={20} color="#22c55e" />
      </View>

      {/* ======= Prize Pool & Timer ======= */}
      <View className="flex-row justify-between items-center px-4 pb-3">
        <View>
          <Text className="text-[11px] text-gray-500">Price Pool</Text>
          <Text className="text-2xl font-extrabold text-black">
            {currency(data?.prizePool)}
          </Text>
        </View>

        <View className="items-end">
          <Text className="text-red-600 font-bold">{data?.timeLeft}</Text>
          <Text className="text-[11px] text-gray-500">{data?.startTime}</Text>
        </View>
      </View>

      {/* ======= Position & P&L ======= */}
      <View className="flex-row justify-between items-center px-4 pb-3">
        <View className="flex-row items-center">
          <Text className="text-[11px] text-gray-500 mr-1">Position</Text>
          <View className="px-4 py-[2px] bg-[#EAEBED80] rounded-md">
            <Text className="text-sm text-black">
              {data?.position ?? "--"}
            </Text>
          </View>
        </View>

        <View>
          <Text className="text-[11px] text-gray-500 text-right">P&amp;L</Text>
          <Text
            className={`font-semibold ${
              pnl >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {pnl >= 0 ? `+${pnl}%` : `${pnl}%`}
          </Text>
        </View>
      </View>

      {/* ======= Bottom Bar ======= */}
      <View className="flex-row justify-between px-4 py-2 bg-gray-50 border-t border-gray-200">
        <Text className="text-[11px] text-gray-600">
          🏅 {currency(data?.medalPrize)}
        </Text>
        <Text className="text-[11px] text-gray-600">
          🏆 {data?.winRate ?? 0}%
        </Text>
        <Text className="text-[11px] text-gray-600">
          👥 {data?.spotsFilled ?? 0}
        </Text>
      </View>
    </View>
    </TouchableOpacity>
  );
};

export default ContestCard;
