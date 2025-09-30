import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import DetailsCard from "./DetailsCard";

export default function MainContent() {
  const [amount, setAmount] = useState(100);

  return (
    <ScrollView className="flex-1 px-4">
      {/* Current Balance */}
      <View className="flex-row justify-between mt-4">
        <Text className="text-gray-700 font-medium">Current Balance</Text>
        <Text className="text-gray-900 font-semibold">₹12.24</Text>
      </View>

      {/* Add Amount */}
      <View className="flex-row mt-3 space-x-2">
        <View className="flex-1 border border-green-500 rounded-lg px-3 py-2">
          <Text className="text-green-700 font-semibold">₹{amount}</Text>
        </View>
        <TouchableOpacity
          onPress={() => setAmount(500)}
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          <Text>₹500</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setAmount(1000)}
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          <Text>₹1,000</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setAmount(1000)}
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          <Text>₹2,000</Text>
        </TouchableOpacity>
      </View>

      {/* Details */}
     <DetailsCard amount={100} />


      {/* Offer section */}
      <View className="mt-6">
        <View className="flex-row justify-between">
          <Text className="font-semibold text-gray-700">Offer</Text>
          <TouchableOpacity>
            <Text className="text-green-600 text-sm">View all</Text>
          </TouchableOpacity>
        </View>

        {/* Offer cards */}
        {[1, 2, 3, 4].map((item) => (
          <View
            key={item}
            className="flex-row justify-between items-center mt-3 border border-gray-200 rounded-lg px-3 py-2"
          >
            <View>
              <Text className="text-gray-700 font-medium">
                First Time Bonus
              </Text>
              <Text className="text-gray-400 text-xs">Up to 50%</Text>
            </View>
            <TouchableOpacity className="bg-green-100 px-3 py-1 rounded">
              <Text className="text-green-600 font-medium">Apply</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
