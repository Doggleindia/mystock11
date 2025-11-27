import React from "react";
import { ScrollView, Text, View } from "react-native";

const currency = (n) =>
  typeof n === "number" && !Number.isNaN(n)
    ? `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`
    : "₹0";

const percent = (n) =>
  typeof n === "number" && !Number.isNaN(n)
    ? `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`
    : "0.00%";

export default function MyPortfolio({ portfolio }) {
  const team = Array.isArray(portfolio?.team) ? portfolio.team : [];
  const position = portfolio?.totalPoints ?? 0;
  const pnlPercentage = portfolio?.pnlPercentage ?? 0;
  const pnlClass = pnlPercentage >= 0 ? "text-green-600" : "text-red-500";

  if (!portfolio) {
    return (
      <View className="bg-white mb-2 rounded-lg border border-gray-200 p-4">
        <Text className="text-gray-500 text-center">
          Portfolio data will appear here once available.
        </Text>
      </View>
    );
  }

  return (
    <View className="bg-white mb-2 rounded-lg border border-gray-200">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100">
        <View className="flex-row items-center space-x-2">
          <Text className="text-xs text-gray-500">Points</Text>
          <Text className="font-bold text-black text-base">{position}</Text>
        </View>
        <View className="flex-row items-center space-x-2">
          <Text className="text-xs text-gray-500">P&amp;L</Text>
          <Text className={`font-bold text-base ${pnlClass}`}>
            {percent(pnlPercentage)}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between px-4 py-4 bg-gray-50 border-b border-gray-100">
        <Text className="text-md font-semibold text-gray-600 flex-1">Stock</Text>
        <Text className="text-md font-semibold text-gray-600 w-28 text-center">
          Buy Price
        </Text>
        <Text className="text-md font-semibold text-gray-600 w-16 text-center">
          Qty
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {team.map((member) => (
          <View
            key={member._id || member.stockSymbol}
            className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100"
          >
            <View className="flex-1">
              <View className="flex-row items-center space-x-2">
                <Text className="text-sm text-black">{member.stockSymbol}</Text>
                {member.isCaptain && (
                  <Text className="text-xs text-red-500 font-semibold">C</Text>
                )}
                {member.isViceCaptain && (
                  <Text className="text-xs text-gray-600 font-semibold">
                    VC
                  </Text>
                )}
              </View>
              <Text className="text-xs text-gray-500">
                {member.companyName || member.stockSymbol}
              </Text>
            </View>
            <View className="w-28 items-center">
              <Text className="text-sm text-gray-900">
                {currency(member.buyPrice)}
              </Text>
            </View>
            <Text className="w-16 text-sm text-black text-center">
              {member.quantity ?? 0}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
