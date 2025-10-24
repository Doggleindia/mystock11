import { useNavigation } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useAuthStore } from '../store/authStore';

const SplashScreen = () => {
  const navigation = useNavigation();
  const { token, getStoredAuth } = useAuthStore();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Try to get stored authentication
        await getStoredAuth();
        
        // Add a small delay for splash screen visibility
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Navigate based on auth status
        if (token) {
          navigation.replace('(tabs)');
        } else {
          navigation.replace('Onboarding');
        }
      } catch (error) {
        console.error('Initialization error:', error);
        navigation.replace('Onboarding');
      }
    };

    initializeApp();
  }, [navigation, token, getStoredAuth]);

  return (
    <>
    <Stack.Screen options={{ headerShown: false }} />
    <View style={styles.container}>
      {/* Replace with your logo */}
      <Image source={require('../assets/images/app-logo.png')} style={{ width: 370, height: 65 }} />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor: '#fff' },
});

export default SplashScreen;
