import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import BalanceHeader from "../../components/wallet/BallanceHeader";
import { Stack, useRouter } from 'expo-router';

export default function ProfileInformationScreen() {
  const router = useRouter();
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <BalanceHeader title="My Information" />
      <View className="flex-1 bg-white px-5 pt-7">
        <Text className="text-xs text-gray-600 mb-1">Name</Text>
        <TextInput value="Shahrukh Khan" className="bg-gray-100 rounded-lg px-3 py-3 mb-4 text-sm" />

        <Text className="text-xs text-gray-600 mb-1">Email</Text>
        <View className="flex-row items-center mb-4">
          <TextInput value="kshahrukh@gmail.com" className="bg-gray-100 rounded-lg px-3 py-3 text-sm grow" />
          <TouchableOpacity
            className="ml-2 px-3 py-2 rounded bg-blue-500"
            onPress={() => router.push('profile/verify-email')}
          >
            <Text className="text-xs text-white font-bold">Verify</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-xs text-gray-600 mb-1">Mobile</Text>
        <View className="flex-row items-center mb-4">
          <TextInput value="999 888 2222" className="bg-gray-100 rounded-lg px-3 py-3 text-sm grow" />
          <TouchableOpacity
            className="ml-2 px-3 py-2 rounded bg-blue-500"
            onPress={() => router.push('profile/verify-mobile')}
          >
            <Text className="text-xs text-white font-bold">Verify</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-xs text-gray-600 mb-1">Date of Birth</Text>
        <TextInput value="01/01/1990" className="bg-gray-100 rounded-lg px-3 py-3 mb-6 text-sm" />
        <TouchableOpacity className="bg-green-600 rounded-lg py-3 items-center">
          <Text className="text-base text-white font-bold">Update Details</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
