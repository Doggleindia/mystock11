import { useNavigation } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from "../services/authService";
import { API_BASE_URL } from "../services/config";
import { useAuthStore } from "../store/authStore";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../services/firebaseConfig";

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

  // 🔹 Save user data to AsyncStorage
  const saveAuthData = async (user, token) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      await AsyncStorage.setItem('token', token);
      setUser(user);
      setToken(token);
    } catch (err) {
      console.error('Error saving auth data:', err);
    }
  };

  // 🔹 Handle manual signup
  const handleSignup = async () => {
    try {
      setIsLoading(true);
      const response = await authService.register(formData);

      await saveAuthData(response.user, response.token);

      Toast.show({
        type: 'success',
        text1: 'Signup Successful 🎉',
        text2: `Welcome ${response.user.firstName || 'user'}!`,
      });

      navigation.replace('(tabs)');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Signup Failed ⚠️',
        text2: error.message || 'Something went wrong',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Handle Google Signup
  const handleGoogleSignup = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const res = await fetch(`${API_BASE_URL}/api/auth/firebase/google-signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const data = await res.json();
      console.log("Signup response:", data);

      if (data.success) {
        await saveAuthData(data.user, data.token);
        Toast.show({
          type: 'success',
          text1: 'Signup Successful 🎉',
          text2: `Welcome ${data.user.firstName || 'User'}!`,
        });
        navigation.replace('(tabs)');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Signup Failed ⚠️',
          text2: data.message || 'Please try again',
        });
      }
    } catch (error) {
      console.error("Google signup error:", error);
      Toast.show({
        type: 'error',
        text1: 'Google Signup Error',
        text2: error.message || 'Something went wrong with Google auth',
      });
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

        <Text className="text-xl font-bold mb-1">Create Account ✨</Text>
        <Text className="text-gray-500 mb-6">Start your journey with us today</Text>

        {/* Inputs */}
        <TextInput
          className="border border-gray-200 rounded-lg px-4 py-3 mb-3 bg-gray-50 text-base"
          placeholder="First Name"
          value={formData.firstName}
          onChangeText={(text) => setFormData({ ...formData, firstName: text })}
        />

        <TextInput
          className="border border-gray-200 rounded-lg px-4 py-3 mb-3 bg-gray-50 text-base"
          placeholder="Last Name"
          value={formData.lastName}
          onChangeText={(text) => setFormData({ ...formData, lastName: text })}
        />

        <TextInput
          className="border border-gray-200 rounded-lg px-4 py-3 mb-3 bg-gray-50 text-base"
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
        />

        <TextInput
          className="border border-gray-200 rounded-lg px-4 py-3 mb-3 bg-gray-50 text-base"
          placeholder="Mobile Number"
          value={formData.mobileNumber}
          onChangeText={(text) => setFormData({ ...formData, mobileNumber: text })}
          keyboardType="phone-pad"
        />

        <View className="relative mb-3">
          <TextInput
            className="border border-gray-200 rounded-lg px-4 py-3 pr-10 bg-gray-50 text-base"
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            secureTextEntry={hidePassword}
          />
          <TouchableOpacity
            className="absolute right-3 top-0 h-full justify-center"
            onPress={() => setHidePassword(!hidePassword)}
          >
            <Text className="text-gray-400 text-base">{hidePassword ? '👁️' : '🙈'}</Text>
          </TouchableOpacity>
        </View>

        {/* Signup Button */}
        <TouchableOpacity
          className={`bg-green-600 rounded-lg py-3 my-2 ${isLoading ? "opacity-50" : ""}`}
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

        {/* Google Signup */}
        <TouchableOpacity
          className="flex-row items-center border border-gray-200 rounded-lg py-3 mb-3 justify-center"
          onPress={handleGoogleSignup}
          disabled={isLoading}
        >
          <Image source={require('../assets/images/google-icon.png')} className="w-6 h-6 mr-2" />
          <Text className="text-gray-700">Continue with Google</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-400">Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace('Login')}>
            <Text className="text-green-700 font-bold">Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Toast Notification */}
      <Toast />
    </>
  );
}
