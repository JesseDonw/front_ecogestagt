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
        router.replace('/auth/signin');
    };

  return (
  
    <View style={styles.container}>
      {/* Image en haut */}
      <Image
        source={check}
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
    position: "relative",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  check: {
    width: 400,
    height:200,
    marginBottom: 0,
  },
  title: {
    fontFamily: "AbhayaLibreExtraBold",
    fontSize: 32,
    color: Colors.vert,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: "AbhayaLibreExtraBold",
    fontSize: 20,
    color: '#333',
    marginBottom: 50,
  },
  button: {
    position: "absolute",
    bottom: 35,
    backgroundColor:  Colors.vert,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
  },
  buttonText: {
    fontFamily: "AbhayaLibreExtraBold",
    color: '#fff',
    fontSize: 18,
    
  },
});



