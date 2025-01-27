import { ErrorBoundary } from 'expo-router';

export default function ErrorBoundary({ error, retry }) {
    return (
        <View style={{ flex: 1, backgroundColor: 'red' }}>
            <Text>{error.message}</Text>
            <Text onPress={retry}>Réessayer ?</Text>
        </View>
    );
}
