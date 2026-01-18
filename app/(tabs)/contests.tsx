import ContestCard, { Contest } from "@/components/home/ContestCard";
import Header from "@/components/home/Header";
import SegmentedTabs from "@/components/home/SegmentedTabs";
import axiosInstance from "@/services/axiosInstance";
import { API_BASE_URL } from "@/services/config";
import axios, { CancelTokenSource } from "axios";
import { router, Stack } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ContestTab = "live" | "completed" | "join-contest";

interface ContestApiData {
  _id: string;
  name: string;
  category?: string;
  entryFee: number;
  pricePool: number;
  totalSpots: number;
  totalJoined?: number;
  participants?: any[];
  startTime: string;
  endTime: string;
  status: string;
  isJoined?: boolean;
  isLocked?: boolean;
  prizeDistribution?: Array<{
    rankFrom: number;
    rankTo: number;
    prizeAmount: number;
  }>;
 userRank?: number;
  joinedPortfolioId?: string;
  leaderboard?: Array<{
    user?: { _id: string; email?: string }; // Updated structure from API
    portfolio?: string;
    rank: number;
    pnl?: number;
    pnlPercentage?: number;
  }>;
  match?: {
    _id: string;
  };
  template?: {
    _id: string;
  };
    prizeAmount?: number;
  result?: string;
}

export default function ContestsScreen() {
  // Tab state
  const [activeTab, setActiveTab] = useState<ContestTab>("live");
  const [tabs, setTabs] = useState<Array<{ key: string; label: string }>>([]);
  const [selectedTabKey, setSelectedTabKey] = useState<string | null>(null);

  // Contest state
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Match state
  const [matches, setMatches] = useState<Array<{ id: string; name: string }>>(
    [],
  );
  const [loadingMatches, setLoadingMatches] = useState(false);

  // Cancel token for aborting requests
  const cancelTokenRef = useRef<CancelTokenSource | null>(null);

  // Fetch matches on mount
  useEffect(() => {
    fetchMatches();
  }, []);

  // Fetch contests when tab or match changes
  useEffect(() => {
    if (selectedTabKey) {
      fetchContests(activeTab, selectedTabKey);
    }
    // Cleanup: cancel previous request when tab or match changes
    return () => {
      if (cancelTokenRef.current) {
        cancelTokenRef.current.cancel(
          "Request cancelled due to tab/match change",
        );
      }
    };
  }, [activeTab, selectedTabKey]);

  /**
   * Fetch matches list
   */
  const fetchMatches = async () => {
    setLoadingMatches(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/matches`);
      const json = await res.json();
      const matchesData = json.data ?? [];
      const newTabs = matchesData.map((m: any) => ({
        key: m._id,
        label: m.title,
      }));
      setTabs(newTabs);
      setMatches(matchesData);
      // Auto-select first match
      if (newTabs.length > 0 && !selectedTabKey) {
        setSelectedTabKey(newTabs[0].key);
      }
    } catch (err) {
      console.error("Error fetching matches:", err);
    } finally {
      setLoadingMatches(false);
    }
  };

  /**
   * Fetch contests based on active tab
   */
  const fetchContests = useCallback(
    async (tab: ContestTab, matchId: string) => {
      // Cancel previous request
      if (cancelTokenRef.current) {
        cancelTokenRef.current.cancel("New request initiated");
      }

      // Create new cancel token
      const cancelToken = axios.CancelToken.source();
      cancelTokenRef.current = cancelToken;

      setLoading(true);
      setError(null);
      setContests([]);

      try {
        let response;
        let rawData: ContestApiData[] = [];

        if (tab === "completed") {
          // GET /api/match-contests/contests/:matchId?type=completed
          response = await axiosInstance.get(
            `/api/match-contests/contests/${matchId}`,
            {
              params: { type: "completed" },
              cancelToken: cancelToken.token,
            },
          );
          rawData = response.data?.data ?? response.data ?? [];
        } else if (tab === "contest-joined") {
          response = await axiosInstance.get(
            `/api/match-contests/contests/${matchId}`,
            {
              params: { type: "contest-joined" },
              cancelToken: cancelToken.token,
            },
          );
          rawData = response.data?.data ?? response.data ?? [];
        } else if (tab === "live") {
          // For live: fetch all and filter for live status
          try {
            response = await axiosInstance.get(
              `/api/match-contests/contests/${matchId}`,
              {
                params: { type: "live" },
                cancelToken: cancelToken.token,
              },
            );
            const allContests = response.data?.data ?? response.data ?? [];
            const now = new Date();

            // Filter for live contests: status === "live" OR time between startTime and endTime
            rawData = allContests.filter((contest: ContestApiData) => {
              if (contest.status === "live") return true;

              const startTime = contest.startTime
                ? new Date(contest.startTime)
                : null;
              const endTime = contest.endTime
                ? new Date(contest.endTime)
                : null;

              if (startTime && endTime) {
                return now >= startTime && now <= endTime;
              }

              return false;
            });
          } catch (err) {
            // Fallback: try status filter endpoint
            response = await axiosInstance.get(`/api/match-contests/status`, {
              params: { statusFilter: "live" },
              cancelToken: cancelToken.token,
            });
            rawData = response.data?.data ?? response.data ?? [];
          }
        }

        // Normalize and set contests
        const normalizedContests = normalizeContestData(rawData, tab);
        setContests(normalizedContests);
      } catch (err: any) {
        if (axios.isCancel(err)) {
          console.log("Request cancelled:", err.message);
          return;
        }
        console.error(`Error fetching ${tab} contests:`, err);
        setError(
          err?.response?.data?.message ||
            `Failed to load ${tab} contests. Please try again.`,
        );
        setContests([]);
      } finally {
        setLoading(false);
        cancelTokenRef.current = null;
      }
    },
    [],
  );

  /**
   * Normalize contest API data to Contest interface
   */
const normalizeContestData = (
  apiData: ContestApiData[],
  tab: ContestTab,
): Contest[] => {
  if (!Array.isArray(apiData)) return [];

  return apiData.map((c) => {
    const startTime = c.startTime ? new Date(c.startTime) : null;
    const endTime = c.endTime ? new Date(c.endTime) : null;

    // ✅ DECLARE variables FIRST
    let userRank: number | undefined = undefined;
    let userPnL: number | undefined = undefined;
    let userPnLPercentage: number | undefined = undefined;
    let prizeAmount: number | undefined = undefined;
    let result: string | undefined = undefined;

    if (tab === "completed") {
      console.log("Completed contest raw:", c.userRank, c.leaderboard?.[0]);
      
      // ✅ PRIORITY 1: Use direct user fields (most reliable)
      userRank = c.userRank;  // API gives this directly!
      prizeAmount = c.prizeAmount;
      result = c.result;
      
      // ✅ PRIORITY 2: Fallback to leaderboard[0] for PnL
      if (Array.isArray(c.leaderboard) && c.leaderboard.length > 0) {
        userPnL = c.leaderboard[0].pnl;
        userPnLPercentage = c.leaderboard[0].pnlPercentage;
      }
    }

    return {
      id: c._id || "",
      title: c.name || "Contest",
      prizePool: c.pricePool || 0,
      entryFee: c.entryFee || 0,
      timeLeft: "",
      startTime: startTime
        ? startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : "",
      endTime: endTime
        ? endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : "",
      spotsFilled: c.totalJoined || (Array.isArray(c.participants) ? c.participants.length : 0),
      totalSpots: c.totalSpots || 0,
      winRate: undefined,
      medalPrize: c.prizeDistribution?.[0]?.prizeAmount,
      status: c.status || tab,
      isJoined: c.isJoined || false,
      isLocked: c.isLocked || true,
      category: c.category,
      matchId: c.match?._id,
      templateId: c.template?._id,
      prizeDistribution: c.prizeDistribution,
      
      // ✅ NOW these work!
      rank: userRank,
      pnl: userPnL,
      pnlPercentage: userPnLPercentage,
      prizeAmount,  // ✅
      result,       // ✅
    };
  });
};


  /**
   * Handle tab change
   */
  const handleTabChange = (tab: ContestTab) => {
    setActiveTab(tab);
  };

  /**
   * Handle contest click - navigate to contest details
   */
  const handleContestClick = (contestId: string) => {
    router.push(`/my-contest/${contestId}`);
  };

  /**
   * Render empty state
   */
  const renderEmptyState = () => {
    if (loading) {
      return (
        <View className="py-12 items-center">
          <ActivityIndicator size="large" color="#ef4444" />
          <Text className="mt-4 text-gray-500">Loading contests...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View className="py-12 items-center px-4">
          <Text className="text-red-500 text-center mb-2">{error}</Text>
          <TouchableOpacity
            onPress={() =>
              selectedTabKey && fetchContests(activeTab, selectedTabKey)
            }
            className="bg-red-500 px-6 py-2 rounded-lg mt-4"
          >
            <Text className="text-white font-semibold">Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View className="py-12 items-center px-4">
        <Text className="text-gray-500 text-center text-lg">
          No {activeTab} contests available
        </Text>
        <Text className="text-gray-400 text-center text-sm mt-2">
          {activeTab === "completed"
            ? "You haven't joined any completed contests yet."
            : "Check back later for live contests."}
        </Text>
      </View>
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#f7f7f7" }}
        edges={["left", "right", "bottom"]}
      >
        <FlatList
          data={contests}
          keyExtractor={(item, index) => item.id || `contest-${index}`}
          ListHeaderComponent={
            <View>
              <Header />

              {/* Status Filter Tabs */}
              <View className="flex-row bg-white border-b border-gray-200">
                {[
                  { key: "live" as ContestTab, label: "Live" },
                  { key: "completed" as ContestTab, label: "Completed" },
                  { key: "contest-joined" as ContestTab, label: "My Contest" },
                ].map((tab) => (
                  <TouchableOpacity
                    key={tab.key}
                    className={`flex-1 py-3 items-center border-b-2 ${
                      activeTab === tab.key
                        ? "border-red-500"
                        : "border-transparent"
                    }`}
                    onPress={() => handleTabChange(tab.key)}
                  >
                    <Text
                      className={`text-sm font-semibold ${
                        activeTab === tab.key ? "text-red-500" : "text-gray-600"
                      }`}
                    >
                      {tab.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Match Tabs */}
              <SegmentedTabs
                tabs={tabs}
                value={selectedTabKey}
                onChange={setSelectedTabKey}
              />

              {/* Loading indicator */}
              {loading && (
                <View className="py-4 items-center">
                  <ActivityIndicator size="small" color="#ef4444" />
                </View>
              )}
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleContestClick(item.id)}>
              <ContestCard data={item} />
            </TouchableOpacity>
          )}
          ListEmptyComponent={renderEmptyState()}
          contentContainerStyle={{
            paddingBottom: 24,
            flexGrow: contests.length === 0 ? 1 : 0,
          }}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </>
  );
}
