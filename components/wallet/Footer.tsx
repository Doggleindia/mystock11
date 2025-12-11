import React, { useState } from "react";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import walletService from "../../services/walletService";

interface FooterProps {
  amount: number;
  onDeposit?: () => void;
  loading?: boolean;
}

export default function Footer({ amount = 100, onDeposit, loading: externalLoading = false }: FooterProps) {
  const [loading, setLoading] = useState(false);

  const handleDeposit = async () => {
    if (onDeposit) {
      onDeposit();
      return;
    }

    // Default deposit handler using walletService
    try {
      setLoading(true);
      const response = await walletService.deposit({ amount });
      if (response.success) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: response.message || 'Amount added to wallet',
        });
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Deposit failed';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
      });
      console.error('Deposit error:', error);
    } finally {
      setLoading(false);
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
        disabled={loading || externalLoading}
        className={`${loading || externalLoading ? 'bg-gray-400' : 'bg-green-600'} rounded-lg mt-3 py-3`}
      >
        {loading || externalLoading ? (
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
