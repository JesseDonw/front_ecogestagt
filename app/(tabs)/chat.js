import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, FlatList, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import UserCard from '../../component/UserCard';
import RenderItemchat from "../../component/RenderItemchat";
import Feather from '@expo/vector-icons/Feather';
import { Colors } from "../../constants/Colors";
import { fetchMessages, sendMessageToAPI } from '../../component/chatService';

const conversationId = 1; // ID de conversation (à récupérer dynamiquement)
const agentId = 2; // ID de l'agent connecté

export default function Discussion() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Fonction pour charger les messages
  const loadMessages = async () => {
    try {
      const chatMessages = await fetchMessages(conversationId);
      const formattedMessages = chatMessages.map(msg => ({
        id: msg.id.toString(),
        text: msg.message,
        sender: msg.sender_type === 'agent' ? 'Agent' : 'Client',
      }));

      // Trier les messages du plus ancien au plus récent
      setMessages(formattedMessages.sort((a, b) => a.id - b.id));
    } catch (error) {
      console.error("Erreur lors du chargement des messages :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();

    // Met en place un intervalle pour vérifier les nouveaux messages toutes les 5 secondes
    const intervalId = setInterval(() => {
      loadMessages();
    }, 5000);

    // Nettoyer l'intervalle lorsque le composant est démonté
    return () => clearInterval(intervalId);
  }, []);

  const sendMessage = async () => {
    if (message.trim()) {
      const newMessage = {
        id: Math.random().toString(),
        text: message,
        sender: 'Agent',
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      try {
        await sendMessageToAPI(conversationId, agentId, 'agent', message);
        setMessage('');
        loadMessages(); // Recharge immédiatement après envoi
      } catch (error) {
        console.error("Erreur lors de l'envoi du meassage :", error);
      }
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} 
    >
      <View style={styles.innerContainer}>
        <UserCard imageUrl={undefined} name="Bruno" isOnline={true} />
        
        <View style={styles.chatWrapper}>
          {loading ? (
            <Text style={styles.loadingText}>Chargement des messages...</Text>
          ) : (
            <FlatList
              data={messages}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => item && <RenderItemchat item={item} />}
              keyExtractor={(item) => item?.id || Math.random().toString()}
            />
          )}

          <View style={[styles.inputContainer, styles.shadow]}>
            <TextInput
              autoFocus={true}
              multiline
              numberOfLines={4}
              selectionColor={Colors.vert}
              value={message}
              onChangeText={setMessage}
              placeholder="Écrire un message..."
              style={styles.input}
            />
            <Pressable 
              android_ripple={{ color: Colors.vert + "50", foreground: true }} 
              onPress={sendMessage} 
              style={styles.sender}
            >
              <Feather name="send" size={24} color={Colors.vert} />
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  chatWrapper: {
    flex: 1,
    padding: 10,
    width: "100%",
    overflow: "hidden",
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 22,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontFamily: "AbhayaLibreRegular",
    fontSize: 16,
    borderColor: "transparent",
  },
  sender: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 50,
    overflow: "hidden",
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  loadingText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
    color: Colors.vert,
  },
});
