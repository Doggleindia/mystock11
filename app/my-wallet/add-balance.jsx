import { Stack } from 'expo-router';
import { useRef, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/wallet/BallanceHeader';
import Footer from '../../components/wallet/Footer';
import MainContent from '../../components/wallet/MainContent';

const AddBalance = () => {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [loading, setLoading] = useState(false);
  const mainContentRef = useRef(null);

  const handleDepositSuccess = () => {
    // Refresh balance in MainContent after successful deposit
    if (mainContentRef.current?.refreshBalance) {
      mainContentRef.current.refreshBalance();
    }
  };

  return (
    <>
    <Stack.Screen
      options={{
        headerShown: false, // 👈 hides the auto header
      }}
    />
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
    <View className="flex-1 bg-white">
      <Header  title='Add Balance'/>
      <MainContent ref={mainContentRef} onAmountChange={setSelectedAmount} />
      <Footer amount={selectedAmount} loading={loading} onSuccess={handleDepositSuccess} />
    </View>
</SafeAreaView>
    </>
  )
}

export default AddBalance