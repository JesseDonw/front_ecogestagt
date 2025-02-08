import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, FlatList, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserCard from '../../component/UserCard';
import RenderItemchat from "../../component/RenderItemchat";
import Feather from '@expo/vector-icons/Feather';
import { Colors } from "../../constants/Colors";
import { fetchMessagesWithAdmin, sendMessageToAdmin } from '../../component/chatService';

export default function AgentDiscussion() {
  
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [agentId, setAgentId] = useState(null);

  // Récupération de l'ID de l'agent depuis AsyncStorage
  useEffect(() => {
    const initializeAgentId = async () => {
      try {
        const storedAgentId = await AsyncStorage.getItem('agentId');
        if (!storedAgentId) {
          console.log('Aucun ID agent trouvé, redirection vers la connexion');
          router.replace('/auth/signin');  // Redirection si non connecté
        } else {
          console.log('ID agent récupéré:', storedAgentId);
          setAgentId(parseInt(storedAgentId, 10));  // Convertir en nombre
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'ID agent:', error);
      }
    };

    initializeAgentId();
  }, []);

  // Charger les messages après avoir récupéré l'ID de l'agent
  useEffect(() => {
    if (agentId) {
      loadMessages();  // Charger les messages
      const intervalId = setInterval(loadMessages, 5000);  // Actualiser toutes les 5 secondes
      return () => clearInterval(intervalId);  // Nettoyer l'intervalle à la fermeture
    }
  }, [agentId]);

  // Fonction pour récupérer les messages
  const loadMessages = async () => {
    try {
      const chatMessages = await fetchMessagesWithAdmin();
      const formattedMessages = chatMessages.map(msg => ({
        id: msg.id.toString(),
        text: msg.content,
        sender: msg.sender_type === 'App\\Models\\AgentCollecte' ? 'agent' : 'admin',
      }));
      setMessages(formattedMessages.sort((a, b) => a.id - b.id));
    } catch (error) {
      console.error("Erreur lors du chargement des messages:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour envoyer un message
  const sendMessage = async () => {
    if (message.trim() && agentId) {
      const newMessage = { id: Math.random().toString(), text: message, sender: 'agent' };
      setMessages(prevMessages => [...prevMessages, newMessage]);

      try {
        await sendMessageToAdmin(message);  // Envoi du message à l'API
        setMessage('');  // Réinitialiser le champ de texte
        loadMessages();  // Recharger les messages après l'envoi
      } catch (error) {
        console.error("Erreur lors de l'envoi du message:", error);
      }
    }
  };

  const RenderItemChat = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === 'agent' ? styles.agentMessage : styles.adminMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
      <View style={styles.innerContainer}>
        <UserCard imageUrl={undefined} name="Administrateur" isOnline={true} />
        <View style={styles.chatWrapper}>
          {loading ? (
            <Text style={styles.loadingText}>Chargement des messages...</Text>
          ) : (
            <FlatList 
              data={messages} 
              showsVerticalScrollIndicator={false} 
              renderItem={({ item }) => <RenderItemChat item={item} />} 
              keyExtractor={item => item.id} 
            />
          )}
          <View style={[styles.inputContainer, styles.shadow]}>
            <TextInput 
              multiline 
              numberOfLines={4} 
              selectionColor={'#00A86B'} 
              value={message} 
              onChangeText={setMessage} 
              placeholder="Écrire un message..." 
              style={styles.input} 
            />
            <Pressable onPress={sendMessage} style={styles.sender}>
              <Feather name="send" size={24} color={'#00A86B'} />
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
    color: '#00A86B',
  },
  messageContainer: {
    padding: 10,
    marginVertical: 4,
    borderRadius: 8,
    maxWidth: '80%',
  },
  agentMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  adminMessage: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
});

