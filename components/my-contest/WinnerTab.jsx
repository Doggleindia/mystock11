import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";

const WinnerTab = ({ winners: winnersProp = [] }) => {
  const [selectedWinner, setSelectedWinner] = useState(null);
  const winners = winnersProp && winnersProp.length ? winnersProp : [
    {
      id: "1",
      name: "Akshay Kumar",
      portfolio: "Portfolio 1",
      prize: "₹2.5 Lakhs",
      pool: "₹20 Lakhs",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: "2",
      name: "Salman Khan",
      portfolio: "Portfolio 1",
      prize: "₹1 Lakh",
      pool: "₹20 Lakhs",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: "3",
      name: "Amitab Bachan",
      portfolio: "Portfolio 2",
      prize: "₹50,000",
      pool: "₹20 Lakhs",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: "4",
      name: "Amir Khan",
      portfolio: "Portfolio 5",
      prize: "₹25,000",
      pool: "₹20 Lakhs",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      id: "5",
      name: "Priyanka Chopra",
      portfolio: "Portfolio 3",
      prize: "₹25,000",
      pool: "₹20 Lakhs",
      image: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
      id: "6",
      name: "Deepika Padukone",
      portfolio: "Portfolio 4",
      prize: "₹25,000",
      pool: "₹20 Lakhs",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      id: "7",
      name: "Ranveer Singh",
      portfolio: "Portfolio 2",
      prize: "₹7,000",
      pool: "₹20 Lakhs",
      image: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
      id: "8",
      name: "Kareena Kapoor",
      portfolio: "Portfolio 2",
      prize: "₹5,000",
      pool: "₹20 Lakhs",
      image: "https://randomuser.me/api/portraits/women/8.jpg",
    },
    {
      id: "9",
      name: "Hrithik Roshan",
      portfolio: "Portfolio 3",
      prize: "₹2,000",
      pool: "₹20 Lakhs",
      image: "https://randomuser.me/api/portraits/men/9.jpg",
    },
    {
      id: "10",
      name: "Alia Bhatt",
      portfolio: "Portfolio 1",
      prize: "₹2,000",
      pool: "₹20 Lakhs",
      image: "https://randomuser.me/api/portraits/women/10.jpg",
    },
  ];


  return (
    <View className="bg-white rounded-xl shadow-sm p-4 mb-4">
      <Text className="text-gray-700 font-semibold mb-3">
        Top winners in this contest
      </Text>

      {/* List */}
      {winners.map((w) => (
        <TouchableOpacity
          key={w.id}
          className="flex-row justify-between items-center py-3 border-b border-gray-200"
          onPress={() => setSelectedWinner(w)} // 👈 open modal
        >
          <View className="flex-row items-center flex-1">
            <Image
              source={{ uri: w.image }}
              className="w-10 h-10 rounded-full mr-3"
            />
            <View>
              <Text className="font-semibold text-gray-800">{w.name}</Text>
              <Text className="text-gray-500 text-xs">{w.portfolio}</Text>
            </View>
          </View>

          <View className="items-end">
            <Text className="font-bold text-sm text-gray-800">{w.prize}</Text>
            <Text className="text-gray-400 text-xs">Pool: {w.pool}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* View More */}
      <TouchableOpacity className="bg-gray-200 py-3 rounded-lg mt-4">
        <Text className="text-center font-semibold text-gray-800">
          View More
        </Text>
      </TouchableOpacity>

      {/* Modal Popup */}
      <Modal
        visible={!!selectedWinner}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedWinner(null)}
      >
        <View className="flex-1 bg-black/40 justify-center items-center">
          <View className="bg-white w-11/12 rounded-xl p-6 shadow-lg">
            {selectedWinner && (
              <>
                {/* Profile */}
                <View className="items-center mb-4">
                  <Image
                    source={{ uri: selectedWinner.image }}
                    className="w-20 h-20 rounded-full mb-3"
                  />
                  <Text className="text-lg font-bold text-gray-800">
                    {selectedWinner.name}
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    {selectedWinner.portfolio}
                  </Text>
                </View>

                {/* Details */}
                <View className="space-y-2 mb-4">
                  <Text className="text-gray-700 text-base">
                    🏆 Prize:{" "}
                    <Text className="font-semibold text-green-600">
                      {selectedWinner.prize}
                    </Text>
                  </Text>
                  <Text className="text-gray-700 text-base">
                    🎯 Price Pool:{" "}
                    <Text className="font-semibold">
                      {selectedWinner.pool}
                    </Text>
                  </Text>
                </View>

                {/* Close Button */}
                <Pressable
                  className="bg-red-500 py-3 rounded-lg"
                  onPress={() => setSelectedWinner(null)}
                >
                  <Text className="text-white text-center font-semibold">
                    Close
                  </Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default WinnerTab;
