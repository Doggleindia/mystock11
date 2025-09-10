import React from 'react';
import { ScrollView, Text, View } from 'react-native';

interface WinningsRow {
  rank: string;
  amount: number;
}

const WinningsTable = () => {
  const winnings: WinningsRow[] = [
    { rank: "#1", amount: 25000 },
    { rank: "#2", amount: 15000 },
    { rank: "#3", amount: 10000 },
    { rank: "#4-5", amount: 5000 },
    { rank: "#6-10", amount: 2000 },
    { rank: "#11-20", amount: 1000 },
    { rank: "#21-50", amount: 500 },
  ];

  return (
    <View className="mx-4 mt-4">
      <ScrollView className="bg-white rounded-lg">
        {winnings.map((row, index) => (
          <View 
            key={row.rank}
            className={`flex-row justify-between items-center p-4 ${
              index !== winnings.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            <Text className="text-gray-700 font-medium">{row.rank}</Text>
            <Text className="text-gray-900 font-bold">₹{row.amount.toLocaleString('en-IN')}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default WinningsTable;
