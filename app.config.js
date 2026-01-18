const DEFAULT_API_BASE_URL = "https://apis.doggleindia.com";

export default {
  expo: {
    name: "mystock11",
    slug: "mystock11",
    plugins: ["expo-font", "expo-router", "expo-web-browser"],
    extra: {
      API_BASE_URL:
        process.env.EXPO_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL,
    },
  },
};
