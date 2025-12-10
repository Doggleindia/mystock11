import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BalanceHeader from "../../components/wallet/BallanceHeader";
import { useAuthStore } from '../../store/authStore';

export default function ProfileInformationScreen() {
  const router = useRouter();
  const { user, updateProfile } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    bio: '',
    gender: '',
    dob: '',
    language: 'en',
    theme: 'light',
  });

  // Initialize form data from user profile
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user?.user?.firstName || '',
        lastName: user?.user?.lastName || '',
        username: user?.user?.username || '',
        email: user?.user?.email || '',
        bio: user?.user?.bio || '',
        gender: user?.user?.gender || '',
        dob: user?.user?.dob || '',
        language: user?.user?.language || 'en',
        theme: user?.user?.theme || 'light',
      });
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateDetails = async () => {
    try {
      setIsLoading(true);
      await updateProfile(formData);
      Alert.alert('Success', 'Profile updated successfully', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to update profile');
      console.error('Update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <ScrollView className="flex-1 bg-white">
        <Stack.Screen options={{ headerShown: false }} />
        <BalanceHeader title="My Information" />
        <View className="flex-1 bg-white px-5 pt-7 pb-8">
        
        <Text className="text-xs text-gray-600 mb-1 font-semibold">First Name</Text>
        <TextInput 
          value={formData.firstName} 
          onChangeText={(text) => handleInputChange('firstName', text)}
          className="bg-gray-100 rounded-lg px-3 py-3 mb-4 text-sm"
          placeholder="Enter first name"
        />

        <Text className="text-xs text-gray-600 mb-1 font-semibold">Last Name</Text>
        <TextInput 
          value={formData.lastName} 
          onChangeText={(text) => handleInputChange('lastName', text)}
          className="bg-gray-100 rounded-lg px-3 py-3 mb-4 text-sm"
          placeholder="Enter last name"
        />

        <Text className="text-xs text-gray-600 mb-1 font-semibold">Username</Text>
        <TextInput 
          value={formData.username} 
          onChangeText={(text) => handleInputChange('username', text)}
          className="bg-gray-100 rounded-lg px-3 py-3 mb-4 text-sm"
          placeholder="Enter username"
        />

        <Text className="text-xs text-gray-600 mb-1 font-semibold">Email</Text>
        <View className="flex-row items-center mb-4">
          <TextInput 
            value={formData.email} 
            onChangeText={(text) => handleInputChange('email', text)}
            className="bg-gray-100 rounded-lg px-3 py-3 text-sm grow"
            placeholder="Enter email"
            editable={false}
          />
          {/* <TouchableOpacity
            className="ml-2 px-3 py-2 rounded bg-blue-500"
            onPress={() => router.push('profile/verify-email')}
          >
            <Text className="text-xs text-white font-bold">Verify</Text>
          </TouchableOpacity> */}
        </View>

        <Text className="text-xs text-gray-600 mb-1 font-semibold">Bio</Text>
        <TextInput 
          value={formData.bio} 
          onChangeText={(text) => handleInputChange('bio', text)}
          className="bg-gray-100 rounded-lg px-3 py-3 mb-4 text-sm"
          placeholder="Enter bio"
          multiline={true}
          numberOfLines={3}
        />

        <Text className="text-xs text-gray-600 mb-1 font-semibold">Gender</Text>
        <TextInput 
          value={formData.gender} 
          onChangeText={(text) => handleInputChange('gender', text)}
          className="bg-gray-100 rounded-lg px-3 py-3 mb-4 text-sm"
          placeholder="Enter gender (male/female/other)"
        />

        <Text className="text-xs text-gray-600 mb-1 font-semibold">Date of Birth</Text>
        <TextInput 
          value={formData.dob} 
          onChangeText={(text) => handleInputChange('dob', text)}
          className="bg-gray-100 rounded-lg px-3 py-3 mb-4 text-sm"
          placeholder="YYYY-MM-DD"
        />

        <Text className="text-xs text-gray-600 mb-1 font-semibold">Language</Text>
        <TextInput 
          value={formData.language} 
          onChangeText={(text) => handleInputChange('language', text)}
          className="bg-gray-100 rounded-lg px-3 py-3 mb-4 text-sm"
          placeholder="en"
        />

        <Text className="text-xs text-gray-600 mb-1 font-semibold">Theme</Text>
        <TextInput 
          value={formData.theme} 
          onChangeText={(text) => handleInputChange('theme', text)}
          className="bg-gray-100 rounded-lg px-3 py-3 mb-6 text-sm"
          placeholder="light/dark"
        />

        <TouchableOpacity 
          className="bg-green-600 rounded-lg py-3 items-center active:bg-green-700"
          onPress={handleUpdateDetails}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-base text-white font-bold">Update Details</Text>
          )}
        </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
