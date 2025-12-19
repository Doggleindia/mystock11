import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Svg, Circle, Path } from 'react-native-svg';
import BalanceHeader from "../../components/wallet/BallanceHeader";
import { Stack } from 'expo-router';
const CheckCircleIcon = ({ color = "#10B981" }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Path d="m9 12 2 2 4-4" />
  </Svg>
);

const QuestionIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" stroke="#555" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Path d="M9.09 9a3 3 0 1 1 4.83 2.36c-.36.36-.82.65-1.22 1.11s-.59.83-.59 1.53M12 17h.01" />
  </Svg>
);

const FileIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" stroke="#555" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 4h16v16H4z" />
    <Path d="M8 8h8v2H8z M8 12h8v2H8z" />
  </Svg>
);

export default function DepositDetailScreen() {
  return (
        <>
    <Stack.Screen
      options={{
        headerShown: false, // 👈 hides the auto header
      }}
    />
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
        <BalanceHeader title="Deposit Details" />
    <View className="flex-1 bg-white">

      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-7 pb-2 border-b border-gray-200">
        <View>
          <Text className="text-2xl font-bold text-green-700">₹100</Text>
          <Text className="text-xs text-gray-500 mt-1">Successful  31 Jul 2025, 5:00 PM</Text>
        </View>
        <View className="bg-green-50 rounded-full p-2">
          <CheckCircleIcon />
        </View>
      </View>

      {/* Source */}
      <View className="flex-row items-center justify-between px-5 py-2">
        <View className="flex-row items-center">
          <Text className="text-xs text-gray-500">From</Text>
          <Text className="ml-2 text-xs text-gray-700 font-semibold">PhonePe</Text>
        </View>
        <TouchableOpacity className="bg-purple-100 px-2 py-1 rounded-md">
          <Text className="text-xs text-purple-900 font-bold">P</Text>
        </TouchableOpacity>
      </View>

      {/* Transaction ID and Copy */}
      <View className="flex-row items-center justify-between px-5 py-2">
        <View>
          <Text className="text-xs text-gray-400 mb-1">Transaction ID</Text>
          <Text className="text-sm font-semibold text-gray-900">123154565665456add</Text>
        </View>
        <TouchableOpacity className="flex-row items-center px-3 py-1 border border-gray-300 rounded-md">
          <Text className="text-xs text-gray-600">Copy</Text>
        </TouchableOpacity>
      </View>

      {/* Deposit Details Table */}
      <View className="bg-white mx-4 rounded-md border border-gray-200 mt-5 mb-2">
        <View className="px-4 py-3 border-b border-gray-100">
          <Text className="text-xs font-bold text-gray-600">Deposit Details</Text>
        </View>
        {[ // Table rows, colors per value
          { label: "Deposit amount", value: 100 },
          { label: "28% GST on Deposit", value: -22 },
          { label: "Onestock promo cash", value: 22 },
          { label: "Grand total", value: 100, bold: true }
        ].map((item, idx) => (
          <View key={idx}
            className={`flex-row items-center justify-between px-4 py-2 ${item.bold ? "border-t border-gray-100 bg-gray-50" : ""}`}>
            <Text className={`text-xs ${item.bold ? "font-bold" : ""} text-gray-700`}>{item.label}</Text>
            <Text className={`text-xs ${item.bold ? "font-bold" : ""} ${item.value > 0 ? "text-green-700" : item.value < 0 ? "text-red-600" : "text-gray-700"}`}>
              {(item.value > 0 ? "+" : item.value < 0 ? "-" : "") + "₹" + Math.abs(item.value).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      {/* Status Timeline */}
      <View className="px-5 pt-1">
        {[
          { status: "Request Raised", date: "31 Jul 2025, 5:00 PM" },
          { status: "Successful", date: "31 Jul 2025, 5:00 PM" }
        ].map((item, idx) => (
          <View key={idx} className="flex-row items-center py-1">
            <CheckCircleIcon color={idx === 1 ? "#10B981" : "#555"} />
            <Text className="ml-2 text-xs text-gray-700">{item.status}</Text>
            <Text className="ml-2 text-xs text-gray-500">{item.date}</Text>
          </View>
        ))}
      </View>

      {/* Divider */}
      <View className="border-t border-gray-200 mt-8 mb-2" />

      {/* Support & Invoice */}
      <TouchableOpacity className="flex-row items-center justify-between px-4 py-3 bg-white">
        <View className="flex-row items-center">
          <QuestionIcon />
          <Text className="ml-2 text-base text-gray-700">Help and Support</Text>
        </View>
        <Text className="text-lg text-gray-400">{'>'}</Text>
      </TouchableOpacity>
      <TouchableOpacity className="flex-row items-center justify-between px-4 py-3 bg-white">
        <View className="flex-row items-center">
          <FileIcon />
          <Text className="ml-2 text-base text-gray-700">Tax Invoice</Text>
        </View>
        <Text className="text-lg text-gray-400">{'>'}</Text>
      </TouchableOpacity>
    </View>
</SafeAreaView>
</>
  );
}
