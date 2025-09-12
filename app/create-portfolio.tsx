import MarketOverview from '@/components/portfolio/MarketOverview';
import PortfolioHeader from '@/components/portfolio/PortfolioHeader';
import PortfolioNextButton from '@/components/portfolio/PortfolioNextButton';
import ProgressBar from '@/components/portfolio/ProgressBar';
import SearchBar from '@/components/portfolio/SearchBar';
import SortTabs from '@/components/portfolio/SortTabs';
import StockItem, { Stock } from '@/components/portfolio/StockItem';
import TableHeader from '@/components/portfolio/TableHeader';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

const stocks: Stock[] = [
  { symbol: 'HDFCBANK', price: '2,010.25', change: '-15.35 (-0.75%)', isPositive: false, credits: 9.0, setBy: '75%' },
  { symbol: 'INFY', price: '2,010.25', change: '-15.35 (-0.75%)', isPositive: false, credits: 9.0, setBy: '75%' },
  { symbol: 'TCS', price: '2,010.25', change: '-15.35 (-0.75%)', isPositive: false, credits: 9.0, setBy: '75%' },
  { symbol: 'ONDC', price: '2,010.25', change: '-15.35 (-0.75%)', isPositive: false, credits: 9.0, setBy: '75%' },
  { symbol: 'HINDUNILVR', price: '2,010.25', change: '-15.35 (-0.75%)', isPositive: false, credits: 9.0, setBy: '75%' },
  { symbol: 'GOLDBEES', price: '2,010.25', change: '-15.35 (-0.75%)', isPositive: false, credits: 9.0, setBy: '75%' },
];

export default function CreatePortfolio() {
  const [selectedStocks, setSelectedStocks] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'stock' | 'credits'>('stock');
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
   
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

       <PortfolioNextButton  />
      </View>
    </>
  );
}
