
import WalletScreen from '@/components/wallet/WalletScreen';
import { router, Stack } from 'expo-router';
import React from 'react';

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
    <WalletScreen/>
    </>
  )
}

export default wallet