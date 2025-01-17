import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

export default function RenderItemchat({ item }) {
    return <LinearGradient
        colors={item.sender === 'Agent' ? [Colors.gradient, Colors.gradient_foncer] : [Colors.gris, Colors.gris_foncer]}
        style={[styles.messageContainer, item.sender === 'Agent' ? styles.sent : styles.received]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
    >
        <Text
            selectable={true}
            style={[styles.text, item.sender === 'Agent' ? { color: "#ffffff" } : { color: Colors.noir18 }]}>
            {item.text}
        </Text>
    </LinearGradient>
}

const styles = StyleSheet.create({
    messageContainer: {
        padding: 10,
        borderRadius: 10,
        marginBottom: 5,
        userSelect: "text"
    },
    sent: {
        alignSelf: 'flex-end',
    },
    received: {
        alignSelf: 'flex-start',
    },
    text: {
        fontFamily: "AbhayaLibreRegular",
        fontSize: 14,
        maxWidth: "70%",
        userSelect: "text"
    }
})