import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { Colors } from '../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [editingField, setEditingField] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      const storedProfile = await AsyncStorage.getItem('userProfile');
      if (storedProfile) {
        const profileData = JSON.parse(storedProfile);
        setFormData(profileData);
        setImage(profileData.image);
      }
    };
    loadProfile();
  }, []);

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
      setFormData({ ...formData, dateNaissance: selectedDate.toLocaleDateString() });
      setShowDatePicker(false);
    }
  };

  const validateFields = () => {
    if (!formData.nom || !formData.prenom || !formData.email || !formData.sexe || !formData.dateNaissance) {
      setErrorMessage('Veuillez remplir tous les champs obligatoires');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    setLoading(true);
    try {
      const updatedProfile = {
        ...formData,
        image: image || formData.image,
      };

      await AsyncStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      Alert.alert('Succès', 'Profil mis à jour avec succès.');
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour du profil.');
    } finally {
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

        {['nom', 'prenom', 'email', 'bio'].map((field) => (
          <View style={styles.inputWrapper} key={field}>
            <TextInput
              placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)}`}
              style={styles.input}
              value={formData[field]}
              onChangeText={(text) => handleInputChange(field, text)}
              keyboardType={field === 'email' ? 'email-address' : 'default'}
              editable={editingField === field}
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity onPress={() => setEditingField(field)}>
              <AntDesign name="edit" size={20} color={Colors.vert} />
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.inputWrapper}>
          <RNPickerSelect
            onValueChange={(value) => handleInputChange('sexe', value)}
            items={[
              { label: "Masculin", value: "Masculin" },
              { label: "Féminin", value: "Féminin" }
            ]}
            placeholder={{ label: "Choisir le sexe", value: "" }}
            style={{
              inputIOS: styles.picker,
              inputAndroid: styles.picker,
              placeholder: { color: '#aaa', fontSize: 18 },
              iconContainer:{
                top:15,
                right:0,
                
              },
            }}
            value={formData.sexe}
            useNativeAndroidPickerStyle={false}
            Icon={() => <AntDesign name="down" size={20} color={Colors.vert} />}
            
          />
        </View>

        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.inputWrapper}>
          <TextInput
            placeholder="Date de naissance"
            style={styles.input}
            value={formData.dateNaissance}
            editable={false}
            placeholderTextColor="#aaa"
          />
          <AntDesign name="calendar" size={20} color={Colors.vert} />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode="date"
            is24Hour={true}
            display="spinner"
            onChange={handleDateChange}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Enregistrer</Text>}
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
  AntDesign:{
    backgroundColor: "red",
    position: "absolute",
    right:0,
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.vert,
    borderRadius: 15,
    width: '90%',
    paddingHorizontal: 15,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 15,
    color: '#000',
  },
  picker: {
    width:310,
    fontSize: 18,
    paddingVertical: 12,
    color: '#000',
  
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
    fontSize: 20,
  },
});
