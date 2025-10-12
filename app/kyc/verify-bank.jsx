import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import BalanceHeader from "../../components/wallet/BallanceHeader";
import { Svg, Path } from 'react-native-svg';

const BankIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#767676" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M2 10v3h20v-3" />
    <Path d="M12 2L2 7v2h20V7l-10-5z" />
    <Path d="M7 13v5" />
    <Path d="M17 13v5" />
    <Path d="M12 15v3" />
    <Path d="M4 21h16" />
  </Svg>
);

export default function BankVerifyScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <BalanceHeader title="Verify Bank Account" />
      <View className="flex-1 bg-white px-4 py-6">
        {/* Account Number */}
        <Text className="text-xs text-gray-600 mb-1">Account Number</Text>
        <TextInput
          className="bg-gray-100 rounded-lg py-3 px-3 mb-4 text-sm"
          placeholder="e.g.,1234567890"
          placeholderTextColor="#888"
        />
        {/* Retype Account Number */}
        <Text className="text-xs text-gray-600 mb-1">Retype Account Number</Text>
        <TextInput
          className="bg-gray-100 rounded-lg py-3 px-3 mb-4 text-sm"
          placeholder="e.g.,1234567890"
          placeholderTextColor="#888"
        />
        {/* IFSC Code */}
        <Text className="text-xs text-gray-600 mb-1">IFSC Code</Text>
        <TextInput
          className="bg-gray-100 rounded-lg py-3 px-3 mb-4 text-sm"
          placeholder="e.g., ABCD0001234"
          placeholderTextColor="#888"
        />
        {/* Upload Bank Proof */}
        <Text className="text-xs text-gray-600 mb-1">Additional proof required in case of re-attempt</Text>
        <TouchableOpacity className="flex-row items-center justify-center border border-gray-300 bg-white rounded-lg py-3 mb-7 mt-1">
          <BankIcon />
          <Text className="ml-2 text-gray-700 font-medium">Upload Bank Proof</Text>
        </TouchableOpacity>
        {/* Important Section */}
        <View className="mb-7">
          <Text className="text-xs font-bold text-gray-700 mb-1">IMPORTANT</Text>
          <Text className="text-xs text-gray-700 mb-1">• Review your details before submitting your documents</Text>
          <Text className="text-xs text-gray-700 mb-1">• Password protected files will be rejected</Text>
        </View>
        {/* Submit Button */}
        <TouchableOpacity className="bg-gray-500 rounded-md py-3 items-center mb-3" style={{ marginTop: 10 }}>
          <Text className="text-base text-white font-bold">Submit Details</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
