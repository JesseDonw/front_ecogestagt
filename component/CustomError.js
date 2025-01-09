import React from 'react';
import { StyleSheet, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '../constants/Colors'


export default function CustomError({message = null, style={}}) {

  return (
    <Text style={[styles.errorText, {...style}]}>
      <Text>
             <AntDesign name="exclamationcircleo" size={12} color={styles.errorText.color} /> </Text>
             <Text>{ message ? message : "Le champ est obligatoire"}</Text>
            </Text>
  );
}

const styles = StyleSheet.create({
    errorText: {
        color: Colors.danger,
        fontFamily: "AbhayaLibreRegular",
        fontSize: 12,
        marginTop: 1,
        marginLeft: 18,
        gap: 2,
      }
  })