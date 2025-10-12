import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
export default function ProfilePhotoScreen() {
  return (
    <View className="flex-1 bg-white px-5 pt-7">
      <Text className="text-xs text-gray-600 mb-2">Profile Photo</Text>
      <Text className="text-xs text-gray-500 mb-5">Upload a picture of yourself. Accepted formats: JPG, PNG.</Text>
      <TouchableOpacity className="bg-gray-200 rounded-lg py-3 items-center mb-3">
        <Text className="text-base text-gray-700 font-bold">Upload from Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-gray-200 rounded-lg py-3 items-center">
        <Text className="text-base text-gray-700 font-bold">From Document</Text>
      </TouchableOpacity>
    </View>
  );
}
