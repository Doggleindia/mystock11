import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
export default function OTPVerifyScreen() {
  return (
    <View className="flex-1 bg-white px-5 pt-7">
      <Text className="text-xs text-gray-600 mb-2">Enter verification code</Text>
      <View className="flex-row mb-6">
        {[0,1,2,3,4,5].map(i => (
          <TextInput key={i} className="bg-gray-100 rounded-lg px-4 py-3 mx-1 text-lg text-center" maxLength={1} keyboardType="number-pad" />
        ))}
      </View>
      <TouchableOpacity>
        <Text className="text-xs text-blue-600 mb-7">Resend code</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-green-600 rounded-lg py-3 items-center">
        <Text className="text-base text-white font-bold">Get Verify</Text>
      </TouchableOpacity>
    </View>
  );
}
