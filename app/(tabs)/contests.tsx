import MyPortfolio from "@/components/my-contest/MyPortfolio";
import WinnerTab from "@/components/my-contest/WinnerTab";
import Header from "@/components/wallet/BallanceHeader";
import {
  fetchMyPortfolios,
  PortfolioRecord,
} from "@/services/portfolioService";
import usePortfolioStore from "@/store/portfolioStore";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router, Stack, useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const formatCurrency = (value?: number | null) => {
  if (typeof value !== "number" || Number.isNaN(value)) return "—";
  return `₹${value.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
};

const formatPercentage = (value?: number | null) => {
  if (typeof value !== "number" || Number.isNaN(value)) return "0.00%";
  const formatted = value.toFixed(2);
  return `${value >= 0 ? "+" : ""}${formatted}%`;
};

const CompletedContestScreen = () => {
  const [tab, setTab] = useState("My Contest");
  const [loading, setLoading] = useState(false);
  const [portfolios, setPortfolios] = useState<PortfolioRecord[]>([]);
  const { lastJoinedContest } = usePortfolioStore();

  const loadPortfolios = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchMyPortfolios();
      setPortfolios(response?.data ?? []);
    } catch (error) {
      console.error("Failed to load portfolios", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadPortfolios();
    }, [loadPortfolios])
  );

  const portfolioSources = useMemo(() => {
    if (portfolios.length) return portfolios;
    if (lastJoinedContest?.portfolio) {
      return [lastJoinedContest.portfolio as PortfolioRecord];
    }
    return [];
  }, [portfolios, lastJoinedContest]);

  const contestCards = useMemo(() => {
    return portfolioSources.map((portfolio) => {
      const contestInfo =
        portfolio &&
        typeof portfolio.contest === "object" &&
        portfolio.contest !== null
          ? portfolio.contest
          : undefined;

      const contestIdentifier =
        (contestInfo?._id || portfolio?.contest || "").toString();

      const pnlPercentage =
        typeof portfolio?.pnlPercentage === "number"
          ? portfolio.pnlPercentage
          : 0;

      const pnlColor = pnlPercentage >= 0 ? "text-green-600" : "text-red-600";

      return {
        id: contestIdentifier || portfolio?._id || Math.random().toString(),
        portfolioId: portfolio?._id,
        contestId: contestIdentifier,
        title:
          contestInfo?.name ||
          `Contest ${contestIdentifier.slice(-6) || "—"}`,
        pnl: formatPercentage(pnlPercentage),
        pnlColor,
        won:
          typeof portfolio?.pnl === "number" && portfolio.pnl > 0
            ? formatCurrency(portfolio.pnl)
            : null,
        firstPrice: formatCurrency(contestInfo?.pricePool),
        entry: formatCurrency(contestInfo?.entryFee ?? 0),
        spots: contestInfo?.totalSpots
          ? `${contestInfo.totalSpots}`
          : "—",
        position:
          typeof portfolio?.totalPoints === "number"
            ? `${portfolio.totalPoints}`
            : "—",
        maxEntry: contestInfo?.maxEntriesPerUser
          ? `${contestInfo.maxEntriesPerUser} Times`
          : contestInfo?.category === "Head-to-Head"
          ? "1 Time"
          : "Unlimited",
        distribution: contestInfo?.prizeDistribution?.length
          ? `${contestInfo.prizeDistribution.length} payouts`
          : "—",
      };
    });
  }, [portfolioSources]);

  const summaryCard = contestCards[0];

  // ✅ Tab-wise content
  const renderContent = () => {
    switch (tab) {
      case "My Contest":
        return (
          <>
            <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
              <View className="flex-row justify-between items-start p-4">
                <View className="flex align-center">
                  <Text className="font-semibold text-base">
                    🎉 {summaryCard ? "Contest joined!" : "No entries yet"}
                  </Text>
                  <Text className="text-2xl text-green-600 font-bold mt-2">
                    {summaryCard?.won ?? formatCurrency(0)}
                  </Text>
                </View>
                <Image
                  source={require("../../assets/images/trading_chart.png")}
                  className="w-[150px] h-[80px]"
                  resizeMode="contain"
                />
              </View>

              <Text className="bg-[#F5F7F4] p-3 text-sm border-b rounded-b-xl border-gray-300">
                {contestCards.length} Contest
                {contestCards.length === 1 ? "" : "s"} -{" "}
                {portfolioSources.length} Portfolio
                {portfolioSources.length === 1 ? "" : "s"}
              </Text>
            </View>

            {loading && (
              <View className="py-4">
                <ActivityIndicator />
              </View>
            )}

            {!loading && !contestCards.length && (
              <View className="bg-white rounded-xl p-6 items-center">
                <Text className="text-gray-600 mb-4 text-center">
                  You haven’t joined any contests yet.
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/create-portfolio")}
                  className="bg-green-600 px-5 py-2 rounded-full"
                >
                  <Text className="text-white font-semibold">
                    Create a portfolio
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {contestCards.map((c) => (
              <TouchableOpacity
                key={c.id}
                className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden border border-gray-200"
                onPress={() =>
                  c.contestId &&
                  router.push({
                    pathname: "/my-contest/[contestId]",
                    params: { contestId: c.contestId },
                  })
                }
              >
                <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100">
                  <Text className="font-semibold text-base">{c.title}</Text>
                  <Ionicons name="chevron-forward" size={18} color="#6b7280" />
                </View>

                <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100">
                  <View className="flex-row items-center">
                    <Text className="text-gray-600 mr-2">P&L</Text>
                    <View className="bg-green-50 px-2 py-1 rounded">
                      <Text className={`${c.pnlColor} font-semibold text-sm`}>
                        {c.pnl}
                      </Text>
                    </View>
                  </View>
                  {c.won && (
                    <View className="bg-green-50 px-3 py-1 rounded">
                      <Text className="text-green-600 font-semibold text-sm">
                        {c.won}
                      </Text>
                    </View>
                  )}
                </View>

                <View className="px-4 py-3 space-y-2">
                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <Ionicons name="trophy-outline" size={16} color="#6b7280" />
                      <Text className="ml-2 text-gray-600">Prize Pool</Text>
                    </View>
                    <Text className="font-semibold text-sm">{c.firstPrice}</Text>
                  </View>

                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <MaterialIcons
                        name="currency-rupee"
                        size={16}
                        color="#6b7280"
                      />
                      <Text className="ml-2 text-gray-600">Entry</Text>
                    </View>
                    <Text className="font-semibold text-sm">{c.entry}</Text>
                  </View>

                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <Ionicons name="people-outline" size={16} color="#6b7280" />
                      <Text className="ml-2 text-gray-600">Spots</Text>
                    </View>
                    <Text className="font-semibold text-sm">{c.spots}</Text>
                  </View>

                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <FontAwesome5 name="flag" size={14} color="#6b7280" />
                      <Text className="ml-2 text-gray-600">Points</Text>
                    </View>
                    <Text className="font-semibold text-sm">{c.position}</Text>
                  </View>

                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <MaterialIcons name="layers" size={16} color="#6b7280" />
                      <Text className="ml-2 text-gray-600">Max Entry</Text>
                    </View>
                    <Text className="font-semibold text-sm">{c.maxEntry}</Text>
                  </View>

                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <Ionicons name="gift-outline" size={16} color="#6b7280" />
                      <Text className="ml-2 text-gray-600">
                        Prize Distribution
                      </Text>
                    </View>
                    <Text className="font-semibold text-sm">
                      {c.distribution}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </>
        );

      case "My Portfolio":
        return <MyPortfolio portfolio={portfolioSources[0]} />;

      case "Winner":
        return (
    <WinnerTab/>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-gray-50">
        <Header title="Beginner’s Arena" />

        {/* Tabs */}
        <View className="flex-row border-b border-gray-200 bg-white">
          {["My Contest", "My Portfolio", "Winner"].map((item) => (
            <TouchableOpacity
              key={item}
              className="flex-1 items-center py-3"
              onPress={() => setTab(item)}
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

        {/* Scrollable Content with safe bottom space */}
        <ScrollView
          className="p-2"
          contentContainerStyle={{ paddingBottom: 80 }} // ✅ margin bottom safe
          showsVerticalScrollIndicator={false}
        >
          {renderContent()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CompletedContestScreen;
