import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import KYCVerificationScreen from '@/components/wallet/KYCVerificationScreen'

const KycVerification = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
    <KYCVerificationScreen/>
    </SafeAreaView>
  )
}

export default KycVerification