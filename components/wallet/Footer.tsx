import React from "react";
import { Image, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { useAuthStore } from "../../store/authStore";

interface FooterProps {
  amount: number;
  onDeposit?: () => void;
  loading?: boolean;
}

export default function Footer({ amount = 100, onDeposit, loading = false }: FooterProps) {
  const { depositAmount } = useAuthStore();

  const handleDeposit = async () => {
    if (onDeposit) {
      onDeposit();
    } else {
      // Default deposit handler if onDeposit not provided
      try {
        await depositAmount(amount);
      } catch (error) {
        console.error('Deposit error:', error);
      }
    }
  };

  return (
    <View className="px-4 pb-6">
      {/* Payment option */}
      <View className="flex-row items-center mt-3">
        <Image
          source={require("../../assets/images/wallet/phonepay.png")} // your UPI icon here
          className="w-6 h-6 mr-2"
          resizeMode="contain"
        />
        <Text className="text-gray-700">Add via UPI PhonePe</Text>
      </View>

      {/* Add button */}
      <TouchableOpacity 
        onPress={handleDeposit}
        disabled={loading}
        className={`${loading ? 'bg-gray-400' : 'bg-green-600'} rounded-lg mt-3 py-3`}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-center text-white font-semibold">
            Add ₹{amount}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
