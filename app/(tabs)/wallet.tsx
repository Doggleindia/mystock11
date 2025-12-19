
import WalletScreen from '@/components/wallet/WalletScreen';
import { router, Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const wallet = () => {
const handleJoin = () => {
    router.push('/kyc-verification');
  }
  return (
    <>
    <Stack.Screen
      options={{
        headerShown: false,
      }}
    />
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
    <WalletScreen/>
    </SafeAreaView>
    </>
  )
}

export default wallet