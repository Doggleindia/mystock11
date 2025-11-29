import BannerCarousel from "@/components/home/BannerCarousel";
import ContestCard, { Contest } from "@/components/home/ContestCard";
import FilterBar from "@/components/home/FilterBar";
import SegmentedTabs from "@/components/home/SegmentedTabs";
import React, { useMemo, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import Header from "../../components/home/Header";

type FilterRange = {
  min: number;
  max: number | null;
  label: string;
};

const niftyData: Contest[] = [
  {
    id: "n1",
    title: "Beginner's Arena",
    prizePool: 50000,
    entryFee: 50,
    timeLeft: "1h : 47m",
    startTime: "3:20 PM",
    spotsFilled: 238,
    totalSpots: 250,
    winRate: 40,
    medalPrize: 25000,
  },
  {
    id: "n2",
    title: "Pro League",
    prizePool: 75000,
    entryFee: 50,
    timeLeft: "2h : 05m",
    startTime: "4:10 PM",
    spotsFilled: 120,
    totalSpots: 180,
    winRate: 45,
    medalPrize: 30000,
  },
  {
    id: "n3",
    title: "Evening Sprint",
    prizePool: 30000,
    entryFee: 30,
    timeLeft: "3h : 15m",
    spotsFilled: 50,
    totalSpots: 200,
  },
];

const bankNiftyData: Contest[] = [
  {
    id: "b1",
    title: "Bankers Cup",
    prizePool: 50000,
    entryFee: 50,
    timeLeft: "0h : 52m",
    startTime: "2:35 PM",
    spotsFilled: 220,
    totalSpots: 250,
    winRate: 42,
    medalPrize: 25000,
  },
  {
    id: "b2",
    title: "Bank Blitz",
    prizePool: 60000,
    entryFee: 50,
    timeLeft: "1h : 20m",
    startTime: "3:10 PM",
    spotsFilled: 140,
    totalSpots: 200,
    winRate: 38,
  },
  {
    id: "b3",
    title: "Rapid Fire",
    prizePool: 45000,
    entryFee: 40,
    timeLeft: "2h : 00m",
    startTime: "4:00 PM",
    spotsFilled: 40,
    totalSpots: 150,
  },
  {
    id: "b4",
    title: "Rapid Fire Extreme",
    prizePool: 45000,
    entryFee: 40,
    timeLeft: "2h : 00m",
    startTime: "4:00 PM",
    spotsFilled: 40,
    totalSpots: 150,
  },
  {
    id: "b5",
    title: "Quick Trade",
    prizePool: 45000,
    entryFee: 40,
    timeLeft: "2h : 00m",
    startTime: "4:00 PM",
    spotsFilled: 40,
    totalSpots: 150,
  },
  {
    id: "b6",
    title: "Power Play",
    prizePool: 45000,
    entryFee: 40,
    timeLeft: "2h : 00m",
    startTime: "4:00 PM",
    spotsFilled: 40,
    totalSpots: 150,
  },
];

export default function Home() {
  const [tab, setTab] = useState<"NIFTY50" | "BANKNIFTY">("NIFTY50");
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
  };const data = useMemo(() => {
  const rawData = tab === "NIFTY50" ? niftyData : bankNiftyData;
  const filteredData = filterContests(rawData);

  if (sort === "popular") {
    return [...filteredData].sort(
      (a, b) => b.spotsFilled / b.totalSpots - a.spotsFilled / a.totalSpots
    );
  }

  return filteredData;
}, [tab, filters, sort]);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
      <FlatList
        data={data}
        keyExtractor={(it) => it.id}
        ListHeaderComponent={
          <View>
            <Header />
            <BannerCarousel />
            <SegmentedTabs value={tab} onChange={setTab} />
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
          </View>
        }
        renderItem={({ item }) => <ContestCard data={item} />}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
