import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { authService } from '../services/authService';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  country: string;
  avatar: string | null;
  walletBalance: number;
  winningsBalance: number;
  isKycCompleted: boolean;
  totalContests: number;
  totalWins: number;
  username: string;
  bio: string;
  level: number;
  [key: string]: any;
}

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  isLoading: boolean;
  setToken: (token: string) => Promise<void>;
  setUser: (user: UserProfile) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  getStoredAuth: () => Promise<void>;
  fetchProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isLoading: true,
  isAuthenticated: false,

  getStoredAuth: async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        set({ token: storedToken, isAuthenticated: true, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Error retrieving stored auth:', error);
      set({ isLoading: false });
    }
  },

  setToken: async (token: string) => {
    await AsyncStorage.setItem('token', token);
    set({ token, isAuthenticated: true });
  },

  setUser: (user: UserProfile) => {
    set({ user });
  },

  fetchProfile: async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;
      const profile = await authService.getProfile(token);
      set({ user: profile });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  },

  logout: async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        await authService.logout(token);
      }
      await AsyncStorage.removeItem('token');
      set({ token: null, user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  },
}));