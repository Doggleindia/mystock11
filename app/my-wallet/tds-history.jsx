import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import BalanceHeader from '../../components/wallet/BallanceHeader';
import walletService from '../../services/walletService';

export default function TDSHistoryScreen() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await walletService.getTDSHistory();
      if (response.success) {
        setHistory(response.data);
        setTotal(response.total);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to fetch TDS history',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch TDS history',
      });
      console.error('TDS history error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <BalanceHeader title="TDS History" />
        <View className="flex-1 justify-center items-center bg-white">
          <ActivityIndicator size="large" color="#EF4444" />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <BalanceHeader title="TDS History" />
      <ScrollView className="flex-1 bg-gray-50">
        <View className="p-4">
          {total > 0 && (
            <View className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
              <Text className="text-gray-600 text-sm">Total TDS Deducted</Text>
              <Text className="text-gray-900 font-bold text-xl">
                ₹{history.reduce((sum, item) => sum + item.tdsAmount, 0)}
              </Text>
            </View>
          )}

          {history.length === 0 ? (
            <View className="bg-white rounded-lg p-8 items-center">
              <Text className="text-gray-500 text-center">
                No TDS history found
              </Text>
            </View>
          ) : (
            history.map((item) => (
              <View key={item._id} className="bg-white rounded-lg p-4 mb-3 border border-gray-200">
                <View className="flex-row justify-between items-start mb-2">
                  <View>
                    <Text className="text-gray-900 font-semibold text-lg">
                      ₹{item.amount}
                    </Text>
                    <Text className="text-gray-500 text-sm">
                      {formatDate(item.createdAt)}
                    </Text>
                  </View>
                  <View className="bg-red-100 px-3 py-1 rounded-full">
                    <Text className="text-red-600 text-xs font-medium">
                      TDS: ₹{item.tdsAmount}
                    </Text>
                  </View>
                </View>

                <View className="mt-2 pt-2 border-t border-gray-100">
                  <Text className="text-gray-600 text-sm">
                    TDS Percentage: {item.tdsPercentage}%
                  </Text>
                  <Text className="text-gray-600 text-sm">
                    Net Amount Received: ₹{item.netAmount}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </>
  );
}