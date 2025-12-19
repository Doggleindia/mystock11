import DateTimePicker from '@react-native-community/datetimepicker';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BalanceHeader from "../../components/wallet/BallanceHeader";
import { useAuthStore } from '../../store/authStore';

const GENDER_OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

export default function ProfileInformationScreen() {
  const router = useRouter();
  const { user, fetchProfile,updateProfile } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    bio: '',
    gender: 'male',
    dob: new Date(),
  });
console.log(user,formData,"Data")
  // Initialize form data from user profile
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user?.user?.firstName || '',
        lastName: user?.user?.lastName || '',
        username: user?.user?.username || '',
        email: user?.user?.email || '',
        bio: user?.user?.bio || '',
        gender: user?.user?.gender || 'male',
        dob: user?.user?.dob ? new Date(user?.user?.dob) : new Date(),
      });
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      setShowDatePicker(false);
      return;
    }
    if (selectedDate) {
      setFormData(prev => ({
        ...prev,
        dob: selectedDate,
      }));
    }
    setShowDatePicker(false);
  };

  const handleGenderSelect = (genderValue) => {
    setFormData(prev => ({
      ...prev,
      gender: genderValue,
    }));
    setShowGenderDropdown(false);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleUpdateDetails = async () => {
    try {
      // Validation
      if (!formData.firstName.trim()) {
        Alert.alert('Validation', 'First name is required');
        return;
      }
      if (!formData.lastName.trim()) {
        Alert.alert('Validation', 'Last name is required');
        return;
      }
      if (!formData.username.trim()) {
        Alert.alert('Validation', 'Username is required');
        return;
      }
      if (!formData.gender) {
        Alert.alert('Validation', 'Gender is required');
        return;
      }

      setIsLoading(true);

      // Prepare data - only send necessary fields with valid values
      const profileDataToSend = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        username: formData.username.trim(),
        bio: formData.bio.trim(),
        gender: formData.gender,
        dob: formData.dob.toISOString().split('T')[0], // Send as YYYY-MM-DD
      };

      await updateProfile(profileDataToSend);
      Alert.alert('Success', 'Profile updated successfully', [
        { text: 'OK', onPress: () => router.back() }
      ]);
      fetchProfile(); // Refresh profile data
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to update profile');
      console.error('Update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Stack.Screen options={{ headerShown: false }} />
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
      <ScrollView className="flex-1 bg-white">
        <BalanceHeader title="My Information" />
        <View className="flex-1 bg-white px-5 pt-7 pb-8">
        
        <Text className="text-xs text-gray-600 mb-1 font-semibold">First Name *</Text>
        <TextInput 
          value={formData.firstName} 
          onChangeText={(text) => handleInputChange('firstName', text)}
          className="bg-gray-100 rounded-lg px-3 py-3 mb-4 text-sm"
          placeholder="Enter first name"
        />

        <Text className="text-xs text-gray-600 mb-1 font-semibold">Last Name *</Text>
        <TextInput 
          value={formData.lastName} 
          onChangeText={(text) => handleInputChange('lastName', text)}
          className="bg-gray-100 rounded-lg px-3 py-3 mb-4 text-sm"
          placeholder="Enter last name"
        />

        <Text className="text-xs text-gray-600 mb-1 font-semibold">Username *</Text>
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
            className="bg-gray-100 rounded-lg px-3 py-3 text-sm grow"
            placeholder="Email"
            editable={false}
          />
        </View>

        <Text className="text-xs text-gray-600 mb-1 font-semibold">Bio</Text>
        <TextInput 
          value={formData.bio} 
          onChangeText={(text) => handleInputChange('bio', text)}
          className="bg-gray-100 rounded-lg px-3 py-3 mb-4 text-sm"
          placeholder="Enter bio (optional)"
          multiline={true}
          numberOfLines={3}
        />

        <Text className="text-xs text-gray-600 mb-1 font-semibold">Gender *</Text>
        <TouchableOpacity 
          onPress={() => setShowGenderDropdown(true)}
          className="bg-gray-100 rounded-lg px-3 py-3 mb-4 justify-center"
        >
          <Text className="text-sm text-gray-800">{formData.gender}</Text>
        </TouchableOpacity>

        <Modal
          visible={showGenderDropdown}
          transparent
          animationType="fade"
          onRequestClose={() => setShowGenderDropdown(false)}
        >
          <TouchableOpacity 
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center' }}
            activeOpacity={1}
            onPress={() => setShowGenderDropdown(false)}
          >
            <View className="bg-white rounded-lg mx-8 py-3">
              {GENDER_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => handleGenderSelect(option.value)}
                  className="px-4 py-3 border-b border-gray-100"
                >
                  <Text className={`text-sm ${formData.gender === option.value ? 'text-green-600 font-semibold' : 'text-gray-700'}`}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>

        <Text className="text-xs text-gray-600 mb-1 font-semibold">Date of Birth *</Text>
        <TouchableOpacity 
          onPress={() => setShowDatePicker(true)}
          className="bg-gray-100 rounded-lg px-3 py-3 mb-6 justify-center"
        >
          <Text className="text-sm text-gray-800">{formatDate(formData.dob)}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={formData.dob}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}

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
    </>
  );
}
