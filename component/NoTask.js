import { StyleSheet, View, Text} from 'react-native';
import { Colors } from '../constants/Colors';
import Feather from '@expo/vector-icons/Feather';

export default function NoTask({message}) {
    return (
        <View style={styles.scene}>
        <Feather name="check-circle" size={64} color={Colors.gradient33} />
        <Text style={styles.placeholderText}>{message ?? "Aucune tâche pour l’instant"}</Text>
      </View>
    )
    
}

const styles = StyleSheet.create({
    scene: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    
    placeholderText: {
      fontFamily: "AbhayaLibreMedium",
      fontSize: 16,
      color: Colors.noir_fondu + "90",
      marginTop: 10
    },
  });