import * as ImagePicker from 'expo-image-picker';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  const { user, logout, fetchProfile, uploadAvatar } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  
  // Fetch profile data on component mount
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        await fetchProfile();
      } catch (err) {
        console.error('Error loading profile:', err);
        setError(err.message || 'Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileData();
  }, [fetchProfile]);

  const handlePhotoUpload = async (useCamera = false) => {
    try {
      setUploadingPhoto(true);
      
      let result;
      if (useCamera) {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (permission.status !== 'granted') {
          Alert.alert('Permission Denied', 'We need camera permission to take photos');
          setUploadingPhoto(false);
          return;
        }
        result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
      } else {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permission.status !== 'granted') {
          Alert.alert('Permission Denied', 'We need permission to access your gallery');
          setUploadingPhoto(false);
          return;
        }
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
      }

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const uri = asset.uri;
        const filename = uri.split('/').pop() || 'avatar_' + Date.now() + '.jpg';
        const type = asset.mimeType || 'image/jpeg';
        
        // For web (blob URIs), fetch the blob; for native, use uri directly
        const formData = new FormData();
        
        if (uri.startsWith('blob:')) {
          // Web platform - fetch blob and append
          const response = await fetch(uri);
          const blob = await response.blob();
          formData.append('profileCover', blob, filename);
        } else {
          // Native platform - append uri object
          formData.append('profileCover', {
            uri: uri,
            type: type,
            name: filename,
          });
        }

        console.log('Uploading photo:', { uri, filename, type, isBlob: uri.startsWith('blob:') });
        await uploadAvatar(formData);
        await fetchProfile(); // Refresh profile data
        Alert.alert('Success', 'Profile photo updated successfully');
        setPhotoModalVisible(false);
      }
    } catch (err) {
      console.error('Photo upload error:', err);
      Alert.alert('Error', err.message || 'Failed to upload photo');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleOptionPress = (route, label) => {
    if (label === "Logout") {
      setLogoutModalVisible(true);
    } else {
      router.push(route);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
      setLogoutModalVisible(false);
      router.replace('/Login');
    } catch (error) {
      Alert.alert('Error', error.message || 'Logout failed');
      setLogoutModalVisible(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#007AFF" />
        <Text className="mt-4 text-gray-600">Loading profile...</Text>
      </View>
    );
  }

  // Render error state
  if (error) {
    return (
      <View className="flex-1 bg-white justify-center items-center px-5">
        <Stack.Screen options={{ headerShown: false }} />
        <Text className="text-red-500 text-center text-base mb-4">{error}</Text>
        <TouchableOpacity 
          className="bg-blue-500 px-6 py-3 rounded-lg"
          onPress={() => router.replace('/Login')}
        >
          <Text className="text-white font-bold">Return to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
      <ScrollView className="flex-1 bg-gray-100">
        <Stack.Screen options={{ headerShown: false }} />
        
        {/* Header Background */}
        <View className="bg-red-500 pt-10 pb-16 px-0 rounded-b-3xl">
        <Text className="text-white text-lg font-bold pl-5">Profile</Text>
      </View>

      {/* Profile Card */}
      <View className="w-full px-4 -mt-12 mb-4">
        <View className="bg-white rounded-2xl shadow-lg px-5 pt-6 pb-4">
          
          {/* Top Row - Avatar + Info */}
          <View className="flex-row items-center mb-4">
            <TouchableOpacity 
              onPress={() => setPhotoModalVisible(true)} 
              className="w-16 h-16 rounded-full border-2 border-white flex justify-center items-center relative"
              activeOpacity={0.8}
            >
              <Image 
                source={{ uri: user?.user?.profileCover  }} 
                className="w-16 h-16 rounded-full"
              />
              <View className="absolute bottom-0 right-0 bg-gray-800 rounded-full p-1 border-2 border-white">
                <Image 
                  source={require('../../assets/images/camera_icon.png')}
                  style={{ width: 16, height: 16, tintColor: "white" }}
                />
              </View>
            </TouchableOpacity>
            <View className="ml-3 flex-1">
              <Text className="text-black text-lg font-bold">
                {user ? `${user?.user?.firstName} ${user?.user?.lastName}`.trim() : 'User'}
              </Text>
              <Text className="text-gray-600 text-xs mt-1">Level {user?.stats?.level || 1}</Text>
            </View>
          </View>

          {/* Stats Row */}
          <View className="flex-row justify-between gap-2 mb-3">
            <View className="items-center flex-1 border border-gray-200 rounded-lg py-3 bg-gray-50">
              <Text className="text-xs text-gray-600 mb-1 font-semibold">Contests</Text>
              <Text className="text-base font-bold text-gray-900">{user?.stats?.totalContests || 0}</Text>
            </View>
            <View className="items-center flex-1 border border-gray-200 rounded-lg py-3 bg-gray-50">
              <Text className="text-xs text-gray-600 mb-1 font-semibold">Wins</Text>
              <Text className="text-base font-bold text-gray-900">{user?.stats?.totalWins || 0}</Text>
            </View>
            <View className="items-center flex-1 border border-gray-200 rounded-lg py-3 bg-gray-50">
              <Text className="text-xs text-gray-600 mb-1 font-semibold">Win Rate</Text>
              <Text className="text-base font-bold text-gray-900">
                {user?.stats?.totalContests ? ((user?.stats?.totalWins / user?.stats?.totalContests) * 100).toFixed(1) : 0}%
              </Text>
            </View>
          </View>

          {/* Earnings Display */}
          <View className="flex-row items-center border border-gray-200 rounded-lg px-3 py-3 mb-2 bg-gray-50">
            <View className="w-8 h-8 rounded-full items-center justify-center border border-gray-300 bg-white mr-3">
              <Text className="font-bold text-green-600 text-sm">₹</Text>
            </View>
            <View className="flex-1">
              <Text className="text-xs text-gray-600 font-semibold">Total Earnings</Text>
              <Text className="text-sm font-bold text-gray-900">₹{(user?.stats?.totalEarnings || 0).toLocaleString()}</Text>
            </View>
          </View>

          {/* Refer and Earn */}
          <TouchableOpacity 
            onPress={() => router.push("/profile/refer")} 
            className="flex-row items-center border border-gray-200 rounded-lg px-3 py-3 bg-blue-50 active:bg-blue-100"
            activeOpacity={0.7}
          >
            <View className="w-8 h-8 rounded-full items-center justify-center border border-blue-300 bg-blue-100 mr-3">
              <Text className="font-bold text-blue-600 text-sm">₹</Text>
            </View>
            <View className="flex-1">
              <Text className="text-xs text-gray-700 font-semibold">Refer and Earn</Text>
              <Text className="text-xs text-gray-600">Invite friends and get ₹500</Text>
            </View>
            <Text className="text-gray-400 text-lg">›</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Photo Modal */}
      <Modal
        transparent={true}
        visible={photoModalVisible}
        animationType="fade"
        onRequestClose={() => setPhotoModalVisible(false)}
      >
        <View className="flex-1 justify-end items-center bg-black bg-opacity-30">
          <View className="w-full bg-white rounded-t-3xl px-5 pt-6 pb-8 items-center">
            <TouchableOpacity
              onPress={() => setPhotoModalVisible(false)}
              className="absolute top-4 right-4 w-8 h-8 items-center justify-center"
              hitSlop={{ top: 12, left: 12, right: 12, bottom: 12 }}
            > 
              <Text className="text-2xl text-gray-400">×</Text>
            </TouchableOpacity>
            
            <Text className="font-bold text-lg mb-4 text-center text-gray-900">Update Profile Photo</Text>
            
            <View className="w-full mb-6">
              <Text className="font-semibold text-xs text-gray-900 mb-2">Guidelines</Text>
              <Text className="text-xs text-gray-600 leading-5">
                Use a clear, professional photo. Inappropriate images may lead to account suspension. Your profile picture will be visible to other users in contests.
              </Text>
            </View>
            
            <TouchableOpacity 
              className="w-full flex-row items-center py-3 px-4 mb-2 rounded-lg border border-gray-300 bg-gray-50 active:bg-gray-100"
              onPress={() => handlePhotoUpload(false)}
              activeOpacity={0.7}
              disabled={uploadingPhoto}
            >
              <Text className="text-xl mr-3">🖼️</Text>
              <Text className="text-sm text-gray-800 font-semibold">
                {uploadingPhoto ? 'Uploading...' : 'Upload From Gallery'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="w-full flex-row items-center py-3 px-4 rounded-lg border border-gray-300 bg-gray-50 active:bg-gray-100"
              onPress={() => handlePhotoUpload(true)}
              activeOpacity={0.7}
              disabled={uploadingPhoto}
            >
              <Text className="text-xl mr-3">📸</Text>
              <Text className="text-sm text-gray-800 font-semibold">
                {uploadingPhoto ? 'Uploading...' : 'Take a Photo'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Option List */}
      <View className="px-4 pb-20">
        <Text className="text-xs font-semibold text-gray-600 mb-3 pl-1">SETTINGS</Text>
        {options.map((opt, idx) => (
          <TouchableOpacity
            key={idx}
            className="flex-row items-center justify-between bg-white rounded-lg px-4 py-4 mb-2 border border-gray-200 active:bg-gray-50"
            onPress={() => handleOptionPress(opt.route, opt.label)}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center flex-1">
              <Text className="text-xl mr-3">{opt.icon}</Text>
              <Text className="text-sm text-gray-800 font-medium">{opt.label}</Text>
            </View>
            <Text className="text-gray-400 text-lg">›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Modal */}
      <Modal
        transparent={true}
        visible={logoutModalVisible}
        animationType="fade"
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-40">
          <View className="w-5/6 bg-white rounded-2xl px-6 py-8 items-center shadow-lg">
            <View className="w-12 h-12 rounded-full bg-red-100 items-center justify-center mb-4">
              <Text className="text-2xl">⚠️</Text>
            </View>
            
            <Text className="font-bold text-lg text-center mb-2 text-gray-900">Logout?</Text>
            <Text className="text-sm text-gray-700 text-center mb-1">Are you sure you want to log out?</Text>
            <Text className="text-xs text-gray-500 text-center mb-6">You won't receive updates related to your contests.</Text>
            
            <TouchableOpacity
              className="bg-red-500 w-full rounded-lg mb-3 py-3 items-center active:bg-red-600"
              onPress={handleLogout}
              disabled={isLoading}
              activeOpacity={0.7}
            >
              <Text className="text-white text-sm font-bold">{isLoading ? 'Logging out...' : 'Yes, Logout'}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="border border-gray-300 bg-gray-50 w-full rounded-lg py-3 items-center active:bg-gray-100"
              onPress={() => setLogoutModalVisible(false)}
              disabled={isLoading}
              activeOpacity={0.7}
            >
              <Text className="text-sm text-gray-700 font-semibold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
