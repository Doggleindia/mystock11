import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

interface AuthState {
  token: string | null;
  user: any | null;
  isLoading: boolean;
  setToken: (token: string) => Promise<void>;
  setUser: (user: any) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  getStoredAuth: () => Promise<void>;
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

  setToken: async (token) => {
    await AsyncStorage.setItem('token', token);
    set({ token, isAuthenticated: true });
  },

  setUser: (user) => {
    set({ user });
  },

  logout: async () => {
    await AsyncStorage.removeItem('token');
    set({ token: null, user: null, isAuthenticated: false });
  },
}));