import { Link, Tabs, Stack } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';

import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from '../../constants/Colors';


export default function ParamLayout() {
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
                title: 'Paramètre',
                headerLeft: () =>
                    <Link href="/profile" style={styles.wrapperBack}>
                        <Entypo
                            name="chevron-left"
                            size={26}
                            color={Colors.orange_foncer}
                            style={styles.iconBack}
                        />
                    </Link>


            }}
        />

        <Stack.Screen
            name="accomplis"
            options={{
                title: 'Tâche accomplis',
                headerLeft: () =>
                    <Link href="/profile" style={styles.wrapperBack}>
                        <Entypo
                            name="chevron-left"
                            size={26}
                            color={Colors.orange_foncer}
                            style={styles.iconBack}
                        />
                    </Link>

            }}
        />

        <Stack.Screen
            name="modif_mdp"
            options={{
                title: 'Changer le mot de passe',
                headerLeft: () =>
                    <Link href="/parametres/parametre" style={styles.wrapperBack}>
                        <Entypo
                            name="chevron-left"
                            size={26}
                            color={Colors.orange_foncer}
                            style={styles.iconBack}
                        />
                    </Link>


            }}
        />

        <Stack.Screen
            name="modif_profil"
            options={{
                title: 'Modification du profil',
                headerLeft: () =>
                    <Link href="/parametres/parametre" style={styles.wrapperBack}>
                        <Entypo
                            name="chevron-left"
                            size={26}
                            color={Colors.orange_foncer}
                            style={styles.iconBack}
                        />
                    </Link>


            }}
        />
    </Stack>

}
const styles = StyleSheet.create({


    wrapperBack: {
        padding: 8,
        marginLeft: 8,
        borderRadius: 14,
    },


})