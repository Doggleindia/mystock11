import { useNavigation } from "@react-navigation/native";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authService } from "../services/authService";
import { API_BASE_URL } from "../services/config";
import { useAuthStore } from "../store/authStore";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../services/firebaseConfig";

export default function SignUpScreen() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "India",
    mobileNumber: "",
  });
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // OTP modal state
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  const navigation = useNavigation();
  const { setToken, setUser } = useAuthStore();

  // countdown for resend button
  useEffect(() => {
    if (!otpModalVisible) return;
    if (resendTimer <= 0) return;

    const id = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(id);
  }, [otpModalVisible, resendTimer]);

  // Save user+token locally
  const saveAuthData = async (user, token) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      await AsyncStorage.setItem("token", token);
      setUser(user);
      setToken(token);
    } catch (err) {
      console.error("Error saving auth data:", err);
    }
  };

  // STEP 1: handle manual signup -> expect OTP flow
  const handleSignup = async () => {
    try {
      setIsLoading(true);

      const response = await authService.register(formData);
      // expected: { success, message, userId, ... }

      if (!response || response.success === false) {
        Toast.show({
          type: "error",
          text1: "Signup Failed ⚠️",
          text2: (response && response.message) || "Something went wrong",
        });
        return;
      }

      // Do NOT log in yet; show OTP modal
      setOtp("");
      setResendTimer(30);
      setOtpModalVisible(true);

      Toast.show({
        type: "success",
        text1: "OTP sent 🎉",
        text2:
          response.message ||
          "OTP re-sent. Please verify to complete registration.",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Signup Failed ⚠️",
        text2: error?.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 2: verify OTP
  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      Toast.show({
        type: "error",
        text1: "OTP required",
        text2: "Please enter the code sent to your email.",
      });
      return;
    }

    try {
      setOtpLoading(true);

      const res = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.trim(),
          otp: otp.trim(),
        }),
      });

      const data = await res.json();
      console.log("Verify OTP response:", data);

      if (data.success) {
        await saveAuthData(data.user, data.token);

        Toast.show({
          type: "success",
          text1: "Account verified 🎉",
          text2: "You are now logged in.",
        });

        setOtpModalVisible(false);
        navigation.replace("(tabs)");
      } else {
        Toast.show({
          type: "error",
          text1: "Invalid or expired OTP",
          text2: data.message || "Please try again",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Verification failed",
        text2: error?.message || "Unable to verify OTP.",
      });
    } finally {
      setOtpLoading(false);
    }
  };

  // STEP 3: resend OTP after 30 seconds
  const handleResendOtp = async () => {
    if (resendTimer > 0) return;

    try {
      setResendTimer(30);

      // If you have a dedicated resend endpoint, use that.
      const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email.trim() }),
      });

      const data = await res.json();
      if (data.success) {
        Toast.show({
          type: "success",
          text1: "OTP re-sent",
          text2: data.message || "Check your email again.",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Resend failed",
          text2: data.message || "Please try again later.",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Resend error",
        text2: error?.message || "Unable to resend OTP.",
      });
    }
  };

  // Google signup (unchanged, still logs in directly)
  const handleGoogleSignup = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const res = await fetch(
        `${API_BASE_URL}/api/auth/firebase/google-signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        }
      );

      const data = await res.json();
      console.log("Signup response:", data);

      if (data.success) {
        await saveAuthData(data.user, data.token);
        Toast.show({
          type: "success",
          text1: "Signup Successful 🎉",
          text2: `Welcome ${data.user.firstName || "User"}!`,
        });
        navigation.replace("(tabs)");
      } else {
        Toast.show({
          type: "error",
          text1: "Signup Failed ⚠️",
          text2: data.message || "Please try again",
        });
      }
    } catch (error) {
      console.error("Google signup error:", error);
      Toast.show({
        type: "error",
        text1: "Google Signup Error",
        text2: error?.message || "Something went wrong with Google auth",
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
          <Image
            source={require("../assets/images/stock-logo.png")}
            className="w-9 h-9"
          />
        </View>

        <Text className="text-xl font-bold mb-1">Create Account ✨</Text>
        <Text className="text-gray-500 mb-6">
          Start your journey with us today
        </Text>

        {/* Inputs */}
        <TextInput
          className="border border-gray-200 rounded-lg px-4 py-3 mb-3 bg-gray-50 text-base"
          placeholder="First Name"
          value={formData.firstName}
          onChangeText={(text) =>
            setFormData({ ...formData, firstName: text })
          }
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
          onChangeText={(text) =>
            setFormData({ ...formData, mobileNumber: text })
          }
          keyboardType="phone-pad"
        />

        <View className="relative mb-3">
          <TextInput
            className="border border-gray-200 rounded-lg px-4 py-3 pr-10 bg-gray-50 text-base"
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
            secureTextEntry={hidePassword}
          />
          <TouchableOpacity
            className="absolute right-3 top-0 h-full justify-center"
            onPress={() => setHidePassword(!hidePassword)}
          >
            <Text className="text-gray-400 text-base">
              {hidePassword ? "👁️" : "🙈"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Signup Button */}
        <TouchableOpacity
          className={`bg-green-600 rounded-lg py-3 my-2 ${
            isLoading ? "opacity-50" : ""
          }`}
          onPress={handleSignup}
          disabled={isLoading}
        >
          <Text className="text-white text-center font-semibold text-base">
            {isLoading ? "Creating Account..." : "Sign Up"}
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
          <Image
            source={require("../assets/images/google-icon.png")}
            className="w-6 h-6 mr-2"
          />
          <Text className="text-gray-700">Continue with Google</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-400">Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace("Login")}>
            <Text className="text-green-700 font-bold">Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* OTP Modal */}
      <Modal
        visible={otpModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setOtpModalVisible(false)}
      >
        <View className="flex-1 bg-black/40 justify-center items-center px-6">
          <View className="w-full max-w-sm bg-white rounded-2xl p-5">
            <Text className="text-lg font-semibold mb-1">
              Verify your email
            </Text>
            <Text className="text-gray-500 text-sm mb-4">
              We&apos;ve sent a 6-digit OTP to {formData.email}.
            </Text>

            <TextInput
              className="border border-gray-200 rounded-lg px-4 py-3 mb-3 bg-gray-50 text-base text-center tracking-widest"
              placeholder="Enter OTP"
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
              maxLength={6}
            />

            <TouchableOpacity
              className={`bg-green-600 rounded-lg py-3 mb-3 ${
                otpLoading ? "opacity-50" : ""
              }`}
              disabled={otpLoading}
              onPress={handleVerifyOtp}
            >
              {otpLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-center font-semibold">
                  Verify OTP
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              disabled={resendTimer > 0}
              onPress={handleResendOtp}
            >
              <Text
                className={`text-center text-sm ${
                  resendTimer > 0 ? "text-gray-400" : "text-green-700"
                }`}
              >
                {resendTimer > 0
                  ? `Resend OTP in ${resendTimer}s`
                  : "Resend OTP"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
