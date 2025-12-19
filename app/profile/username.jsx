import { Stack } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BalanceHeader from "../../components/wallet/BallanceHeader";
export default function ChangeUsernameScreen() {
  return (
    <>
    <Stack.Screen options={{ headerShown: false }} />
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
    <BalanceHeader title="Change Username" />
    <View className="flex-1 bg-white px-5 pt-7">
      <Text className="text-xs text-gray-600 mb-2">Change Username</Text>
      <Text className="text-xs text-gray-500 mb-5">Note: You can change your username only once.</Text>
      <TextInput
        className="bg-gray-100 rounded-lg px-3 py-3 mb-6 text-base"
        placeholder="New username"
        placeholderTextColor="#888"
      />
      <TouchableOpacity className="bg-gray-500 rounded-lg py-3 items-center">
        <Text className="text-base text-white font-bold">Submit Details</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
    </>
  );
}
