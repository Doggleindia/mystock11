import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import ContestButton from "./ContestButton";
import ContestDetailCard from "./ContestDetailCard";
import ContestRules from "./ContestRules";
import ContestTabs from "./ContestTabs";
import Leaderboard from "./Leaderboard";
import WinningsTable from "./WinningsTable";
import { useRouter } from "expo-router";


export default function ContestDetails({ contestData }: { contestData: any }) {
  const [activeTab, setActiveTab] = useState<"WINNINGS" | "LEADERBOARD">("WINNINGS");
  const router = useRouter();

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

      {/* Join / View My Contest Button at Bottom */}
      <ContestButton
        contestId={contestData?._id}
        entryFee={contestData?.entryFee}
        onPress={() => {
          // Navigate to create portfolio with contest ID
          if (contestData?._id) {
            router.push({
              pathname: "/create-portfolio",
              params: { contestId: contestData._id },
            });
          } else {
            router.push("/create-portfolio");
          }
        }}
      />
    </ScrollView>
  );
}
