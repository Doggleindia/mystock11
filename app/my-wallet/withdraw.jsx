import { Stack } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import BalanceHeader from '../../components/wallet/BallanceHeader';
import walletService from '../../services/walletService';

export default function WithdrawScreen() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    // Validation
    if (!amount || parseFloat(amount) <= 0) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Amount',
        text2: 'Please enter a valid withdrawal amount',
      });
      return;
    }

    try {
      setLoading(true);
      const payload = {
        amount: parseFloat(amount),
      };

      const response = await walletService.withdraw(payload);

      if (response.success) {
        Toast.show({
          type: 'success',
          text1: 'Withdrawal Request Submitted',
          text2: response.message || 'Your withdrawal request has been submitted',
        });
        // Reset form
        setAmount('');
        // Navigate to withdrawal history
        router.push('/my-wallet/withdraw-history');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Withdrawal Failed',
          text2: response.message || 'Invalid withdrawal amount',
        });
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Withdrawal failed';

      if (/insufficient/i.test(message)) {
        Alert.alert(
          'Insufficient Balance',
          'You do not have enough balance to withdraw this amount.',
        );
      } else {
        Toast.show({
          type: 'error',
          text1: 'Withdrawal Failed',
          text2: message,
        });
      }
      console.error('Withdrawal error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
      <BalanceHeader title="Withdraw Money" />
      <ScrollView className="flex-1 bg-white px-4">
        {/* Amount Input */}
        <View className="mt-6">
          <Text className="text-gray-700 font-medium mb-2">Withdrawal Amount</Text>
          <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
            <Text className="text-gray-600 font-medium">₹</Text>
            <TextInput
              className="flex-1 ml-2 text-lg font-semibold"
              placeholder="Enter amount"
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
              editable={!loading}
            />
          </View>
        </View>

        {/* Info Box */}
        <View className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <Text className="text-blue-800 text-sm">
            <Text className="font-semibold">Note: </Text>
            Withdrawal will be processed within 24-48 hours. TDS applicable on winnings will be deducted as per rules.
          </Text>
        </View>

        {/* Withdraw Button */}
        <TouchableOpacity
          onPress={handleWithdraw}
          disabled={loading || !amount}
          className={`mt-6 rounded-lg py-3 mb-8 ${
            loading || !amount ? 'bg-gray-400' : 'bg-red-500'
          }`}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-center text-white font-semibold text-lg">
              Withdraw ₹{amount || '0'}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
      </SafeAreaView>
    </>
  );
}
