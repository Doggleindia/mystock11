import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import BalanceHeader from "../../components/wallet/BallanceHeader";
import TransactionCard from "../../components/wallet/transaction/TransactionCard";
import DateHeader from "../../components/wallet/transaction/DateHeader";

export default function MyTransactionsScreen() {
  const [activeTab, setActiveTab] = useState("Contest");
  const [activeFilter, setActiveFilter] = useState("");
  const router = useRouter();
  const tabs = ["Contest", "Withdrawals", "Deposits", "TDS"];
  const transactionData = [
    {
      date: "01 August 2025",
      transactions: [
        {
          id: "1",
          type: "Contest",
          subtype: "Entry Paid",
          amount: -39,
          time: "02:25 PM",
          contest: "Pro Arena",
          url: "/my-wallet/transaction-detail",
        },
        {
          id: "2",
          type: "Contest",
          subtype: "Winnings",
          amount: 50,
          time: "02:25 PM",
          contest: "Pro Arena",
          url: "/my-wallet/transaction-detail",
        },
        {
          id: "7",
          type: "Withdrawals",
          amount: -100,
          time: "01:00 PM",
          contest: null,
          url: "/my-wallet/withdraw-detail",
        },
        {
          id: "8",
          type: "Deposits",
          amount: 500,
          time: "03:00 PM",
          contest: null,
          url: "/my-wallet/deposit-detail",
        },
        { id: "9", type: "TDS", amount: -5, time: "04:00 PM", contest: null },
      ],
    },
    {
      date: "30 July 2025",
      transactions: [
        {
          id: "3",
          type: "Contest",
          subtype: "Entry Paid",
          amount: -39,
          time: "02:25 PM",
          contest: "Pro Arena",
          url: "/my-wallet/transaction-detail",
        },
        {
          id: "4",
          type: "Contest",
          subtype: "Winnings",
          amount: 50,
          time: "02:25 PM",
          contest: "Pro Arena",
          url: "/my-wallet/transaction-detail",
        },
        {
          id: "5",
          type: "Withdrawals",
          amount: -200,
          time: "01:30 PM",
          contest: null,
          url: "/my-wallet/withdraw-detail",
        },
        {
          id: "6",
          type: "Deposits",
          amount: 1000,
          time: "02:45 PM",
          contest: null,
          url: "/my-wallet/deposit-detail",
        },
        { id: "10", type: "TDS", amount: -10, time: "04:30 PM", contest: null },
      ],
    },
  ];

  const filterChips = {
    Contest: ["Entry Paid", "Winnings"],
    Withdrawals: [],
    Deposits: [],
    TDS: [],
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <BalanceHeader title="My Transactions" />
      <View className="flex-1 bg-white">
        {/* Tab Buttons */}
        <View className="pt-5 px-4  flex-row bg-white border-b border-gray-200">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => {
                setActiveTab(tab);
                setActiveFilter("");
              }}
            >
              <Text
                className={`px-4 pb-2 border-b-2 ${
                  activeTab === tab
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-400"
                } text-md font-semibold`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Filter Chips for Contest only */}
        {filterChips[activeTab] && filterChips[activeTab].length > 0 && (
          <View className="flex-row bg-white px-2 py-4 border-b-2 ">
            {filterChips[activeTab].map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => setActiveFilter(filter)}
              >
                <Text
                  className={`mx-1 px-4 py-1 rounded-full border ${
                    activeFilter === filter
                      ? "border-red-500 text-red-500"
                      : "border-gray-300 text-gray-500"
                  } text-xs font-medium bg-white`}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {/* Transaction List */}
        <ScrollView>
          {transactionData.map((section, idx) => {
            // Filter by tab and chip
            const filteredTxs = section.transactions.filter((tx) => {
              if (tx.type !== activeTab) return false;
              if (filterChips[activeTab]?.length > 0 && activeFilter)
                return tx.subtype === activeFilter;
              return true;
            });
            if (filteredTxs.length === 0) return null;
            return (
              <View key={idx}>
                <DateHeader date={section.date} />
                {filteredTxs.map((tx) => (
                  <TransactionCard
                    key={tx.id}
                    tx={tx}
                    onPress={() =>
                      router.push({
                        pathname:tx.url,
                        params: { transaction: tx },
                      })
                    }
                  />
                ))}
              </View>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
}
