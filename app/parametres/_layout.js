import { useRouter, Link, Tabs, Stack } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import Header from '../../component/Header';
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from '../../constants/Colors';


export default function ParamLayout() {
    const router = useRouter();
    return <Stack screenOptions={{
        headerStyle: {
            backgroundColor: Colors.vert,
            borderBottomLeftRadius: 15,
        },
        headerLargeTitleStyle: {
            fontFamily: "AbhayaLibreExtraBold",
            size: 24,
            backgroundColor: "red",
        },

    }} >
        <Stack.Screen
            name="parametre"
            options={{
                header: () => (
                    <Header
                        title='Paramètre'
                        onBack={() => router.push('/profile')}
                    />
                ),
            }}
        />

        <Stack.Screen
            name="accomplis"
            options={{
                header: () => (
                    <Header
                        title="Tâche accomplis"
                        onBack={() => router.push('/profile')}
                    />
                ),
            }}
        />


        <Stack.Screen
            name="modif_mdp"
            options={{
                header: () => (
                    <Header
                        title='Changer le mot de passe'
                        onBack={() => router.push('/parametres/parametre')}
                    />
                ),


            }}
        />

        <Stack.Screen
            name="modif_profil"
            options={{
                header: () => (
                    <Header
                        title='Modification du profil'
                        onBack={() => router.push('/parametres/parametre')}
                    />
                ),


            }}
        />
    </Stack>

}
const styles = StyleSheet.create({




})