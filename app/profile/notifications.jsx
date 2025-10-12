import { View, Text } from 'react-native';
import React from 'react';
import BalanceHeader from "../../components/wallet/BallanceHeader";
import { Stack } from 'expo-router';
export default function NotificationsScreen() {
  return (
      <>
      <Stack.Screen options={{ headerShown: false }} />
      <BalanceHeader title="Notification" />
    <View className="flex-1 bg-white px-5 pt-7">
      <Text className="text-lg font-bold text-gray-700 mb-6">Notifications</Text>
      {/* You can map notifications array here */}
      <Text className="text-xs text-gray-500">No notifications yet.</Text>
    </View>
</>
  );
}
