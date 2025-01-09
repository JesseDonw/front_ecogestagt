import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import check from '../../assets/check.png';

import { Colors } from '../../constants/Colors'
export  default function CongratsScreen() {

  const router = useRouter();

    const handleCheck = () => {
        router.replace('/home');
    };

  return (
  
    <View style={styles.container}>
      {/* Image en haut */}
      <Image
        source={check} // Remplacez par le chemin de votre image
        style={styles.check}
      />

      {/* Texte principal */}
      <Text style={styles.title}>Félicitation !</Text>
      <Text style={styles.subtitle}>Votre profil est prêt à être utilisé</Text>

      {/* Bouton "Next" */}
      <TouchableOpacity style={styles.button} onPress={handleCheck}>
        <Text style={styles.buttonText}>Suivant</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  check: {
   
    width: 400, // Ajustez la taille selon votre image
    height:200,
    marginBottom: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.vert, // Vert comme dans l'image
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 50,
  },
  button: {
    backgroundColor:  Colors.vert, // Vert pour le bouton
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
    
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});



