import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Circle, Line, Path, Polyline, Rect, Svg } from "react-native-svg";
import { useAuthStore } from "../../store/authStore";

// --- SVG Icons for React Native ---
// Using react-native-svg. Tailwind classes don't apply here, so props are passed directly.

const BackArrowIcon = () => (
  <Svg
    height="24"
    width="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FFFFFF"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M15 18l-6-6 6-6" />
  </Svg>
);

const WalletIcon = () => (
  <Svg
    height="32"
    width="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#4B5563"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M20 12V8H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
    <Path d="M4 6v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
    <Path d="M18 12a2 2 0 0 0-2 2h-4a2 2 0 0 0 0 4h4a2 2 0 0 0 2-2v-4Z" />
  </Svg>
);

const InfoIcon = () => (
  <Svg
    height="16"
    width="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#9CA3AF"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Circle cx="12" cy="12" r="10"></Circle>
    <Line x1="12" y1="16" x2="12" y2="12"></Line>
    <Line x1="12" y1="8" x2="12.01" y2="8"></Line>
  </Svg>
);

const ChevronRightIcon = () => (
  <Svg
    height="20"
    width="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#9CA3AF"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="m9 18 6-6-6-6" />
  </Svg>
);

const TransactionsIcon = () => (
  <Svg
    height="24"
    width="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#6B7280"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <Path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <Path d="M18 12a2 2 0 0 0-2 2h-4a2 4 0 0 0 0 4h4a2 2 0 0 0 2-2v-4Z" />
  </Svg>
);

const KycIcon = () => (
  <Svg
    height="24"
    width="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#6B7280"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></Path>
    <Path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></Path>
  </Svg>
);

const PaymentIcon = () => (
  <Svg
    height="24"
    width="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#6B7280"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Rect width="20" height="14" x="2" y="5" rx="2"></Rect>
    <Line x1="2" x2="22" y1="10" y2="10"></Line>
  </Svg>
);

const HelpIcon = () => (
  <Svg
    height="24"
    width="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#6B7280"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Circle cx="12" cy="12" r="10"></Circle>
    <Path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></Path>
    <Path d="M12 17h.01"></Path>
  </Svg>
);

const WithdrawalHistoryIcon = () => (
  <Svg
    height={24}
    width={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#6B7280"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <Polyline points="14,2 14,8 20,8" />
    <Line x1="16" y1="13" x2="8" y2="13" />
    <Line x1="16" y1="17" x2="8" y2="17" />
    <Polyline points="10,9 9,9 8,9" />
  </Svg>
);

const TDSIcon = () => (
  <Svg
    height="24"
    width="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#6B7280"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></Path>
  </Svg>
);

// --- Reusable Components ---

const Header = ({ title }) => (
  <View className="bg-red-500 flex-row items-center px-4 py-3">
    <TouchableOpacity className="mr-3">
      <BackArrowIcon />
    </TouchableOpacity>
    <Text className="text-white text-lg font-semibold">{title}</Text>
  </View>
);

const BalanceInfoRow = ({
  label,
  amount,
  actionComponent,
  tooltipContent,
  isLast,
}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <View
      className={`flex-row justify-between items-center py-3 ${
        !isLast ? "border-b border-gray-200" : ""
      }`}
    >
      <View>
        <View className="flex-row items-center">
          <Text className="text-gray-600 text-xs">{label}</Text>
          <TouchableOpacity
            onPress={() => setTooltipVisible(true)}
            className="ml-1 relative"
          >
            <InfoIcon />
          </TouchableOpacity>
        </View>
        <Text className="text-gray-900 font-bold text-base mt-0.5">
          ₹{amount}
        </Text>
      </View>
      {actionComponent}

      <Modal
        animationType="fade"
        transparent={true}
        visible={tooltipVisible}
        onRequestClose={() => setTooltipVisible(false)}
      >
        <TouchableOpacity
          className="flex-1 justify-center items-center bg-black/50"
          activeOpacity={1}
          onPressOut={() => setTooltipVisible(false)}
        >
          <View className="bg-gray-900 p-4 rounded-lg mx-8 max-w-xs">
            <Text className="text-white text-sm leading-5">
              {tooltipContent}
            </Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};



// --- Main App Component ---

export default function App() {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        await useAuthStore.getState().fetchProfile();
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  // Extract balance data from user
  const walletBalance = user?.user?.walletBalance || 0;
  const winningsBalance = user?.user?.winningsBalance || 0;
  const totalBalance = walletBalance + winningsBalance;

  const unutilisedTooltip = `Unused Deposits: ₹${walletBalance}\nDiscount Balance: ₹0`;
  const winningsTooltip = `Play Winnings: ₹0\nWithdrawal Winnings: ₹${winningsBalance}`;
  const bonusTooltip = "Discount to join public contest";

  const addbalance = () => {
    router.push("/my-wallet/add-balance");
  };
  const MyTransactions = () => {
    router.push("/my-wallet/transaction");
  };
  const KycDetials = () => {
    router.push("/kyc/kyc-details");
  };
  const WithdrawMoney = () => {
    router.push("/my-wallet/withdraw");
  };
  const WithdrawHistory = () => {
    router.push("/my-wallet/withdraw-history");
  };
  const TDSHistory = () => {
    router.push("/my-wallet/tds-history");
  };
  const HelpAndSupport = () => {
    router.push("/kyc/help-support");
  };
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" backgroundColor="#EF4444" />
      <Header title="My Balance" />
      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Balance Card */}
          <View className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
            <View className="flex-row justify-between items-start pb-3 border-b border-gray-200">
              <View className="flex-row items-center">
                <View className="bg-gray-50 p-2 rounded-lg mr-3">
                  <WalletIcon />
                </View>
                <View>
                  <Text className="text-gray-600 text-xs mb-1">
                    Current Balance
                  </Text>
                  <Text className="text-2xl font-bold text-gray-900">
                    ₹{totalBalance.toFixed(2)}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={addbalance}
                className="bg-green-600 py-2 px-5 rounded-lg"
              >
                <Text className="text-white font-semibold text-sm">
                  Add Cash
                </Text>
              </TouchableOpacity>
            </View>

            <View className="pt-1">
              <BalanceInfoRow
                label="Amount Unutilised"
                amount={walletBalance.toFixed(2)}
                tooltipContent={unutilisedTooltip}
              />
              <BalanceInfoRow
                label="Winnings"
                amount={winningsBalance.toFixed(2)}
                tooltipContent={winningsTooltip}
                actionComponent={
                  !user?.user?.isKycCompleted ? (
                    <TouchableOpacity 
                      onPress={KycDetials}
                      className="border border-gray-400 py-1 px-3 rounded"
                    >
                      <Text className="text-gray-700 text-xs font-medium">
                        Verify to withdraw
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity 
                      onPress={WithdrawMoney}
                      className="bg-red-500 py-1 px-3 rounded"
                    >
                      <Text className="text-white text-xs font-medium">
                        Withdraw
                      </Text>
                    </TouchableOpacity>
                  )
                }
              />
              <BalanceInfoRow
                label="Discount Bonus"
                amount="0"
                tooltipContent={bonusTooltip}
                isLast={true}
              />
            </View>
          </View>

          {/* Navigation Items */}
          <View>
            <TouchableOpacity
              onPress={MyTransactions}
              className="bg-white rounded-lg border border-gray-200 p-4 flex-row items-center justify-between mb-2.5"
            >
              <View className="flex-row items-center">
                <View className="mr-3">
                  <TransactionsIcon />
                </View>
                <Text className="text-gray-800 text-sm font-medium">
                  My Transactions
                </Text>
              </View>
              <ChevronRightIcon />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={WithdrawHistory}
              className="bg-white rounded-lg border border-gray-200 p-4 flex-row items-center justify-between mb-2.5"
            >
              <View className="flex-row items-center">
                <View className="mr-3">
                  <WithdrawalHistoryIcon />
                </View>
                <Text className="text-gray-800 text-sm font-medium">
                  Withdrawal History
                </Text>
              </View>
              <ChevronRightIcon />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={TDSHistory}
              className="bg-white rounded-lg border border-gray-200 p-4 flex-row items-center justify-between mb-2.5"
            >
              <View className="flex-row items-center">
                <View className="mr-3">
                  <TDSIcon />
                </View>
                <Text className="text-gray-800 text-sm font-medium">
                  TDS History
                </Text>
              </View>
              <ChevronRightIcon />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={KycDetials}
              className="bg-white rounded-lg border border-gray-200 p-4 flex-row items-center justify-between mb-2.5"
            >
              <View className="flex-row items-center">
                <View className="mr-3">
                  <KycIcon />
                </View>
                <Text className="text-gray-800 text-sm font-medium">
                  KYC Details
                </Text>
              </View>
              <ChevronRightIcon />
            </TouchableOpacity>

            {/* <TouchableOpacity
              onPress={() => navigation.navigate("ManagePayment")}
              className="bg-white rounded-lg border border-gray-200 p-4 flex-row items-center justify-between mb-2.5"
            >
              <View className="flex-row items-center">
                <View className="mr-3">
                  <PaymentIcon />
                </View>
                <Text className="text-gray-800 text-sm font-medium">
                  Manage Payment
                </Text>
              </View>
              <ChevronRightIcon />
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={HelpAndSupport}
              className="bg-white rounded-lg border border-gray-200 p-4 flex-row items-center justify-between mb-2.5"
            >
              <View className="flex-row items-center">
                <View className="mr-3">
                  <HelpIcon />
                </View>
                <Text className="text-gray-800 text-sm font-medium">
                  Help and Support
                </Text>
              </View>
              <ChevronRightIcon />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
