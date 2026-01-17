import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from 'expo-router';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BalanceHeader from "../../components/wallet/BallanceHeader";

const helpTopics = [
  { label: "Deposit related queries" },
  { label: "Withdrawal related queries" },
  { label: "Account related queries" },
  { label: "KYC related queries" }
];

export default function HelpSupportScreen() {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Select a topic for your query or simply describe your problem — our chatbot will guide you to the right answers quickly and easily',
      time: '9:41 PM'
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [ticketId, setTicketId] = useState(null); // 🔴 IMPORTANT
  const scrollRef = useRef();

  async function handleUserSend(text) {
    if (!text || loading || ticketId) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages(prev => [...prev, { type: 'user', text, time }]);
    setInput('');
    setLoading(true);

    try {
      const storedToken = await AsyncStorage.getItem('token');
      const res = await fetch('http://localhost:5500/api/support/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${storedToken}` },
        body: JSON.stringify({ message: text })
      });

      const data = await res.json();

      if (data?.reply) {
        setMessages(prev => [
          ...prev,
          {
            type: 'bot',
            text: data.reply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }

      // 🧠 Once ticket is generated → lock chat
      if (data?.ticketId) {
        setTicketId(data.ticketId);
      }

    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          type: 'bot',
          text: 'Something went wrong. Please try again later.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
      scrollRef.current?.scrollToEnd({ animated: true });
    }
  }

  function handleTopic(topic) {
    handleUserSend(topic);
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
        <BalanceHeader title="Help and support" />

        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: "white" }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            ref={scrollRef}
            style={{ flex: 1, padding: 16 }}
            contentContainerStyle={{ paddingBottom: 90 }}
            onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
          >
            {messages.length === 1 && !ticketId && (
              <View>
                <Text className="rounded bg-gray-100 text-xs text-gray-700 p-3 mb-3">
                  {messages[0].text}
                </Text>

                {helpTopics.map((topic, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => handleTopic(topic.label)}
                    className="mb-1"
                    style={{
                      backgroundColor: "#fff",
                      borderWidth: 1,
                      borderColor: "#aaa",
                      borderRadius: 6,
                      paddingVertical: 8,
                      paddingHorizontal: 12
                    }}
                  >
                    <Text className="text-blue-600">{topic.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {messages.slice(1).map((msg, idx) => (
              <View
                key={idx}
                className={`mb-2 flex-row ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <View
                  style={{
                    backgroundColor: msg.type === 'bot' ? "#f5f5f5" : "#e6f4ea",
                    padding: 12,
                    borderRadius: 10,
                    maxWidth: '80%',
                  }}
                >
                  <Text style={{ color: msg.type === 'bot' ? '#333' : '#2e856e', fontSize: 15 }}>
                    {msg.text}
                  </Text>
                  <Text style={{ fontSize: 10, color: "#999", textAlign: 'right', marginTop: 4 }}>
                    {msg.time}
                  </Text>
                </View>
              </View>
            ))}

            {loading && <ActivityIndicator size="small" color="#31A062" />}
          </ScrollView>

          {/* Input Row */}
          <View className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-2 bg-white border-t border-gray-100 flex-row items-end">
            <TextInput
              className="flex-1 rounded-lg px-3 py-2 bg-gray-50 border border-gray-200 text-base"
              placeholder={ticketId ? "Ticket created. Chat closed." : "I need help with..."}
              value={input}
              onChangeText={setInput}
              editable={!ticketId}
              returnKeyType="send"
              onSubmitEditing={() => handleUserSend(input.trim())}
            />

            <TouchableOpacity
              onPress={() => handleUserSend(input.trim())}
              disabled={!input.trim() || loading || ticketId}
              style={{ marginLeft: 8, opacity: (!input.trim() || ticketId) ? 0.4 : 1 }}
            >
              <Text style={{ fontSize: 20, color: "#31A062", fontWeight: "bold" }}>
                ➤
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
