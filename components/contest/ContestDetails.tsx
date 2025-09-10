import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import ContestDetailCard from "./ContestDetailCard";
import ContestRules from "./ContestRules";
import ContestTabs from "./ContestTabs";
import WinningsTable from "./WinningsTable";

export default function ContestDetails() {
  const [activeTab, setActiveTab] = useState<"WINNINGS" | "LEADERBOARD">("WINNINGS");

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <ContestDetailCard />
      <ContestRules />
      
      <ContestTabs 
        value={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === 'WINNINGS' ? (
        <WinningsTable />
      ) : (
        <View className="mx-4 mt-4 bg-white rounded-lg p-4">
          <View className="space-y-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-700 font-medium">#1 Player123</Text>
              <Text className="text-gray-900 font-bold">₹25,000</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-700 font-medium">#2 StockKing</Text>
              <Text className="text-gray-900 font-bold">₹15,000</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-700 font-medium">#3 TraderPro</Text>
              <Text className="text-gray-900 font-bold">₹10,000</Text>
            </View>
          </View>
        </View>
      )}

      {/* Timer and Join Button at Bottom */}
      <View className="mx-4 mt-4 mb-6">
        <View className="flex-row justify-between items-center mb-3">
          <View>
            <Text className="text-gray-600 text-sm">Contest ends in</Text>
            <Text className="text-red-600 font-bold text-lg">1h : 47m</Text>
          </View>
          <Text className="text-gray-600">3:30 PM</Text>
        </View>
        <TouchableOpacity 
          className="bg-green-600 py-3 rounded-lg"
          onPress={() => {/* Handle join */}}
        >
          <Text className="text-white text-center font-semibold text-lg">Join ₹50</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
