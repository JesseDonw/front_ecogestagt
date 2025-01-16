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

export default function App() {
  const router = useRouter();
    const [loading, setLoading] = useState(false);
  
  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <View style={styles.profileContainer}>
        <View style={styles.profileIconContainer}>
          <Ionicons name="person-circle" size={100} color="#f0c541"  />
        </View>
        <Text style={styles.profileName}>DONWAHOUE Jesse</Text>
        <Text style={styles.profileEmail}>jessedowahoue8@gmail.com</Text>
      </View>

      {/* Tasks Completed */}
      <TouchableOpacity  onPress={() => router.push('/parametres/accomplis')} style={styles.optionContainer}>
        <Text style={styles.optionText}>Tache accomplis</Text>
        <Ionicons name="chevron-forward" size={20} color= {Colors.vert} />
      </TouchableOpacity>

      {/* Settings */}
      <TouchableOpacity  onPress={() => router.push('/parametres/parametre')} style={styles.optionContainer}>
        <Text style={styles.optionText}>Paramètre</Text>
        <Ionicons name="chevron-forward" size={20} color= {Colors.vert} />
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity   onPress={() => router.push('/auth/signin')} style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={20} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    marginTop:50,
    
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileIconContainer: {
    borderWidth:2,
    borderColor: Colors.orange,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 10,
   
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
