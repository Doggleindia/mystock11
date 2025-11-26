import axios from "axios";
import Constants from "expo-constants";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ||
  Constants.expoConfig?.extra?.API_BASE_UR; // fallback

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export default axiosInstance;
