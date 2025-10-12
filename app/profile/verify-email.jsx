import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import BalanceHeader from "../../components/wallet/BallanceHeader";
import { Stack } from 'expo-router';
export default function VerifyEmailScreen() {
  return (
      <>
      <Stack.Screen options={{ headerShown: false }} />
      <BalanceHeader title="Bank Details" />
    <View className="flex-1 bg-white px-5 pt-7">
      <Text className="text-xs text-gray-600 mb-2">Enter the email you want to use</Text>
      <TextInput
        placeholder="e.g., name@gmail.com"
        className="bg-gray-100 rounded-lg px-3 py-3 mb-6 text-base"
        placeholderTextColor="#888"
      />
      <TouchableOpacity className="bg-green-600 rounded-lg py-3 items-center mt-2">
        <Text className="text-base text-white font-bold">Get OTP</Text>
      </TouchableOpacity>
    </View>
    </>
  );
}
