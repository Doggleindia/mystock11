import { API_BASE_URL } from "@/services/config";
import axios from "axios";
import { Stack, router } from "expo-router";
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

const ForgotPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSendOtp = async () => {
    if (!email.trim()) {
      Toast.show({
        type: "error",
        text1: "Email required",
        text2: "Please enter your registered email address.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/forgot-password`, {
        email: email.trim(),
      });

      if (res.data?.success) {
        Toast.show({
          type: "success",
          text1: "OTP sent",
          text2: "Check your email for the verification code.",
        });
        router.push({
          pathname: "ResetPassword",
          params: { email: email.trim() },
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Unable to send OTP",
          text2: res.data?.message || "User not found.",
        });
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";
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
        {/* Center container */}
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 16,
          }}
        >
          {/* Card */}
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
              Forgot password?
            </Text>
            <Text
              style={{
                color: "#6b7280",
                marginBottom: 24,
                fontSize: 14,
              }}
            >
              Enter the email associated with your account and we&apos;ll send
              you an OTP to reset your password.
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
                marginBottom: 16,
                fontSize: 14,
                backgroundColor: "#f9fafb",
              }}
            />

            <TouchableOpacity
              onPress={handleSendOtp}
              disabled={submitting}
              style={{
                backgroundColor: submitting ? "#86efac" : "#16a34a",
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: "center",
                marginTop: 4,
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
                  Send OTP
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.back()}
              style={{ marginTop: 16, alignItems: "center" }}
            >
              <Text style={{ color: "#4b5563", fontSize: 13 }}>
                Back to login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default ForgotPasswordScreen;
