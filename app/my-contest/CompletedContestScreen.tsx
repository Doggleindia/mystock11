import MyPortfolio from "@/components/my-contest/MyPortfolio";
import WinnerTab from "@/components/my-contest/WinnerTab";
import Header from "@/components/wallet/BallanceHeader";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const CompletedContestScreen = () => {
  const [tab, setTab] = useState("My Contest");

  const contestData = [
    {
      id: "1",
      title: "Beginner’s Arena",
      pnl: "+1.79%",
      pnlColor: "text-green-600",
      won: "₹500",
      firstPrice: "₹25,000",
      entry: "₹59",
      spots: "100",
      position: "#123",
      maxEntry: "20 Times",
      distribution: "50% of Spots",
    },
    {
      id: "2",
      title: "Beginner’s Arena",
      pnl: "-0.40%",
      pnlColor: "text-red-600",
      won: null,
      firstPrice: "₹25,000",
      entry: "₹59",
      spots: "100",
      position: "#123",
      maxEntry: "20 Times",
      distribution: "50% of Spots",
    },
  ];

  // ✅ Tab-wise content
  const renderContent = () => {
    switch (tab) {
      case "My Contest":
        return (
          <>
            {/* Congratulations Box */}
            <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
              <View className="flex-row justify-between items-start p-4">
                <View className="flex align-center">
                  <Text className="font-semibold text-base">
                    🎉 Congratulations!
                  </Text>
                  <Text className="text-2xl text-green-600 font-bold mt-2">
                    ₹500
                  </Text>
                </View>
                <Image
                  source={require("../../assets/images/trading_chart.png")}
                  className="w-[150px] h-[80px]"
                  resizeMode="contain"
                />
              </View>

              {/* ✅ Border bottom text */}
              <Text className="bg-[#F5F7F4] p-3 text-sm border-b rounded-b-xl border-gray-300">
                1 Contest - 2 Portfolio
              </Text>
            </View>

            {/* Contest Cards */}
            {contestData.map((c) => (
              <TouchableOpacity
                key={c.id}
                className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden border border-gray-200"
              >
                {/* Header */}
                <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100">
                  <Text className="font-semibold text-base">{c.title}</Text>
                  <Ionicons name="chevron-forward" size={18} color="#6b7280" />
                </View>

                {/* P&L & Won */}
                <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100">
                  <View className="flex-row items-center">
                    <Text className="text-gray-600 mr-2">P&L</Text>
                    <View className="bg-green-50 px-2 py-1 rounded">
                      <Text className="text-green-600 font-semibold text-sm">
                        {c.pnl}
                      </Text>
                    </View>
                  </View>
                  {c.won && (
                    <View className="bg-green-50 px-3 py-1 rounded">
                      <Text className="text-green-600 font-semibold text-sm">
                        {c.won}
                      </Text>
                    </View>
                  )}
                </View>

                {/* Meta Info */}
                <View className="px-4 py-3 space-y-2">
                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <Ionicons name="trophy-outline" size={16} color="#6b7280" />
                      <Text className="ml-2 text-gray-600">First price</Text>
                    </View>
                    <Text className="font-semibold text-sm">{c.firstPrice}</Text>
                  </View>

                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <MaterialIcons name="currency-rupee" size={16} color="#6b7280" />
                      <Text className="ml-2 text-gray-600">Entry</Text>
                    </View>
                    <Text className="font-semibold text-sm">{c.entry}</Text>
                  </View>

                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <Ionicons name="people-outline" size={16} color="#6b7280" />
                      <Text className="ml-2 text-gray-600">Spots</Text>
                    </View>
                    <Text className="font-semibold text-sm">{c.spots}</Text>
                  </View>

                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <FontAwesome5 name="flag" size={14} color="#6b7280" />
                      <Text className="ml-2 text-gray-600">Position</Text>
                    </View>
                    <Text className="font-semibold text-sm">{c.position}</Text>
                  </View>

                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <MaterialIcons name="layers" size={16} color="#6b7280" />
                      <Text className="ml-2 text-gray-600">Max Entry</Text>
                    </View>
                    <Text className="font-semibold text-sm">{c.maxEntry}</Text>
                  </View>

                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <Ionicons name="gift-outline" size={16} color="#6b7280" />
                      <Text className="ml-2 text-gray-600">Price Distribution</Text>
                    </View>
                    <Text className="font-semibold text-sm">{c.distribution}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </>
        );

      case "My Portfolio":
        return (
          <MyPortfolio/>
        );

      case "Winner":
        return (
    <WinnerTab/>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-gray-50">
        <Header title="Beginner’s Arena" />

        {/* Tabs */}
        <View className="flex-row border-b border-gray-200 bg-white">
          {["My Contest", "My Portfolio", "Winner"].map((item) => (
            <TouchableOpacity
              key={item}
              className="flex-1 items-center py-3"
              onPress={() => setTab(item)}
            >
              <Text
                className={`text-sm font-semibold ${
                  tab === item ? "text-red-600" : "text-gray-600"
                }`}
              >
                {item}
              </Text>
              {tab === item && (
                <View className="h-0.5 w-full bg-red-600 absolute bottom-0" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Scrollable Content with safe bottom space */}
        <ScrollView
          className="p-2"
          contentContainerStyle={{ paddingBottom: 80 }} // ✅ margin bottom safe
          showsVerticalScrollIndicator={false}
        >
          {renderContent()}
        </ScrollView>
      </View>
    </>
  );
};

export default CompletedContestScreen;
