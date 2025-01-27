import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../../constants/Colors';

export default function App() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({ nom: '', prenom: '', email: '', image: null });

  // Récupération des informations du profil depuis le stockage local
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedProfile = await AsyncStorage.getItem('userProfile');
        if (storedProfile) {
          setProfile(JSON.parse(storedProfile));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <View style={styles.profileIconContainer}>
          {profile.image ? (
            <Image source={{ uri: profile.image }} style={styles.profileImage} />
          ) : (
            <Ionicons name="person-circle" size={100} color="#f0c541" />
          )}
        </View>
        <Text style={styles.profileName}>{profile.nom} {profile.prenom}</Text>
        <Text style={styles.profileEmail}>{profile.email}</Text>
      </View>

      {/* Tasks Completed */}
      <TouchableOpacity onPress={() => router.push('/parametres/accomplis')} style={styles.optionContainer}>
        <Text style={styles.optionText}>Tâches accomplies</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.vert} />
      </TouchableOpacity>

      {/* Settings */}
      <TouchableOpacity onPress={() => router.push('/parametres/parametre')} style={styles.optionContainer}>
        <Text style={styles.optionText}>Paramètres</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.vert} />
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity onPress={() => router.push('/auth/signin')} style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={20} color="white" />
        <Text style={styles.logoutText}>Déconnexion</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileIconContainer: {
    borderWidth: 2,
    borderColor: Colors.orange,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 23,
    fontFamily: "AbhayaLibreExtraBold",
    marginBottom: 5,
  },
  profileEmail: {
    fontFamily: "AbhayaLibreExtraBold",
    fontSize: 16,
    color: 'gray',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
  },
  optionText: {
    fontFamily: "AbhayaLibreExtraBold",
    fontSize: 18,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.vert,
    width: '90%',
    padding: 15,
    borderRadius: 15,
    marginTop: 30,
  },
  logoutText: {
    fontFamily: "AbhayaLibreExtraBold",
    fontSize: 18,
    color: 'white',
    marginLeft: 10,
  },
});

