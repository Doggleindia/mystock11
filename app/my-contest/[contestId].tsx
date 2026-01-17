import MyPortfolio from "@/components/my-contest/MyPortfolio";
import Header from "@/components/wallet/BallanceHeader";
import axiosInstance from "@/services/axiosInstance";
import {
    fetchMyPortfolios,
    fetchPortfolioById,
    PortfolioDetailResponse,
    PortfolioRecord,
} from "@/services/portfolioService";
import usePortfolioStore from "@/store/portfolioStore";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Modal,
    Pressable,
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

interface ContestDetailData {
  _id: string;
  name: string;
  category?: string;
  entryFee: number;
  pricePool: number;
  totalSpots: number;
  status: string;
  startTime: string;
  endTime: string;
  isLocked?: boolean;
  prizeDistribution?: Array<{ rankFrom: number; rankTo: number; prizeAmount: number }>;
  leaderboard?: Array<{
    user: {
      _id: string;
      email?: string;
    };
    portfolio: string;
    rank: number;
    pnl?: number;
    pnlPercentage?: number;
  }>;
  participants?: Array<{
    user: {
      _id: string;
      email?: string;
    };
    portfolio: {
      _id: string;
    };
  }>;
}

export default function ContestDetailScreen() {
  const { contestId } = useLocalSearchParams<{ contestId: string }>();
  const { lastJoinedContest } = usePortfolioStore();
  const [tab, setTab] = useState<"My Portfolio" | "Winner">("My Portfolio");
  const [portfolios, setPortfolios] = useState<PortfolioRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [contestLoading, setContestLoading] = useState(false);
  const [contestData, setContestData] = useState<ContestDetailData | null>(null);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(null);
  const [viewingPortfolio, setViewingPortfolio] = useState<PortfolioDetailResponse["data"] | null>(null);
  const [portfolioModalVisible, setPortfolioModalVisible] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Get current user ID
  useFocusEffect(
    useCallback(() => {
      const getCurrentUserId = async () => {
        try {
          const profileRes = await axiosInstance.get("/api/auth/getprofile");
          const userId = profileRes.data?.profile?.user?._id;
          setCurrentUserId(userId || null);
        } catch (err) {
          console.error("Failed to get user ID:", err);
        }
      };
      getCurrentUserId();
    }, [])
  );

  // Fetch contest details
  const loadContestDetails = useCallback(async () => {
    if (!contestId) return;
    
    setContestLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/match-contests/admin/${contestId}`
      );
      setContestData(response.data?.data || null);
    } catch (error: any) {
      console.error("Failed to load contest details", error);
      Alert.alert(
        "Error",
        error?.response?.data?.message || "Failed to load contest details"
      );
    } finally {
      setContestLoading(false);
    }
  }, [contestId]);

  // Load portfolios
  const loadPortfolios = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchMyPortfolios();
      setPortfolios(response?.data ?? []);
    } catch (error: any) {
      console.error("Failed to load contest portfolios", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadContestDetails();
      loadPortfolios();
    }, [loadContestDetails, loadPortfolios])
  );

  // Filter portfolios for this contest
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

  const contestInfo = contestData || (
    contestPortfolios[0] &&
    typeof contestPortfolios[0].contest === "object" &&
    contestPortfolios[0].contest !== null
      ? contestPortfolios[0].contest
      : undefined
  );

  const selectedPortfolio =
    contestPortfolios.find((p) => p._id === selectedPortfolioId) ||
    contestPortfolios[0];

  const handlePortfolioSelect = (portfolioId: string) => {
    setSelectedPortfolioId(portfolioId);
  };

  // Handle viewing portfolio from leaderboard
  const handleViewPortfolio = async (portfolioId: string, userId: string) => {
    // Check if contest is upcoming and user is not the owner
    const isUpcoming = contestData?.status === "upcoming";
    const isOtherUser = userId !== currentUserId;
    
    if (isUpcoming && isOtherUser) {
      Alert.alert(
        "Portfolio Locked",
        "This portfolio is locked until the contest starts."
      );
      return;
    }

    try {
      const response = await fetchPortfolioById(portfolioId);
      if (response.data) {
        setViewingPortfolio(response.data);
        setPortfolioModalVisible(true);
      }
    } catch (error: any) {
      console.error("Failed to load portfolio:", error);
      Alert.alert(
        "Error",
        error?.response?.data?.message || "Failed to load portfolio details"
      );
    }
  };

  const renderTabContent = () => {
    if (contestLoading || loading) {
      return (
        <View className="py-6 items-center">
          <ActivityIndicator size="large" color="#ef4444" />
        </View>
      );
    }

    if (!contestPortfolios.length && !loading && tab === "My Portfolio") {
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
                    Portfolio {(Array.isArray(portfolio.team) ? portfolio.team.length : 0)}/11
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          <MyPortfolio portfolio={selectedPortfolio} />
        </>
      );
    }

    // Winner tab - show leaderboard
    if (tab === "Winner") {
      const leaderboard = contestData?.leaderboard || [];
      const isUpcoming = contestData?.status === "upcoming";

      if (leaderboard.length === 0) {
        return (
          <View className="bg-white rounded-xl p-6 items-center mt-4">
            <Text className="text-gray-500">
              Leaderboard will be available once the contest starts.
            </Text>
          </View>
        );
      }

      return (
        <View className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <Text className="text-gray-700 font-semibold mb-3">
            Top performers in this contest
          </Text>

          {leaderboard.map((entry, index) => {
            const isUserPortfolio = entry.user._id === currentUserId;
            const canView = !isUpcoming || isUserPortfolio;

            return (
              <TouchableOpacity
                key={entry.portfolio || index}
                className={`flex-row justify-between items-center py-3 border-b border-gray-200 ${
                  !canView ? "opacity-60" : ""
                }`}
                onPress={() => {
                  if (canView && entry.portfolio) {
                    handleViewPortfolio(entry.portfolio, entry.user._id);
                  } else if (!canView) {
                    Alert.alert(
                      "Portfolio Locked",
                      "This portfolio is locked until the contest starts."
                    );
                  }
                }}
                disabled={!canView}
              >
                <View className="flex-row items-center flex-1">
                  <View className="w-8 h-8 bg-red-100 rounded-full items-center justify-center mr-3">
                    <Text className="text-red-600 font-bold text-xs">
                      #{entry.rank}
                    </Text>
                  </View>
                  <View>
                    <Text className="font-semibold text-gray-800">
                      {entry.user.email?.split("@")[0] || `User ${entry.rank}`}
                    </Text>
                    <Text className="text-gray-500 text-xs">
                      {canView ? "Tap to view portfolio" : "Locked"}
                    </Text>
                  </View>
                </View>

                <View className="items-end">
                  <Text
                    className={`font-bold text-sm ${
                      (entry.pnlPercentage || 0) >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {percentage(entry.pnlPercentage)}
                  </Text>
                  <Text className="text-gray-400 text-xs">
                    {currency(entry.pnl)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }

    return null;
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "bottom"]}>
        <View className="flex-1 bg-gray-50">
          <Header title={contestData?.name || contestInfo?.name || "Contest Details"} />

          {/* Contest Info Card */}
          <View className="bg-white rounded-xl p-4 shadow-sm mb-4 mx-2 mt-3">
            <View className="flex-row justify-between items-start mb-3">
              <View>
                <Text className="text-gray-500 text-xs uppercase">
                  {contestData?.status === "live" ? "Live Contest" : 
                   contestData?.status === "completed" ? "Completed Contest" :
                   "Contest Joined"}
                </Text>
                {selectedPortfolio && (
                  <>
                    <Text
                      className={`text-2xl font-semibold mt-1 ${
                        (selectedPortfolio.pnlPercentage || 0) >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {percentage(selectedPortfolio?.pnlPercentage)}
                    </Text>
                    <Text className="text-sm text-gray-500 mt-1">
                      {contestPortfolios.length} Portfolio
                      {contestPortfolios.length === 1 ? "" : "s"}
                    </Text>
                  </>
                )}
              </View>
              <Text className="text-3xl">
                {contestData?.status === "live" ? "🔥" : 
                 contestData?.status === "completed" ? "🏆" : "📈"}
              </Text>
            </View>

            <View className="space-y-2">
              <View className="flex-row justify-between">
                <View className="flex-row items-center">
                  <Ionicons name="trophy-outline" size={16} color="#6b7280" />
                  <Text className="ml-2 text-gray-600">Prize Pool</Text>
                </View>
                <Text className="font-semibold">
                  {currency((contestData?.pricePool ?? contestInfo?.pricePool) ?? 0)}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <View className="flex-row items-center">
                  <MaterialIcons name="currency-rupee" size={16} color="#6b7280" />
                  <Text className="ml-2 text-gray-600">Entry Fee</Text>
                </View>
                <Text className="font-semibold">
                  {currency(contestData?.entryFee || contestInfo?.entryFee)}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <View className="flex-row items-center">
                  <Ionicons name="people-outline" size={16} color="#6b7280" />
                  <Text className="ml-2 text-gray-600">Total Spots</Text>
                </View>
                <Text className="font-semibold">
                  {(contestData?.totalSpots ?? contestInfo?.totalSpots) ?? "—"}
                </Text>
              </View>
              {contestData?.status && (
                <View className="flex-row justify-between">
                  <View className="flex-row items-center">
                    <Ionicons name="time-outline" size={16} color="#6b7280" />
                    <Text className="ml-2 text-gray-600">Status</Text>
                  </View>
                  <Text className="font-semibold capitalize">
                    {contestData.status}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Tabs */}
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

          {/* Content */}
          <ScrollView
            className="p-2"
            contentContainerStyle={{ paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
          >
            {renderTabContent()}
          </ScrollView>
        </View>
      </SafeAreaView>

      {/* Portfolio Modal */}
      <Modal
        visible={portfolioModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setPortfolioModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl max-h-[90%]">
            <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
              <Text className="text-lg font-semibold">Portfolio Details</Text>
              <Pressable onPress={() => setPortfolioModalVisible(false)}>
                <Ionicons name="close" size={24} color="#6b7280" />
              </Pressable>
            </View>
            <ScrollView className="p-4">
              {viewingPortfolio && (
                <MyPortfolio
                  portfolio={viewingPortfolio as unknown as PortfolioRecord}
                />
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}
