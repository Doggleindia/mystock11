import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { useAuthStore } from '../../store/authStore';

const options = [
  { label: "My information", route: "/profile/information", icon: "👤" },
  { label: "Notifications", route: "/profile/notifications", icon: "🔔" },
  { label: "Help and Support", route: "kyc/help-support", icon: "❓" },
  { label: "Terms and Policy", route: "/profile/policy", icon: "📄" },
  { label: "Logout", route: "/profile/logout", icon: "🚪" },
];

export default function ProfileHomeScreen() {
  const router = useRouter();
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const { user, fetchProfile, logout } = useAuthStore();
  
  useEffect(() => {
    fetchProfile();
  }, []);

  const handleOptionPress = (route, label) => {
    if (label === "Logout") {
      setLogoutModalVisible(true);
    } else {
      router.push(route);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setLogoutModalVisible(false);
      router.replace('/login');
    } catch (error) {
      Alert.alert('Error', error.message);
      setLogoutModalVisible(false);
    }
  };  
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-[#F6F6F6]">
        {/* Header Background */}
        <View className="bg-red-500 pt-10 pb-2 px-0 rounded-b-[18px]">
          <Text className="text-white text-lg font-bold pl-5 pb-12">Profile</Text>
        </View>

        {/* Profile Card */}
        <View className="absolute top-20 self-center w-[92%] bg-white rounded-2xl shadow-lg px-5 pt-6 pb-4 z-10">
          
          {/* Top Row - Avatar + Info + Action */}
          <View className="flex-row items-center mb-2">
            <TouchableOpacity 
              onPress={() => setPhotoModalVisible(true)} 
              className="w-16 h-16 rounded-full border-2 border-white flex justify-center items-center"
              style={{position: 'relative'}}
              activeOpacity={0.8}
            >
              <Image 
                source={{ uri: 'https://randomuser.me/api/portraits/women/10.jpg' }} 
                className="w-16 h-16 rounded-full"
              />
              <View style={{
                position: 'absolute', 
                bottom: 0, 
                right: 0, 
                backgroundColor: '#222', 
                borderRadius: 20, 
                padding: 4,
                borderWidth: 2,
                borderColor: '#fff'
              }}>
                <Image 
                  source={require('../../assets/images/camera_icon.png')} // Place a suitable camera icon in your project
                  style={{ width: 20, height: 20, tintColor: "white" }}
                />
              </View>
            </TouchableOpacity>
            <View className="ml-3 flex-1">
              <Text className="text-black text-lg font-bold">{user ? `${user.firstName} ${user.lastName}` : 'Loading...'}</Text>
              <Text className="text-gray-700 text-xs mt-0.5">Level {user?.level || 1}</Text>
            </View>
            {/* <TouchableOpacity>
              <Text className="text-2xl text-gray-400">{">"}</Text>
            </TouchableOpacity> */}
          </View>

          {/* Stats Row */}
          <View className="flex-row justify-between mt-1 mb-2">
            <View className="items-center flex-1 border border-[#EEE] rounded-lg py-2 mx-1 bg-[#FAFAFA]">
              <Text className="text-xs text-gray-500 mb-1">Contests</Text>
              <Text className="text-lg font-bold text-gray-800">{user?.totalContests || 0}</Text>
            </View>
            <View className="items-center flex-1 border border-[#EEE] rounded-lg py-2 mx-1 bg-[#FAFAFA]">
              <Text className="text-xs text-gray-500 mb-1">Win</Text>
              <Text className="text-lg font-bold text-gray-800">{user?.totalWins || 0}</Text>
            </View>
            <View className="items-center flex-1 border border-[#EEE] rounded-lg py-2 mx-1 bg-[#FAFAFA]">
              <Text className="text-xs text-gray-500 mb-1">Win Rate</Text>
              <Text className="text-lg font-bold text-gray-800">
                {user?.totalContests ? ((user.totalWins / user.totalContests) * 100).toFixed(1) : 0}%
              </Text>
            </View>
          </View>

          {/* Refer and Earn */}
          <TouchableOpacity 
            onPress={() => router.push("/profile/refer")} 
            className="flex-row items-center border border-[#EEE] rounded-lg px-3 py-2 mt-2 bg-[#FAFAFA]"
          >
            <View className="w-7 h-7 rounded-full items-center justify-center border border-[#E5E5E5] bg-white mr-3 flex-row" >
              <Text style={{fontWeight: 'bold', color: '#777'}}>₹</Text>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-gray-800 mb-0.5">Refer and earn</Text>
              <Text className="text-xs text-gray-500">Invite your friends and get ₹500</Text>
            </View>
            <View className="w-7 h-7 bg-blue-500 rounded-full items-center justify-center ml-2">
              <Text className="text-white font-bold">P</Text>
            </View>
          </TouchableOpacity>
        </View>
        
      <Modal
  transparent={true}
  visible={photoModalVisible}
  animationType="fade"
  onRequestClose={() => setPhotoModalVisible(false)}
>
  <View className="flex-1 justify-end items-center bg-black bg-opacity-20">
    <View className="w-full min-h-[36%] bg-[#F8F8F8] rounded-t-2xl px-5 pt-7 pb-7 items-center shadow relative">
      {/* Close icon */}
      <TouchableOpacity
        onPress={() => setPhotoModalVisible(false)}
        style={{position: "absolute", top: 14, right: 14, zIndex: 10}}
        hitSlop={{ top:12, left:12, right:12, bottom:12 }}
      >
        <Text style={{fontSize: 22, color: "#999"}}>×</Text>
      </TouchableOpacity>
      <Text className="font-bold text-lg mb-2 text-center">Profile Photo</Text>
      {/* Note section */}
      <View className="w-full mb-5">
        <Text className="font-bold text-xs text-gray-800 mb-1">Note</Text>
        <Text className="text-xs text-gray-600">
          Use a clear and appropriate profile photo. Inappropriate images may lead to account suspension. Your profile picture will be visible to other users.
        </Text>
      </View>
      {/* Upload buttons */}
      <TouchableOpacity className="w-full flex-row items-center py-3 px-3 mb-3 rounded border border-gray-300 bg-white"
        onPress={() => {/* gallery upload handler */}}
      >
        <Text style={{ fontSize: 18, marginRight: 8 }}>🖼️</Text>
        <Text className="text-base text-gray-700 font-bold">Upload From Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity className="w-full flex-row items-center py-3 px-3 rounded border border-gray-300 bg-white"
        onPress={() => {/* document upload handler */}}
      >
        <Text style={{ fontSize: 18, marginRight: 8 }}>📄</Text>
        <Text className="text-base text-gray-700 font-bold">From Document</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

        {/* Option List */}
       <View className="mt-60 px-5">
          {options.map((opt, idx) => (
            <TouchableOpacity
              key={idx}
              className="flex-row items-center justify-between bg-white rounded-xl px-5 py-5 mb-3 shadow"
              onPress={() => handleOptionPress(opt.route, opt.label)}
            >
              <View className="flex-row items-center">
                <Text className="text-xl mr-3">{opt.icon}</Text>
                <Text className="text-base text-gray-800">{opt.label}</Text>
              </View>
              <Text className="text-gray-400 text-xl">{'>'}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Modal
  transparent={true}
  visible={logoutModalVisible}
  animationType="fade"
  onRequestClose={() => setLogoutModalVisible(false)}
>
  <View className="flex-1 justify-end items-center bg-black bg-opacity-20">
    <View className="w-full p-6 bg-white rounded-t-2xl shadow-xl items-center">
      <Text className="font-bold text-lg text-center mb-3">Logout?</Text>
      <Text className="text-sm text-gray-700 text-center mb-1">Are you sure you want to log out?</Text>
      <Text className="text-xs text-gray-400 text-center mb-5">You won't receive updates related to your contest.</Text>
      <TouchableOpacity
        className="bg-green-600 w-full rounded mb-3 py-3 items-center"
        onPress={handleLogout}
      >
        <Text className="text-white text-base font-bold">Yes Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="border border-gray-300 bg-gray-50 w-full rounded py-3 items-center"
        onPress={() => setLogoutModalVisible(false)}
      >
        <Text className="text-base text-gray-600 font-bold">Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

    </>
  );
}
