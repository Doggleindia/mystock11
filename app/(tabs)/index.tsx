import BannerCarousel from "@/components/home/BannerCarousel";
import ContestCard, { Contest } from "@/components/home/ContestCard";
import FilterBar from "@/components/home/FilterBar";
import Header from "@/components/home/Header";
import SegmentedTabs from "@/components/home/SegmentedTabs";
import { API_BASE_URL } from "@/services/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


type FilterRange = {
  min: number;
  max: number | null;
  label: string;
};

export default function Home() {
  const [tabs, setTabs] = useState<Array<{ key: string, label: string }>>([]);
const [selectedTabKey, setSelectedTabKey] = useState<string | null>(null);
  const [sort, setSort] = useState<"recommended" | "popular">("recommended");
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
    const newTabs = matches.map(m => ({ key: m._id, label: m.title }));
    setTabs(newTabs);
    setSelectedTabKey(newTabs.length ? newTabs[0].key : null);
    setMatches(matches); // optional: store whole match objects if needed
  } finally {
    setLoadingMatches(false);
  }
}
 useEffect(() => {
  if (selectedTabKey) {
    fetchContestsForMatch(selectedTabKey);
  }
}, [selectedTabKey,sort]);

function normalizeContestApiData(apiData :any[]) {
  // Handle empty or unexpected cases gracefully
  if (!Array.isArray(apiData)) return [];

  return apiData.map(c => ({
    id: c._id || '',                              // Unique contest ID
    title: c.name || 'Contest',                   // Name for card
    prizePool: c.pricePool || 0,                  // Pool amount
    entryFee: c.entryFee || 0,                    // Entry fee
    timeLeft: '',                                 // Optionally calculate from startTime
    startTime: c.startTime                         // Can format if needed
        ? new Date(c.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : '',
    spotsFilled: Array.isArray(c.participants) ? c.participants.length : 0,
    totalSpots: c.totalSpots || 0,
    winRate: null,                                // Compute/leave null if not given
    medalPrize: c.prizeDistribution?.length
      ? c.prizeDistribution[0].prizeAmount
      : null,
    // Add any extra UI fields as needed
  }));
}


async function fetchContestsForMatch(matchId:any) {
  setLoadingContests(true);
  try {
    const res = await axios.get(`${API_BASE_URL}/api/match-contests/admin/?${matchId}sort=${sort}`);
    // Your API might return {data: [...]}, {contests: [...]}, or just an array
    const raw = res.data?.data ?? res.data?.contests ?? res.data ?? [];
    setNiftyData(normalizeContestApiData(raw));
  } catch (err) {
    console.error("fetchContestsForMatch error:", err);
    setNiftyData([]); // Set empty array on error to avoid UI crash
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
           <SegmentedTabs
  tabs={tabs}
  value={selectedTabKey}
  onChange={setSelectedTabKey}
/>


            {/* Matches list */}
          

            <FilterBar
              sort={sort}
              onChangeSort={setSort}
              onFiltersChange={(newFilters) => {
                setFilters({
                  entryRange: newFilters.entryRange,
                  maxEntryRange: newFilters.maxEntryRange,
                  prizePoolRange: newFilters.prizePoolRange,
                  spotsRange: newFilters.spotsRange,
                });
              }}
              onClearFilters={() => setFilters({
                entryRange: null,
                maxEntryRange: null,
                prizePoolRange: null,
                spotsRange: null,
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
