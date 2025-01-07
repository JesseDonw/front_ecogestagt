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
import logo from '../../assets/logo.png';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


export default function SignUp() {
    const router = useRouter();

    const handleRegister = () => {
        router.replace('/home');
    };

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleCreateAccount = () => {
    if (!nom) {
      Alert.alert('Erreur', 'Le champ Nom est requis.');
      return;
    }

    if (!prenom) {
      Alert.alert('Erreur', 'Le champ Prénom est requis.');
      return;
    }


    if (!email) {
      Alert.alert('Erreur', "L'adresse email est requise.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Erreur', "L'adresse email n'est pas valide.");
      return;
    }

    if (!password) {
      Alert.alert('Erreur', 'Le mot de passe est requis.');
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Erreur',
        'Le mot de passe doit contenir au moins 6 caractères.'
      );
      return;
    }

    // Simuler la création de compte
    Alert.alert('Succès', 'Compte créé avec succès!');
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow:1}}>
        <View style={styles.container}>
      <Image
        source={logo}
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={nom}
        onChangeText={(text) => setNom(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={prenom}
        onChangeText={(text) => setPrenom(text)}
      />
   
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={styles.eyeIcon}
        >
          {passwordVisible ? <MaterialCommunityIcons name="eye-off" size={24} color="black" /> : <MaterialCommunityIcons name="eye" size={24} color="black" />}
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.createButton} onPress={handleRegister}>
        <Text style={styles.createButtonText}>Créer un compte</Text>
      </TouchableOpacity>
        </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 350,
    height: 180,
    marginBottom: 20,
    
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    width: '100%',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
  createButton: {
    backgroundColor: '#008000',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 15,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
 
