import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Svg, Circle, Path } from 'react-native-svg';

const QuestionIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" stroke="#555" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Path d="M9.09 9a3 3 0 1 1 4.83 2.36c-.36.36-.82.65-1.22 1.11s-.59.83-.59 1.53M12 17h.01" />
  </Svg>
);

const HelpSupport = () => {
  return (
    <TouchableOpacity className="mx-5 px-4 mb-2 flex-row items-center justify-between border rounded-xl border-gray-200 pt-2 pb-2 bg-white">
      <View className="flex-row items-center">
        <QuestionIcon />
        <Text className="ml-2 text-base text-gray-700">Help and Support</Text>
      </View>
      <Text className="text-2xl text-gray-400">{'>'}</Text>
    </TouchableOpacity>
  );
};

export default HelpSupport;
