import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BarChart } from 'react-native-chart-kit';
import person from '../assets/pers.png';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function  ProfilCard(props){
    const {welText,userName,userImage}=props
    return(<View style={styles.header}>
        
            <View>
              <Text style={styles.welcomeText}>{welText}</Text>
              <Text style={styles.userName}>{userName}</Text>
            </View>
            <Image
              source={userImage ? person : {uri:userImage}}
              style={styles.profileImage}
            />
          </View>)
}

const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    welcomeText: {
      fontSize: 16,
      color: '#2E8B57',
      fontWeight: '600',
    },
    userName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000',
    },
    profileImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    
  });
  