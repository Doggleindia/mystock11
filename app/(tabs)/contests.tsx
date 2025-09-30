import ContestCard from '@/components/my-contest/ContestCard'
import ContestTabs from '@/components/my-contest/ContestTabs'
import Header from '@/components/my-contest/Header'

import React from 'react'
import { ScrollView } from 'react-native'

const contests = () => {
  return (
    <>
    <Header title='My Contest'/>
      <ScrollView className="bg-gray-100">
      <ContestTabs />
   <ContestCard
  data={{
    id: "1",
    title: "Beginner’s Arena",
    prizePool: 50000,
    entryFee: 50,
    timeLeft: "1h : 47m",
    startTime: "3:20 PM",
    position: 12,
    pnl: 0.40,
    spotsFilled: 20,
    totalSpots: 250,
    winRate: 40,
    medalPrize: 25000,
  }}
/>


     <ContestCard
  data={{
    id: "1",
    title: "Beginner’s Arena",
    prizePool: 50000,
    entryFee: 50,
    timeLeft: "1h : 47m",
    startTime: "3:20 PM",
    position: 12,
    pnl: 0.40,
    spotsFilled: 20,
    totalSpots: 250,
    winRate: 40,
    medalPrize: 25000,
  }}
/>


    </ScrollView>
    </>
  )
}

export default contests