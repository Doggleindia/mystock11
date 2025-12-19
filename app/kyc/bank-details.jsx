import { Stack } from 'expo-router';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import BalanceHeader from '../../components/wallet/BallanceHeader';
import { useAuthStore } from '../../store/authStore';

const BankIcon = () => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#767676"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M2 10v3h20v-3" />
    <Path d="M12 2L2 7v2h20V7l-10-5z" />
    <Path d="M7 13v5" />
    <Path d="M17 13v5" />
    <Path d="M12 15v3" />
    <Path d="M4 21h16" />
  </Svg>
);

export default function BankDetailsScreen() {
  const { user } = useAuthStore();

  const bankDetails = user?.user?.bankDetails;
  const identityDocs = user?.user?.identityDocuments;

  const kycStatus = user?.user?.kycStatus || 'pending';

  const getStatusStyle = () => {
    switch (kycStatus) {
      case 'approved':
        return 'bg-green-50 text-green-700';
      case 'rejected':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-yellow-50 text-yellow-700';
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
      <BalanceHeader title="Bank Details" />

      <View className="flex-1 bg-white px-4 py-6">
        {/* Header */}
        <View className="flex-row items-center mb-5">
          <BankIcon />
          <Text className="ml-2 text-lg font-semibold text-gray-800">
            Bank Account Details
          </Text>
        </View>

        {/* Bank Info */}
        <View className="mb-6">
          <Text className="text-xs text-gray-500 mb-1">Account Number</Text>
          <Text className="text-base text-gray-800 mb-3">
            {bankDetails?.accountNumberLast4
              ? `****${bankDetails.accountNumberLast4}`
              : 'Not provided'}
          </Text>

          <Text className="text-xs text-gray-500 mb-1">Bank Name</Text>
          <Text className="text-base text-gray-800 mb-3">
            {bankDetails?.bankName || 'Not provided'}
          </Text>

          {/* Status */}
          <View className="flex-row items-center mt-2">
            <Text className="text-xs text-gray-500">KYC Status:</Text>
            <Text
              className={`ml-2 text-xs font-semibold px-2 py-1 rounded-lg ${getStatusStyle()}`}
            >
              {kycStatus.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* ID Proof Section */}
        <View>
          <Text className="text-sm font-semibold text-gray-800 mb-3">
            Identity Proof
          </Text>

          <View className="flex-row gap-3">
            {/* Front ID */}
            <View className="flex-1">
              <Text className="text-xs text-gray-500 mb-1">Front</Text>
              {identityDocs?.idFrontUrl ? (
                <Image
                  source={{ uri: identityDocs.idFrontUrl }}
                  className="w-full h-32 rounded-lg border border-gray-200"
                  resizeMode="cover"
                />
              ) : (
                <View className="h-32 rounded-lg bg-gray-100 items-center justify-center">
                  <Text className="text-xs text-gray-400">Not uploaded</Text>
                </View>
              )}
            </View>

            {/* Back ID */}
            <View className="flex-1">
              <Text className="text-xs text-gray-500 mb-1">Back</Text>
              {identityDocs?.idBackUrl ? (
                <Image
                  source={{ uri: identityDocs.idBackUrl }}
                  className="w-full h-32 rounded-lg border border-gray-200"
                  resizeMode="cover"
                />
              ) : (
                <View className="h-32 rounded-lg bg-gray-100 items-center justify-center">
                  <Text className="text-xs text-gray-400">Not uploaded</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Important */}
        <View className="bg-gray-50 p-3 mt-6 rounded-lg">
          <Text className="text-[11px] font-bold text-gray-700 mb-1">
            IMPORTANT
          </Text>
          <Text className="text-xs text-gray-700 mb-1">
            • Submitted bank proof will be used for verification.
          </Text>
          <Text className="text-xs text-gray-700">
            • Password protected files will be rejected.
          </Text>
        </View>
      </View>
      </SafeAreaView>
    </>
  );
}
