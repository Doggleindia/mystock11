import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ContestDetailCard = (props: any) => {
  // Accept whichever shape is passed: { contestData: {...} } or { contest: {...} } or raw props
  const raw = props?.contestData ?? props?.contest ?? props;
  const contest = raw?.contestData ?? raw?.contest ?? raw;

  const name = contest?.title ?? contest?.name ?? contest?.contestName ?? "Contest";
  const prizePool = contest?.pricePool ?? contest?.prizePool ?? contest?.price_pool ?? 0;
  const entryFee = contest?.entryFee ?? contest?.entry_fee ?? 0;
  const totalSpots = contest?.totalSpots ?? contest?.total_spots ?? 0;
  const spotsFilled = Array.isArray(contest?.participants) ? contest.participants.length : contest?.spotsFilled ?? 0;
  const firstPrize = contest?.prizeDistribution?.[0]?.prizeAmount ?? contest?.firstPrize ?? Math.floor(prizePool * 0.1);

  const handleJoin = () => {
    router.push("/create-portfolio/?contestId=" + (contest?._id || contest?.id));
  };

  // console.log("ContestDetailCard contest:", contest);

  return (
    <View className="bg-white rounded-xl mx-4 mt-4 p-4 shadow-sm">
      {/* Header Row */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-black">{name}</Text>
        <Ionicons name="notifications-outline" size={20} color="#444" />
      </View>

      {/* Price Pool & Entry Fee */}
      <View className="flex-row justify-between items-center mb-4">
        <View>
          <Text className="text-gray-600 text-sm mb-1">Prize Pool</Text>
          <Text className="text-2xl font-bold">₹{Number(prizePool).toLocaleString()}</Text>
        </View>
        <TouchableOpacity onPress={handleJoin} className="bg-green-600 py-2 px-4 rounded-lg">
          <Text className="text-white font-semibold">₹{entryFee}</Text>
        </TouchableOpacity>
      </View>

      {/* Contest Info */}
      <View className="flex-row justify-between mb-4">
        <View className="items-center flex-1">
          <Ionicons name="people-outline" size={16} color="#444" />
          <Text className="text-gray-600 text-xs mt-1">Spots</Text>
          <Text className="text-sm font-semibold mt-0.5">{spotsFilled}/{totalSpots}</Text>
        </View>
        <View className="items-center flex-1">
          <Ionicons name="flag-outline" size={16} color="#444" />
          <Text className="text-gray-600 text-xs mt-1">Category</Text>
          <Text className="text-sm font-semibold mt-0.5">{contest?.category ?? '-'}</Text>
        </View>
        <View className="items-center flex-1">
          <Ionicons name="trophy-outline" size={16} color="#444" />
          <Text className="text-gray-600 text-xs mt-1">First Prize</Text>
          <Text className="text-sm font-semibold mt-0.5">₹{firstPrize?.toLocaleString?.() ?? firstPrize}</Text>
        </View>
      </View>

      {/* Timer Section */}
      <View className="flex-row justify-between items-end border-t border-gray-100 pt-3">
        <Text className="text-gray-600 text-xs leading-5">
          Contest runs during live market hours{"\n"}
          (9:15 AM – 3:30 PM)
        </Text>
        <View>
          <Text className="text-red-600 font-bold text-base">{contest?.timeLeft ?? "-"}</Text>
          <Text className="text-gray-600 text-xs text-right">{contest?.startTime ? new Date(contest.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}</Text>
        </View>
      </View>
    </View>
  );
};

export default ContestDetailCard;
