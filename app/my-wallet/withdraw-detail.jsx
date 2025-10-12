import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Svg, Circle, Path } from 'react-native-svg';
import BalanceHeader from "../../components/wallet/BallanceHeader";
import { Stack } from 'expo-router';
// Success, Failed, Info Icons
const CheckCircleIcon = ({ color = "#10B981" }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Path d="m9 12 2 2 4-4" />
  </Svg>
);

const ErrorCircleIcon = ({ color = "#EF4444" }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Path d="M15 9l-6 6M9 9l6 6" />
  </Svg>
);

const QuestionIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" stroke="#555" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Path d="M9.09 9a3 3 0 1 1 4.83 2.36c-.36.36-.82.65-1.22 1.11s-.59.83-.59 1.53M12 17h.01" />
  </Svg>
);

const FileIcon = () => (
  <Svg width={19} height={19} viewBox="0 0 24 24" stroke="#555" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 4h16v16H4z" />
    <Path d="M8 8h8v2H8z M8 12h8v2H8z" />
  </Svg>
);

const WithdrawDetailScreen = ({
  amount = 100,
  date = "31 Jul 2025",
  time = "5:00 PM",
  id = "123154565665456add",
  to = "PhonePe",
  status = "success", // "success" | "failed" | "processing"
  details = [
    { label: "Withdraw amount", value: 100.01, color: "default" },
    { label: "30% TDS on Winnings", value: -20.33, color: "danger" },
    { label: "Total", value: 100, color: "success", bold: true }
  ],
  statusHistory = [
    { status: "Request Raised", date: "31 Jul 2025, 5:00 PM", success: false },
    { status: "Successful", date: "31 Jul 2025, 5:00 PM", success: true }
  ],
  errorMsg // string, only for "failed"
}) => {
  const isSuccess = status === "success";
  const isFailed = status === "failed";

  return (
        <>
    <Stack.Screen
      options={{
        headerShown: false, // 👈 hides the auto header
      }}
    />
        <BalanceHeader title="My Transactions" />
    <View className="flex-1 bg-white">
      {/* Top Header */}
      <View className={`flex-row items-center justify-between px-5 pt-7 pb-2 border-b border-gray-200`}>
        <View>
          <Text className={`text-2xl font-bold ${isSuccess ? "text-green-700" : isFailed ? "text-red-600" : "text-gray-700"}`}>
            ₹{parseFloat(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </Text>
          <Text className="text-xs text-gray-500">{isSuccess ? "Successful" : isFailed ? "Failed" : "In Process"} {date}, {time}</Text>
        </View>
        <View className={`${isSuccess ? "bg-green-50" : isFailed ? "bg-red-50" : "bg-gray-50"} rounded-full p-2`}>
          {isSuccess && <CheckCircleIcon />}
          {isFailed && <ErrorCircleIcon />}
          {!isSuccess && !isFailed && <CheckCircleIcon color="#A1A1AA" />}
        </View>
      </View>

      {/* To Row */}
      <View className="flex-row items-center justify-between px-5 py-2">
        <View className="flex-row items-center">
          <Text className="text-xs text-gray-500">To</Text>
          <Text className="ml-2 text-xs text-gray-700 font-semibold">{to}</Text>
        </View>
        {/* You can add any progressive badge or info here */}
      </View>

      {/* Transaction ID and Copy */}
      <View className="flex-row items-center justify-between px-5 py-2">
        <View>
          <Text className="text-xs text-gray-400 mb-1">Transaction ID</Text>
          <Text className="text-sm font-semibold text-gray-900">{id}</Text>
        </View>
        <TouchableOpacity className="flex-row items-center px-3 py-1 border border-gray-300 rounded-md">
          <Text className="text-xs text-gray-600">Copy</Text>
        </TouchableOpacity>
      </View>

      {/* Withdrawal Details Table */}
      <View className="bg-white mx-4 rounded-md border border-gray-200 mt-5 mb-2">
        <View className="px-4 py-3 border-b border-gray-100">
          <Text className="text-xs font-bold text-gray-600">Withdrawal Details</Text>
        </View>
        {details.map((item, idx) => (
          <View key={idx}
            className={`flex-row items-center justify-between px-4 py-2 ${item.bold ? "border-t border-gray-100 bg-gray-50" : ""}`}>
            <Text className={`text-xs ${item.bold ? "font-bold" : ""} text-gray-700`}>{item.label}</Text>
            <Text className={`text-xs ${item.bold ? "font-bold " : ""} 
              ${item.color === "success" ? "text-green-700" : item.color === "danger" ? "text-red-600" : "text-gray-700"}`}>
              ₹{Math.abs(item.value).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      {/* Error Message (Failed Only) */}
      {isFailed && errorMsg && (
        <View className="mx-5 mb-2 mt-2 px-3 py-2 bg-red-50 border border-red-200 rounded-md">
          <Text className="text-xs text-red-600">{errorMsg}</Text>
        </View>
      )}

      {/* Status Timeline */}
      <View className="px-5 pt-1">
        {statusHistory.map((item, idx) => (
          <View key={idx} className="flex-row items-center py-1">
            {item.success
              ? <CheckCircleIcon color="#10B981" />
              : <ErrorCircleIcon color="#EF4444" />}
            <Text className="ml-2 text-xs text-gray-700">{item.status}</Text>
            <Text className="ml-2 text-xs text-gray-500">{item.date}</Text>
          </View>
        ))}
      </View>

      {/* Divider */}
      <View className="border-t border-gray-200 mt-6 mb-1" />

      {/* Help and Support Row */}
      <TouchableOpacity className="flex-row items-center justify-between px-4 py-3 bg-white">
        <View className="flex-row items-center">
          <QuestionIcon />
          <Text className="ml-2 text-base text-gray-700">Help and Support</Text>
        </View>
        <Text className="text-lg text-gray-400">{'>'}</Text>
      </TouchableOpacity>

      {/* Tax Invoice Row */}
      <TouchableOpacity className="flex-row items-center justify-between px-4 py-3 bg-white">
        <View className="flex-row items-center">
          <FileIcon />
          <Text className="ml-2 text-base text-gray-700">Tax Invoice</Text>
        </View>
        <Text className="text-lg text-gray-400">{'>'}</Text>
      </TouchableOpacity>
    </View>
</>
  );
};

export default WithdrawDetailScreen;
