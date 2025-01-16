import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '../../constants/Colors';

export default function Modif() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    bio: '',
    sexe: '',
    dateNaissance: ''
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    if (name === 'email') {
      validateEmail(value);
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setErrorMessage('Email invalide');
    } else {
      setErrorMessage('');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setShowDatePicker(false);
      setFormData({ ...formData, dateNaissance: selectedDate.toLocaleDateString() });
    }
  };

  const validateFields = () => {
    if (!formData.nom || !formData.prenom || !formData.email || !formData.bio || !formData.sexe || !formData.dateNaissance) {
      setErrorMessage('Veuillez remplir tous les champs');
      return false;
    }
    if (errorMessage) {
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateFields()) return;

    setLoading(true);
    try {
      // Simulating profile update process
      setTimeout(() => {
        Alert.alert('Succès', 'Profil mis à jour avec succès.');
        setLoading(false);
      }, 1500);
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour du profil.');
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            {image ? (
              <Image source={{ uri: image }} style={styles.profileImage} />
            ) : (
              <Ionicons name="person-circle" size={100} color="#f0c541" />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImage} style={styles.iconContainer}>
            <AntDesign name="pluscircle" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TextInput
          placeholder="Nom"
          style={styles.input}
          value={formData.nom}
          onChangeText={(text) => handleInputChange('nom', text)}
        />

        <TextInput
          placeholder="Prénom"
          style={styles.input}
          value={formData.prenom}
          onChangeText={(text) => handleInputChange('prenom', text)}
        />

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Bio"
          style={styles.input}
          value={formData.bio}
          onChangeText={(text) => handleInputChange('bio', text)}
        />

        <TextInput
          placeholder="Sexe"
          style={styles.input}
          value={formData.sexe}
          onChangeText={(text) => handleInputChange('sexe', text)}
        />

        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
          <Text style={styles.dateText}>{formData.dateNaissance || "Date de naissance"}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Enregistrer</Text>
          )}
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePicker: {
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  iconContainer: {
    position: 'absolute',
    top: 70,
    left: 70,
  },
  input: {
    fontFamily: "AbhayaLibreExtraBold",
    fontSize: 18,
    width: '90%',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: Colors.vert ,
    borderRadius: 15,
    marginVertical: 5,
  },
  button: {
    backgroundColor: Colors.vert,
    width: '90%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontFamily: "AbhayaLibreExtraBold",
    fontSize: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center'
  },
  datePicker: {
    width: '90%',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: Colors.vert,
    borderRadius: 15,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dateText: {
    fontFamily: "AbhayaLibreExtraBold",
    fontSize: 18
  }
});
