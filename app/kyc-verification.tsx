import KYCVerificationScreen from '@/components/wallet/KYCVerificationScreen'
import { Stack } from 'expo-router'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const KycVerification = () => {
  return (
    <>
    <Stack.Screen options={{ headerShown: false }} />
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
    <KYCVerificationScreen/>
    </SafeAreaView>
    </>
  )
}

export default KycVerification