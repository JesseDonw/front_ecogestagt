import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import UserCard from '../../component/UserCard';

export default function Discussion() {
  return (
    <View style={styles.container}>
      <UserCard
      imageUrl={undefined}
      name="John"
      isOnline={false}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6
  },
});
