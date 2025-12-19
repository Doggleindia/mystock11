import { Stack } from 'expo-router';
import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BalanceHeader from "../../components/wallet/BallanceHeader";
export default function PolicyScreen() {
  return (
      <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
      <BalanceHeader title="Bank Details" />
    <ScrollView className="flex-1 bg-white px-5 pt-7">
      <Text className="text-lg font-bold text-gray-700 mb-6">Terms and Policy</Text>
      <Text className="text-xs text-gray-500 mb-2">
        {/* Add actual policy text here */}
        By using this app, you agree to our terms and policies.
      </Text>
      <Text className="text-xs text-gray-500">
        {/* More content */}
        Privacy, security, and usage details go here.
      </Text>
    </ScrollView>
    </SafeAreaView>
    </>
  );
}
