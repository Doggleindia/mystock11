import MyPortfolio from "@/components/my-contest/MyPortfolio";
import WinnerTab from "@/components/my-contest/WinnerTab";
import Header from "@/components/wallet/BallanceHeader";
import {
    fetchMyPortfolios,
    PortfolioRecord,
} from "@/services/portfolioService";
import usePortfolioStore from "@/store/portfolioStore";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const currency = (n?: number | null) =>
  typeof n === "number" && !Number.isNaN(n)
    ? `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`
    : "₹0";

const percentage = (n?: number | null) =>
  typeof n === "number" && !Number.isNaN(n)
    ? `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`
    : "0.00%";

export default function ContestDetailScreen() {
  const { contestId } = useLocalSearchParams<{ contestId: string }>();
  const { lastJoinedContest } = usePortfolioStore();
  const [tab, setTab] = useState<"My Portfolio" | "Winner">("My Portfolio");
  const [portfolios, setPortfolios] = useState<PortfolioRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(
    null
  );

  const loadPortfolios = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchMyPortfolios();
      setPortfolios(response?.data ?? []);
    } catch (error: any) {
      console.error("Failed to load contest portfolios", error);
      // If 403, token might be missing or expired
      if (error?.response?.status === 403) {
        console.error("Authentication failed - token may be missing or expired");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadPortfolios();
    }, [loadPortfolios])
  );

  const contestPortfolios = useMemo(() => {
    const allPortfolios = portfolios.length
      ? portfolios
      : lastJoinedContest?.contestId === contestId && lastJoinedContest.portfolio
      ? [lastJoinedContest.portfolio as PortfolioRecord]
      : [];
    return allPortfolios.filter((portfolio) => {
      const contestValue = portfolio?.contest;
      const portfolioContestId =
        typeof contestValue === "object" && contestValue !== null
          ? contestValue._id
          : contestValue;
      return portfolioContestId?.toString() === contestId?.toString();
    });
  }, [contestId, portfolios, lastJoinedContest]);

  const contestInfo =
    contestPortfolios[0] &&
    typeof contestPortfolios[0].contest === "object" &&
    contestPortfolios[0].contest !== null
      ? contestPortfolios[0].contest
      : undefined;

  const selectedPortfolio =
    contestPortfolios.find((p) => p._id === selectedPortfolioId) ||
    contestPortfolios[0];

  const handlePortfolioSelect = (portfolioId: string) => {
    setSelectedPortfolioId(portfolioId);
  };

  const renderTabContent = () => {
    if (!contestPortfolios.length && !loading) {
      return (
        <View className="bg-white rounded-xl p-6 items-center mt-4">
          <Text className="text-gray-500">
            No portfolios available for this contest yet.
          </Text>
        </View>
      );
    }

    if (tab === "My Portfolio") {
      return (
        <>
          {contestPortfolios.length > 1 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4"
              contentContainerStyle={{ paddingHorizontal: 8 }}
            >
              {contestPortfolios.map((portfolio) => (
                <TouchableOpacity
                  key={portfolio._id}
                  onPress={() => handlePortfolioSelect(portfolio._id!)}
                  className={`px-4 py-2 rounded-full border mr-2 ${
                    selectedPortfolio?._id === portfolio._id
                      ? "bg-red-50 border-red-500"
                      : "border-gray-200"
                  }`}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      selectedPortfolio?._id === portfolio._id
                        ? "text-red-600"
                        : "text-gray-700"
                    }`}
                  >
                    Portfolio {portfolio.team?.length ?? 0}/11
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          <MyPortfolio portfolio={selectedPortfolio} />
        </>
      );
    }

    // Winner tab – use leaderboard data from contest snapshot if available
    const winnersFromApi =
      Array.isArray((contestInfo as any)?.leaderboard) &&
      (contestInfo as any).leaderboard.length
        ? (contestInfo as any).leaderboard.map((row: any, index: number) => ({
            id: row._id || String(index + 1),
            name: row.userName || `Rank ${row.rank ?? index + 1}`,
            portfolio: `Rank ${row.rank ?? index + 1}`,
            prize:
              typeof row.prizeAmount === "number"
                ? `₹${row.prizeAmount.toLocaleString("en-IN")}`
                : "-",
            pool:
              typeof contestInfo?.pricePool === "number"
                ? `₹${contestInfo.pricePool.toLocaleString("en-IN")}`
                : "-",
            image:
              row.avatarUrl ||
              "https://ui-avatars.com/api/?name=W&background=0D8ABC&color=fff",
          }))
        : [];

    return <WinnerTab winners={winnersFromApi} />;
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
        <View className="flex-1 bg-gray-50">
        <Header title={contestInfo?.name || "Contest Details"} />

        <View className="bg-white rounded-xl p-4 shadow-sm mb-4 mx-2 mt-3">
          <View className="flex-row justify-between items-start mb-3">
            <View>
              <Text className="text-gray-500 text-xs uppercase">
                Contest joined
              </Text>
              <Text className="text-2xl font-semibold text-green-600 mt-1">
                {percentage(selectedPortfolio?.pnlPercentage)}
              </Text>
              <Text className="text-sm text-gray-500 mt-1">
                {contestPortfolios.length} Portfolio
                {contestPortfolios.length === 1 ? "" : "s"}
              </Text>
            </View>
            <Text className="text-3xl">📈</Text>
          </View>

          <View className="space-y-2">
            <View className="flex-row justify-between">
              <View className="flex-row items-center">
                <Ionicons name="trophy-outline" size={16} color="#6b7280" />
                <Text className="ml-2 text-gray-600">Prize Pool</Text>
              </View>
              <Text className="font-semibold">{currency(contestInfo?.pricePool)}</Text>
            </View>
            <View className="flex-row justify-between">
              <View className="flex-row items-center">
                <MaterialIcons name="currency-rupee" size={16} color="#6b7280" />
                <Text className="ml-2 text-gray-600">Entry Fee</Text>
              </View>
              <Text className="font-semibold">{currency(contestInfo?.entryFee)}</Text>
            </View>
            <View className="flex-row justify-between">
              <View className="flex-row items-center">
                <Ionicons name="people-outline" size={16} color="#6b7280" />
                <Text className="ml-2 text-gray-600">Total Spots</Text>
              </View>
              <Text className="font-semibold">
                {contestInfo?.totalSpots ?? "—"}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <View className="flex-row items-center">
                <FontAwesome5 name="flag" size={14} color="#6b7280" />
                <Text className="ml-2 text-gray-600">Max Entry</Text>
              </View>
              <Text className="font-semibold">
                {contestInfo?.maxEntriesPerUser
                  ? `${contestInfo.maxEntriesPerUser} Times`
                  : contestInfo?.category === "Head-to-Head"
                  ? "1 Time"
                  : "Unlimited"}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row border-b border-gray-200 bg-white">
          {["My Portfolio", "Winner"].map((item) => (
            <TouchableOpacity
              key={item}
              className="flex-1 items-center py-3"
              onPress={() => setTab(item as "My Portfolio" | "Winner")}
            >
              <Text
                className={`text-sm font-semibold ${
                  tab === item ? "text-red-600" : "text-gray-600"
                }`}
              >
                {item}
              </Text>
              {tab === item && (
                <View className="h-0.5 w-full bg-red-600 absolute bottom-0" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView
          className="p-2"
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        >
          {loading ? (
            <View className="py-6">
              <ActivityIndicator />
            </View>
          ) : (
            renderTabContent()
          )}
        </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

