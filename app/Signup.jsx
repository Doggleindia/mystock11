import { useNavigation } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const navigation = useNavigation();
  

  return (
    <>
    <Stack.Screen options={{ headerShown: false }} />
    <View className="flex-1 bg-white justify-center px-6">
      {/* Logo */}
      <View className="mb-5 mt-3">
        <Image source={require('../assets/images/stock-logo.png')} className="w-9 h-9" />
      </View>
      <Text className="text-xl font-bold mb-1">Hi there! <Text>👋</Text></Text>
      <Text className="text-gray-500 mb-6">Welcome back, Sign in to your account</Text>

      {/* Email input */}
      <TextInput
        className="border border-gray-200 rounded-lg px-4 py-3 mb-3 bg-gray-50 text-base"
        placeholder="User name"
        placeholderTextColor="#A0AEC0"
        value={username}
        onChangeText={setUsername}
        keyboardType="username"
        autoCapitalize="none"
      />
      <TextInput
        className="border border-gray-200 rounded-lg px-4 py-3 mb-3 bg-gray-50 text-base"
        placeholder="Email"
        placeholderTextColor="#A0AEC0"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password input + icon */}
      <View className="relative mb-3">
        <TextInput
          className="border border-gray-200 rounded-lg px-4 py-3 pr-10 bg-gray-50 text-base"
          placeholder="Password"
          placeholderTextColor="#A0AEC0"
          value={password}
          onChangeText={setPassword}
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

      {/* Sign In button */}
      <TouchableOpacity className="bg-green-600 rounded-lg py-3 my-2" onPress={() => { /* your sign in logic */ }}>
        <Text className="text-white text-center font-semibold text-base">Sign in</Text>
      </TouchableOpacity>

      {/* Forgot password */}
      <TouchableOpacity>
        <Text className="text-green-700 text-xs text-right mb-5 mt-1 font-semibold">Forgot password?</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View className="flex-row items-center my-5">
        <View className="flex-1 h-px bg-gray-200" />
        <Text className="mx-3 text-gray-400 text-sm">or continue with</Text>
        <View className="flex-1 h-px bg-gray-200" />
      </View>

      {/* Social login buttons */}
      <TouchableOpacity className="flex-row items-center border border-gray-200 rounded-lg py-3 mb-3 justify-center">
        <Image source={require('../assets/images/google-icon.png')} className="w-6 h-6 mr-2" />
        <Text className="text-gray-700">Continue with Google</Text>
      </TouchableOpacity>

      {/* Sign up footer */}
      <View className="flex-row justify-center mt-7">
        <Text className="text-gray-400">Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('Login')}> 
          <Text className="text-green-700 font-bold">Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
}
