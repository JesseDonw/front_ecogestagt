import { Link, Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import homeU from "../../assets/home_u.png"
import homeS from "../../assets/home_s.png"
import chatU from "../../assets/chat_u.png"
import chatS from "../../assets/chat_s.png"
import task from "../../assets/consult.png"
import back from "../../assets/back.png"
import person from "../../assets/person.png"
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from '../../constants/Colors';
import Entypo from '@expo/vector-icons/Entypo';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                animation: "shift",
                tabBarLabelPosition: "beside-icon",
                tabBarLabel: ({ focused, color, children, position }) =>
                (<Text
                    style={{
                        display: focused ? "flex" : "none",
                        fontFamily: "AbhayaLibreExtraBold",
                        fontSize: 12,
                        position: position,
                        color: focused ? Colors.noir : color,
                    }}
                >
                    {children}
                </Text>),
                tabBarActiveBackgroundColor: Colors.gradient33,
                tabBarItemStyle: styles.tabBarItemStyle,
                tabBarStyle: { ...styles.tabBarStyle },
            }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Accueil',
                    tabBarIcon: ({ color, focused }) =>
                        focused ?
                            <Image
                                source={homeS}
                                style={styles.home}
                            />
                            :
                            <Image
                                source={homeU}
                                style={styles.home}
                            />
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profil',
                    tabBarIcon: ({ color, focused }) =>
                        <Image
                            source={person}
                            style={styles.profil}
                        />
                }}
            />
            <Tabs.Screen
                name="task"
                options={{
                    title: 'Tâches',
                    tabBarIcon: ({ color, focused }) =>
                        <Image
                            source={task}
                            style={styles.tasks}
                        />
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    headerTitleContainerStyle: styles.dNone,
                    headerLeft: () =>
                        <Link href="/home" style={styles.wrapperBack}>
                            <Entypo
                                name="chevron-left"
                                size={26}
                                color={Colors.orange_foncer}
                                style={styles.iconBack}
                            />
                        </Link>
                    ,
                    headerShown: true,
                    headerShadowVisible: false,
                    title: 'Discussion',
                    tabBarIcon: ({ color, focused }) =>
                        focused ?
                            <Image
                                source={chatS}
                                style={styles.chat}
                            />
                            :
                            <Image
                                source={chatU}
                                style={styles.chat}
                            />,
                    tabBarBadge: true,
                    tabBarBadgeStyle: styles.tabBarBadgeStyle,
                    tabBarLabel: ({ focused, color, children, position }) =>
                    (<Text
                        style={{
                            display: focused ? "flex" : "none",
                            fontFamily: "AbhayaLibreExtraBold",
                            fontSize: 12,
                            position: position,
                            color: focused ? Colors.noir : color,
                            marginRight: 5
                        }}
                    >
                        {children}
                    </Text>),
                    tabBarStyle: styles.dNone,
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    home: {
        width: 20,
        height: 22,
        resizeMode: "contain",
        alignSelf: "flex-start"
    },

    profil: {
        width: 22,
        height: 22,
        resizeMode: "contain",
        alignSelf: "flex-start",
    },

    tasks: {
        width: 22,
        height: 22,
        resizeMode: "contain",
        alignSelf: "flex-start",
    },

    chat: {
        width: 22,
        height: 22,
        resizeMode: "contain",
    },

    tabBarBadgeStyle: {
        borderColor: "#ffffff",
        borderWidth: 2
    },

    tabBarItemStyle: {
        display: "flex",
        alignSelf: "center",
        backgroundColor: "#ffffff",
        marginVertical: 7,
        borderRadius: 13,
        overflow: "hidden",
        pressColor: 'transparent'
    },

    tabBarStyle: {
        marginHorizontal: 9,
        backgroundColor: "#ffffff",
        elevation: 0,
        paddingHorizontal: 6,
        borderRadius: 22,
    },

    wrapperBack: {
        backgroundColor: Colors.orange+"50",
        padding: 8,
        marginLeft: 8,
        borderRadius: 14,
    },

    dNone: {
        display: "none"
    }
})
