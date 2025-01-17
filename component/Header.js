import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { Colors } from '../constants/Colors';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Header({ title, onBack, rightButton }) {
    const router = useRouter();


    return (
       <>
        <SafeAreaView style={styles.SafeAreaView}>
        </SafeAreaView>
        <View style={styles.headerContainer}>
            
            {/* Bouton de retour */}
            {onBack && (
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Entypo name="chevron-left" size={26} color={Colors.orange_foncer} />
                </TouchableOpacity>
            )}

            {/* Titre de l'en-tête */}
            <Text style={styles.title}>{title}</Text>

           
            
        </View>
       </>
        
    );
}

const styles = StyleSheet.create({
    SafeAreaView:{
        paddingBottom:-40,
        paddingTop:-10,
        backgroundColor: Colors.vert,
    },
    headerContainer: {
        height: 60,
        backgroundColor: Colors.vert,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderBottomLeftRadius: 17,
        borderBottomRightRadius: 17,
    },
    backButton: {
        padding: 8,
       
    },
    title: {
        fontSize: 25,
        fontFamily: 'AbhayaLibreExtraBold',
        color: 'black',
        flex: 1,
        textAlign: 'center',
       
    },
    rightButton: {
        padding: 8,
        backgroundColor:"black",
    },
    rightButtonText: {
        fontSize: 16,
        color: Colors.orange_foncer,
    },
});
