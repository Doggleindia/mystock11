import { useNavigation } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { authService } from '../services/authService';
import { useAuthStore } from '../store/authStore';

export default function SignUpScreen() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    country: 'India',
    mobileNumber: ''
  });
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { setToken, setUser } = useAuthStore();

  const handleSignup = async () => {
    try {
      setIsLoading(true);
      const response = await authService.register(formData);
      await setToken(response.token);
      setUser(response.user);
      navigation.replace('(tabs)');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async (token) => {
    try {
      setIsLoading(true);
      const response = await authService.googleSignup(token);
      await setToken(response.token);
      setUser(response.user);
      navigation.replace('(tabs)');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <>
    <Stack.Screen options={{ headerShown: false }} />
    <View className="flex-1 bg-white justify-center px-6">
      {/* Logo */}
      <View className="mb-5 mt-3">
        <Image source={require('../assets/images/stock-logo.png')} className="w-9 h-9" />
      </View>
      <Text className="text-xl font-bold mb-1">Create Account <Text>✨</Text></Text>
      <Text className="text-gray-500 mb-6">Start your journey with us today</Text>

      {/* First Name input */}
      <TextInput
        className="border border-gray-200 rounded-lg px-4 py-3 mb-3 bg-gray-50 text-base"
        placeholder="First Name"
        placeholderTextColor="#A0AEC0"
        value={formData.firstName}
        onChangeText={(text) => setFormData({...formData, firstName: text})}
        autoCapitalize="words"
      />

      {/* Last Name input */}
      <TextInput
        className="border border-gray-200 rounded-lg px-4 py-3 mb-3 bg-gray-50 text-base"
        placeholder="Last Name"
        placeholderTextColor="#A0AEC0"
        value={formData.lastName}
        onChangeText={(text) => setFormData({...formData, lastName: text})}
        autoCapitalize="words"
      />

      {/* Email input */}
      <TextInput
        className="border border-gray-200 rounded-lg px-4 py-3 mb-3 bg-gray-50 text-base"
        placeholder="Email"
        placeholderTextColor="#A0AEC0"
        value={formData.email}
        onChangeText={(text) => setFormData({...formData, email: text})}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Mobile Number input */}
      <TextInput
        className="border border-gray-200 rounded-lg px-4 py-3 mb-3 bg-gray-50 text-base"
        placeholder="Mobile Number"
        placeholderTextColor="#A0AEC0"
        value={formData.mobileNumber}
        onChangeText={(text) => setFormData({...formData, mobileNumber: text})}
        keyboardType="phone-pad"
      />

      {/* Password input + icon */}
      <View className="relative mb-3">
        <TextInput
          className="border border-gray-200 rounded-lg px-4 py-3 pr-10 bg-gray-50 text-base"
          placeholder="Password"
          placeholderTextColor="#A0AEC0"
          value={formData.password}
          onChangeText={(text) => setFormData({...formData, password: text})}
          secureTextEntry={hidePassword}
          autoCapitalize="none"
        />
        <TouchableOpacity
          className="absolute right-3 top-0 h-full justify-center"
          onPress={() => setHidePassword(!hidePassword)}
        >
          <Text className="text-gray-400 text-base">{hidePassword ? '👁️' : '🙈'}</Text>
        </TouchableOpacity>
      </View>

      {/* Sign Up button */}
      <TouchableOpacity 
        className="bg-green-600 rounded-lg py-3 my-2" 
        onPress={handleSignup}
        disabled={isLoading}
      >
        <Text className="text-white text-center font-semibold text-base">
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>

      {/* Divider */}
      <View className="flex-row items-center my-5">
        <View className="flex-1 h-px bg-gray-200" />
        <Text className="mx-3 text-gray-400 text-sm">or continue with</Text>
        <View className="flex-1 h-px bg-gray-200" />
      </View>

      {/* Social login buttons */}
      <TouchableOpacity 
        className="flex-row items-center border border-gray-200 rounded-lg py-3 mb-3 justify-center"
        onPress={handleGoogleSignup}
        disabled={isLoading}
      >
        <Image source={require('../assets/images/google-icon.png')} className="w-6 h-6 mr-2" />
        <Text className="text-gray-700">Continue with Google</Text>
      </TouchableOpacity>

      {/* Sign in footer */}
      <View className="flex-row justify-center mt-7">
        <Text className="text-gray-400">Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('Login')}> 
          <Text className="text-green-700 font-bold">Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
}
