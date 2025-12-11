import {
  Stack,
  router,
  useLocalSearchParams,
  useRootNavigationState,
} from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import MarketOverview from "@/components/portfolio/MarketOverview";
import PortfolioHeader from "@/components/portfolio/PortfolioHeader";
import TableHeader from "@/components/portfolio/TableHeader";
import {
  ContestPortfolioPayload,
  createPortfolioAndJoinContest,
} from "@/services/portfolioService";
import walletService from "@/services/walletService";
import usePortfolioStore from "@/store/portfolioStore";

const PortfolioSummary = ({
  portfolio,
  index,
  isActive,
  onSelect,
}: {
  portfolio: ContestPortfolioPayload;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}) => (
  <TouchableOpacity
    onPress={onSelect}
    className={`rounded-xl border p-4 mb-4 ${
      isActive ? "border-green-500 bg-green-50" : "border-gray-200"
    }`}
  >
    <View className="flex-row justify-between mb-3">
      <Text className="font-semibold text-base">Portfolio {index + 1}</Text>
      <Text className="text-xs text-gray-500">
        {portfolio.team.length} Stocks
      </Text>
    </View>
    <View className="flex-row justify-between mb-2">
      <Text className="text-xs text-gray-500">Captain</Text>
      <Text className="text-sm font-medium">{portfolio.captain}</Text>
    </View>
    <View className="flex-row justify-between mb-3">
      <Text className="text-xs text-gray-500">Vice Captain</Text>
      <Text className="text-sm font-medium">{portfolio.viceCaptain}</Text>
    </View>
    <View className="border-t border-dashed border-gray-200 pt-3">
      {portfolio.team.map((member) => (
        <View
          key={member.stockSymbol}
          className="flex-row justify-between items-center py-1"
        >
          <View>
            <Text className="font-medium">{member.stockSymbol}</Text>
            <Text className="text-xs text-gray-500">
              {member.companyName}
            </Text>
          </View>
          <View className="items-end">
            <Text className="font-semibold">
              ₹{member.buyPrice.toFixed(2)}
            </Text>
            <Text className="text-xs text-gray-500">
              Qty: {member.quantity}
            </Text>
          </View>
        </View>
      ))}
    </View>
  </TouchableOpacity>
);

export default function JoinPortfolio() {
  const { contestId: routeContestId } =
    useLocalSearchParams<{ contestId?: string }>();
  const rootNavigationState = useRootNavigationState();

  const { draftPortfolio, clearDraftPortfolio, setLastJoinedContest } =
    usePortfolioStore();

  const [portfolios, setPortfolios] = useState<ContestPortfolioPayload[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isJoining, setIsJoining] = useState(false);

  // Stable value; don't early-return based on this
  const contestId = routeContestId || draftPortfolio?.contestId;
  const hasContest = !!contestId;

  // Hydrate portfolios from draft store
  useEffect(() => {
    if (
      draftPortfolio?.team?.length &&
      draftPortfolio?.captain &&
      draftPortfolio?.viceCaptain
    ) {
      setPortfolios([
        {
          team: draftPortfolio.team,
          captain: draftPortfolio.captain,
          viceCaptain: draftPortfolio.viceCaptain,
        },
      ]);
      setActiveIndex(0);
    }
  }, [draftPortfolio]);

  const activePortfolio = portfolios[activeIndex];

  const totalCredits = useMemo(
    () =>
      activePortfolio?.team.reduce(
        (sum, stock) => sum + stock.buyPrice * stock.quantity,
        0
      ) ?? 0,
    [activePortfolio]
  );

  const handleJoinContest = useCallback(async () => {
    if (!hasContest) {
      Alert.alert(
        "No contest",
        "No contest selected. Please go back and select a contest first."
      );
      return;
    }

    if (!activePortfolio) {
      Alert.alert(
        "No portfolio",
        "Please select or create a portfolio first."
      );
      return;
    }

    if (!activePortfolio.captain || !activePortfolio.viceCaptain) {
      Alert.alert(
        "Missing leaders",
        "Captain and vice captain are required."
      );
      return;
    }

    try {
      setIsJoining(true);

      const payload: ContestPortfolioPayload = {
        ...activePortfolio,
        team: activePortfolio.team.map((member) => ({
          ...member,
          isCaptain: member.stockSymbol === activePortfolio.captain,
          isViceCaptain:
            member.stockSymbol === activePortfolio.viceCaptain,
        })),
      };

      const joinResponse = await createPortfolioAndJoinContest(
        contestId as string,
        payload
      );

      const summaryData = joinResponse?.data;
      
      // Debit wallet amount for contest join
      let beforeBalance = 0;
      let afterBalance = 0;
      if (totalCredits > 0) {
        try {
          const debitResponse = await walletService.debit({
            amount: totalCredits,
            purpose: 'contest_join',
            meta: {
              contestId: contestId,
              portfolioId: summaryData?.portfolio?._id,
            },
          });
          
          if (debitResponse.success && debitResponse.data) {
            beforeBalance = debitResponse.data.transaction?.beforeBalance || 0;
            afterBalance = debitResponse.data.transaction?.afterBalance || 0;
            Toast.show({
              type: 'success',
              text1: 'Wallet debited',
              text2: `₹${totalCredits} debited for contest entry`,
            });
          }
        } catch (debitError: any) {
          const message =
            debitError?.response?.data?.message ||
            debitError?.message ||
            'Failed to debit wallet';
          
          // Check if insufficient balance
          if (/insufficient/i.test(message)) {
            Alert.alert('Insufficient Balance', 'Please add money to your wallet and try again.');
          } else {
            Alert.alert('Wallet Error', message);
          }
          setIsJoining(false);
          return;
        }
      }

      if (summaryData) {
        setLastJoinedContest({
          contestId: contestId as string,
          portfolio: summaryData.portfolio ?? null,
          transactionId: summaryData.transaction ?? null,
          message: joinResponse?.message,
          beforeBalance,
          afterBalance,
        });
      }

      Toast.show({
        type: "success",
        text1: "Contest joined",
        text2: "Redirecting you to My Contest…",
      });

      const doNavigate = () => {
        if (!rootNavigationState?.key) return;
        router.replace("/my-contest");
      };

      Alert.alert(
        "Joined successfully",
        joinResponse?.message ||
          "Your portfolio has been entered into the contest.",
        [{ text: "OK", onPress: doNavigate }]
      );

      clearDraftPortfolio();
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to join the contest right now.";
      console.log(error, "contest joined error");
      Alert.alert("Join failed", message);
    } finally {
      setIsJoining(false);
    }
  }, [
    activePortfolio,
    clearDraftPortfolio,
    contestId,
    hasContest,
    rootNavigationState,
    setLastJoinedContest,
  ]);

  const handleAddPortfolio = useCallback(() => {
    router.replace("/create-portfolio");
  }, []);

  const handleCloneActive = useCallback(() => {
    if (!activePortfolio) return;

    setPortfolios((prev) => {
      const cloned = JSON.parse(JSON.stringify(activePortfolio));
      const next = [...prev, cloned];
      setActiveIndex(next.length - 1);
      return next;
    });
  }, [activePortfolio]);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-white">
        {!hasContest ? (
          // Fallback UI when there is no contestId
          <View className="flex-1 items-center justify-center px-4">
            <Text className="text-center mb-3">
              No contest selected. Please go back and select a contest.
            </Text>
            <TouchableOpacity
              onPress={() => router.back()}
              className="border border-gray-200 px-4 py-2 rounded"
            >
              <Text>Go back</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <PortfolioHeader timeLeft="1h : 47m" />
            <MarketOverview
              index="NIFTY 50"
              value="24,827.45"
              change="-28.15"
              changePercent="-0.15%"
            />

            <ScrollView className="flex-1 px-4 pt-4">
              <View className="mb-4 rounded-xl bg-gray-50 p-4">
                <Text className="text-xs font-semibold text-gray-500 tracking-widest mb-1">
                  CONTEST ID
                </Text>
                <Text className="text-lg font-semibold">
                  #{contestId ? contestId.slice(-6) : "---"}
                </Text>
                <View className="mt-3 flex-row justify-between">
                  <View>
                    <Text className="text-xs text-gray-500">Entry Fee</Text>
                    <Text className="text-base font-semibold text-green-600">
                      ₹50
                    </Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-xs text-gray-500">
                      Portfolios Joined
                    </Text>
                    <Text className="text-base font-semibold">
                      {portfolios.length} / 11
                    </Text>
                  </View>
                </View>
              </View>

              <TableHeader />

              {portfolios.length > 0 ? (
                portfolios.map((portfolio, index) => (
                  <PortfolioSummary
                    key={`portfolio-${index}`}
                    portfolio={portfolio}
                    index={index}
                    isActive={index === activeIndex}
                    onSelect={() => setActiveIndex(index)}
                  />
                ))
              ) : (
                <View className="py-10 items-center">
                  <Text className="text-gray-500 mb-2">
                    No portfolios ready to join.
                  </Text>
                  <TouchableOpacity
                    onPress={handleAddPortfolio}
                    className="border border-gray-200 px-4 py-2 rounded"
                  >
                    <Text className="text-gray-700 font-semibold">
                      Create one now
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>

            <View className="bg-white border-t border-gray-100 px-4 py-4">
              <View className="flex-row justify-between mb-3">
                <Text className="text-sm text-gray-500">Credits in play</Text>
                <Text className="text-base font-semibold">
                  ₹{totalCredits.toFixed(2)}
                </Text>
              </View>

              {portfolios.length > 0 && (
                <TouchableOpacity
                  onPress={handleCloneActive}
                  className="mb-3 rounded-lg border border-dashed border-green-500 py-3"
                >
                  <Text className="text-center font-semibold text-green-600">
                    Duplicate active portfolio
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={handleAddPortfolio}
                className="mb-3 rounded-lg border border-gray-200 py-3"
              >
                <Text className="text-center font-semibold text-gray-800">
                  Create another portfolio
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleJoinContest}
                disabled={isJoining}
                className={`rounded-lg py-3 ${
                  isJoining ? "bg-green-300" : "bg-green-600"
                }`}
              >
                <Text className="text-center font-semibold text-white">
                  {isJoining ? "Joining..." : "Join contest"}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
