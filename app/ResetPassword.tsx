import { API_BASE_URL } from "@/services/config";
import axios from "axios";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

type Params = {
  email?: string;
};

const ResetPasswordScreen: React.FC = () => {
  const { email: routeEmail } = useLocalSearchParams<Params>();
  const [email, setEmail] = useState(routeEmail ?? "");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleReset = async () => {
    if (!email.trim() || !otp.trim() || !newPassword.trim()) {
      Toast.show({
        type: "error",
        text1: "Missing fields",
        text2: "Email, OTP and new password are required.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Passwords do not match",
        text2: "Confirm password must match the new password.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/reset-password`, {
        email: email.trim(),
        otp: otp.trim(),
        newPassword: newPassword,
      });

      if (res.data?.success) {
        Toast.show({
          type: "success",
          text1: "Password reset",
          text2: "You can now sign in with your new password.",
        });
        router.replace("Login");
      } else {
        Toast.show({
          type: "error",
          text1: "Reset failed",
          text2: res.data?.message || "Invalid or expired OTP.",
        });
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to reset password right now.";
      Toast.show({
        type: "error",
        text1: "Request failed",
        text2: message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#e5e7eb" }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 16,
          }}
        >
          <View
            style={{
              width: 400,
              maxWidth: "100%",
              backgroundColor: "#ffffff",
              borderRadius: 16,
              paddingHorizontal: 24,
              paddingVertical: 32,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 4 },
              elevation: 4,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                marginBottom: 6,
              }}
            >
              Reset password
            </Text>
            <Text
              style={{
                color: "#6b7280",
                marginBottom: 24,
                fontSize: 14,
              }}
            >
              Enter the OTP sent to your email and choose a new password.
            </Text>

            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 6,
              }}
            >
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="you@example.com"
              style={{
                borderWidth: 1,
                borderColor: "#e5e7eb",
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 10,
                marginBottom: 12,
                fontSize: 14,
                backgroundColor: "#f9fafb",
              }}
            />

            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 6,
              }}
            >
              OTP
            </Text>
            <TextInput
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              placeholder="6-digit code"
              style={{
                borderWidth: 1,
                borderColor: "#e5e7eb",
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 10,
                marginBottom: 12,
                fontSize: 14,
                backgroundColor: "#f9fafb",
              }}
            />

            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 6,
              }}
            >
              New password
            </Text>
            <TextInput
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              placeholder="New password"
              style={{
                borderWidth: 1,
                borderColor: "#e5e7eb",
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 10,
                marginBottom: 12,
                fontSize: 14,
                backgroundColor: "#f9fafb",
              }}
            />

            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 6,
              }}
            >
              Confirm password
            </Text>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholder="Confirm password"
              style={{
                borderWidth: 1,
                borderColor: "#e5e7eb",
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 10,
                marginBottom: 20,
                fontSize: 14,
                backgroundColor: "#f9fafb",
              }}
            />

            <TouchableOpacity
              onPress={handleReset}
              disabled={submitting}
              style={{
                backgroundColor: submitting ? "#86efac" : "#16a34a",
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              {submitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "600",
                    fontSize: 15,
                  }}
                >
                  Reset password
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default ResetPasswordScreen;
