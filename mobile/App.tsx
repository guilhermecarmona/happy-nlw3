import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import {
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';
import Routes from './src/routes';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import CreateOrphanageProvider from './src/contexts/CreateOrphanageProvider';

export default function App() {
  SplashScreen.preventAutoHideAsync();
  const [checkingFirstAccess, setCheckingFirstAccess] = useState(true);
  const [isFirstAccess, setIsFirstAccess] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('@happy:check_first_access').then(value => {
      if (value) {
        setIsFirstAccess(false);
      }
      setCheckingFirstAccess(false);
      SplashScreen.hideAsync();
    });
  }, []);

  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <CreateOrphanageProvider>
        <Routes isFirstAccess={isFirstAccess} />
      </CreateOrphanageProvider>
    );
  }
}
