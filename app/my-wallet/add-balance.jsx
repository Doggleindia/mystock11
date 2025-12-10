import { Stack } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import Header from '../../components/wallet/BallanceHeader';
import Footer from '../../components/wallet/Footer';
import MainContent from '../../components/wallet/MainContent';

const AddBalance = () => {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [loading, setLoading] = useState(false);

  const handleDepositClick = () => {
    // The Footer component will handle the actual deposit
    // MainContent component manages the selectedAmount state
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
      <MainContent onAmountChange={setSelectedAmount} />
      <Footer amount={selectedAmount} loading={loading} />
    </View>

    </>
  )
}

export default AddBalance