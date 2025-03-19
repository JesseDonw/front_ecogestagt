import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://ecogest1-69586dbc1b71.herokuapp.com/api';
const ADMIN_ID = 1;
const ADMIN_TYPE = 'App\\Models\\Administrateur';
const AGENT_TYPE = 'App\\Models\\AgentCollecte';

// Fonction pour envoyer un message de l'agent à l'administrateur
export const sendMessageToAdmin = async (content) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    const agentId = await AsyncStorage.getItem('agentId');

    if (!token) throw new Error('Token non trouvé dans AsyncStorage');
    if (!agentId) throw new Error('ID de l\'agent non trouvé dans AsyncStorage');

    const response = await axios.post(`${API_URL}/send-message`, {
      sender_id: parseInt(agentId),
      sender_type: AGENT_TYPE,
      receiver_id: ADMIN_ID,
      receiver_type: ADMIN_TYPE,
      content: content,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    console.log("Message envoyé avec succès:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'envoi du message:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fonction pour récupérer les messages entre l'agent et l'administrateur
export const fetchMessagesWithAdmin = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    const agentId = await AsyncStorage.getItem('agentId');

    if (!token) throw new Error('Token non trouvé dans AsyncStorage');
    if (!agentId) throw new Error('ID de l\'agent non trouvé dans AsyncStorage');

    const response = await axios.get(`${API_URL}/fetch-messages`, {
      params: {
        with_id: ADMIN_ID,
        with_type: ADMIN_TYPE,
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Messages récupérés avec l'administrateur:", response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des messages:', error.response ? error.response.data : error.message);
    return [];
  }
};
