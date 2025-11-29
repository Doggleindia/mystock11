import Header from "@/components/my-contest/Header";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const contests = () => {
  return (
    <>
      <Header title="My Contest" />
      <ScrollView className="bg-gray-100 flex-1">
        <View className="p-4">
          <Text className="text-gray-600">No contests available yet.</Text>
        </View>
      </ScrollView>
    </>
  );
};

export default contests;
