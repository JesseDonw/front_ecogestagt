import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import person from '../assets/pers.png';
import { Colors } from '../constants/Colors';

export default function ProfilCard({ welText = "Bienvenue!", defaultImage = person }) {
  const [profile, setProfile] = useState({ nom: '', prenom: '', email: '', image: null });

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
    <View style={styles.header}>
      <View>
        <Text style={styles.welcomeText}>{welText}</Text>
        <Text style={styles.userName}>{profile.nom} {profile.prenom}</Text>
        <Text style={styles.userEmail}>{profile.email}</Text>
      </View>
      {profile.image ? (
        <Image source={{ uri: profile.image }} style={styles.profileImage} />
      ) : (
        <Ionicons name="person-circle" size={100} color="#f0c541" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  welcomeText: {
    fontFamily: "AbhayaLibreMedium",
    fontSize: 16,
    color: Colors.vert_select,
  },
  userName: {
    fontFamily: "AbhayaLibreExtraBold",
    fontSize: 20,
    color: '#000',
    textTransform: "capitalize",
  },
  userEmail: {
    fontFamily: "AbhayaLibreMedium",
    fontSize: 16,
    color: '#555',
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "transparent",
  },
});
