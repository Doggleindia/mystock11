import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import BalanceHeader from "../../components/wallet/BallanceHeader";
import { useAuthStore } from '../../store/authStore';

const VerifiedBadge = () => (
  <View className="bg-green-50 px-2 py-1 rounded-lg ml-1">
    <Text className="text-xs text-green-700 font-semibold">Verified</Text>
  </View>
);
const EditIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" stroke="#999" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 20h9" />
    <Path d="M16.5 3.5l4 4-12 12-4.5 0 .5-4.5 12-12z"/>
  </Svg>
);

// Show both detail and edit routes for PAN and Bank
const getScreens = (user) => [
  { 
    label: "Mobile Number", 
    value: user?.user?.mobileNumber || "Not provided", 
    verified: !!user?.user?.mobileNumber, 
    editRoute: "/kyc/verify-mobile", 
    type: "edit" 
  },
  { 
    label: "Email Address", 
    value: user?.user?.email || "Not provided", 
    verified: !!user?.user?.email, 
    editRoute: "/kyc/verify-email", 
    type: "edit" 
  },,
  { 
    label: "Bank Account", 
    value: user?.user?.bankDetails?.accountNumberLast4 ? `****${user.user.bankDetails.accountNumberLast4}` : "Not provided", 
    verified: !!user?.user?.bankDetails?.accountNumberLast4, 
    editRoute: "/kyc/verify-bank", 
    viewRoute: "/kyc/bank-details", 
    type: "both" 
  }
];

export default function KYCDetailsScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const screens = getScreens(user);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        await useAuthStore.getState().fetchProfile();
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <BalanceHeader title="KYC Details" />
      <View className="flex-1 bg-white">
        <View className="pt-3">
          {screens.map((field, idx) => (
            <View key={idx} className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
              <View>
                <Text className="text-xs text-gray-600 font-semibold">{field.label}</Text>
                <Text className="text-sm text-gray-800 mt-1">{field.value}</Text>
              </View>
              <View className="flex-row items-center">
                {field.verified && <VerifiedBadge />}
                {field.type === "both" && field.verified && (
                  <>
                    <TouchableOpacity
                      className="ml-2 bg-gray-200 px-3 py-1 rounded-md"
                      onPress={() => router.push(field.viewRoute)}
                    >
                      <Text className="text-xs text-gray-700 font-semibold">View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="ml-2" onPress={() => router.push(field.editRoute)}>
                      <EditIcon />
                    </TouchableOpacity>
                  </>
                )}
                {(field.type === "edit") && (
                  <TouchableOpacity className="ml-2" onPress={() => router.push(field.editRoute)}>
                    <EditIcon />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>
        <View className="bg-gray-50 px-4 py-4 mt-1">
          <Text className="text-[11px] font-bold text-gray-700 mb-2">IMPORTANT</Text>
          <Text className="text-xs text-gray-700 mb-1">• Once linked to an account, your PAN cannot be unlinked</Text>
          <Text className="text-xs text-gray-700">• It takes max 1 working day to get PAN verified</Text>
        </View>
      </View>
    </>
  );
}
