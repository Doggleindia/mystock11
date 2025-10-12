import { Stack, useLocalSearchParams } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { Circle, Path, Svg } from 'react-native-svg';
import BalanceHeader from "../../components/wallet/BallanceHeader";
import HelpSupport from '../../components/wallet/transaction/HelpSupport';
const CheckCircleIcon = ({ color = "#10B981" }) => (
  <Svg height="20" width="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Path d="m9 12 2 2 4-4" />
  </Svg>
);

export default function TransactionDetail() {
 const { transaction } = useLocalSearchParams();
console.log(transaction,"transaction");
  return (
    <>
    <Stack.Screen
      options={{
        headerShown: false, // 👈 hides the auto header
      }}
    />
        <BalanceHeader title="My Transactions" />
  <View className="flex-1 bg-white px-0 pt-0">
  {/* Top Section: Amount and Status */}
  <View className="flex-row items-center justify-between px-5 pt-8 pb-2 border-b border-gray-200">
    <View>
      <Text className="text-2xl font-bold text-green-700 mb-1">₹100</Text>
      <Text className="text-xs text-gray-500">Successful  01/05/2025, 03:22pm</Text>
    </View>
    <View className="bg-green-50 rounded-full p-2">
      <CheckCircleIcon />
    </View>
  </View>

  {/* Transaction ID Section */}
  <View className="flex-row items-center justify-between px-5 py-5">
    <View>
      <Text className="text-xs text-gray-400 mb-1">Transaction ID</Text>
      <Text className="text-sm font-semibold text-gray-800">1111111111111</Text>
    </View>
    <TouchableOpacity className="flex-row items-center px-2 py-1 border border-gray-300 rounded-md">
      <Text className="text-xs text-gray-600 ml-1">Copy</Text>
    </TouchableOpacity>
  </View>

  {/* Contest Details Card */}
  <View className="bg-white mx-5 rounded-xl shadow-sm border border-gray-200 mb-4">
    {/* Card Header */}
    <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100">
      <Text className="text-base font-semibold text-gray-800">Beignner Arena</Text>
      <Text className="text-gray-400">{'>'}</Text>
    </View>
    {/* Card Body */}
    <View className="flex-row px-4 py-3 items-center justify-between">
      <View>
        <Text className="text-xs text-gray-400 mb-1">Price Pool</Text>
        <Text className="text-xl font-bold text-gray-900">₹50,000</Text>
      </View>
      <View className="items-end">
        <Text className="text-xs text-gray-400 mb-1">Today</Text>
        <Text className="text-base font-bold text-gray-700">3:20 PM</Text>
      </View>
    </View>
    <View className="px-4 pb-4">
      <Text className="text-xs text-gray-500">1 Contest • 1 Portfolio</Text>
      <View className="flex-row justify-between mt-3 items-center">
        <Text className="text-xs text-gray-500">Won</Text>
        <View className="bg-green-100 px-3 py-1 rounded-md">
          <Text className="text-xs font-bold text-green-700">₹100</Text>
        </View>
      </View>
    </View>
  </View>

  {/* Help and Support */}
 <HelpSupport/>
</View>


    </>
  );
}
