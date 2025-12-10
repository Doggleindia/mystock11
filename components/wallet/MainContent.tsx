import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import DetailsCard from "./DetailsCard";
import { useAuthStore } from "../../store/authStore";

interface MainContentProps {
  onAmountChange?: (amount: number) => void;
}

export default function MainContent({ onAmountChange }: MainContentProps) {
  const { user } = useAuthStore();
  const [selectedAmount, setSelectedAmount] = useState(100);

  const walletBalance = user?.walletBalance || 0;

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    if (onAmountChange) {
      onAmountChange(amount);
    }
  };

  return (
    <ScrollView className="flex-1 px-4">
      {/* Current Balance */}
      <View className="flex-row justify-between mt-4">
        <Text className="text-gray-700 font-medium">Current Balance</Text>
        <Text className="text-gray-900 font-semibold">₹{walletBalance.toFixed(2)}</Text>
      </View>

      {/* Add Amount */}
      <View className="flex-row mt-3 space-x-2">
        <View className="flex-1 border border-green-500 rounded-lg px-3 py-2">
          <Text className="text-green-700 font-semibold">₹{selectedAmount}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleAmountSelect(500)}
          className={`border rounded-lg px-3 py-2 ${selectedAmount === 500 ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}
        >
          <Text className={selectedAmount === 500 ? 'text-green-700 font-semibold' : 'text-gray-700'}>₹500</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleAmountSelect(1000)}
          className={`border rounded-lg px-3 py-2 ${selectedAmount === 1000 ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}
        >
          <Text className={selectedAmount === 1000 ? 'text-green-700 font-semibold' : 'text-gray-700'}>₹1,000</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleAmountSelect(2000)}
          className={`border rounded-lg px-3 py-2 ${selectedAmount === 2000 ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}
        >
          <Text className={selectedAmount === 2000 ? 'text-green-700 font-semibold' : 'text-gray-700'}>₹2,000</Text>
        </TouchableOpacity>
      </View>

      {/* Details */}
     <DetailsCard amount={selectedAmount} />


      {/* Offer section */}
      <View className="mt-6 mb-20">
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
