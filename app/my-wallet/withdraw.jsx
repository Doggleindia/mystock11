import { Stack } from 'expo-router';
import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, ScrollView, Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import BalanceHeader from '../../components/wallet/BallanceHeader';
import walletService from '../../services/walletService';

export default function WithdrawScreen() {
  const [amount, setAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('upi'); // 'upi' or 'bank'
  const [upiId, setUpiId] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [ifscCode, setIfscCode] = useState('');
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

    if (withdrawMethod === 'upi' && !upiId) {
      Toast.show({
        type: 'error',
        text1: 'Missing UPI ID',
        text2: 'Please enter your UPI ID',
      });
      return;
    }

    if (withdrawMethod === 'bank' && (!bankAccount || !ifscCode)) {
      Toast.show({
        type: 'error',
        text1: 'Missing Details',
        text2: 'Please enter bank account number and IFSC code',
      });
      return;
    }

    try {
      setLoading(true);
      const payload = {
        amount: parseFloat(amount),
      };

      if (withdrawMethod === 'upi') {
        payload.upiId = upiId;
      } else {
        payload.bankAccountNumber = bankAccount;
        payload.ifscCode = ifscCode;
      }

      const response = await walletService.withdraw(payload);

      if (response.success) {
        Toast.show({
          type: 'success',
          text1: 'Withdrawal Initiated',
          text2: response.message || 'Amount will be transferred shortly',
        });
        // Reset form
        setAmount('');
        setUpiId('');
        setBankAccount('');
        setIfscCode('');
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

        {/* Withdrawal Method Selection */}
        <View className="mt-6">
          <Text className="text-gray-700 font-medium mb-3">Withdrawal Method</Text>

          {/* UPI Option */}
          <TouchableOpacity
            onPress={() => setWithdrawMethod('upi')}
            className={`border-2 rounded-lg p-4 mb-3 ${
              withdrawMethod === 'upi' ? 'border-green-500 bg-green-50' : 'border-gray-200'
            }`}
            disabled={loading}
          >
            <View className="flex-row items-center">
              <View
                className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                  withdrawMethod === 'upi'
                    ? 'border-green-500 bg-green-500'
                    : 'border-gray-300'
                }`}
              >
                {withdrawMethod === 'upi' && (
                  <Text className="text-white text-xs font-bold">✓</Text>
                )}
              </View>
              <Text
                className={`ml-3 font-semibold ${
                  withdrawMethod === 'upi' ? 'text-green-600' : 'text-gray-700'
                }`}
              >
                UPI Transfer
              </Text>
            </View>

            {withdrawMethod === 'upi' && (
              <TextInput
                className="mt-3 border border-gray-300 rounded px-3 py-2"
                placeholder="Enter UPI ID (e.g., yourname@upi)"
                placeholderTextColor="#999"
                value={upiId}
                onChangeText={setUpiId}
                editable={!loading}
              />
            )}
          </TouchableOpacity>

          {/* Bank Transfer Option */}
          <TouchableOpacity
            onPress={() => setWithdrawMethod('bank')}
            className={`border-2 rounded-lg p-4 ${
              withdrawMethod === 'bank' ? 'border-green-500 bg-green-50' : 'border-gray-200'
            }`}
            disabled={loading}
          >
            <View className="flex-row items-center">
              <View
                className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                  withdrawMethod === 'bank'
                    ? 'border-green-500 bg-green-500'
                    : 'border-gray-300'
                }`}
              >
                {withdrawMethod === 'bank' && (
                  <Text className="text-white text-xs font-bold">✓</Text>
                )}
              </View>
              <Text
                className={`ml-3 font-semibold ${
                  withdrawMethod === 'bank' ? 'text-green-600' : 'text-gray-700'
                }`}
              >
                Bank Transfer
              </Text>
            </View>

            {withdrawMethod === 'bank' && (
              <View className="mt-3 space-y-2">
                <TextInput
                  className="border border-gray-300 rounded px-3 py-2 mb-2"
                  placeholder="Account Number"
                  placeholderTextColor="#999"
                  value={bankAccount}
                  onChangeText={setBankAccount}
                  editable={!loading}
                />
                <TextInput
                  className="border border-gray-300 rounded px-3 py-2"
                  placeholder="IFSC Code"
                  placeholderTextColor="#999"
                  value={ifscCode}
                  onChangeText={setIfscCode}
                  editable={!loading}
                />
              </View>
            )}
          </TouchableOpacity>
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
    </>
  );
}
