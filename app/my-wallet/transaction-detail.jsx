import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Circle, Path, Svg } from 'react-native-svg';
import BalanceHeader from "../../components/wallet/BallanceHeader";
import HelpSupport from '../../components/wallet/transaction/HelpSupport';
import walletService from '../../services/walletService';

const CheckCircleIcon = ({ color = "#10B981" }) => (
  <Svg height="20" width="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Path d="m9 12 2 2 4-4" />
  </Svg>
);

export default function TransactionDetail() {
  const { transactionId } = useLocalSearchParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (transactionId) {
      fetchTransactionDetail();
    }
  }, [transactionId]);

  const fetchTransactionDetail = async () => {
    try {
      setLoading(true);
      const response = await walletService.getTransactionDetail(transactionId);
      if (response.success) {
        setTransaction(response.data);
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load transaction');
      console.error('Error fetching transaction:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <BalanceHeader title="My Transactions" />
        <View className="flex-1 bg-white items-center justify-center">
          <ActivityIndicator size="large" color="#ef4444" />
        </View>
      </>
    );
  }

  if (error || !transaction) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <BalanceHeader title="My Transactions" />
        <View className="flex-1 bg-white items-center justify-center">
          <Text className="text-red-500">{error || 'Transaction not found'}</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <BalanceHeader title="My Transactions" />
      <View className="flex-1 bg-white px-0 pt-0">
        {/* Top Section: Amount and Status */}
        <View className="flex-row items-center justify-between px-5 pt-8 pb-2 border-b border-gray-200">
          <View>
            <Text className="text-2xl font-bold text-green-700 mb-1">₹{Math.abs(transaction.amount).toFixed(2)}</Text>
            <Text className="text-xs text-gray-500">{transaction.status || 'Completed'} {formatDate(transaction.createdAt)}, {formatTime(transaction.createdAt)}</Text>
          </View>
          <View className="bg-green-50 rounded-full p-2">
            <CheckCircleIcon />
          </View>
        </View>

        {/* Transaction ID Section */}
        <View className="flex-row items-center justify-between px-5 py-5">
          <View>
            <Text className="text-xs text-gray-400 mb-1">Transaction ID</Text>
            <Text className="text-sm font-semibold text-gray-800">{transaction._id}</Text>
          </View>
          <TouchableOpacity className="flex-row items-center px-2 py-1 border border-gray-300 rounded-md">
            <Text className="text-xs text-gray-600 ml-1">Copy</Text>
          </TouchableOpacity>
        </View>

        {/* Before/After Balance */}
        {transaction.beforeBalance != null && transaction.afterBalance != null && (
          <View className="bg-blue-50 mx-5 rounded-lg p-4 mb-4">
            <View className="flex-row justify-between mb-2">
              <Text className="text-sm text-gray-700">Before Balance</Text>
              <Text className="text-sm font-semibold">₹{transaction.beforeBalance.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-gray-700">After Balance</Text>
              <Text className="text-sm font-semibold">₹{transaction.afterBalance.toFixed(2)}</Text>
            </View>
          </View>
        )}

        {/* Transaction Details */}
        <View className="bg-white mx-5 rounded-xl shadow-sm border border-gray-200 mb-4">
          <View className="px-4 py-3 border-b border-gray-100">
            <Text className="text-sm font-semibold text-gray-800">Transaction Details</Text>
          </View>
          <View className="px-4 py-3">
            <View className="flex-row justify-between mb-2">
              <Text className="text-xs text-gray-500">Type</Text>
              <Text className="text-xs font-medium text-gray-800">{transaction.txnType || 'N/A'}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-xs text-gray-500">Purpose</Text>
              <Text className="text-xs font-medium text-gray-800">{transaction.purpose || 'N/A'}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-xs text-gray-500">Currency</Text>
              <Text className="text-xs font-medium text-gray-800">{transaction.currency || 'INR'}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-xs text-gray-500">Status</Text>
              <Text className="text-xs font-medium text-gray-800">{transaction.status || 'Completed'}</Text>
            </View>
          </View>
        </View>

        {/* Help and Support */}
        <HelpSupport />
      </View>
    </>
  );
}
