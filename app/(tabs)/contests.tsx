import ContestCard from "@/components/my-contest/ContestCard";
import ContestTabs from "@/components/my-contest/ContestTabs";
import Header from "@/components/my-contest/Header";

import React from "react";
import { ScrollView } from "react-native";

const contests = () => {
  return (
    <>
      <Header title="My Contest" />
      <ScrollView className="bg-gray-100">
        <ContestTabs />
      </ScrollView>
    </>
  );
};

export default contests;
