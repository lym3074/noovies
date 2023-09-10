import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {Ionicons} from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import Root from './navigation/Root';
import { darkTheme, lightTheme } from './styled';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider} from "react-query";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
    
    
  )
}