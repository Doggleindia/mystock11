import Header from "@/components/wallet/BallanceHeader";
import Footer from "@/components/wallet/Footer";
import MainContent from "@/components/wallet/MainContent";
import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddBalance() {
  return (
    <>
    <Stack.Screen
      options={{
        headerShown: false, // 👈 hides the auto header
      }}
    />
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
      <View className="flex-1 bg-white">
        <Header />
        <MainContent />
        <Footer />
      </View>
    </SafeAreaView>
    </>
  );
}
