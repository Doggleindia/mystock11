import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Svg, Path, Circle } from 'react-native-svg';
import BalanceHeader from '../../components/wallet/BallanceHeader';
// Icons
const CheckCircleIcon = ({ color = "#10B981" }) => (
  <Svg height="24" width="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10"></Circle>
    <Path d="m9 12 2 2 4-4"></Path>
  </Svg>
);

const MinusCircleIcon = ({ color = "#6B7280" }) => (
  <Svg height="24" width="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10"></Circle>
    <Path d="M8 12h8"></Path>
  </Svg>
);

// Tab Button Component
const TabButton = ({ label, isActive, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className={`px-4 py-2 rounded-full ${
      isActive ? 'bg-red-500' : 'bg-white border border-gray-300'
    }`}
  >
    <Text className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-600'}`}>
      {label}
    </Text>
  </TouchableOpacity>
);

// Filter Chip Component
const FilterChip = ({ label, isActive, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className={`px-4 py-2 rounded-full mr-2 ${
      isActive ? 'bg-white border-2 border-red-500' : 'bg-gray-100 border border-gray-300'
    }`}
  >
    <Text className={`text-sm font-medium ${isActive ? 'text-red-500' : 'text-gray-600'}`}>
      {label}
    </Text>
  </TouchableOpacity>
);

// Transaction Item Component
const TransactionItem = ({ type, amount, time, contest }) => {
  const isWinning = type === 'Winnings';
  const isPositive = amount > 0;
  
  return (
    <View className="bg-white rounded-lg p-4 mb-2 flex-row items-center justify-between border border-gray-100">
      <View className="flex-row items-center flex-1">
        <View className="mr-3">
          {isWinning ? (
            <CheckCircleIcon color="#10B981" />
          ) : (
            <MinusCircleIcon color="#6B7280" />
          )}
        </View>
        <View className="flex-1">
          <Text className={`text-sm font-semibold ${isWinning ? 'text-green-600' : 'text-gray-800'}`}>
            {type}
          </Text>
          <Text className="text-xs text-gray-500 mt-0.5">{time} | {contest}</Text>
        </View>
      </View>
      <Text className={`text-base font-bold ${isPositive ? 'text-green-600' : 'text-gray-800'}`}>
        {isPositive ? '+' : ''}{amount}
      </Text>
    </View>
  );
};

// Date Section Header
const DateHeader = ({ date }) => (
  <View className="py-2 mb-2">
    <Text className="text-xs text-gray-500 font-medium">{date}</Text>
  </View>
);

// Main Component
export default function MyTransactionsScreen() {
  const [activeTab, setActiveTab] = useState('Contest');
  const [activeFilter, setActiveFilter] = useState('Entry Paid');

  // Sample data grouped by date
  const transactionData = [
    {
      date: '01 August 2025',
      transactions: [
        { id: '1', type: 'Entry Paid', amount: -39, time: '02:25 PM', contest: 'Pro Arian' },
        { id: '2', type: 'Winnings', amount: 50, time: '02:25 PM', contest: 'Pro Arian' },
      ]
    },
    {
      date: '30 July 2025',
      transactions: [
        { id: '3', type: 'Entry Paid', amount: -39, time: '02:25 PM', contest: 'Pro Arian' },
        { id: '4', type: 'Entry Paid', amount: -39, time: '02:25 PM', contest: 'Pro Arian' },
        { id: '5', type: 'Winnings', amount: 50, time: '02:25 PM', contest: 'Pro Arian' },
      ]
    }
  ];

  const tabs = ['Contest', 'Withdrawals', 'Deposits', 'TDS'];
  const filters = ['Entry Paid', 'Winnings'];

  return (
    <>
    <Stack.Screen
      options={{
        headerShown: false, // 👈 hides the auto header
      }}
    />
        <BalanceHeader title="My Transactions" />
    <View >
      {/* Tab Navigation */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {tabs.map((tab) => (
              <TabButton
                key={tab}
                label={tab}
                isActive={activeTab === tab}
                onPress={() => setActiveTab(tab)}
              />
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Filter Chips */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row">
            {filters.map((filter) => (
              <FilterChip
                key={filter}
                label={filter}
                isActive={activeFilter === filter}
                onPress={() => setActiveFilter(filter)}
              />
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Transaction List */}
      <ScrollView className="flex-1 px-4 pt-3">
        {transactionData.map((section, index) => (
          <View key={index} className="mb-4">
            <DateHeader date={section.date} />
            {section.transactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                type={transaction.type}
                amount={transaction.amount}
                time={transaction.time}
                contest={transaction.contest}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
    </>
  );
}
