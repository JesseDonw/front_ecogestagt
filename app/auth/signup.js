import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,

} from 'react-native';
import { useRouter } from 'expo-router';
import logo from '../../assets/logo.png';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import person from '../../assets/person.png';
import mail from '../../assets/mail.png';
import lock from '../../assets/lock.png';
import { Colors } from '../../constants/Colors'
import CustomError from '../../component/CustomError';
import axios from 'axios';

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState({
    nom: false,
    prenom: false,
    email: false,
    password: false,
  });

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  useEffect(() => {
    if (nom) {
      setError((e) => ({
        ...e,
        nom: false
      }))
    }
  }, [nom])

  useEffect(() => {
    if (prenom) {
      setError((e) => ({
        ...e,
        prenom: false
      }))
    }
  }, [prenom])

  useEffect(() => {
    if (email) {
      setError((e) => ({
        ...e,
        email: false
      }))
    }
  }, [email])

  useEffect(() => {
    if (password) {
      setError((e) => ({
        ...e,
        password: false
      }))
    }
  }, [password])

  const verifiedForm = () => {
    const newErrors = {}

    if (!nom?.trim()) {
      newErrors.nom = true;
    }

    if (!prenom?.trim()) {
      newErrors.prenom = true;
    }

    if (email?.trim()) {
      if (!validateEmail(email.trim())) {
        newErrors.email = true;
      }
    } else {
      newErrors.email = true;
    }

    if (!password?.trim()) {
      newErrors.password = true;
    }


    setError(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignup = async () => {
    try {
      if (verifiedForm()) {
        setLoading(true)
        const data = {
          nom: nom?.trim(),
          prenom: prenom?.trim(),
          email: email?.trim(),
          password: password?.trim(),
        }

        //const response = await axios.post(Key.Url + 'jwt/create/', data);

        console.log('connecté :>> ');
        router.replace('/auth/check')
      }


    } catch (error) {
      console.log('error :>> ', error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Image
          source={logo}
          style={styles.logo}
        />


        {/* Champ Nom */}
        <View style={styles.viewInputError}>
          <View style={[styles.inputContainer, styles.shadow]}>
            <Image
              source={person} // Icône pour "Nom"
              style={styles.person}
            />
            <TextInput
              style={styles.input}
              selectionColor={Colors.vert}
              placeholder="Nom"
              value={nom}
              onChangeText={(text) => setNom(text)}
            />
          </View>
          {error.nom && <CustomError />}
        </View>


        {/* Champ Prénom */}
        <View style={styles.viewInputError}>
          <View style={[styles.inputContainer, styles.shadow]}>
            <Image
              source={person} // Icône pour "Prénom"
              style={styles.person}
            />
            <TextInput
              style={styles.input}
              selectionColor={Colors.vert}
              placeholder="Prénom"
              value={prenom}
              onChangeText={(text) => setPrenom(text)}
            />
          </View>
          {error.prenom && <CustomError />}
        </View>

        {/* Champ Email */}
        <View style={styles.viewInputError}>
          <View style={[styles.inputContainer, styles.shadow]}>
            <Image
              source={mail} // Icône pour "Email"
              style={styles.mail}
            />
            <TextInput
              style={styles.input}
              selectionColor={Colors.vert}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          {error.email && <CustomError />}
        </View>

        {/* Champ Password */}
        <View style={styles.viewInputError} >
          <View style={[styles.passwordContainer, styles.shadow]}>
            <Image
              source={lock} // Icône pour "Password"
              style={styles.lock}
            />
            <TextInput
              style={styles.passwordInput}
              selectionColor={Colors.vert}
              placeholder="Password"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.eyeIcon}
            >
              {passwordVisible ? (
                <MaterialCommunityIcons name="eye-off" size={24} color="black" />
              ) : (
                <MaterialCommunityIcons name="eye" size={24} color="black" />
              )}
            </TouchableOpacity>
          </View>
          {error.password && <CustomError />}
        </View>

        <TouchableOpacity style={styles.createButton} onPress={() => loading ? null : handleSignup()}>
          {loading ?
                              <ActivityIndicator color={Colors.vert} />
                              :
                              <Text style={styles.createButtonText}>Créer un compte</Text>
                          }
         
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/auth/signin')}>
          <Text style={styles.linkText}> Avez vous déja un compte ? </Text>
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

  person: {
    width: 40,
    height: 40,
    marginRight: -10,
  },

  mail: {
    width: 40,
    height: 40,
    marginRight: -10,
  },

  lock: {
    width: 40,
    height: 40,
    marginRight: -10,
  },

  input: {
    fontFamily: "AbhayaLibreExtraBold",
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,


  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 0.2,
    borderRadius: 15,
    width: '100%',
    backgroundColor: '#ffffff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 0.2,
    borderRadius: 15,

    width: '100%',
    backgroundColor: '#ffffff',
  },
  passwordInput: {
    fontFamily: "AbhayaLibreExtraBold",
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    fontSize: 16,

  },

  shadow: {
    // Shadow properties for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,

    // Shadow properties for Android
    elevation: 20,
  },

  eyeIcon: {
    paddingHorizontal: 10,
  },
  createButton: {
    backgroundColor: Colors.vert,
    width: 'auto',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    paddingHorizontal: 25,
    marginTop: 20,
  },

  createButtonText: {
    fontFamily: "AbhayaLibreExtraBold",
    color: '#fff',
    fontSize: 18,
  },
  linkText: {
    fontFamily: "AbhayaLibreExtraBold",
    color: '#008000',
    textDecorationLine: 'underline',
    marginTop: 30,
    fontSize: 14,
  },
  viewInputError: {
    marginBottom: 5,

  },
});

