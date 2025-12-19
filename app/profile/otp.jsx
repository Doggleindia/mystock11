import { Stack } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BalanceHeader from "../../components/wallet/BallanceHeader";
export default function OTPVerifyScreen() {
  return (
    <>
    <Stack.Screen options={{ headerShown: false }} />
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
    <BalanceHeader title="Verify OTP" />
    <View className="flex-1 bg-white px-5 pt-7">
      <Text className="text-xs text-gray-600 mb-2">Enter verification code</Text>
      <View className="flex-row mb-6">
        {[0,1,2,3,4,5].map(i => (
          <TextInput key={i} className="bg-gray-100 rounded-lg px-4 py-3 mx-1 text-lg text-center" maxLength={1} keyboardType="number-pad" />
        ))}
      </View>
      <TouchableOpacity>
        <Text className="text-xs text-blue-600 mb-7">Resend code</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-green-600 rounded-lg py-3 items-center">
        <Text className="text-base text-white font-bold">Get Verify</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
    </>
  );
}
