import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BarChart } from 'react-native-chart-kit';
import person from '../assets/pers.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import glassman from "../assets/glassman.png"
import { Colors } from '../constants/Colors';

export default function ProfilCard(props) {
  const { welText = "", userName = "", userImage = null } = props
  return (<View style={styles.header}>
    <View>
      <Text style={styles.welcomeText}>{welText}</Text>
      <Text style={styles.userName}>{userName}</Text>
    </View>
    <Image
      source={userImage ? { uri: userImage } : person }
      style={styles.profileImage}
    />
  </View>)
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
    textTransform: "capitalize"
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "transparent"
  },

});
