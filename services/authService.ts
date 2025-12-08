import { API_BASE_URL } from "./config";

const BASE_URL = `${API_BASE_URL}/api`;

export const authService = {
  // Get user profile
  async getProfile(token: string) {
    try {
      const response = await fetch(`${BASE_URL}/auth/getprofile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data.profile;
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  async logout(token: string) {
    try {
      const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Register new user
  async register(userData: any) {
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Login user
  async login(credentials: any) {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Google signup
  async googleSignup(token: string) {
    try {
      const response = await fetch(`${BASE_URL}/auth/google-signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Google login
  async googleLogin(token: string) {
    try {
      const response = await fetch(`${BASE_URL}/auth/firebase/google-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Change password
  async changePassword(passwords: any) {
    try {
      const response = await fetch(`${BASE_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(passwords),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Reset password
  async resetPassword(resetData: any) {
    try {
      const response = await fetch(`${BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resetData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Update user profile
  async updateProfile(token: string, profileData: any) {
    try {
      const response = await fetch(`${BASE_URL}/user-profile/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Upload avatar
  async uploadAvatar(token: string, formData: FormData) {
    try {
      console.log('Uploading avatar with token:', token?.substring(0, 20) + '...');
      
      const response = await fetch(`${BASE_URL}/user-profile/update-avatar`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.log('Response text:', text);
        data = { message: text };
      }
      
      console.log('Upload response:', { status: response.status, ok: response.ok, data });
      
      if (!response.ok) throw new Error(data.message || `Upload failed with status ${response.status}`);
      return data;
    } catch (error) {
      console.error('Avatar upload error:', error);
      throw error;
    }
  },
};