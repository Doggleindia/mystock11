import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
interface Props {
  title: string;
}
const Header = ({title}:Props) => {
  return (
    <View className="bg-[#EA484F] mt-8">
          <View className="py-4 px-2  flex-row items-center">
            <Pressable onPress={() => router.back()} className="mr-3">
              <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>
            <View>
              <Text className="text-white text-lg font-semibold">{title}</Text>
            </View>
          </View>
        </View>
  )
}

export default Header