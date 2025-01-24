import { useRouter, Link, Tabs, Stack } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import Header from '../../component/Header';
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from '../../constants/Colors';


export default function NotifLayout() {

    const router = useRouter();

    return <Stack screenOptions={{
            headerTitleStyle: {
            fontFamily: "AbhayaLibreExtraBold",
            fontSize: 25,
        },
    }} >
        <Stack.Screen
            name="notif"
            options={{
                title: "Notification",
                headerTitleAlign: "center",
                headerLeft: () =>
                    <Link href="/home" style={styles.wrapperBack}>
                        <Entypo
                            name="chevron-left"
                            size={26}
                            color={Colors.orange_foncer}
                            onPress={()=> {
                                router.back()
                            }}
                        />
                    </Link>,
            }}
        />

    </Stack>



}
const styles = StyleSheet.create({
    wrapperBack: {
        backgroundColor: Colors.orange + "50",
        padding: 8,
        marginLeft: 2,
        borderRadius: 14,
    },


})
