import React from 'react'
import { Text, View } from 'react-native'

const ContestRules = () => {
  return (
    <View className="mt-4 mx-4">
      <View className="bg-white rounded-lg p-4 shadow-sm">
        <Text className="text-lg font-semibold mb-2">📜 Contest Rules</Text>
        <View className="space-y-2">
          <Text className="text-gray-700">1. Pick 11 stocks in NIFTY50 or 7-9 stocks in BankNifty.</Text>
          <Text className="text-gray-700">2. Choose 1 Captain & 1 Vice Captain.</Text>
          <Text className="text-gray-700">3. Portfolio locks at 9:15 AM, cannot be changed during the contest.</Text>
          <Text className="text-gray-700">4. Points based on real-time stock price movement.</Text>
          <Text className="text-gray-700">5. Entry fees and withdrawal include GST as per government rules.</Text>
        </View>
      </View>
    </View>
  )
}

export default ContestRules