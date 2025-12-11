import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import BalanceHeader from "../../components/wallet/BallanceHeader";
import DateHeader from "../../components/wallet/transaction/DateHeader";
import TransactionCard from "../../components/wallet/transaction/TransactionCard";
import walletService from "../../services/walletService";

export default function MyTransactionsScreen() {
  const [activeTab, setActiveTab] = useState("Contest");
  const [activeFilter, setActiveFilter] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    txnType: '',
    purpose: '',
    status: '',
    startDate: '',
    endDate: '',
  });

  const router = useRouter();
  const tabs = ["Contest", "Withdrawals", "Deposits", "TDS"];

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      // Build params based on filters and active tab
      const params: any = {
        page: filters.page,
        limit: filters.limit,
      };

      if (activeTab === "Contest") {
        params.purpose = "contest_join";
        params.txnType = "debit";
      } else if (activeTab === "Withdrawals") {
        params.purpose = "withdrawal";
        params.txnType = "debit";
      } else if (activeTab === "Deposits") {
        params.purpose = "deposit";
        params.txnType = "credit";
      } else if (activeTab === "TDS") {
        params.purpose = "tds";
        params.txnType = "debit";
      }

      if (filters.status) params.status = filters.status;
      if (filters.startDate) params.startDate = filters.startDate;
      if (filters.endDate) params.endDate = filters.endDate;

      const response = await walletService.getTransactions(params);
      const txData = response.data || [];

      // Transform API response to match existing UI structure
      const groupedByDate: { [key: string]: any[] } = {};
      txData.forEach((tx: any) => {
        const date = new Date(tx.createdAt).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        });
        if (!groupedByDate[date]) {
          groupedByDate[date] = [];
        }
        groupedByDate[date].push({
          id: tx._id,
          type: getTransactionType(tx.purpose, activeTab),
          subtype: getTransactionSubtype(tx.purpose),
          amount: tx.txnType === 'debit' ? -Math.abs(tx.amount) : tx.amount,
          time: new Date(tx.createdAt).toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          transaction: tx,
          createdAt: tx.createdAt,
          beforeBalance: tx.beforeBalance,
          afterBalance: tx.afterBalance,
        });
      });

      setTransactions(Object.entries(groupedByDate).map(([date, txs]) => ({
        date,
        transactions: txs,
      })));
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const getTransactionType = (purpose: string, currentTab: string): string => {
    if (purpose === 'contest_join') return 'Contest';
    if (purpose === 'withdrawal') return 'Withdrawals';
    if (purpose === 'deposit') return 'Deposits';
    if (purpose === 'tds') return 'TDS';
    return currentTab;
  };

  const getTransactionSubtype = (purpose: string): string => {
    if (purpose === 'contest_join') return 'Entry Paid';
    if (purpose === 'winnings') return 'Winnings';
    return purpose || '';
  };

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
          {loading && <ActivityIndicator size="large" color="#ef4444" style={{ marginTop: 20 }} />}
          {!loading && transactions.length === 0 && (
            <View className="items-center justify-center py-8">
              <Text className="text-gray-500">No transactions found</Text>
            </View>
          )}
          {!loading && transactions.map((section, idx) => {
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
                        pathname: "/my-wallet/transaction-detail",
                        params: { transactionId: tx.id },
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
