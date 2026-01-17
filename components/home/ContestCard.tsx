import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import ContestHeader from "./ContestHeader";
import { getH2HAvailableSlot } from "@/services/portfolioService";

export interface Contest {
  id: string;
  title: string;
  prizePool: number; // e.g., 50000
  entryFee: number; // e.g., 50
  timeLeft: string; // e.g., "1h : 47m"
  startTime?: string; // e.g., "3:20 PM"
  endTime?: string; // e.g., "5:20 PM"
  spotsFilled: number; // e.g., 238
  totalSpots: number; // e.g., 250
  winRate?: number; // e.g., 40
  medalPrize?: number; // e.g., 25000
  status?: string; // e.g., "upcoming", "live", "completed"
  isJoined?: boolean; // Whether user has joined this contest
  isLocked?: boolean; // Whether contest is locked (can't join)
  category?: string; // Contest category (e.g., "Head-to-Head", "Mega")
  rank?: number; // User's rank in completed contest
  pnl?: number; // Profit and Loss amount
  pnlPercentage?: number; // Profit and Loss percentage
  matchId?: string; // Match ID for H2H contests
  templateId?: string; // Template ID for H2H contests
  prizeDistribution?: Array<{ rankFrom: number; rankTo: number; prizeAmount: number }>; // Prize distribution
}

const currency = (n?: number | null) => 
  typeof n === "number" ? `₹${n.toLocaleString("en-IN")}` : "₹0";

export default function ContestCard({
  data,
  onJoin,
}: {
  data: Contest;
  onJoin?: (id: string) => void;
}) {
  const currency = (n?: number) => `₹${(n ?? 0).toLocaleString("en-IN")}`;
  const [isProcessingJoin, setIsProcessingJoin] = useState(false);

  const percent = Math.min(
    100,
    Math.round(((data?.spotsFilled ?? 0) / Math.max(1, data?.totalSpots ?? 1)) * 100)
  );

  const router = useRouter();
  const isH2H = data?.category === "Head-to-Head" || data?.category === "H2H";
  const canJoin = data?.status === 'upcoming' && !data?.isLocked && !data?.isJoined;
  const isLive = data?.status === 'live';
  const isCompleted = data?.status === 'completed';

  // Handle join click with H2H flow
  const handleJoinClick = async () => {
    if (isCompleted || data?.isJoined || isLive || data?.isLocked) {
      // Navigate to contest details
      router.push(`/my-contest/${data?.id}`);
      return;
    }

    if (!canJoin) {
      // Navigate to contest details if can't join
      router.push(`/my-contest/${data?.id}`);
      return;
    }

    // For H2H contests, check available slot first
    if (isH2H && data?.matchId && data?.templateId) {
      setIsProcessingJoin(true);
      try {
        const h2hResponse = await getH2HAvailableSlot(data.matchId, data.templateId);
        
        if (h2hResponse.isFull || !h2hResponse.canJoin) {
          Toast.show({
            type: "error",
            text1: "No slots available",
            text2: "This H2H contest is full. Please try another contest.",
          });
          setIsProcessingJoin(false);
          return;
        }

        // Use the contestId from H2H response if available
        const actualContestId = h2hResponse.contestId || h2hResponse.contest?._id || data.id;
        
        // Navigate to create portfolio with the actual contest ID
        router.push(`/create-portfolio?contestId=${actualContestId}`);
      } catch (error: any) {
        console.error("H2H slot check error:", error);
        Toast.show({
          type: "error",
          text1: "Failed to join",
          text2: error?.response?.data?.message || "Unable to check slot availability. Please try again.",
        });
      } finally {
        setIsProcessingJoin(false);
      }
    } else {
      // Regular contest flow - navigate to create portfolio
      if (onJoin) {
        onJoin(data.id);
      } else {
        router.push(`/create-portfolio?contestId=${data?.id}`);
      }
    }
  };

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

      {/* Join button - Only show Join for upcoming, non-locked contests */}
      <View className="px-4 py-2">
        <TouchableOpacity
          onPress={handleJoinClick}
          disabled={isProcessingJoin || (isLive && data?.isLocked)}
          className={`rounded-lg py-3 ${
            isProcessingJoin || (isLive && data?.isLocked)
              ? "bg-gray-300"
              : canJoin
              ? "bg-green-600"
              : "bg-gray-400"
          }`}
        >
          {isProcessingJoin ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-center font-semibold text-white text-base">
              {isCompleted || data?.isJoined || isLive || data?.isLocked
                ? 'View Details'
                : `Join ₹${data?.entryFee}`}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Prize Distribution */}
      {data?.prizeDistribution && data.prizeDistribution.length > 0 && (
        <View className="px-4 pb-2 border-t border-gray-100">
          <Text className="text-xs text-gray-500 mb-1 mt-2">Prize Distribution</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row space-x-2">
              {data.prizeDistribution.map((prize, idx) => (
                <View key={idx} className="bg-gray-50 px-3 py-1 rounded-full">
                  <Text className="text-xs text-gray-700">
                    Rank {prize.rankFrom}{prize.rankTo !== prize.rankFrom ? `-${prize.rankTo}` : ''}: {currency(prize.prizeAmount)}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* Bottom meta */}
      <View className="flex-row items-center px-4 py-3">
        {data?.status === 'completed' && data?.isJoined ? (
          // Show rank and PnL for completed contests
          <>
            {data.rank !== undefined && (
              <View className="flex-row items-center mr-4">
                <Ionicons name="trophy" size={16} color="#f59e0b" />
                <Text className="font-bold ml-1">
                  Rank #{data.rank}
                </Text>
              </View>
            )}
            {data.pnl !== undefined && (
              <View className="flex-row items-center mr-4">
                <Ionicons 
                  name={data.pnl >= 0 ? "trending-up" : "trending-down"} 
                  size={16} 
                  color={data.pnl >= 0 ? "#10b981" : "#ef4444"} 
                />
                <Text 
                  className={`font-semibold ml-1 ${
                    data.pnl >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {data.pnl >= 0 ? "+" : ""}{currency(data.pnl)}
                  {data.pnlPercentage !== undefined && 
                    ` (${data.pnlPercentage >= 0 ? "+" : ""}${data.pnlPercentage.toFixed(2)}%)`
                  }
                </Text>
              </View>
            )}
            {data.category && (
              <View className="flex-row items-center">
                <Ionicons name="pricetag-outline" size={16} color="#6b7280" />
                <Text className="text-gray-500 ml-1">{data.category}</Text>
              </View>
            )}
          </>
        ) : (
          // Default meta for upcoming/live contests
          <>
            <View className="flex-row items-center mr-4">
              <Ionicons name="medal" size={16} color="#f59e0b" />
              <Text className="font-bold ml-1">
                {currency(data?.medalPrize ?? (data?.prizeDistribution?.[0]?.prizeAmount ?? Math.round(data?.prizePool / 2)))}
              </Text>
            </View>

            <View className="flex-row items-center mr-4">
              <Ionicons name="trophy-outline" size={16} color="#6b7280" />
              <Text className="text-gray-500 ml-1">
                {(data.winRate ?? 40) + "%"}
              </Text>
            </View>

            {data.category && (
              <View className="flex-row items-center mr-4">
                <Ionicons name="pricetag-outline" size={16} color="#6b7280" />
                <Text className="text-gray-500 ml-1">{data.category}</Text>
              </View>
            )}

            <View className="flex-row items-center">
              <Ionicons name="people-outline" size={16} color="#6b7280" />
              <Text className="text-gray-500 ml-1">
                {data.spotsFilled}/{data.totalSpots}
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}
