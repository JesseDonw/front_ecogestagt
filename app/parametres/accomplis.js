import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Acc() {
  return (
    <View style={styles.container}>
      <Text>tache accomplis</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'red',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
