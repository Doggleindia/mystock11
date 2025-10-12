import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import BalanceHeader from "../../components/wallet/BallanceHeader";
export default function VerifyMobileScreen() {
  return (
      <>
      <Stack.Screen options={{ headerShown: false }} />
      <BalanceHeader title="Bank Details" />
    <View className="flex-1 bg-white px-5 pt-7">
      <Text className="text-xs text-gray-600 mb-2">Enter mobile number</Text>
      <TextInput
        placeholder="e.g., 999 888 2222"
        className="bg-gray-100 rounded-lg px-3 py-3 mb-6 text-base"
        placeholderTextColor="#888"
        keyboardType="phone-pad"
      />
      <TouchableOpacity className="bg-green-600 rounded-lg py-3 items-center mt-2">
        <Text className="text-base text-white font-bold">Get OTP</Text>
      </TouchableOpacity>
    </View>
    </>
  );
}
