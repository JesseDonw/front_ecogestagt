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

const CongratsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Image en haut */}
      <Image
        source={check} // Remplacez par le chemin de votre image
        style={styles.check}
      />

      {/* Texte principal */}
      <Text style={styles.title}>Congrats!</Text>
      <Text style={styles.subtitle}>Your Profile Is Ready To Use</Text>

      {/* Bouton "Next" */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Next</Text>
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
  image: {
    width: 120, // Ajustez la taille selon votre image
    height: 120,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0C803B', // Vert comme dans l'image
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#0C803B', // Vert pour le bouton
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


