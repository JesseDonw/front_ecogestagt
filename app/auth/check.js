import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
    const [appReady, setAppReady] = useState(false);

    useEffect(() => {
        const prepareApp = async () => {
            // Simuler un chargement (comme le chargement de polices ou données)
            await new Promise(resolve => setTimeout(resolve, 2000));
            setAppReady(true);
            await SplashScreen.hideAsync();
        };
        prepareApp();
    }, []);

    if (!appReady) {
        return null; // Éviter d'afficher l'app tant que ce n'est pas prêt
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}
