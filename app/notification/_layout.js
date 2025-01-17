import { useRouter, Link, Tabs, Stack } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import Header from '../../component/Header';
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from '../../constants/Colors';


export default function NotifLayout() {

    const router = useRouter();

    return <Stack screenOptions={{
       
        headerLeft: () =>
            <Link href="/home" style={styles.wrapperBack}>
                <Entypo
                    name="chevron-left"
                    size={26}
                    color={Colors.orange_foncer}
                    style={styles.iconBack}
                />
            </Link>,
            headerTitleStyle: {
                fontFamily: "AbhayaLibreExtraBold", // Police personnalisée
                fontSize: 25, // Taille de police personnalisée
            },
            

        
       
    }} >
          <Stack.Screen
                    name="notif"
                    options={{
                       
                     title: "Notification"
                              
                    }}
                />
        
    </Stack>
        
   

}
const styles = StyleSheet.create({




})
