import AppHeader from "@/components/contest/AppHeader";
import ContestData from "@/components/contest/ContestDetails";
import axios from "axios";
import Constants from "expo-constants";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ||
  Constants.expoConfig?.extra?.API_BASE_URL;


export default function ContestDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

    const [contest, setContest] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchContest = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${API_BASE_URL}/api/match-contests/admin/${id}`);
        // API returns { success, data: { ...contest } }
        setContest(res.data?.data ?? null);
      } catch (e: any) {
        console.log("fetchContest error:", e?.message);
        setError("Failed to load contest");
        setContest(null);
      } finally {
        setLoading(false);
      }
    };

    fetchContest();
  }, [id]);

  console.log(contest,"contestData")
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
        balance={contest?.entryFee || ''}
        onBack={() => router.back()}
      />
      <ScrollView style={{ flex: 1 }}>
        <ContestData  contestData = {contest}/>
      </ScrollView>
    </View>
    </>
  );
}
