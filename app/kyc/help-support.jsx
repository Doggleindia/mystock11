import { Stack } from 'expo-router';
import { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BalanceHeader from "../../components/wallet/BallanceHeader";

// Example help query categories
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
  const scrollRef = useRef();

  // Simulate "bot" replies for demo
  function handleUserSend(text) {
    setMessages(prev => [
      ...prev,
      { type: 'user', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          type: 'bot',
          text: `Thanks for your message. Our support team will respond soon, or select another topic for faster results!`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 1000);
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
        {/* Chat Messages */}
        <ScrollView
          style={{ flex: 1, padding: 16 }}
          ref={scrollRef}
          contentContainerStyle={{ paddingBottom: 80 }}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          {/* First message and topic chips */}
          {messages.length === 1 && (
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
          {/* Messages */}
          {messages.slice(1).map((msg, idx) => (
            <View key={idx} className={`mb-2 flex-row ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <View style={{
                backgroundColor: msg.type === 'bot' ? "#f5f5f5" : "#e6f4ea",
                padding: 12,
                borderRadius: 10,
                maxWidth: '80%',
              }}>
                <Text style={{
                  color: msg.type === 'bot' ? '#333' : '#2e856e',
                  fontSize: 15,
                }}>{msg.text}</Text>
                <Text style={{ fontSize: 10, color: "#999", textAlign: 'right', marginTop: 4 }}>{msg.time}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        {/* Input + Send Row */}
        <View className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-2 bg-white border-t border-gray-100 flex-row items-end">
          {/* Add attach buttons here if desired */}
          <TextInput
            className="flex-1 rounded-lg px-3 py-2 bg-gray-50 border border-gray-200 text-base"
            placeholder="I need help with..."
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => input?.trim().length > 0 && handleUserSend(input.trim())}
            returnKeyType="send"
          />
          <TouchableOpacity
            onPress={() => input?.trim().length > 0 && handleUserSend(input.trim())}
            disabled={!input?.trim().length}
            style={{ marginLeft: 8, opacity: input?.trim().length ? 1 : 0.4 }}
          >
            <Text style={{ fontSize: 20, color: "#31A062", fontWeight: "bold" }}>{'➤'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
