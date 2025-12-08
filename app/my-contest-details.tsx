import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Leaderboard from "@/components/contest/Leaderboard"; 
import WinningsTable from "@/components/contest/WinningsTable";
import Header from "@/components/wallet/BallanceHeader";
import MyPortfolio from "@/components/my-contest/MyPortfolio";
import LiveMarket from "@/components/my-contest/LiveMarket";
import { Stack } from "expo-router";

const TAB_ITEMS = ["Winnings", "Leaderboard", "My Portfolio", "Live Market"];

const ContestDetailScreen = () => {
  const [activeTab, setActiveTab] = useState("Winnings");

  const renderContent = () => {
    switch (activeTab) {
      case "Leaderboard":
        return <Leaderboard />;
      case "My Portfolio":
        return <MyPortfolio />;
      case "Live Market":
        return <LiveMarket />;
      default:
        return <WinningsTable />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
    <Stack.Screen options={{ headerShown: false }} />
    <View className="flex-1 bg-white">
      {/* ===== Header ===== */}
      <Header title="Beginner's Arena" />

      {/* ===== Tabs ===== */}
      <View className="flex-row bg-white border-b border-gray-200">
        {TAB_ITEMS.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <TouchableOpacity
              key={tab}
              className="flex-1 items-center py-3"
              onPress={() => setActiveTab(tab)}
            >
              <Text
                className={`text-sm font-semibold ${
                  isActive ? "text-red-600" : "text-gray-500"
                }`}
              >
                {tab}
              </Text>
              {isActive && (
                <View className="h-[2px] w-10 bg-red-600 mt-1 rounded-full" />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ===== Content ===== */}
      <ScrollView className="flex-1 bg-gray-50">{renderContent()}</ScrollView>
    </View>
    </SafeAreaView>
  );
};

export default ContestDetailScreen;
