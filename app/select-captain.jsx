import { useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, router } from "expo-router";
import PortfolioHeader from "@/components/portfolio/PortfolioHeader";
import CaptainInfoBar from "../components/select-captainvc/CaptainInfoBar";
import StockHeader from "../components/select-captainvc/StockHeader";
import StockRow from "../components/select-captainvc/StockRow";
import ConfirmationButton from "../components/select-captainvc/ConfirmationButton";
import usePortfolioStore from "@/store/portfolioStore";

export default function SelectCaptainVC() {
  const draftPortfolio = usePortfolioStore((state) => state.draftPortfolio);
  const updateDraftPortfolio = usePortfolioStore((state) => state.updateDraftPortfolio);

  const [captain, setCaptain] = useState(draftPortfolio?.captain ?? null);
  const [viceCaptain, setViceCaptain] = useState(draftPortfolio?.viceCaptain ?? null);

  const [showConfirm, setShowConfirm] = useState(false);

  const stocks = useMemo(() => {
    return (
      draftPortfolio?.team?.map((member) => ({
        id: member.stockSymbol,
        name: member.companyName || member.stockSymbol,
        value: member.buyPrice || 0,
        change: 0,
        changePct: 0,
      })) || []
    );
  }, [draftPortfolio]);

  const handleSelect = (id, type) => {
    if (type === "C") setCaptain(id === captain ? null : id);
    if (type === "VC") setViceCaptain(id === viceCaptain ? null : id);
  };

  const handleProceed = () => {
    if (!captain || !viceCaptain) {
      Alert.alert("Choose leaders", "Select both captain and vice captain before continuing.");
      return;
    }

    if (!draftPortfolio?.team?.length) {
      Alert.alert("No team found", "Please create a portfolio first.");
      router.replace("/create-portfolio");
      return;
    }

    updateDraftPortfolio({
      captain,
      viceCaptain,
    });

    setShowConfirm(false);
    router.push("/join-portfolio");
  };

  if (!draftPortfolio?.team?.length) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-lg font-semibold mb-2">No portfolio found</Text>
        <Text className="text-center text-gray-600 mb-6">
          Please select 11 stocks first so we can build your team.
        </Text>
        <TouchableOpacity
          onPress={() => router.replace("/create-portfolio")}
          className="bg-green-600 px-6 py-3 rounded-full"
        >
          <Text className="text-white font-semibold">Create portfolio</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <Stack.Screen options={{ headerShown: false }} />

      <View className="flex-1 bg-white">
        <PortfolioHeader timeLeft="1h : 47m" />
        <CaptainInfoBar captain={captain} viceCaptain={viceCaptain} />
        <StockHeader />

        <FlatList
          data={stocks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <StockRow
              item={item}
              captain={captain}
              viceCaptain={viceCaptain}
              onSelect={handleSelect}
            />
          )}
          ListEmptyComponent={
            <View className="py-10 items-center">
              <Text className="text-gray-500">No stocks available.</Text>
            </View>
          }
        />

        <ConfirmationButton onNext={() => setShowConfirm(true)} />
      </View>

      {/* ===== First Modal (Join Confirmation) ===== */}
      <Modal
        visible={showConfirm}
        transparent
        animationType="slide"
        onRequestClose={() => setShowConfirm(false)}
      >
        <SafeAreaView style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 16 }}>
              Confirmation
            </Text>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
              <Text>Entry</Text>
              <Text>₹50</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
              <Text style={{ color: "green" }}>Discount</Text>
              <Text style={{ color: "green" }}>-₹10</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
              <Text style={{ fontWeight: "600" }}>Captain / Vice Captain</Text>
              <Text style={{ fontWeight: "600" }}>
                {captain || "-"} / {viceCaptain || "-"}
              </Text>
            </View>

            <TouchableOpacity
              style={{ backgroundColor: "green", paddingVertical: 12, borderRadius: 8, marginBottom: 12 }}
              onPress={handleProceed}
            >
              <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
                Review & Join
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowConfirm(false)}>
              <Text style={{ textAlign: "center", color: "gray" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

    </SafeAreaView>
  );
}
