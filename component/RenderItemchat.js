import { StyleSheet, Text, View } from 'react-native';

export default function RenderItemchat({ item }) {
    return <View
        style={[styles.messageContainer, item.sender === 'Admin' ? styles.sent : styles.received]}
    >
        <Text style={styles.text}>{item.text}</Text>
    </View>
}

const styles = StyleSheet.create({
    messageContainer: {
        padding: 10,
        borderRadius: 10,
        marginBottom: 5
    },
    sent: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6'

    },
    received: {
        alignSelf: 'flex-start',
        backgroundColor: '#EAEAEA'

    },
    text: {
        fontFamily: "AbhayaLibreRegular",
        fontSize: 14,
    }
})