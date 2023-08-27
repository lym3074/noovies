import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {Ionicons} from "@expo/vector-icons";
import { Asset, useAssets } from 'expo-asset';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/Tabs';
import Root from './navigation/Root';
import { darkTheme, lightTheme } from './styled';
import { ThemeProvider } from 'styled-components';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  // const [assetLoaded] = useAssets([require('./godiva.jpeg')]);
  const [fontsLoaded] = useFonts(Ionicons.font);

  useEffect(() => {
    async function prepare() {
      try {
          await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const isDark = useColorScheme() === 'dark';

  if (!appIsReady) {
    return null;
  }
  return (
    <ThemeProvider theme={isDark? darkTheme : lightTheme}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
    
  )
}