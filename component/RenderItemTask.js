import React, { useState,useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

export default function RenderItemTask({ item, validateTask }) {
    const router = useRouter();
  
    const handlePress = () => {
      router.push({
        pathname: "/location/maps",
        params: {
          latitude: item.localisation.latitude,
          longitude: item.localisation.longitude,
          taskId: item.id,
        }
      });
    };
  
    return (
      <View style={styles.taskCard}>
        <View>
        <Text style={styles.taskLocation}>{item.localisation.location}</Text>
          <Text style={styles.taskTitle}>{item.nom_tache}</Text>
          <Text style={styles.taskDate}>{item.date_envoie_tache}</Text>
          
        </View>
  
        <TouchableOpacity onPress={handlePress} disabled={item.statut === 'terminée'}>
          <LinearGradient
            colors={item.statut === 'terminée' ? [Colors.gris_foncer, Colors.gris_foncer] : [Colors.gradient, Colors.gradient_foncer]}
            style={styles.validateButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>{item.statut === 'terminée' ? 'Validée' : 'Valider'}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

const styles = StyleSheet.create({
    taskCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Colors.white,
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 16,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 10,
    },
    taskTitle: {
        fontFamily: "AbhayaLibreExtraBold",
        fontSize: 16,
        color: Colors.noir,
    },
    taskDate: {
        fontFamily: "AbhayaLibreRegular",
        fontSize: 14,
        color: Colors.noir_fondu + "60",
        marginVertical: 4,
    },
    validateButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 15,
        alignItems: 'center',
    },
    valid: {
        backgroundColor: Colors.gris_foncer,
    },
    invalid: {
        backgroundColor: Colors.gradient,
    },
    buttonText: {
        color: Colors.white,
        fontFamily: "AbhayaLibreSemiBold",
    },
    placeholderText: {
        fontSize: 16,
        color: '#999',
    },
});