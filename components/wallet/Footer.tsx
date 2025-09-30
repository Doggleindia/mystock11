import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Footer() {
  return (
    <View className="px-4 pb-6">
      {/* Payment option */}
      <View className="flex-row items-center mt-3">
        <Image
          source={require("../../assets/images/wallet/phonepay.png")} // your UPI icon here
          className="w-6 h-6 mr-2"
          resizeMode="contain"
        />
        <Text className="text-gray-700">Add via UPI PhonePe</Text>
      </View>

      {/* Add button */}
      <TouchableOpacity className="bg-green-600 rounded-lg mt-3 py-3">
        <Text className="text-center text-white font-semibold">
          Add ₹100
        </Text>
      </TouchableOpacity>
    </View>
  );
}
