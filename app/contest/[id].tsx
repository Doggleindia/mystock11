import AppHeader from "@/components/contest/AppHeader";
import ContestData from "@/components/contest/ContestDetails";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function ContestDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  return (
    <>
      <Stack.Screen
      options={{
        headerShown: false, // 👈 hides the auto header
      }}
    />
    
    <View style={{ flex: 1 }}  >
      <AppHeader
        title="Contest Details"
        balance={50}
        onBack={() => router.back()}
      />
      <ScrollView style={{ flex: 1 }}>
        <ContestData />
      </ScrollView>
    </View>
    </>
  );
}
