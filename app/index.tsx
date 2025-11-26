import BannerCarousel from "@/components/home/BannerCarousel";
import ContestCard, { Contest } from "@/components/home/ContestCard";
import FilterBar from "@/components/home/FilterBar";
import Header from "@/components/home/Header";
import SegmentedTabs from "@/components/home/SegmentedTabs";
import axios from "axios";
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";


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
  }>({
    entryRange: null,
    maxEntryRange: null,
    prizePoolRange: null,
    spotsRange: null,
  });
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL  || Constants.expoConfig?.extra?.API_BASE_URL;
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
}, [selectedTabKey]);

async function fetchContestsForMatch(matchId:any) {
  setLoadingContests(true);
  try {
    const res = await axios.get(`${API_BASE_URL}/api/contests/user/match/${matchId}`);
    const contests = res.data?.data ?? []; // adapt to your contest data shape
    setNiftyData(contests);
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
      <FlatList
        data={filteredData}
        keyExtractor={(it) => it.id}
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
            <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
              {loadingMatches ? (
                <ActivityIndicator />
              ) : (
                <FlatList
                  data={matches}
                  keyExtractor={(m) => m.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => fetchContestsForMatch(item.id)}
                      style={{
                        marginRight: 8,
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        backgroundColor: item.id === selectedMatchId ? "#e6f0ff" : "#fff",
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: "#eee",
                      }}
                    >
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>

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
  );
}
