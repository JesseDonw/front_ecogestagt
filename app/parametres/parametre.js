import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import logo from '../../assets/logo.png';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Colors } from '../../constants/Colors';
import CustomError from '../../component/CustomError';
import axios from 'axios';

export default function Param() {
   const router = useRouter();
      const [loading, setLoading] = useState(false);
  return (
    <View style={styles.container}>
      {/* Options */}
      <TouchableOpacity onPress={() => router.push('/parametres/modif_profil')} style={styles.optionContainer}>
        <Text style={styles.optionText}>Modification du profil</Text>
        <Ionicons name="chevron-forward" size={20} color= {Colors.vert} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/parametres/modif_mdp')} style={styles.optionContainer}>
        <Text style={styles.optionText}>Changer le mot de passe</Text>
        <Ionicons name="chevron-forward" size={20} color= {Colors.vert} />
      </TouchableOpacity>

      <TouchableOpacity  style={styles.optionContainer}>
        <Text style={styles.optionText}>Confidentialité</Text>
        <Ionicons name="chevron-forward" size={20} color= {Colors.vert} />
      </TouchableOpacity>

      {/* Delete Account */}
      <TouchableOpacity style={styles.deleteContainer}>
        <Ionicons name="trash" size={20} color="red" style={styles.deleteIcon} />
        <Text style={styles.deleteText}>Supprimer votre compte</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    padding: 15,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 15,
    backgroundColor: '#f9f9f9',
  },
  optionText: {
    fontFamily: "AbhayaLibreExtraBold",
    fontSize: 18,
    color: '#333',
  },
  deleteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  deleteIcon: {
    marginRight: 10,
  },
  deleteText: {
    color: 'red',
    fontFamily: "AbhayaLibreExtraBold",
    fontSize: 16,
    textAlign: 'center',
  },
});
