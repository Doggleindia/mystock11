import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import BalanceHeader from "../../components/wallet/BallanceHeader";
import { Stack } from 'expo-router';
export default function PolicyScreen() {
  return (
      <>
      <Stack.Screen options={{ headerShown: false }} />
      <BalanceHeader title="Bank Details" />
    <ScrollView className="flex-1 bg-white px-5 pt-7">
      <Text className="text-lg font-bold text-gray-700 mb-6">Terms and Policy</Text>
      <Text className="text-xs text-gray-500 mb-2">
        {/* Add actual policy text here */}
        By using this app, you agree to our terms and policies.
      </Text>
      <Text className="text-xs text-gray-500">
        {/* More content */}
        Privacy, security, and usage details go here.
      </Text>
    </ScrollView>
    </>
  );
}
