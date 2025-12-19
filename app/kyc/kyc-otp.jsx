import { router, Stack } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BalanceHeader from "../../components/wallet/BallanceHeader";
export default function OTPScreen() {
  return (
     <>
    <Stack.Screen
        options={{
            headerShown: false, // 👈 hides the auto header
        }}
    />
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
    <BalanceHeader title="Verify Otp" />
    <View className="flex-1 bg-white px-4 pt-5">
      <Text className="text-xs text-gray-600 mb-2">Enter verification code</Text>
      <View className="flex-row mb-5">
        {/* Render OTP input boxes */}
        {[1,2,3,4,5,6].map(i => (
          <TextInput key={i} maxLength={1} className="bg-gray-100 rounded-lg px-3 py-2 mx-1 text-center text-lg" />
        ))}
      </View>
      <TouchableOpacity className="mb-8">
        <Text className="text-xs text-blue-600">Resend code</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> router.push("kyc/kyc-details")} className="bg-green-600 rounded-lg py-3 items-center">
        <Text className="text-base text-white font-bold">Get Verify</Text>
      </TouchableOpacity>
      {/* Optionally add numeric keypad if needed */}
    </View>
    </SafeAreaView>
    </>
  );
}
