import { View, Text, StyleSheet} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { Colors } from '../constants/Colors';


export default function PuceList ({dotColor, textColor, text}) {
    return (
        <View style={styles.container}>
            <Entypo name="dot-single" size={24} color={dotColor ?? "black"} style={styles.iconDot} />
            <Text style={[styles.legendText, { color: textColor}]}> {text} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    legendText: {
      fontFamily: "AbhayaLibreRegular",
      fontSize: 14,
    },
    iconDot: {
        padding: 0,
    }
  });