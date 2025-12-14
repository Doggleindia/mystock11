import { Stack } from 'expo-router';
import { useState, useRef } from 'react';
import { View } from 'react-native';
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
    <View className="flex-1 bg-white">
      <Header  title='Add Balance'/>
      <MainContent ref={mainContentRef} onAmountChange={setSelectedAmount} />
      <Footer amount={selectedAmount} loading={loading} onSuccess={handleDepositSuccess} />
    </View>

    </>
  )
}

export default AddBalance