import StockAbout from '@/components/stock-detail/StockAbout';
import StockDetailCard from '@/components/stock-detail/StockDetailCard';
import StockDetailHeader from '@/components/stock-detail/StockDetailHeader';
import StockGraph from '@/components/stock-detail/StockGraph';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';

// Sample data - replace with real data
const mockGraphData = {
  data: [2030.15, 2025.80, 2028.45, 2035.20, 2030.50, 2040.75],
  labels: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00']
};

const mockStockDescription = `HDFC Bank Limited is an Indian banking and financial services company headquartered in Mumbai. It is India's largest private sector bank by assets and by market capitalization. It provides a wide range of banking services including retail banking, wholesale banking, and treasury operations.`;

export default function StockDetailScreen() {
  const params = useLocalSearchParams();
  const { symbol } = params;

  return (
    <>
      <Stack.Screen
          options={{
          headerShown: false,
        }}
      />
      <StockDetailHeader stocktitle={symbol as string}/>
      <ScrollView className="flex-1 bg-gray-50 p-4">
        <StockDetailCard
          stockName={symbol as string}
          currentPrice="2,030.50"
          dayRange={{
            low: "2,025.80",
            high: "2,040.75"
          }}
          lastTraded="2023-09-21 15:42:09"
          volume="1,777,878"
        />

        <StockGraph 
          data={mockGraphData.data}
          labels={mockGraphData.labels}
        />

        <View className="h-4" />

        <StockAbout 
          description={mockStockDescription}
        />
      </ScrollView>
    </>
  );
}
