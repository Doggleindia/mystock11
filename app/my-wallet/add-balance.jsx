import React from 'react';
import { router, Stack } from 'expo-router';
import Header from '../../components/wallet/BallanceHeader';
import Footer from '../../components/wallet/Footer';
import MainContent from '../../components/wallet/MainContent';
import { View } from 'react-native';
const AddBalance = () => {
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

export default AddBalance