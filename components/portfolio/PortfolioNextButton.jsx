import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const PortfolioNextButton = ({
  timeLeft = "1h : 47m",
  endTime = "2:20 PM",
  entryFee = 50,
  url = "create-portfolio",
  label = "NEXT",
  disabled = false,
  onPress,
}) => {
 
  const handleJoin = () => {
    if (disabled) return;
    if (onPress) {
      onPress();
      return;
    }
    router.push(url ||'create-portfolio');
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
          disabled={disabled}
          className={`px-6 py-2 rounded ${
            disabled ? "bg-green-300" : "bg-green-600"
          }`}
        >
          <Text className="text-white font-semibold">{label}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PortfolioNextButton