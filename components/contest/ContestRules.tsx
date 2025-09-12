import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'

const ContestRules = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <View className="mt-4 mx-4">
      <View className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Pressable 
          onPress={() => setIsExpanded(!isExpanded)}
          className="p-4 flex-row justify-between items-center"
        >
          <View className="flex-row items-center">
            <Text className="text-lg font-semibold">Contest Rules</Text>
          </View>
          <Ionicons 
            name={isExpanded ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#666"
          />
        </Pressable>

        {isExpanded && (
          <View className="px-4 pb-4 border-t border-gray-100">
            <View className="space-y-2.5 mt-3">
              <Text className="text-gray-700">• Pick 11 stocks in NIFTY50 or 7-9 stocks in BankNifty.</Text>
              <Text className="text-gray-700">• Choose 1 Captain & 1 Vice Captain.</Text>
              <Text className="text-gray-700">• Portfolio locks at 9:15 AM, cannot be changed during the contest.</Text>
              <Text className="text-gray-700">• Points based on real-time stock price movement.</Text>
              <Text className="text-gray-700">• Entry fees and withdrawal include GST as per government rules.</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}

export default ContestRules