import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import BalanceHeader from '../../components/wallet/BallanceHeader';
import walletService from '../../services/walletService';

export default function WithdrawHistoryScreen() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await walletService.getWithdrawHistory();
      if (response.success) {
        setHistory(response.data);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to fetch withdrawal history',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch withdrawal history',
      });
      console.error('Withdraw history error:', error);
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
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'approved':
        return 'text-blue-600 bg-blue-100';
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <BalanceHeader title="Withdrawal History" />
        <View className="flex-1 justify-center items-center bg-white">
          <ActivityIndicator size="large" color="#EF4444" />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <BalanceHeader title="Withdrawal History" />
      <ScrollView className="flex-1 bg-gray-50">
        <View className="p-4">
          {history.length === 0 ? (
            <View className="bg-white rounded-lg p-8 items-center">
              <Text className="text-gray-500 text-center">
                No withdrawal history found
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
                  <View className={`px-3 py-1 rounded-full ${getStatusColor(item.status)}`}>
                    <Text className="text-xs font-medium capitalize">
                      {item.status}
                    </Text>
                  </View>
                </View>

                {item.tdsAmount > 0 && (
                  <View className="mt-2 pt-2 border-t border-gray-100">
                    <Text className="text-gray-600 text-sm">
                      TDS: ₹{item.tdsAmount} ({item.tdsPercentage}%)
                    </Text>
                    {item.netAmount && (
                      <Text className="text-gray-600 text-sm">
                        Net Amount: ₹{item.netAmount}
                      </Text>
                    )}
                  </View>
                )}
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </>
  );
}