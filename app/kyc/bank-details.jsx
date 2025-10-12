import { View, Text, TouchableOpacity } from 'react-native';
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

export default function BankDetailsScreen() {
  // Sample static details; fetch from actual user data
  const details = {
    accountNumber: "****7890",
    bankName: "HDFC Bank",
    ifsc: "HDFC0001234",
    verified: true,
    proofFile: "statement.pdf",
    status: "Verified"
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <BalanceHeader title="Bank Details" />
      <View className="flex-1 bg-white px-4 py-6">
        {/* Bank Icon Row */}
        <View className="flex-row items-center mb-5">
          <BankIcon />
          <Text className="ml-2 text-lg font-semibold text-gray-800">Bank Account Details</Text>
        </View>
        {/* Details Section */}
        <View className="mb-4">
          <Text className="text-xs text-gray-500 mb-1">Account Number</Text>
          <Text className="text-base text-gray-800 mb-3">{details.accountNumber}</Text>
          <Text className="text-xs text-gray-500 mb-1">Bank Name</Text>
          <Text className="text-base text-gray-800 mb-3">{details.bankName}</Text>
          <Text className="text-xs text-gray-500 mb-1">IFSC Code</Text>
          <Text className="text-base text-gray-800 mb-3">{details.ifsc}</Text>
          <Text className="text-xs text-gray-500 mb-1">Proof Uploaded</Text>
          <Text className="text-base text-blue-800 mb-3">{details.proofFile}</Text>
          <View className="flex-row items-center">
            <Text className="text-xs text-gray-500">Status:</Text>
            <Text className="ml-1 text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded-lg">{details.status}</Text>
          </View>
        </View>
        {/* Important Section */}
        <View className="bg-gray-50 p-3 mt-6 rounded-lg mb-12">
          <Text className="text-[11px] font-bold text-gray-700 mb-1">IMPORTANT</Text>
          <Text className="text-xs text-gray-700 mb-1">• Submitted bank proof will be used for verification.</Text>
          <Text className="text-xs text-gray-700">• Password protected files will be rejected.</Text>
        </View>
      </View>
    </>
  );
}
