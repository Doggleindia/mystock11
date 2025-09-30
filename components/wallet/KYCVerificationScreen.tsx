import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
// import { ArrowLeft } from "lucide-react-native"; // or use react-native-vector-icons
import { useNavigation } from "@react-navigation/native";
import { Stack } from "expo-router";
import KycHeader from "./KycHeader";

export default function KYCVerificationScreen() {
  const navigation = useNavigation();
  const [aadhaar, setAadhaar] = useState("");

  return (
    <>
    <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
    <View className="flex-1 bg-white">
      <KycHeader title="KYC Verification" />

      {/* Content */}
      <View className="flex-1 px-6 py-14">
        {/* Image */}
        <View className="items-center mt-14">
          <Image
            source={require("../../assets/images/wallet/aadhar_card.png")} // 👈 use your uploaded image path
            className="w-65 h-40"
            resizeMode="contain"
          />
        </View>

        {/* Text */}
        <Text className="text-center mt-4 text-lg font-semibold">
          KYC verification is mandatory for
        </Text>

        {/* Chips */}
        <View className="flex-row justify-center flex-wrap mt-1">
          <Text className="text-xs text-gray-400 mx-2">Add Cash</Text>
          <Text className="text-xs text-gray-400">|</Text>
          <Text className="text-xs text-gray-400 mx-2">Play Cash Games</Text>
          <Text className="text-xs text-gray-400">|</Text>
          <Text className="text-xs text-gray-400 mx-2">Withdraw Cash</Text>
        </View>

        {/* Blue button */}
        <View className="items-center mt-4">
          <TouchableOpacity className="bg-blue-100 rounded-full px-5 py-2">
            <Text className="text-blue-600 text-xs font-semibold">
              Take less than 1 min
            </Text>
          </TouchableOpacity>
        </View>

        {/* Aadhaar input */}
        <View className="mt-6">
          <Text className="text-sm text-gray-700 mb-1">Enter Aadhaar Number</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-3 py-2"
            keyboardType="numeric"
            placeholder="XXXX XXXX XXXX"
            value={aadhaar}
            onChangeText={setAadhaar}
          />
        </View>

        {/* Submit */}
        <TouchableOpacity
          disabled={!aadhaar}
          className={`mt-4 rounded-lg py-2 ${
            aadhaar ? "bg-red-500" : "bg-gray-200"
          }`}
        >
          <Text
            className={`text-center text-base ${
              aadhaar ? "text-white" : "text-gray-500"
            }`}
          >
            Submit
          </Text>
        </TouchableOpacity>

        {/* OR */}
        <Text className="text-center text-xs text-gray-400 mt-3">or</Text>

        {/* Choose another method */}
        <TouchableOpacity className="mt-1">
          <Text className="text-center text-blue-600 text-dl font-semibold">
            Choose another method
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
}
