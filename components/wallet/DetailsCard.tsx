import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function DetailsCard({ amount }: { amount: number }) {
  const [open, setOpen] = useState(true);

  return (
   <View
  className="
    bg-white 
    rounded-xl 
    shadow-sm 
    mt-4 
    px-4 
    py-3 
    border       /* 👈 add this */
    border-gray-200 /* 👈 choose your color */
  "
>
  {/* Top row with toggle */}
  <TouchableOpacity
    className="flex-row justify-between items-center"
    onPress={() => setOpen(!open)}
  >
    <Text className="text-gray-800 font-medium">Add to current balance</Text>
  <View className="flex-row items-center">
          <Text className="text-gray-800 font-medium mr-2">₹{amount}.00</Text>
          <Ionicons
            name={open ? "chevron-up" : "chevron-down"}
            size={18}
            color="#555"
          />
        </View>
  </TouchableOpacity>

  {/* Extra rows visible only when open */}
  {open && (
    <View className="mt-3 space-y-2">
      <View className="flex-row justify-between">
        <Text className="text-gray-500">28% GST on Deposit</Text>
        <Text className="text-red-500">-₹22.00</Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="text-gray-500">Onestock promo cash</Text>
        <Text className="text-green-500">+₹22.00</Text>
      </View>
      <View className="flex-row justify-between pt-1">
        <Text className="font-semibold text-gray-700">Grand total</Text>
        <Text className="font-semibold text-green-600">+₹{amount}.00</Text>
      </View>
    </View>
  )}
</View>

  );
}
