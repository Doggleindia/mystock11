// src/components/StockRow.tsx
import { View, Text, TouchableOpacity } from "react-native";

export default function StockRow({ item, captain, viceCaptain, onSelect }) {
  const isCaptain = captain === item.id;
  const isViceCaptain = viceCaptain === item.id;

  return (
    <View className="flex-row items-center border-b border-gray-200 px-4 py-3">
      {/* Left: Name */}
      <View className="flex-1">
        <Text className="text-sm font-semibold">{item.name}</Text>
        <Text className="text-xs text-gray-500">Set by {item.sellBy}%</Text>
      </View>

      {/* Middle: Stock value */}
      <View className="items-end mr-3">
        <Text className="text-red-600 font-bold">{item.value.toFixed(2)}</Text>
        <Text className="text-xs text-gray-500">
          {item.change} ({item.changePct}%)
        </Text>
      </View>

      {/* Buttons + % */}
      <View className="flex-row">
        <View className="items-center mr-2">
          <TouchableOpacity
            onPress={() => onSelect(item.id, "C")}
            className={`border px-3 py-1 rounded-full ${
              isCaptain ? "bg-red-600 border-red-600" : "border-gray-300"
            }`}
          >
            <Text
              className={`text-xs ${isCaptain ? "text-white" : "text-black"}`}
            >
              C
            </Text>
          </TouchableOpacity>
          <Text className="text-xs text-gray-500 mt-1">4.5%</Text>
        </View>

        <View className="items-center">
          <TouchableOpacity
            onPress={() => onSelect(item.id, "VC")}
            className={`border px-3 py-1 rounded-full ${
              isViceCaptain ? "bg-gray-800 border-gray-800" : "border-gray-300"
            }`}
          >
            <Text
              className={`text-xs ${isViceCaptain ? "text-white" : "text-black"}`}
            >
              VC
            </Text>
          </TouchableOpacity>
          <Text className="text-xs text-gray-500 mt-1">4.5%</Text>
        </View>
      </View>
    </View>
  );
}
