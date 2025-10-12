import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import { Svg, Path, Circle } from 'react-native-svg';

export default function TransactionCard({ tx, onPress }) {
  const isPositive = tx.amount > 0;
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.75}>
      <View className="flex-row items-center justify-between px-4 py-4 bg-white border-b-2 border-gray-100">
        <View className="flex-row items-center flex-1">
          {/* Icon logic can be extended for Withdrawals, Deposits, TDS */}
          <View>
            {/* Render icon based on tx.type/subtype */}
            {/* For simplicity, use your icons for now */}
          </View>
          <View className="ml-2">
            <Text className="text-xs font-semibold text-gray-700">{tx.subtype || tx.type}</Text>
            <Text className="text-[11px] text-gray-400">{tx.time}{tx.contest ? ` | ${tx.contest}` : ''}</Text>
          </View>
        </View>
        <Text className={`text-xs font-bold ${isPositive ? 'text-green-600' : 'text-gray-700'}`}>
          {isPositive ? '+' : ''}{tx.amount}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
