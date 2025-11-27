import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import ContestButton from "./ContestButton";
import ContestDetailCard from "./ContestDetailCard";
import ContestRules from "./ContestRules";
import ContestTabs from "./ContestTabs";
import Leaderboard from "./Leaderboard";
import WinningsTable from "./WinningsTable";


export default function ContestDetails(contestData: any) {
  const [activeTab, setActiveTab] = useState<"WINNINGS" | "LEADERBOARD">("WINNINGS");

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <ContestDetailCard contestData={contestData}/>
      <ContestRules />
      
      <ContestTabs 
        value={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === 'WINNINGS' ? (
        <WinningsTable />
      ) : (
        <View>
          <Leaderboard />
        </View>
      )}

      {/* Timer and Join Button at Bottom */}
    <ContestButton />
    </ScrollView>
  );
}
