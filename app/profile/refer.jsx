import { Stack } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import BalanceHeader from "../../components/wallet/BallanceHeader";
export default function ReferAndEarnScreen() {
  return (
      <>
      <Stack.Screen options={{ headerShown: false }} />
      <BalanceHeader title="Bank Details" />
    <View className="flex-1 bg-white px-5 pt-7">
      <Text className="text-lg font-semibold text-gray-800 mb-2">Refer and Earn</Text>
      <Text className="text-xs text-gray-500 mb-5">Invite your friends and earn rewards!</Text>
      <TouchableOpacity className="bg-green-500 rounded-lg py-3 mb-3 items-center">
        <Text className="text-base text-white font-bold">Share Invite</Text>
      </TouchableOpacity>
      {/* Show referral code or link here */}
      <Text className="text-xs text-blue-600">Your referral code: AB123</Text>
    </View>
    </>
  );
}
