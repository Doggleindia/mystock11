import { router, Stack } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BalanceHeader from "../../components/wallet/BallanceHeader";
export default function EmailVerifyScreen() {
  return (
     <>
    <Stack.Screen
        options={{
            headerShown: false, // 👈 hides the auto header
        }}
    />
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
    <BalanceHeader title="Verify Email" />
    <View className="flex-1 bg-white px-4 pt-5">
      <Text className="text-xs text-gray-600 mb-1">Enter the email you want to use</Text>
      <TextInput
        className="bg-gray-100 rounded-lg py-3 px-3 mb-5 text-sm"
        placeholder="e.g., name@gmail.com"
        placeholderTextColor="#888"
      />
      <TouchableOpacity  onPress={() => router.push('/kyc/kyc-otp')} className="bg-green-600 rounded-lg py-3 items-center mt-2">
        <Text className="text-base text-white font-bold">Get OTP</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
    </>
  );
}
