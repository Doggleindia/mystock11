import { useNavigation } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { authService } from "../services/authService";
import { useAuthStore } from "../store/authStore";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../services/firebaseConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const { setToken, setUser } = useAuthStore();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await authService.login({ email, password });
      setToken(response.token);
      setUser(response.user);
      navigation.replace("(tabs)");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      // Send Firebase token to backend
      const res = await fetch("http://localhost:5500/api/auth/firebase/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const data = await res.json();
      console.log("Server response:", data);

      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        navigation.replace("(tabs)");
      } else {
        Alert.alert("Login failed", data.message);
      }
    } catch (error) {
      console.error("Google login error:", error);
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-white justify-center px-6">
        <View className="mb-5 mt-3">
          <Image source={require("../assets/images/stock-logo.png")} className="w-9 h-9" />
        </View>

        <Text className="text-xl font-bold mb-1">Hi there! 👋</Text>
        <Text className="text-gray-500 mb-6">Welcome back, sign in to your account</Text>

        <TextInput
          className="border border-gray-200 rounded-lg px-4 py-3 mb-3 bg-gray-50 text-base"
          placeholder="Email"
          placeholderTextColor="#A0AEC0"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

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
            <Text className="text-gray-400 text-base">{hidePassword ? "👁️" : "🙈"}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className={`bg-green-600 rounded-lg py-3 my-2 ${isLoading ? "opacity-50" : ""}`}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text className="text-white text-center font-semibold text-base">
            {isLoading ? "Signing in..." : "Sign in"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text className="text-green-700 text-xs text-right mb-5 mt-1 font-semibold">
            Forgot password?
          </Text>
        </TouchableOpacity>

        <View className="flex-row items-center my-5">
          <View className="flex-1 h-px bg-gray-200" />
          <Text className="mx-3 text-gray-400 text-sm">or continue with</Text>
          <View className="flex-1 h-px bg-gray-200" />
        </View>

        <TouchableOpacity
          className="flex-row items-center border border-gray-200 rounded-lg py-3 mb-3 justify-center"
          onPress={handleGoogleLogin}
          disabled={isLoading}
        >
          <Image source={require("../assets/images/google-icon.png")} className="w-6 h-6 mr-2" />
          <Text className="text-gray-700">Continue with Google</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-400">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace("Signup")}>
            <Text className="text-green-700 font-bold">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
