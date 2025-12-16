import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { Stack } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import BalanceHeader from '../../components/wallet/BallanceHeader';
import { useAuthStore } from '../../store/authStore';
import { API_BASE_URL } from '../../services/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BankIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#767676" strokeWidth={2}>
    <Path d="M2 10v3h20v-3" />
    <Path d="M12 2L2 7v2h20V7l-10-5z" />
    <Path d="M7 13v5" />
    <Path d="M17 13v5" />
    <Path d="M12 15v3" />
    <Path d="M4 21h16" />
  </Svg>
);

export default function BankVerifyScreen() {
  const { token } = useAuthStore();

  const [accountNumber, setAccountNumber] = useState('');
  const [reAccountNumber, setReAccountNumber] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [ssnLast4, setSsnLast4] = useState('');

  const [idFront, setIdFront] = useState(null);
  const [idBack, setIdBack] = useState(null);
  const [loading, setLoading] = useState(false);
const BASE_URL = `${API_BASE_URL}/api`;
  const pickImage = async (type) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      type === 'front'
        ? setIdFront(result.assets[0])
        : setIdBack(result.assets[0]);
    }
  };

  const submitKyc = async () => {
    if (!accountNumber || !routingNumber || !bankName || !ssnLast4) {
      return Alert.alert('Error', 'All fields are required');
    }

    if (accountNumber !== reAccountNumber) {
      return Alert.alert('Error', 'Account numbers do not match');
    }

    if (!idFront || !idBack) {
      return Alert.alert('Error', 'Please upload both ID images');
    }

    const formData = new FormData();
    formData.append('ssnLast4', ssnLast4);
    formData.append('accountNumberLast4', accountNumber);
    formData.append('routingNumber', routingNumber);
    formData.append('bankName', bankName);

    formData.append('idFront', {
      uri: idFront.uri,
      name: 'id-front.jpg',
      type: 'image/jpeg',
    });

    formData.append('idBack', {
      uri: idBack.uri,
      name: 'id-back.jpg',
      type: 'image/jpeg',
    });
const storedToken = await AsyncStorage.getItem('token');
    try {
      setLoading(true);

      await axios.put(
        `${BASE_URL}/user-profile/update-kyc-bank`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      Alert.alert('Success', 'KYC submitted successfully');
    } catch (err) {
      console.log(err.response?.data || err.message);
      Alert.alert('Error', 'KYC submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <BalanceHeader title="Verify Bank Account" />

      <View className="flex-1 bg-white px-4 py-6">
        <Text className="text-xs text-gray-600 mb-1">Account Number</Text>
        <TextInput
          className="bg-gray-100 rounded-lg py-3 px-3 mb-4"
          keyboardType="numeric"
          value={accountNumber}
          onChangeText={setAccountNumber}
        />

        <Text className="text-xs text-gray-600 mb-1">Retype Account Number</Text>
        <TextInput
          className="bg-gray-100 rounded-lg py-3 px-3 mb-4"
          keyboardType="numeric"
          value={reAccountNumber}
          onChangeText={setReAccountNumber}
        />

        <Text className="text-xs text-gray-600 mb-1">Routing / IFSC Code</Text>
        <TextInput
          className="bg-gray-100 rounded-lg py-3 px-3 mb-4"
          value={routingNumber}
          onChangeText={setRoutingNumber}
        />

        <Text className="text-xs text-gray-600 mb-1">Bank Name</Text>
        <TextInput
          className="bg-gray-100 rounded-lg py-3 px-3 mb-4"
          value={bankName}
          onChangeText={setBankName}
        />

        <Text className="text-xs text-gray-600 mb-1">SSN Last 4</Text>
        <TextInput
          className="bg-gray-100 rounded-lg py-3 px-3 mb-4"
          keyboardType="numeric"
          maxLength={4}
          value={ssnLast4}
          onChangeText={setSsnLast4}
        />

        <TouchableOpacity
          onPress={() => pickImage('front')}
          className="border rounded-lg py-3 mb-3 items-center"
        >
          <Text>{idFront ? 'ID Front Selected' : 'Upload ID Front'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => pickImage('back')}
          className="border rounded-lg py-3 mb-6 items-center"
        >
          <Text>{idBack ? 'ID Back Selected' : 'Upload ID Back'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={submitKyc}
          disabled={loading}
          className="bg-gray-600 rounded-md py-3 items-center"
        >
          <Text className="text-white font-bold">
            {loading ? 'Submitting...' : 'Submit Details'}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
