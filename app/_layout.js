import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
    const [loaded] = useFonts({
        'AbhayaLibreRegular': require('../assets/fonts/AbhayaLibre-Regular.ttf'),
        'AbhayaLibreMedium': require('../assets/fonts/AbhayaLibre-Medium.ttf'),
        'AbhayaLibreExtraBold': require('../assets/fonts/AbhayaLibre-ExtraBold.ttf'),
        'AbhayaLibreSemiBold': require('../assets/fonts/AbhayaLibre-SemiBold.ttf'),
        'AbhayaLibreBold': require('../assets/fonts/AbhayaLibre-Bold.ttf'),
    });

    useEffect(() => {
        if (loaded) {
          SplashScreen.hideAsync();
        }
      }, [loaded]);
    
      if (!loaded) {
        return null; 
      }

    return(
        <SafeAreaProvider>
            <StatusBar style="auto" />
            <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaProvider>
    );
}
