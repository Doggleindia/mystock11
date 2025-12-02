import { Stack, router } from "expo-router";
import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useAuthStore } from "../store/authStore";

const SplashScreen: React.FC = () => {
  const { getStoredAuth } = useAuthStore();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Load stored auth (token, user, etc.)
        await getStoredAuth();

        // Small delay so splash is visible
        await new Promise<void>((resolve) => setTimeout(resolve, 2000));

        // Read latest auth state from store
        const { isAuthenticated } = useAuthStore.getState();

        // Navigate based on auth
        if (isAuthenticated) {
          router.replace("(tabs)");
        } else {
          router.replace("Onboarding");
        }
      } catch (error) {
        console.error("Initialization error:", error);
        router.replace("Onboarding");
      }
    };

    initializeApp();
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Image
          source={require("../assets/images/app-logo.png")}
          style={{ width: 370, height: 65 }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default SplashScreen;
