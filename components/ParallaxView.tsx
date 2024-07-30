import { ThemedView } from "./ThemedView";
import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';

import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import HeaderView from "./HeaderView";

type Props = PropsWithChildren<{
   
}>;

  
export function ParallaxView ({children}:Props ) {
    
    return (<>
        <ThemedView style={styles.container}>
            <HeaderView></HeaderView>
            <ThemedView style={styles.content}>
                {children}
            </ThemedView>
        </ThemedView>
    </>);
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      minHeight: '100%',
    },
    header: {
      height: 250,
      overflow: 'hidden',
    },
    content: {
      flex: 1,
    //   padding: 32,
    //   gap: 16,
      overflow: 'hidden',
    },
  });
  