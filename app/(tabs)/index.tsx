import BannerCarousel from "@/components/home/BannerCarousel";
import ContestCard, { Contest } from "@/components/home/ContestCard";
import FilterBar from "@/components/home/FilterBar";
import Header from "@/components/home/Header";
import SegmentedTabs from "@/components/home/SegmentedTabs";
import axiosInstance from "@/services/axiosInstance";
import { API_BASE_URL } from "@/services/config";
import axios, { CancelTokenSource } from "axios";
import { router } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FilterRange = {
  min: number;
  max: number | null;
  label: string;
};

type ContestTab = "upcoming" | "live" | "completed";

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
  prizeDistribution?: Array<{ rankFrom: number; rankTo: number; prizeAmount: number }>;
  leaderboard?: Array<{
    userId: string;
    portfolioId: string;
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
  result?: "win" | "loss" | "draw" | string;
  prizeAmount?: number;
  
}

export default function Home() {
  // Tab state
  const [activeTab, setActiveTab] = useState<ContestTab>("upcoming");
  const [tabs, setTabs] = useState<Array<{ key: string; label: string }>>([]);
  const [selectedTabKey, setSelectedTabKey] = useState<string | null>(null);
  const [sort, setSort] = useState<"recommended" | "popular">("recommended");

  // Contest state
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Match state
  const [matches, setMatches] = useState<Array<{ id: string; name: string }>>([]);
  const [loadingMatches, setLoadingMatches] = useState(false);

  // Filters
  const [filters, setFilters] = useState<{
    entryRange: FilterRange | null;
    maxEntryRange: FilterRange | null;
    prizePoolRange: FilterRange | null;
    spotsRange: FilterRange | null;
    category: FilterRange | null;
  }>({
    entryRange: null,
    maxEntryRange: null,
    prizePoolRange: null,
    spotsRange: null,
    category: null,
  });

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
        cancelTokenRef.current.cancel("Request cancelled due to tab/match change");
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

        switch (tab) {
          case "upcoming":
            // GET /api/match-contests/upcoming/:matchId
            response = await axiosInstance.get(
              `/api/match-contests/upcoming/${matchId}`,
              { cancelToken: cancelToken.token }
            );
            rawData = response.data?.data ?? response.data ?? [];
            break;

          case "completed":
            // GET /api/match-contests/contests/:matchId?type=completed
            response = await axiosInstance.get(
              `/api/match-contests/contests/${matchId}`,
              {
                params: { type: "completed" },
                cancelToken: cancelToken.token,
              }
            );
            rawData = response.data?.data ?? response.data ?? [];
            break;

          case "live":
            // Fetch all contests and filter for live ones
            // Try to get from admin endpoint first
            try {
              response = await axiosInstance.get(
                `/api/match-contests/contests/${matchId}`,
                {
                  params: {  type: "live"  },
                  cancelToken: cancelToken.token,
                }
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
              response = await axiosInstance.get(
                `/api/match-contests/status`,
                {
                  params: { statusFilter: "live" },
                  cancelToken: cancelToken.token,
                }
              );
              rawData = response.data?.data ?? response.data ?? [];
            }
            break;
        }

        // Normalize and set contests
        const normalizedContests = normalizeContestData(rawData, tab);
        setContests(normalizedContests);
      } catch (err: any) {
        if (axios.isCancel(err)) {
          console.log("Request cancelled:", err.message);
          return; // Don't set error for cancelled requests
        }
        console.error(`Error fetching ${tab} contests:`, err);
        setError(
          err?.response?.data?.message ||
            `Failed to load ${tab} contests. Please try again.`
        );
        setContests([]);
      } finally {
        setLoading(false);
        cancelTokenRef.current = null;
      }
    },
    []
  );

  /**
   * Normalize contest API data to Contest interface
   */
  const normalizeContestData = (
    apiData: ContestApiData[],
    tab: ContestTab
  ): Contest[] => {
    if (!Array.isArray(apiData)) return [];

    const now = new Date();

    return apiData.map((c) => {
      const startTime = c.startTime ? new Date(c.startTime) : null;
      const endTime = c.endTime ? new Date(c.endTime) : null;

      // Calculate time left for upcoming contests
      let timeLeft = "";
      if (tab === "upcoming" && startTime && startTime > now) {
        const diff = startTime.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        timeLeft = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
      }

      // Get user's rank and PnL from leaderboard for completed contests
      let userRank: number | undefined;
      let userPnL: number | undefined;
      let userPnLPercentage: number | undefined;

      if (tab === "completed" && Array.isArray(c.leaderboard)) {
        // Find user's entry in leaderboard (you may need to get userId from auth store)
        // For now, we'll use the first entry if isJoined is true
        if (c.isJoined && c.leaderboard.length > 0) {
          const userEntry = c.leaderboard[0]; // This should be filtered by userId in real implementation
          userRank = userEntry.rank;
          userPnL = userEntry.pnl;
          userPnLPercentage = userEntry.pnlPercentage;
        }
      }

      return {
        id: c._id || "",
        title: c.name || "Contest",
        prizePool: c.pricePool || 0,
        entryFee: c.entryFee || 0,
        timeLeft,
        startTime: startTime
          ? startTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "",
        endTime: endTime
          ? endTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "",
        spotsFilled:
          c.totalJoined ||
          (Array.isArray(c.participants) ? c.participants.length : 0),
        totalSpots: c.totalSpots || 0,
        winRate: undefined,
        medalPrize: c.prizeDistribution?.length
          ? c.prizeDistribution[0].prizeAmount
          : undefined,
        status: c.status || (tab === "upcoming" ? "upcoming" : tab),
        isJoined: c.isJoined || false,
        isLocked: c.isLocked || tab !== "upcoming",
        category: c.category,
        // H2H fields
        matchId: c.match?._id,
        templateId: c.template?._id,
        // Prize distribution
        prizeDistribution: c.prizeDistribution,
        // Additional fields for completed contests
        rank: userRank,
        pnl: userPnL,
        pnlPercentage: userPnLPercentage,
         result: c.result,
      prizeAmount: c.prizeAmount,
      };
    });
  };

  /**
   * Filter contests based on active filters
   */
  const filterContests = useCallback(
    (contestsList: Contest[]) => {
      return contestsList.filter((contest) => {
        // Entry fee filter
        if (filters.entryRange) {
          const entryFee = contest.entryFee;
          if (
            entryFee < filters.entryRange!.min ||
            (filters.entryRange!.max && entryFee > filters.entryRange!.max)
          ) {
            return false;
          }
        }

        // Max entry filter
        if (filters.maxEntryRange) {
          const maxEntry = contest.totalSpots;
          if (
            maxEntry < filters.maxEntryRange!.min ||
            (filters.maxEntryRange!.max &&
              maxEntry > filters.maxEntryRange!.max)
          ) {
            return false;
          }
        }

        // Prize pool filter
        if (filters.prizePoolRange) {
          const prizePool = contest.prizePool;
          if (
            prizePool < filters.prizePoolRange!.min ||
            (filters.prizePoolRange!.max &&
              prizePool > filters.prizePoolRange!.max)
          ) {
            return false;
          }
        }

        // Spots filter
        if (filters.spotsRange) {
          const totalSpots = contest.totalSpots;
          if (
            totalSpots < filters.spotsRange!.min ||
            (filters.spotsRange!.max && totalSpots > filters.spotsRange!.max)
          ) {
            return false;
          }
        }

        return true;
      });
    },
    [filters]
  );

  const filteredContests = filterContests(contests);

  /**
   * Handle tab change
   */
  const handleTabChange = (tab: ContestTab) => {
    setActiveTab(tab);
    // fetchContests will be triggered by useEffect
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
            onPress={() => selectedTabKey && fetchContests(activeTab, selectedTabKey)}
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
            : `Check back later for ${activeTab} contests.`}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#f7f7f7" }}
      edges={["left", "right", "bottom"]}
    >
      <FlatList
        data={filteredContests}
        keyExtractor={(item, index) => item.id || `contest-${index}`}
        ListHeaderComponent={
          <View>
            <Header />
            <BannerCarousel />

            {/* Status Filter Tabs */}
            <View className="flex-row bg-white border-b border-gray-200">
              {[
                { key: "upcoming" as ContestTab, label: "Upcoming" },
                { key: "live" as ContestTab, label: "Live" },
                { key: "completed" as ContestTab, label: "Completed" },
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
                      activeTab === tab.key
                        ? "text-red-500"
                        : "text-gray-600"
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

            {/* Filter Bar */}
            <FilterBar
              sort={sort}
              onChangeSort={setSort}
              onFiltersChange={(newFilters) => {
                setFilters({
                  entryRange: newFilters.entryRange,
                  maxEntryRange: newFilters.maxEntryRange,
                  prizePoolRange: newFilters.prizePoolRange,
                  spotsRange: newFilters.spotsRange,
                  category: null,
                });
              }}
              onClearFilters={() =>
                setFilters({
                  entryRange: null,
                  maxEntryRange: null,
                  prizePoolRange: null,
                  spotsRange: null,
                  category: null,
                })
              }
            />

            {/* Loading indicator */}
            {loading && (
              <View className="py-4 items-center">
                <ActivityIndicator size="small" color="#ef4444" />
              </View>
            )}
          </View>
        }
        renderItem={({ item }) => {
          // Make live/completed contests clickable
          const isClickable = item.status === 'live' || item.status === 'completed' || item.isJoined;
          
          if (isClickable) {
            return (
              <TouchableOpacity
                onPress={() => router.push(`/my-contest/${item.id}`)}
                activeOpacity={0.7}
              >
                <ContestCard data={item} />
              </TouchableOpacity>
            );
          }
          
          return <ContestCard data={item} />;
        }}
        ListEmptyComponent={renderEmptyState()}
        contentContainerStyle={{
          paddingBottom: 24,
          flexGrow: filteredContests.length === 0 ? 1 : 0,
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
