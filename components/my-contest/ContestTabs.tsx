import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import ContestCard, { Contest } from "./ContestCard"; // import your ContestCard

const ContestTabs = () => {
  const [marketTab, setMarketTab] = useState("NIFTY 50");
  const [statusTab, setStatusTab] = useState("Upcoming");

  // Dummy contests data (grouped by status)
  const contests: Record<string, Contest[]> = {
    Upcoming: [
      {
        id: "1",
        title: "Beginner’s Arena",
        prizePool: 50000,
        entryFee: 50,
        timeLeft: "1h : 47m",
        startTime: "3:20 PM",
        spotsFilled: 238,
        totalSpots: 250,
        position: 12,
        pnl: 0.4,
        winRate: 40,
        medalPrize: 25000,
        url: '/my-contest-details'
      },
    ],
    Live: [
      {
        id: "2",
        title: "Pro Championship",
        prizePool: 100000,
        entryFee: 100,
        timeLeft: "Live Now",
        spotsFilled: 120,
        totalSpots: 200,
        position: 12,
        pnl: 0.4,
        winRate: 40,
        medalPrize: 25000,
        url: '/my-contest-details'
      },
    ],
    Completed: [
      {
        id: "3",
        title: "Mega Contest",
        prizePool: 75000,
        entryFee: 75,
        timeLeft: "Completed",
        spotsFilled: 250,
        totalSpots: 250,
        position: 12,
        pnl: 0.4,
        winRate: 40,
        medalPrize: 25000,
        url: '/my-contest/CompletedContestScreen'
      },
    ],
  };

  return (
    <View className="bg-white flex-1">
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

      {/* Contest List */}
      <ScrollView className="flex-1">
        {contests[statusTab]?.map((contest) => (
          <ContestCard key={contest.id} data={contest} />
        ))}
        {contests[statusTab]?.length === 0 && (
          <Text className="text-center text-gray-500 py-8">
            No {statusTab} contests available.
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ContestTabs;
