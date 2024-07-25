import { Image, StyleSheet, Platform, SafeAreaView, Pressable, Animated, TextInput, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { mainColor, typographyStyle } from '@/constants/Styles';
import { ThemedTextSearch } from './ThamedTextSearch';
import { useState, useRef } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HeaderView() {
    const [isFocused, setIsFocused] = useState(false);
    const backgroundColor = useRef(new Animated.Value(1)).current;
    const interpolatedColor = backgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['white', 'transparent'],
    });

    const handleFocus = () => {
        setIsFocused(true);
        Animated.timing(
            backgroundColor, {
            toValue: 0, // Màu nền khi focus
            duration: 350,
            useNativeDriver: false,
        }).start();
    };

    const handleBlur = () => {
        setIsFocused(false);
        Animated.timing(backgroundColor, {
            toValue: 1, // Màu nền khi blur
            duration: 350,
            useNativeDriver: false,
        }).start();
    };
    return (
        <ThemedView style={styles.form}>
            <SafeAreaView style={styles.container}>
                <Animated.View style={[styles.animatedView,
                    {backgroundColor: interpolatedColor},
                    ]}>
                    <TextInput
                        style={[styles.input, typographyStyle.subheadline_Regular]}
                        placeholder="Search..."
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onTouchEnd={handleFocus}
                        placeholderTextColor={'#fff'}
                        
                    />
                    {/* <TouchableOpacity onPress={handleBlur}> */}
                        {/* <Ionicons name={isFocused ? 'close' : 'search'} size={32} color="gray" /> */}
                    {/* </TouchableOpacity> */}
                </Animated.View>
            </SafeAreaView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    form: {
        width: '100%',
        backgroundColor: mainColor,
    },
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 10,
    },
    inlineForm: {
        width: '100%',
        margin: 'auto',
        height: '100%',
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        
    },
    input: {
        flex: 1,
        
        fontSize: 16,
        marginRight: 10,
        height: 40,
        padding: 10,
        
    },
    animatedView: {
        flexDirection: 'row',
        margin: 'auto',
        borderRadius: 10,
    }
});
