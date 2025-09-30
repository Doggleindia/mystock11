import Header from '@/components/wallet/BallanceHeader';
import Footer from '@/components/wallet/Footer';
import MainContent from '@/components/wallet/MainContent';
import { router, Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

const wallet = () => {
const handleJoin = () => {
    router.push('/kyc-verification');
  }
  return (
    <>
    <Stack.Screen
      options={{
        headerShown: false, // 👈 hides the auto header
      }}
    />
    <View className="flex-1 bg-white">
      <Header  title='Add Balance'/>
      <MainContent />
      <Footer />
    </View>
    </>
  )
}

export default wallet