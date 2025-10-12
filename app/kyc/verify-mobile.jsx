import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import BalanceHeader from "../../components/wallet/BallanceHeader";
import { Stack } from 'expo-router';
export default function MobileVerifyScreen() {
    
  return (
     <>
    <Stack.Screen
        options={{  
            headerShown: false, // 👈 hides the auto header
        }}
    />
    <BalanceHeader title="KYC Details" />
    <View className="flex-1 bg-white px-4 pt-5">
      <Text className="text-xs text-gray-600 mb-1">Enter mobile number</Text>
      <TextInput
        className="bg-gray-100 rounded-lg py-3 px-3 mb-5 text-sm"
        placeholder="e.g., 999 888 2222"
        placeholderTextColor="#888"
      />
      <TouchableOpacity className="bg-green-600 rounded-lg py-3 items-center mt-2">
        <Text className="text-base text-white font-bold">Get OTP</Text>
      </TouchableOpacity>
    </View>
    </>
  );
}
