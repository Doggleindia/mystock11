import { useState } from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Stack, router } from "expo-router";
import PortfolioHeader from "@/components/portfolio/PortfolioHeader";
import CaptainInfoBar from "../components/select-captainvc/CaptainInfoBar";
import StockHeader from "../components/select-captainvc/StockHeader";
import StockRow from "../components/select-captainvc/StockRow";
import ConfirmationButton from "../components/select-captainvc/ConfirmationButton";

export default function SelectCaptainVC() {
  const [captain, setCaptain] = useState(null);
  const [viceCaptain, setViceCaptain] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);   // first modal
  const [showSuccess, setShowSuccess] = useState(false);   // success modal

  const stocks = [
    { id: "HDFCBANK", name: "HDFCBANK", value: 2010.25, change: -15.35 },
    { id: "INFY", name: "INFY", value: 2010.25, change: -15.35 },
    { id: "TCS", name: "TCS", value: 2010.25, change: -15.35 },
  ];

  const handleSelect = (id, type) => {
    if (type === "C") setCaptain(id === captain ? null : id);
    if (type === "VC") setViceCaptain(id === viceCaptain ? null : id);
  };

  const handleJoin = () => {
    setShowConfirm(false);
    setShowSuccess(true);          // show success modal

    // after 5 seconds go to My Contest tab
    setTimeout(() => {
      setShowSuccess(false);
      router.push("/my-contest");  // 👈 adjust to your tab route
    }, 5000);
  };

  return (
    <>
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
              <Text style={{ fontWeight: "600" }}>To Pay</Text>
              <Text style={{ fontWeight: "600" }}>₹40</Text>
            </View>

            <TouchableOpacity
              style={{ backgroundColor: "green", paddingVertical: 12, borderRadius: 8, marginBottom: 12 }}
              onPress={handleJoin}
            >
              <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
                Join Contest
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowConfirm(false)}>
              <Text style={{ textAlign: "center", color: "gray" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      {/* ===== Second Modal (Success Message) ===== */}
      <Modal
        visible={showSuccess}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSuccess(false)}
      >
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ backgroundColor: "white", padding: 30, borderRadius: 12, alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>🎉 Successfully Joined!</Text>
            <Text style={{ color: "gray" }}>Redirecting to My Contest...</Text>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
}
