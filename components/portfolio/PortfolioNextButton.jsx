import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router';

const PortfolioNextButton = ({
  timeLeft = "1h : 47m",
  endTime = "2:20 PM",
  entryFee = 50,
}) => {
 
  const handleJoin = () => {
    router.push('/create-portfolio');
  };
  return (
    <View className="bg-white px-6 py-3 border-t border-gray-100">
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-red-600 font-bold text-base">{timeLeft}</Text>
          <Text className="text-gray-500 text-xs">{endTime}</Text>
        </View>
        <TouchableOpacity
          onPress={handleJoin}
          className="bg-green-600 px-6 py-2 rounded"
        >
          <Text className="text-white font-semibold">NEXT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PortfolioNextButton