import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import walletService from "../../services/walletService";
import DetailsCard from "./DetailsCard";

interface MainContentProps {
  onAmountChange?: (amount: number) => void;
}

const MainContent = forwardRef(({ onAmountChange }: MainContentProps, ref) => {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [manualAmount, setManualAmount] = useState('');
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);

  useImperativeHandle(ref, () => ({
    refreshBalance: fetchBalance,
  }));

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      setLoading(true);
      const response = await walletService.getBalance();
      const balance = response.walletBalance ?? response.wallet ?? 0;
      setWalletBalance(balance);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      setWalletBalance(0);
    } finally {
      setLoading(false);
    }
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setManualAmount('');
    setShowManualInput(false);
    if (onAmountChange) {
      onAmountChange(amount);
    }
  };

  const handleManualAmountSubmit = () => {
    const amount = parseFloat(manualAmount);
    if (!isNaN(amount) && amount > 0) {
      setSelectedAmount(amount);
      if (onAmountChange) {
        onAmountChange(amount);
      }
      setShowManualInput(false);
    }
  };

  return (
    <ScrollView className="flex-1 px-4">
      {/* Current Balance */}
      <View className="flex-row justify-between mt-4 mb-4">
        <Text className="text-gray-700 font-medium">Current Balance</Text>
        <Text className="text-gray-900 font-bold text-lg">₹{Number(walletBalance).toFixed(2)}</Text>
      </View>

      {/* Add Amount */}
      <View className="mt-4">
        <Text className="text-gray-600 text-sm mb-2">Select Amount</Text>
        <View className="flex-row gap-2 mb-3">
          {[100, 200, 500, 1000].map((amt) => (
            <TouchableOpacity
              key={amt}
              onPress={() => handleAmountSelect(amt)}
              className={`flex-1 border rounded-lg py-2 ${selectedAmount === amt && !showManualInput ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}
            >
              <Text className={`text-center font-semibold ${selectedAmount === amt && !showManualInput ? 'text-green-700' : 'text-gray-700'}`}>₹{amt}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Manual Amount Input */}
        {!showManualInput && (
          <TouchableOpacity
            onPress={() => setShowManualInput(true)}
            className="border border-dashed border-gray-400 rounded-lg py-2 mb-3"
          >
            <Text className="text-center text-gray-500 font-semibold">+ Custom Amount</Text>
          </TouchableOpacity>
        )}

        {showManualInput && (
          <View className="flex-row gap-2 mb-3">
            <TextInput
              className="flex-1 border border-green-500 rounded-lg px-3 py-2 text-sm"
              placeholder="Enter custom amount"
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
              value={manualAmount}
              onChangeText={setManualAmount}
            />
            <TouchableOpacity
              onPress={handleManualAmountSubmit}
              disabled={!manualAmount || parseFloat(manualAmount) <= 0}
              className="bg-green-600 rounded-lg px-4 py-2 justify-center"
            >
              <Text className="text-white font-semibold text-sm">Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowManualInput(false);
                setManualAmount('');
              }}
              className="border border-gray-300 rounded-lg px-4 py-2 justify-center"
            >
              <Text className="text-gray-700 font-semibold text-sm">Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Details */}
     <DetailsCard amount={selectedAmount} />


      {/* Offer section */}
      <View className="mt-6 mb-20">
        <View className="flex-row justify-between">
          <Text className="font-semibold text-gray-700">Offer</Text>
          <TouchableOpacity>
            <Text className="text-green-600 text-sm">View all</Text>
          </TouchableOpacity>
        </View>

        {/* Offer cards */}
        {[1, 2, 3, 4].map((item) => (
          <View
            key={item}
            className="flex-row justify-between items-center mt-3 border border-gray-200 rounded-lg px-3 py-2"
          >
            <View>
              <Text className="text-gray-700 font-medium">
                First Time Bonus
              </Text>
              <Text className="text-gray-400 text-xs">Up to 50%</Text>
            </View>
            <TouchableOpacity className="bg-green-100 px-3 py-1 rounded">
              <Text className="text-green-600 font-medium">Apply</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
});

MainContent.displayName = "MainContent";
export default MainContent;
