import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function Header({title}: {title: string}) {

  return (
      <LinearGradient
          // 👇 Your gradient
          colors={["#0E1116", "#4F0905", "#0E1116"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          className="px-4 mt-6"
        >
      <View >
              <View className="py-5 px-2  flex-row items-center">
                <Pressable onPress={() => router.back()} className="mr-3">
                  <Ionicons name="arrow-back" size={24} color="white" />
                </Pressable>
                <View>
                  <Text className="text-white text-lg font-semibold">{title}</Text>
                </View>
              </View>
            </View>
            </LinearGradient>
  );
}
