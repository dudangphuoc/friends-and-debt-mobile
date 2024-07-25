import { Text, type TextProps, StyleSheet, TouchableWithoutFeedback, TextInput, Keyboard, Animated, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useEffect, useRef, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export type ThemedTextSearchProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedTextSearch({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextSearchProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const [isFocused, setIsFocused] = useState(false);
  const searchBarWidth = useRef(new Animated.Value(350)).current;
  const searchBarWidth2 = useRef(new Animated.Value(350)).current;
  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(searchBarWidth, {
      toValue: 350, // Chiều rộng khi focus
      duration: 350,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(searchBarWidth, {
      toValue: 350, // Chiều rộng ban đầu
      duration: 350,
      useNativeDriver: false,
    }).start();
  };

  return (
    <>
      <Animated.View style={[styles.container]}>
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm..."
          onFocus={handleFocus}
          onBlur={handleBlur}
          onTouchEnd={handleFocus}
          textContentType="name"
        />
        <TouchableOpacity onPress={handleBlur}>
          <Ionicons name={isFocused ? 'close' : 'search'} size={24} color="gray" />
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    margin: 'auto',
    marginTop: 20,
  },

  input: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
    backgroundColor: 'white',
  },
});
