import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

type Contestant = {
  id: string;
  name: string;
  avatar: string;
  pnl?: string;
  rank?: string;
};

const contestants: Contestant[] = [
  {
    id: '1',
    name: 'Salman Khan- 1',
    avatar: 'https://ui-avatars.com/api/?name=SK&background=FF5733&color=fff',
    pnl: '-',
    rank: '-',
  },
  {
    id: '2',
    name: 'Sharuk- 1',
    avatar: 'https://ui-avatars.com/api/?name=SH&background=C70039&color=fff',
    pnl: '-',
    rank: '-',
  },
  {
    id: '3',
    name: 'Rekha- 1',
    avatar: 'https://ui-avatars.com/api/?name=RE&background=900C3F&color=fff',
    pnl: '-',
    rank: '-',
  },
  {
    id: '4',
    name: 'Amitabh- 1',
    avatar: 'https://ui-avatars.com/api/?name=AM&background=45B39D&color=fff',
    pnl: '-',
    rank: '-',
  },
];

const Leaderboard = () => {
  return (
    <View className="bg-white rounded-lg shadow-sm mx-4 mt-4">
      {/* Table Header */}
      <View className="flex-row px-4 py-3 border-b border-gray-100">
        <Text className="flex-1 font-medium text-gray-600">Contestant</Text>
        <Text className="w-20 text-right font-medium text-gray-600">P&L</Text>
        <Text className="w-16 text-right font-medium text-gray-600">Rank</Text>
      </View>

      {/* Table Body */}
      <ScrollView className="max-h-60">
        {contestants.map((contestant) => (
          <View 
            key={contestant.id}
            className="flex-row items-center px-4 py-2.5 border-b border-gray-50"
          >
            <View className="flex-row items-center flex-1">
              <Image
                source={{ uri: contestant.avatar }}
                className="w-8 h-8 rounded-full bg-gray-200"
              />
              <Text className="ml-3 text-gray-700">{contestant.name}</Text>
            </View>
            <Text className="w-20 text-right text-gray-700">{contestant.pnl}</Text>
            <Text className="w-16 text-right text-gray-700">{contestant.rank}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Leaderboard;
