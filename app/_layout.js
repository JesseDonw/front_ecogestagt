import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
    const [appReady, setAppReady] = useState(false);

    useEffect(() => {
        const prepareApp = async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setAppReady(true);
            await SplashScreen.hideAsync();
        };
        prepareApp();
    }, []);

    if (!appReady) {
        return null; 
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}
