import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const API_KEY = 'AIzaSyAjLmTxZiQmA2TIKKU1K0WDLVGyxxM3Jqo';
const model = 'gemini-2.5-pro';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

interface FarmerChatModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function FarmerChatModal({ visible, onClose }: FarmerChatModalProps) {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;

    const userMessage: Message = { role: 'user', text: question };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setQuestion('');

    const context = `
You are an agricultural expert AI assistant designed to help farmers.
Only answer farming-related questions (crops, livestock, soil, weather, irrigation, machinery, pest control, etc.).
If a user asks about anything unrelated to agriculture, politely say:
"I'm only trained to help with farming-related topics."
Keep answers practical, concise, and in plain language useful for real farmers.
`;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { parts: [{ text: context }] },
              { parts: [{ text: question }] },
            ],
          }),
        }
      );

      const data = await res.json();
      const answer =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'No answer generated.';
      const botMessage: Message = { role: 'assistant', text: answer };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Error getting response.' },
      ]);
    }

    setLoading(false);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.headerText}>👨‍🌾 Farmer AI Assistant</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.chatContainer}>
            {messages.map((msg, i) => (
              <View
                key={i}
                style={[
                  styles.message,
                  msg.role === 'user' ? styles.userMessage : styles.botMessage,
                ]}
              >
                <Text style={styles.messageText}>{msg.text}</Text>
              </View>
            ))}
            {loading && <ActivityIndicator size="small" color="#2e7d32" />}
          </ScrollView>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ask about crops, soil, weather..."
              value={question}
              onChangeText={setQuestion}
            />
            <TouchableOpacity style={styles.sendButton} onPress={askAI}>
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  header: {
    backgroundColor: '#2e7d32',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  chatContainer: { padding: 10, maxHeight: 350 },
  message: {
    marginVertical: 6,
    padding: 10,
    borderRadius: 8,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#2e7d32',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-start',
  },
  messageText: { color: '#000' },
  inputContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    padding: 8,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  sendText: { color: '#fff', fontWeight: 'bold' },
});