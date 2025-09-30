import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const ContestTabs = () => {
  const [marketTab, setMarketTab] = useState("NIFTY 50");
  const [statusTab, setStatusTab] = useState("Upcoming");

  return (
    <View className="bg-white">
      {/* Top Tabs */}
      <View className="flex-row border-b border-gray-200">
        {["NIFTY 50", "BANK NIFTY"].map((tab) => (
          <TouchableOpacity
            key={tab}
            className="flex-1 items-center relative py-3"
            onPress={() => setMarketTab(tab)}
          >
            <Text
              className={`text-base font-semibold ${
                marketTab === tab ? "text-red-600" : "text-gray-700"
              }`}
            >
              {tab}
            </Text>
            {marketTab === tab && (
              <View className="absolute bottom-0 w-full h-0.5 bg-red-600" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Second Tabs */}
      <View className="flex-row justify-around py-4">
        {["Upcoming", "Live", "Completed"].map((tab) => (
          <TouchableOpacity
            key={tab}
            className="flex-1 items-center"
            onPress={() => setStatusTab(tab)}
          >
            <Text
              className={`text-sm ${
                statusTab === tab
                  ? "text-red-600 font-semibold"
                  : "text-gray-600"
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ContestTabs;
