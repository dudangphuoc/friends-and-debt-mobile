import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Provider } from '@/hooks/auth';
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import React from 'react';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const getUserFromStorage = async () => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    setIsReady(true);
  };

  useEffect(() => {
    getUserFromStorage();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!isReady)
    return (
      <ThemedView style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  return (
    <RecoilRoot>
      <ThemeProvider value={DefaultTheme}>
        <Provider>
          <Stack screenOptions={
            {
              headerShown: false,
              headerStyle: {
                backgroundColor: '#444746',
              },
              headerTintColor: '#fff',
              fullScreenGestureEnabled: true,
              animation: 'slide_from_right',
            }

          }
          ></Stack>
        </Provider>
      </ThemeProvider>
    </RecoilRoot>
  );
}