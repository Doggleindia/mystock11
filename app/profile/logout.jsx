import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import BalanceHeader from "../../components/wallet/BallanceHeader";
import { Stack } from 'expo-router';
export default function LogoutScreen() {
  
  return (
      <>
      <Stack.Screen options={{ headerShown: false }} />
      <BalanceHeader title="Logout" />
    <View className="flex-1 bg-white p-6 justify-center">
      <Text className="text-lg font-semibold text-gray-800 mb-3">Logout?</Text>
      <Text className="text-xs text-gray-500 mb-8">Are you sure you want to logout?</Text>
      <TouchableOpacity className="bg-green-600 rounded-lg py-3 mb-3 items-center">
        <Text className="text-base text-white font-bold">Yes, Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-gray-200 rounded-lg py-3 items-center">
        <Text className="text-base text-gray-700 font-bold">Cancel</Text>
      </TouchableOpacity>
    </View>
    </>
  );
}
