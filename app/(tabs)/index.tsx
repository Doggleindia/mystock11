import BannerCarousel from "@/components/home/BannerCarousel";
import ContestCard, { Contest } from "@/components/home/ContestCard";
import FilterBar from "@/components/home/FilterBar";
import Header from "@/components/home/Header";
import SegmentedTabs from "@/components/home/SegmentedTabs";
import { API_BASE_URL } from "@/services/config";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";
import React, { useEffect, useState } from "react";
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

export default function Home() {
  const [statusFilter, setStatusFilter] = useState<"upcoming" | "live" | "completed">("upcoming");
  const [tabs, setTabs] = useState<Array<{ key: string, label: string }>>([]);
  const [selectedTabKey, setSelectedTabKey] = useState<string | null>(null);
  const [sort, setSort] = useState<"recommended" | "popular">("recommended");
  const { user, fetchProfile } = useAuthStore();
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
  // MATCHES: a simple list of matches to display (id + name)
  const [matches, setMatches] = useState<Array<{ id: string; name: string }>>(
    []
  );
  const [loadingMatches, setLoadingMatches] = useState(false);

  // niftyData will hold contests returned by GET /api/contests/user/match/:matchId
  const [niftyData, setNiftyData] = useState<Contest[]>([]);
  const [loadingContests, setLoadingContests] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);

  useEffect(() => {
    fetchMatches();
  }, []);

 async function fetchMatches() {
  setLoadingMatches(true);
  try {
    const res = await fetch(`${API_BASE_URL}/api/admin/matches`);
    const json = await res.json();
    const matches = json.data ?? [];
    // Store tabs: key = id, label = title
    const newTabs = matches.map((m: any) => ({ key: m._id, label: m.title }));
    setTabs(newTabs);
    // Only auto-select first match if not viewing completed contests
    if (statusFilter !== 'completed' && newTabs.length) {
      setSelectedTabKey(newTabs[0].key);
    }
    setMatches(matches);
  } finally {
    setLoadingMatches(false);
  }
}
 useEffect(() => {
  // Always fetch when status filter changes, or when match is selected
  // For upcoming/live: fetch all contests (don't pass matchId to status endpoint)
  // For completed: fetch from user portfolios
  // For other cases: use matchId if selected
  if (statusFilter === 'completed' || statusFilter === 'upcoming' || statusFilter === 'live' || selectedTabKey) {
    // Don't pass matchId when using status filter (upcoming/live show all-time)
    const matchIdForFetch = (statusFilter === 'upcoming' || statusFilter === 'live') ? null : selectedTabKey;
    fetchContestsForMatch(matchIdForFetch);
  }
}, [selectedTabKey, sort, statusFilter]);

function normalizeContestApiData(apiData :any[]) {
  // Handle empty or unexpected cases gracefully
  if (!Array.isArray(apiData)) return [];

  return apiData.map(c => {
    const startTime = c.startTime ? new Date(c.startTime) : null;
    const endTime = c.endTime ? new Date(c.endTime) : null;
    const now = new Date();
    
    // Calculate time left for upcoming contests
    let timeLeft = '';
    if (statusFilter === 'upcoming' && startTime && startTime > now) {
      const diff = startTime.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      timeLeft = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    }

    return {
      id: c._id || '',
      title: c.name || 'Contest',
      prizePool: c.pricePool || 0,
      entryFee: c.entryFee || 0,
      timeLeft,
      startTime: startTime
        ? startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : '',
      spotsFilled: c.totalJoined || (Array.isArray(c.participants) ? c.participants.length : 0),
      totalSpots: c.totalSpots || 0,
      winRate: undefined,
      medalPrize: c.prizeDistribution?.length
        ? c.prizeDistribution[0].prizeAmount
        : null,
      status: c.status || 'upcoming',
      isJoined: c.isJoined || false,
    };
  });
}


async function fetchContestsForMatch(matchId:any) {
  setLoadingContests(true);
  try {
    // For completed, fetch from user profile/portfolios
    if (statusFilter === 'completed') {
      try {
        await fetchProfile();
        const portfolioRes = await axios.get(`${API_BASE_URL}/api/portfolios/my-portfolios`);
        const portfolios = portfolioRes.data?.data || [];
        const completedContests = portfolios
          .filter((p: any) => {
            const contestStatus = typeof p.contest === 'object' && p.contest?.status;
            return contestStatus === 'completed';
          })
          .map((p: any) => {
            const contest = typeof p.contest === 'object' ? p.contest : {};
            return {
              ...contest,
              _id: typeof p.contest === 'object' ? contest._id : p.contest,
              isJoined: true,
              participants: [],
            };
          });
        setNiftyData(normalizeContestApiData(completedContests));
      } catch (err) {
        console.error("Failed to fetch completed contests:", err);
        setNiftyData([]);
      } finally {
        setLoadingContests(false);
      }
      return;
    }
    
    // For upcoming/live: use status filter endpoint (all-time, no matchId)
    let url = `${API_BASE_URL}/api/match-contests/admin/`;
    const params = new URLSearchParams();
    
    if (statusFilter === 'upcoming' || statusFilter === 'live') {
      url = `${API_BASE_URL}/api/match-contests/status`;
      params.append('statusFilter', statusFilter);
      // Don't add matchId - status endpoint shows all-time contests
    } else if (matchId) {
      // For other status filters or default, use matchId if provided
      params.append('matchId', matchId);
    }
    const queryString = params.toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;
    const res = await axios.get(fullUrl);
    const raw = res.data?.data ?? res.data?.contests ?? res.data ?? [];
    setNiftyData(normalizeContestApiData(raw));
  } catch (err) {
    console.error("fetchContestsForMatch error:", err);
    setNiftyData([]);
  } finally {
    setLoadingContests(false);
  }
}

  const filterContests = (contests: Contest[]) => {
    return contests.filter((contest) => {
      if (filters.entryRange) {
        const entryFee = contest.entryFee;
        if (
          entryFee < filters.entryRange.min ||
          (filters.entryRange.max && entryFee > filters.entryRange.max)
        ) {
          return false;
        }
      }

      if (filters.maxEntryRange) {
        const maxEntry = contest.totalSpots;
        if (
          maxEntry < filters.maxEntryRange.min ||
          (filters.maxEntryRange.max && maxEntry > filters.maxEntryRange.max)
        ) {
          return false;
        }
      }

      if (filters.prizePoolRange) {
        const prizePool = contest.prizePool;
        if (
          prizePool < filters.prizePoolRange.min ||
          (filters.prizePoolRange.max && prizePool > filters.prizePoolRange.max)
        ) {
          return false;
        }
      }

      if (filters.spotsRange) {
        const totalSpots = contest.totalSpots;
        if (
          totalSpots < filters.spotsRange.min ||
          (filters.spotsRange.max && totalSpots > filters.spotsRange.max)
        ) {
          return false;
        }
      }

      return true;
    });
  };

  const filteredData = filterContests(niftyData);
  return (
    <>
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f7f7f7" }} edges={['left', 'right', 'bottom']}>
      <FlatList
        data={filteredData}
        keyExtractor={(it, index) => it.id || `contest-${index}`}
        ListHeaderComponent={
          <View>
            <Header />
            <BannerCarousel />
            
            {/* Status Filter Tabs */}
            <View className="flex-row bg-white border-b border-gray-200">
              {[
                { key: 'upcoming', label: 'Upcoming' },
                { key: 'live', label: 'Live' },
                { key: 'completed', label: 'Completed' },
              ].map((status) => (
                <TouchableOpacity
                  key={status.key}
                  className={`flex-1 py-3 items-center border-b-2 ${
                    statusFilter === status.key
                      ? 'border-red-500'
                      : 'border-transparent'
                  }`}
                  onPress={() => setStatusFilter(status.key as typeof statusFilter)}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      statusFilter === status.key
                        ? 'text-red-500'
                        : 'text-gray-600'
                    }`}
                  >
                    {status.label}
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
              onClearFilters={() => setFilters({
                entryRange: null,
                maxEntryRange: null,
                prizePoolRange: null,
                spotsRange: null,
                category: null,
              })}
            />
            {loadingContests && (
              <View style={{ padding: 12 }}>
                <ActivityIndicator />
              </View>
            )}
          </View>
        }
        renderItem={({ item }) => <ContestCard data={item} />}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
    </>
  );
}
