import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import logo from '../../assets/logo.png';
import facebook from '../../assets/facebook.png';
import google from '../../assets/google.png';
import { Colors } from '../../constants/Colors'


export default function Signin() {
    const router = useRouter();

    const handleSignin = () => {
        router.replace('/home');
    };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const verifiedForm = () => {
        if (!email) {
            Alert.alert('Erreur', "L'adresse email est requise.");
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert('Erreur', "L'adresse email n'est pas valide.");
            return;
        }

        if (!password) {
            Alert.alert('Erreur', 'Le mot de passe est requis.');
            return;
        }

        if (password.length < 6) {
            Alert.alert(
                'Erreur',
                'Le mot de passe doit contenir au moins 6 caractères.'
            );
            return;
        }
    }

    const handleLogin = () => {
        if (!email) {
            Alert.alert('Erreur', "L'adresse email est requise.");
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert('Erreur', "L'adresse email n'est pas valide.");
            return;
        }

        if (!password) {
            Alert.alert('Erreur', 'Le mot de passe est requis.');
            return;
        }

        if (password.length < 6) {
            Alert.alert(
                'Erreur',
                'Le mot de passe doit contenir au moins 6 caractères.'
            );
            return;
        }

        // Simuler une connexion réussie
        Alert.alert('Succès', 'Connexion réussie!');
    };

    return (
        <View style={styles.container}>
            <Image
                source={logo}
                style={styles.logo}
            />

            <Text style={styles.title}>Connectez-vous à votre compte </Text>

            <TextInput
                style={[styles.input, styles.shadow]}
                placeholder="Email"
                selectionColor={Colors.vert}
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                selectionColor={Colors.vert}
                style={[styles.input, styles.shadow]}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleSignin}>
                <Text style={styles.loginButtonText}>Se connecter</Text>
            </TouchableOpacity>
            <Text style={styles.orText}>Ou continuer avec </Text>
            <View style={styles.socialButtonsContainer}>
                <TouchableOpacity style={styles.socialButton}>
                    <Image
                        source={facebook}
                        style={styles.facebook}
                    />
                    <Text style={styles.socialButtonText}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Image
                        source={google}
                        style={styles.google}
                    />
                    <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => router.push('/auth/signup')}>
                <Text style={styles.linkText}>Créer un compte</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.linkText}>Mot de passe oublié </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },

    facebook: {
        width: 25,
        height: 25,


    },

    google: {
        width: 25,
        height: 25,

    },

    logo: {
        width: 350,
        height: 190,
        marginBottom: 0,
    },
    title: {
        fontFamily: "AbhayaLibreExtraBold",
        fontSize: 20,
        marginBottom: 20,
    },
    input: {
        fontFamily: "AbhayaLibreExtraBold",
        backgroundColor: '#ffffff',
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 0.2,
        borderRadius: 15,
        marginBottom: 15,
        paddingHorizontal: 10,
    },

    shadow: {
        // Shadow properties for iOS

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,

        // Shadow properties for Android
        elevation: 20,
    },

    loginButton: {
        backgroundColor: Colors.vert,
        width: 'auto',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        paddingHorizontal: 25,
    },
    loginButtonText: {
        fontFamily: "AbhayaLibreExtraBold",
        color: '#fff',
        fontSize: 18,
    },
    orText: {
        fontFamily: "AbhayaLibreExtraBold",
        fontSize: 14,
        marginVertical: 30,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 15,
    },
    socialButton: {
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '45%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderRadius: 15,
        borderColor: 'grey',
        borderWidth: 0.2,
    },
    socialButtonText: {
        fontFamily: "AbhayaLibreExtraBold",
        color: '#000',
        fontSize: 16,
    },
    linkText: {
        fontFamily: "AbhayaLibreExtraBold",
        color: '#008000',
        textDecorationLine: 'underline',
        marginTop: 10,
        fontSize: 14,
    },
});

