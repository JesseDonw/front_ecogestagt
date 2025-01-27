import react, { useState } from "react";
import { StyleSheet, View, TextInput, Button, FlatList, Pressable, KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import UserCard from '../../component/UserCard';
import RenderItemchat from "../../component/RenderItemchat";
import Feather from '@expo/vector-icons/Feather';
import { Colors } from "../../constants/Colors";

const mockMessages = [
  { id: '1', text: 'Salut, comment ça va ?', sender: 'Admin' },
  { id: '2', text: 'Très bien, merci ! Et toi ?', sender: 'Agent' },
  { id: '3', text: 'Je vais bien aussi, merci.', sender: 'Admin' }
];

export default function Discussion() {
  const [messages, setMessages] = useState(mockMessages);
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Math.random().toString(),
        text: message,
        sender: 'Agent'
      };
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView 
    style={{
      flex: 1,
      width: "100%"
    }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} 
    keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} 
    >

    <View style={styles.container}>
      <UserCard
        imageUrl={undefined}
        name="Bruno"
        isOnline={true}
      />
      <View style={styles.chatWrapper}>
        <FlatList
          data={messages}
          showsVerticalScrollIndicator={false}
          renderItem={RenderItemchat}
          keyExtractor={(item) => item.id}
          inverted
        />

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
          <Pressable android_ripple={{color: Colors.vert+"50", foreground: true}} onPress={sendMessage} style={styles.sender}>
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
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6
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
    borderWidth: 0,
  },
  sender: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 50,
    overflow: "hidden"
  },
  shadow: {
    // Shadow properties for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,

    // Shadow properties for Android
    elevation: 4,
  },
});
