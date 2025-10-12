import { View, Text } from 'react-native';
import React from 'react';
import BalanceHeader from "../../components/wallet/BallanceHeader";
import { Stack } from 'expo-router';
export default function PANDetailsScreen() {
  return (
     <>
    <Stack.Screen
        options={{  
            headerShown: false, // 👈 hides the auto header
        }}
    />
    <BalanceHeader title="KYC Details" />
    <View className="flex-1 bg-white px-4 pt-5">
      <Text className="text-xs text-gray-600 mb-2">Name</Text>
      <Text className="text-sm text-gray-800 mb-4 font-semibold">SHARUK KHAN</Text>
      <Text className="text-xs text-gray-600 mb-2">PAN CARD</Text>
      <Text className="text-sm text-gray-800 mb-4 font-semibold">EWADFA510B</Text>
      <Text className="text-xs text-gray-600 mb-2">DATE OF BIRTH</Text>
      <Text className="text-sm text-gray-800 font-semibold mb-6">02/12/1990</Text>
      <View className="bg-gray-50 p-3 mt-2">
        <Text className="text-[11px] font-bold text-gray-700 mb-2">IMPORTANT</Text>
        <Text className="text-xs text-gray-700 mb-1">• Once linked to an account, your PAN cannot be unlinked</Text>
        <Text className="text-xs text-gray-700">• It takes max 1 working day to get PAN verified</Text>
      </View>
    </View>
    </>
  );
}
