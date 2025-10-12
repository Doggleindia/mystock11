import { useNavigation } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const SplashScreen = () => {
    const navigation = useNavigation();
  useEffect(() => {
    // Navigate to Onboarding after 2 seconds
    const timer = setTimeout(() => navigation.replace('Onboarding'), 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

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
