import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text } from "react-native";
import ContestHeader from "./ContestHeader";
import PrimaryButton from "./PrimaryButton";

export interface Contest {
  id: string;
  title: string;
  prizePool: number; // e.g., 50000
  entryFee: number; // e.g., 50
  timeLeft: string; // e.g., "1h : 47m"
  startTime?: string; // e.g., "3:20 PM"
  spotsFilled: number; // e.g., 238
  totalSpots: number; // e.g., 250
  winRate?: number; // e.g., 40
  medalPrize?: number; // e.g., 25000
}

const currency = (n: number) => `₹${n?.toLocaleString("en-IN")}`;

export default function ContestCard({
  data,
}: {
  data: Contest;
  onJoin?: (id: string) => void;
}) {
  const currency = (n?: number) => `₹${(n ?? 0).toLocaleString("en-IN")}`;

const percent = Math.min(
  100,
  Math.round(((data?.spotsFilled ?? 0) / Math.max(1, data?.totalSpots ?? 1)) * 100)
);

  const router = useRouter();

  return (
    <View className="bg-white rounded-xl mx-4 my-2 shadow-sm border border-gray-200 overflow-hidden">
      <ContestHeader
        title={data?.title}
        timeLeft={data?.timeLeft}
        startTime={data?.startTime}
      />

      {/* Prize row */}
      <View className="flex-row items-center px-4 pt-2">
        <View className="flex-1">
          <Text className="text-gray-500 mb-1 text-xs">Prize Pool</Text>
          <Text className="text-2xl font-extrabold">
            {currency(data?.prizePool)}
          </Text>
        </View>
      </View>

      {/* Progress */}
      <View className="px-4 mt-2 pb-1">
        <View className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <View
            className="bg-red-500 h-2"
            style={{ width: `${percent}%` }}
          />
        </View>
        <Text className="text-xs text-gray-500 mt-1">
          {`${data?.spotsFilled}/${data?.totalSpots} Spots`}
        </Text>
      </View>

      {/* Join button */}
      <View className="px-4 py-2">
        <PrimaryButton
          title={`Join ₹${data?.entryFee}`}
          onPress={() => router.push(`/contest/${data?.id}`)}
        />
      </View>

      {/* Bottom meta */}
      <View className="flex-row items-center px-4 py-3">
        <View className="flex-row items-center mr-4">
          <Ionicons name="medal" size={16} color="#f59e0b" />
          <Text className="font-bold ml-1">
            {currency(data?.medalPrize ?? Math.round(data?.prizePool / 2))}
          </Text>
        </View>

        <View className="flex-row items-center mr-4">
          <Ionicons name="trophy-outline" size={16} color="#6b7280" />
          <Text className="text-gray-500 ml-1">
            {(data.winRate ?? 40) + "%"}
          </Text>
        </View>

        <View className="flex-row items-center">
          <Ionicons name="people-outline" size={16} color="#6b7280" />
          <Text className="text-gray-500 ml-1">
            M {Math.max(10, Math.round(data.entryFee / 2))}
          </Text>
        </View>
      </View>
    </View>
  );
}
