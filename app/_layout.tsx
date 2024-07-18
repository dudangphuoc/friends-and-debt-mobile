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

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
  const [isReady, setIsReady] = useState(false);
  const colorScheme = useColorScheme();
  
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
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Provider>
          <Stack screenOptions={{ headerShown: false, }} />
        </Provider>
      </ThemeProvider>
  </RecoilRoot>
  );
}