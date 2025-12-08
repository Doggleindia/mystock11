
import WalletScreen from '@/components/wallet/WalletScreen';
import { router, Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const wallet = () => {
const handleJoin = () => {
    router.push('/kyc-verification');
  }
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
    <Stack.Screen
      options={{
        headerShown: false,
      }}
    />
    <WalletScreen/>
    </SafeAreaView>
  )
}

export default wallet