import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ContestDetailCard = () => {
  const handleJoin = () => {
      router.push('/create-portfolio');
    };
  return (
    <View className="bg-white rounded-xl mx-4 mt-4 p-4 shadow-sm">
      {/* Header Row */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-black">Daily Trading Challenge</Text>
        <Ionicons name="notifications-outline" size={20} color="#444" />
      </View>

      {/* Price Pool & Entry Fee */}
      <View className="flex-row justify-between items-center mb-4">
        <View>
          <Text className="text-gray-600 text-sm mb-1">Prize Pool</Text>
          <Text className="text-2xl font-bold">₹50,000</Text>
        </View>
        <TouchableOpacity  onPress={handleJoin} className="bg-green-600 py-2 px-4 rounded-lg">
          <Text className="text-white font-semibold">₹50</Text>
        </TouchableOpacity>
      </View>

      {/* Contest Info */}
      <View className="flex-row justify-between mb-4">
        <View className="items-center flex-1">
          <Ionicons name="people-outline" size={16} color="#444" />
          <Text className="text-gray-600 text-xs mt-1">Spots</Text>
          <Text className="text-sm font-semibold mt-0.5">1200/2000</Text>
        </View>
        <View className="items-center flex-1">
          <Ionicons name="flag-outline" size={16} color="#444" />
          <Text className="text-gray-600 text-xs mt-1">Contest</Text>
          <Text className="text-sm font-semibold mt-0.5">NIFTY 50</Text>
        </View>
        <View className="items-center flex-1">
          <Ionicons name="trophy-outline" size={16} color="#444" />
          <Text className="text-gray-600 text-xs mt-1">First Prize</Text>
          <Text className="text-sm font-semibold mt-0.5">₹10,000</Text>
        </View>
      </View>

      {/* Timer Section */}
      <View className="flex-row justify-between items-end border-t border-gray-100 pt-3">
        <Text className="text-gray-600 text-xs leading-5">
          Contest runs during live market hours{"\n"}
          (9:15 AM – 3:30 PM)
        </Text>
        <View>
          <Text className="text-red-600 font-bold text-base">1h : 47m</Text>
          <Text className="text-gray-600 text-xs text-right">3:30 PM</Text>
        </View>
      </View>
    </View>
  );
};

export default ContestDetailCard;
