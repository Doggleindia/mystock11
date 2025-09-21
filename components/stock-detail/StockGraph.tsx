import React from "react";
import { View, Text } from "react-native";

interface Props {
  data: number[];
  labels: string[];
}

export default function StockGraph({ data, labels }: Props) {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;

  return (
    <View className="bg-white p-4 rounded-lg mb-4">
      <Text className="text-lg font-medium mb-4">Price Movement</Text>
      
      <View className="h-[220px] border-b border-l border-gray-200">
        {/* Y-axis values */}
        <View className="absolute left-0 top-0 bottom-4 justify-between">
          <Text className="text-xs text-gray-500">?{maxValue.toFixed(2)}</Text>
          <Text className="text-xs text-gray-500">?{((maxValue + minValue) / 2).toFixed(2)}</Text>
          <Text className="text-xs text-gray-500">?{minValue.toFixed(2)}</Text>
        </View>

        {/* Graph Area */}
        <View className="flex-1 ml-12 mr-2">
          {/* Grid Lines */}
          <View className="absolute left-0 right-0 top-0 bottom-0">
            <View className="border-t border-gray-100 h-1/4" />
            <View className="border-t border-gray-100 h-1/4" />
            <View className="border-t border-gray-100 h-1/4" />
            <View className="border-t border-gray-100 h-1/4" />
          </View>

          {/* Data Bars */}
          <View className="flex-row items-end absolute left-0 right-0 bottom-0 h-full">
            {data.map((value, index) => {
              const height = ((value - minValue) / range) * 100;
              return (
                <View 
                  key={index} 
                  className="flex-1"
                >
                  <View 
                    className="bg-blue-500 w-1 mx-auto rounded-t"
                    style={{ height: `${height}%` }}
                  />
                </View>
              );
            })}
          </View>
        </View>

        {/* X-axis labels */}
        <View className="flex-row justify-between ml-12 mr-2 mt-2">
          {labels.map((label, index) => (
            <Text key={index} className="text-xs text-gray-500">
              {label}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}
