import MarketOverview from '@/components/portfolio/MarketOverview';
import PortfolioHeader from '@/components/portfolio/PortfolioHeader';
import PortfolioNextButton from '@/components/portfolio/PortfolioNextButton';
import ProgressBar from '@/components/portfolio/ProgressBar';
import SearchBar from '@/components/portfolio/SearchBar';
import SortTabs from '@/components/portfolio/SortTabs';
import StockItem, { Stock } from '@/components/portfolio/StockItem';
import TableHeader from '@/components/portfolio/TableHeader';
import { TeamMemberPayload } from '@/services/portfolioService';
import usePortfolioStore from '@/store/portfolioStore';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const stocks: Stock[] = [
  { symbol: 'HDFCBANK', companyName: 'HDFC Bank Ltd.', sector: 'Banking', price: '2,010.25', change: '-15.35 (-0.75%)', isPositive: false, credits: 9.0, setBy: '75%' },
  { symbol: 'INFY', companyName: 'Infosys Ltd.', sector: 'Technology', price: '1,465.40', change: '12.15 (0.83%)', isPositive: true, credits: 8.5, setBy: '70%' },
  { symbol: 'TCS', companyName: 'Tata Consultancy Services', sector: 'Technology', price: '3,640.80', change: '-25.35 (-0.69%)', isPositive: false, credits: 9.5, setBy: '80%' },
  { symbol: 'ONDC', companyName: 'Open Network for Digital Commerce', sector: 'Services', price: '165.20', change: '1.05 (0.64%)', isPositive: true, credits: 7.2, setBy: '60%' },
  { symbol: 'ONC', companyName: 'Oil & Natural Corp', sector: 'Energy', price: '235.15', change: '-2.10 (-0.89%)', isPositive: false, credits: 7.8, setBy: '65%' },
  { symbol: 'HINDUNILVR', companyName: 'Hindustan Unilever', sector: 'FMCG', price: '2,510.25', change: '-11.00 (-0.44%)', isPositive: false, credits: 8.8, setBy: '72%' },
  { symbol: 'GOLDBEES', companyName: 'Goldman ETF', sector: 'ETF', price: '60.15', change: '0.25 (0.42%)', isPositive: true, credits: 6.9, setBy: '55%' },
  { symbol: 'GOLDBEE', companyName: 'Gold Bee Fund', sector: 'ETF', price: '61.75', change: '0.65 (1.05%)', isPositive: true, credits: 6.7, setBy: '58%' },
  { symbol: 'GOLDBES', companyName: 'Gold Bes Fund', sector: 'ETF', price: '59.35', change: '-0.25 (-0.42%)', isPositive: false, credits: 6.8, setBy: '54%' },
  { symbol: 'GOLBEES', companyName: 'Gold Bees Growth', sector: 'ETF', price: '62.45', change: '0.10 (0.16%)', isPositive: true, credits: 6.6, setBy: '57%' },
  { symbol: 'GLDBEES', companyName: 'GLD Bees', sector: 'ETF', price: '58.95', change: '-0.15 (-0.25%)', isPositive: false, credits: 6.5, setBy: '53%' },
  { symbol: 'GOLDBEES2', companyName: 'Gold Bees 2', sector: 'ETF', price: '63.15', change: '0.30 (0.48%)', isPositive: true, credits: 6.4, setBy: '52%' },
];

export default function CreatePortfolio() {
  const { contestId } = useLocalSearchParams<{ contestId?: string }>();
  const [selectedStocks, setSelectedStocks] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'stock' | 'credits'>('stock');
  const [searchQuery, setSearchQuery] = useState('');
  const setDraftPortfolio = usePortfolioStore((state) => state.setDraftPortfolio);
  const draftPortfolio = usePortfolioStore((state) => state.draftPortfolio);
  
  // Use contestId from route params, or fallback to draftPortfolio
  const finalContestId = contestId || draftPortfolio?.contestId;
  console.log(finalContestId,"finalContestId")
  React.useEffect(() => {
    if (!finalContestId) {
      Alert.alert('Missing Contest', 'No contest selected. Please go back and select a contest first.', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    }
  }, [finalContestId]);

  const toggleStock = (symbol: string) => {
    const newSelected = new Set(selectedStocks);
    if (newSelected.has(symbol)) {
      newSelected.delete(symbol);
    } else if (newSelected.size < 11) {
      newSelected.add(symbol);
    }
    setSelectedStocks(newSelected);
  };

  const filteredStocks = stocks.filter(stock => 
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedStocks = [...filteredStocks].sort((a, b) => {
    if (sortBy === 'credits') {
      return b.credits - a.credits;
    }
    return a.symbol.localeCompare(b.symbol);
  });

  const canProceed = selectedStocks.size === 11;

  const selectedTeam = useMemo(() => {
    return Array.from(selectedStocks).map((symbol) => {
      const stock = stocks.find((item) => item.symbol === symbol);
      if (!stock) return null;
      const numericPrice = Number(stock.price.replace(/,/g, ''));
      return {
        stockSymbol: stock.symbol,
        companyName: stock.companyName || stock.symbol,
        sector: stock.sector || 'General',
        buyPrice: Number.isFinite(numericPrice) ? numericPrice : 0,
        quantity: 1,
      } as TeamMemberPayload;
    }).filter(Boolean) as TeamMemberPayload[];
  }, [selectedStocks]);

  const handleProceed = () => {

    if (!canProceed) {
      Alert.alert('Select stocks', 'Please select exactly 11 stocks to continue.');
      return;
    }

    if (selectedTeam.length !== 11) {
      Alert.alert('Missing data', 'Unable to build your team. Please try again.');
      return;
    }

    setDraftPortfolio({
      contestId: finalContestId,
      team: selectedTeam,
    });

    router.push('/select-captain');
  };

  return (
    <>
    <Stack.Screen
      options={{
        headerShown: false,
      }}
    />
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
      <View className="flex-1 bg-white">
        <PortfolioHeader timeLeft="1h : 47m" />
        
        <MarketOverview
          index="NIFTY 50"
          value="24,827.45"
          change="-28.15"
          changePercent="-0.15%"
        />

        <View className="mb-4">
          <ProgressBar 
            current={selectedStocks.size} 
            total={11} 
          />
        </View>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <SortTabs
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <TableHeader />
        
        <ScrollView className="flex-1 bg-white">
          {sortedStocks.map((stock) => (
            <StockItem
              key={stock.symbol}
              stock={stock}
              isSelected={selectedStocks.has(stock.symbol)}
              onToggle={toggleStock}
            />
          ))}
        </ScrollView>

       <PortfolioNextButton
          label="Select captain"
          disabled={!canProceed}
          onPress={handleProceed}
        />
      </View>
    </SafeAreaView>
    </>
  );
}
