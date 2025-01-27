import axios from 'axios';

const API_URL = 'https://c63c-197-234-219-41.ngrok-free.app/api'; // Remplace par ton URL Laravel

// Fonction pour démarrer une conversation (Client -> Admin)
export const startConversation = async (clientId) => {
  try {
    const response = await axios.post(`${API_URL}/start-conversation`, { client_id: clientId });
    return response.data;
  } catch (error) {
    console.error('Erreur de démarrage de la conversation:', error);
    throw error;
  }
};

// Fonction pour envoyer un message (Agent ou Client)
export const sendMessageToAPI = async (conversationId, senderId, senderType, text) => {
  try {
    const response = await axios.post(`${API_URL}/send-message`, {
      conversation_id: conversationId,
      sender_id: senderId,
      sender_type: senderType,
      message: text,
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'envoi du message:", error);
  }
};

// Fonction pour récupérer les messages d'une conversation
export const fetchMessages = async (conversationId) => {
  try {
    const response = await axios.get(`${API_URL}/messages/${conversationId}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des messages:', error);
    return [];
  }
};
