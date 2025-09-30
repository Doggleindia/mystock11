import React from "react";
import { View, Text, ScrollView } from "react-native";
const live_stocks = [
  { name: "RELIANCE", value: 2540.5, change: "+30.10 (1.20%)", positive: true },
  { name: "HDFCBANK", value: 3000.25, change: "-15.35 (0.75%)", positive: false },
  { name: "TCS", value: 3150.75, change: "+22.45 (0.71%)", positive: true },
  { name: "INFOSYS", value: 1627.85, change: "+10.65 (0.62%)", positive: true },
  { name: "Kotak Mahindra", value: 1811.2, change: "+27.65 (1.55%)", positive: true },
  { name: "INFI", value: 6199.5, change: "-45.20 (0.73%)", positive: false },
  { name: "ITC", value: 400.1, change: "+5.30 (1.34%)", positive: true },
  { name: "LT", value: 2000, change: "+15.60 (0.75%)", positive: true },
  { name: "MARUTI", value: 8200, change: "-120.95 (1.45%)", positive: false },
  { name: "AXISBANK", value: 900.75, change: "+4.55 (0.51%)", positive: true },
  { name: "HINDALCO", value: 450.85, change: "+4.15 (0.93%)", positive: true },
];
const currency = (n) => `₹${n.toLocaleString("en-IN")}`;
const LiveMarket = () => {
  return (
   <>
    <View className="bg-white  mb-2 rounded-lg border border-gray-200">
      {/* Position and P&L Summary */}
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100">
        <View className="flex-row items-center space-x-2">
          <Text className="text-xs text-gray-500">Position</Text>
          <Text className="font-bold text-black text-base">12</Text>
        </View>
        <View className="flex-row items-center space-x-2">
          <Text className="text-xs text-gray-500">P&amp;L</Text>
          <Text className="font-bold text-green-500 text-base">+1.50%</Text>
        </View>
      </View>
      {/* Stock Table Headers */}
      <View className="flex-row justify-between px-4 py-4 bg-gray-50 border-b border-gray-100">
        <Text className="text-md font-semibold text-gray-600 flex-1">NIFTY 50</Text>
        <Text className="text-md font-semibold text-gray-600 w-40 text-right">Performance</Text>
      </View>
      {/* Stock Table Rows */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {live_stocks.map((s, idx) => (
          <View key={idx} className="flex-row items-center justify-between px-4 py-2 border-b border-gray-100">
            <Text className="text-sm text-black flex-1">{s.name}</Text>
            <View className="w-40 items-end">
              <Text className={`text-sm ${s.positive ? "text-green-700" : "text-red-500"}`}>{currency(s.value)}</Text>
              <Text className="text-xs text-gray-500">{s.change}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
   </>
  )
}

export default LiveMarket