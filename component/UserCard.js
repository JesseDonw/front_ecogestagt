/**
 * @file UserCard.js
 * @description Composant d'affichage d'un utilisateur avec son avatar, son nom et son statut en ligne.
 */

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import pers from "../assets/pers.png"
import { Colors } from '../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';


/**
 * Composant UserCard qui affiche l'avatar, le nom et le statut de l'utilisateur.
 * 
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.imageUrl - URL de l'image de profil.
 * @param {string} props.name - Nom de l'utilisateur.
 * @param {boolean} props.isOnline - Statut de l'utilisateur (en ligne ou hors ligne).
 */
const UserCard = ({ imageUrl, name, isOnline }) => {
  return (
    <View style={styles.container}>
      <Image source={!imageUrl ? pers : { uri: imageUrl }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.statusContainer}>
        <LinearGradient
            colors={isOnline ? [Colors.gradient, Colors.gradient_foncer] : [Colors.gris, Colors.gris_foncer]}
            style={styles.statusIndicator}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
          <Text style={[styles.statusText, { color: isOnline ? Colors.vert : "gray" }]}> {isOnline ? 'En ligne' : 'Déconnecté'}</Text>
        </View>
      </View>
    </View>
  );
};

//UserCard.propTypes = {
//  imageUrl: PropTypes.string.isRequired,
//  name: PropTypes.string.isRequired,
//  isOnline: PropTypes.bool.isRequired,
//};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "100%",
    padding: 12,
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 10,
    resizeMode: 'center',
    backgroundColor: Colors.gris
  },
  infoContainer: {
    marginLeft: 15,
  },
  name: {
    fontSize: 15,
    fontFamily: "AbhayaLibreExtraBold",
    textTransform: "capitalize",
  },
  statusContainer: {
    position: "relative",
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3
  },
  statusIndicator: {
    position: "absolute",
    top: -0.4,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  statusText: {
    fontSize: 14,
    color: Colors.noir_fondu,
    fontFamily: "AbhayaLibreExtraBold",
    marginLeft: 8
  },
});

export default UserCard;