import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { Colors } from '../constants/Colors'
/**
 * Composant réutilisable pour un champ de saisie avec une icône.
 * @param {object} props - Les propriétés du composant.
 * @param {string} props.placeholder - Le texte d'espace réservé (placeholder) du champ de saisie.
 * @param {number | { uri: string } | require('path/to/image') } props.iconSource - La source de l'icône. Peut être un URI, un chemin local avec require, ou un nombre (pour les icônes statiques).
 * @param {function} props.onChangeText - La fonction appelée lorsque le texte change. Reçoit le nouveau texte en argument.
 * @param {string} props.value - La valeur actuelle du champ de saisie.
 * @param {object} [props.iconStyle] - Styles supplémentaires pour l'icône (par exemple, `tintColor`).
 * @param {object} [props.inputStyle] - Styles supplémentaires pour le champ de saisie.
 * @returns {JSX.Element} Le composant Imputs.
 */
export const Imputs = ({ placeholder, iconSource, onChangeText, value, iconStyle, inputStyle, ...props }) => {
  return (
    <View style={styles.inputContainer}>
      <Image source={iconSource} style={[styles.icon, iconStyle]} />
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        placeholderTextColor= {Colors.noir_fondu}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    width: '80%', //pour que les inputs ne soient pas trop petits
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
