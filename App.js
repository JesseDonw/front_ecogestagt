import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Slot } from 'expo-router';

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Slot /> {/* Affiche le contenu défini dans le dossier /app */}
        </GestureHandlerRootView>
    );
}
