import { useNavigation } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const OnboardingScreen = () => {
     const navigation = useNavigation();
     return(<>
     <Stack.Screen options={{ headerShown: false }} />
  <View style={styles.container}>
    <TouchableOpacity style={styles.skip} 
    onPress={() => navigation.replace('')}
    >
      <Text style={styles.skipText}>Skip</Text>
    </TouchableOpacity>
    <Image source={require('../assets/images/trophy.png')} width={200} height={100} style={styles.image} />
    <Text style={styles.title}>Build your portfolio</Text>
    <Text style={styles.subtitle}>Test your trading skills and win real rewards.</Text>
    <View style={styles.buttonRow}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#fff', borderWidth: 1, borderColor: '#138B31' }]}
        onPress={() => navigation.replace('Login')}
      >
        <Text style={[styles.buttonText, { color: '#138B31' }]}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#138B31' }]}
        onPress={() => navigation.replace('Signup')}
      >
        <Text style={[styles.buttonText, { color: '#fff' }]}>Sign up</Text>
      </TouchableOpacity>
    </View>
  </View>
  </>)
};

const styles = StyleSheet.create({
  container: { flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#fff' },
  skip: { position: 'absolute', top: 40, right: 20, zIndex: 10 },
  skipText: { color: '#999', fontSize: 16 },
  image: { marginBottom: 32, marginTop: 20 },
  title: { fontWeight: 'bold', fontSize: 22, textAlign: 'center' },
  subtitle: { color: '#666', marginVertical: 12, textAlign: 'center', maxWidth: 250 },
  buttonRow: { flexDirection: 'row', marginTop: 50, gap: 2 },
  button: { flex: 1, paddingVertical: 10, borderRadius: 8, marginHorizontal: 20, minWidth: 30, alignItems: 'center' },
  buttonText: { fontSize: 12, fontWeight: 'bold' }
});

export default OnboardingScreen;
