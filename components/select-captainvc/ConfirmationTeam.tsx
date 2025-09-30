import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import Modal from "react-native-modal";

type Props = {
  visible: boolean;
  onClose: () => void;
  setShowConfirm: () => void;
  showConfirm: number;
  discount: number;
};

export default function ConfirmationTeam({
  setShowConfirm,
  showConfirm,
  onJoin,
  entryFee,
  discount,
}: Props) {
  const toPay = entryFee - discount;

  return (
   <Modal
           visible={showConfirm}
           transparent // ✅ Must be true for overlay
           animationType="slide"
           onRequestClose={() => setShowConfirm(false)}
         >
           <SafeAreaView
             style={{
               flex: 1,
               justifyContent: "flex-end",
               backgroundColor: "rgba(0,0,0,0.5)",
             }}
           >
             <View
               style={{
                 backgroundColor: "white", // ✅ White sheet
                 borderTopLeftRadius: 20,
                 borderTopRightRadius: 20,
                 padding: 24,
               }}
             >
               <Text
                 style={{
                   fontSize: 18,
                   fontWeight: "bold",
                   textAlign: "center",
                   marginBottom: 16,
                 }}
               >
                 Confirmation
               </Text>
   
               <View
                 style={{
                   flexDirection: "row",
                   justifyContent: "space-between",
                   marginBottom: 8,
                 }}
               >
                 <Text>Entry</Text>
                 <Text>₹50</Text>
               </View>
   
               <View
                 style={{
                   flexDirection: "row",
                   justifyContent: "space-between",
                   marginBottom: 8,
                 }}
               >
                 <Text style={{ color: "green" }}>Discount</Text>
                 <Text style={{ color: "green" }}>-₹10</Text>
               </View>
   
               <View
                 style={{
                   flexDirection: "row",
                   justifyContent: "space-between",
                   marginBottom: 16,
                 }}
               >
                 <Text style={{ fontWeight: "600" }}>To Pay</Text>
                 <Text style={{ fontWeight: "600" }}>₹40</Text>
               </View>
   
               <TouchableOpacity
                 style={{
                   backgroundColor: "green",
                   paddingVertical: 12,
                   borderRadius: 8,
                   marginBottom: 12,
                 }}
                 onPress={() => setShowConfirm(false)}
               >
                 <Text
                   style={{
                     color: "white",
                     textAlign: "center",
                     fontWeight: "bold",
                   }}
                 >
                   Join Contest
                 </Text>
               </TouchableOpacity>
   
               <TouchableOpacity onPress={() => setShowConfirm(false)}>
                 <Text style={{ textAlign: "center", color: "gray" }}>Cancel</Text>
               </TouchableOpacity>
             </View>
           </SafeAreaView>
         </Modal>
  );
}
