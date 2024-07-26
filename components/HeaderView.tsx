import { Image, StyleSheet, Platform, SafeAreaView, Pressable, Animated, TextInput, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { borderColor, mainColor, subColor, typographyStyle } from '@/constants/Styles';
import { ThemedTextSearch } from './ThamedTextSearch';
import { useState, useRef } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRecoilState } from 'recoil';
import { userHeaderText } from '@/constants/Atoms';

export default function HeaderView() {
    const [isFocused, setIsFocused] = useState(false);
    const [headerText, setHeaderText] = useRecoilState<string | null>(userHeaderText);
    const backgroundColor = useRef(new Animated.Value(1)).current;

    const interpolatedColor = backgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['white', 'transparent'],
    });

    const interpolatedButonColor = backgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: [subColor, 'transparent'],
    });

    const handleFocus = () => {
        setIsFocused(true);
        Animated.timing(
            backgroundColor, {
            toValue: 0,
            duration: 350,
            useNativeDriver: false,
        }).start();
    };

    const handleBlur = () => {
        setIsFocused(false);

        Animated.timing(backgroundColor, {
            toValue: 1,
            duration: 350,
            useNativeDriver: false,
        }).start();
    };

    const handlePress = () => {
        handleBlur();
    };

    return (
        <ThemedView style={styles.form}>
            <SafeAreaView style={styles.container}>
                <ThemedView style={[styles.containerWrap,]}>
                    <Animated.View style={[styles.input, styles.inlineLeft, { backgroundColor: interpolatedColor },]}>
                        <TextInput
                            style={[typographyStyle.subheadline_Regular, ]}
                            placeholder="Search..."
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onTouchEnd={handleFocus}
                            placeholderTextColor={'#fff'}
                        />
                    </Animated.View>
                    <Animated.View style={[styles.inlineRight, { 
                        backgroundColor: interpolatedButonColor,
                        display: headerText? 'flex' : 'none',
                    }, 
                         
                         ]}>
                        <Pressable style={[styles.button, {
                            display: isFocused? 'flex' : 'none',

                        }]} onPress={handlePress}>
                            <ThemedText type='Subheadline_Regular' style={[{color: 'white'}]}>{headerText??""}</ThemedText>
                        </Pressable>
                    </Animated.View>

                </ThemedView>
            </SafeAreaView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({

    form: {
        width: '100%',
        backgroundColor: mainColor,
        flexDirection: 'row',
        justifyContent: 'center',
        
    },
    
    container: {
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 10,
        width: '90%',
        
    },

    containerWrap: {
        flexDirection: 'row',
        margin: 'auto',
        width: '100%',
        gap: 0,
    },
    inlineLeft: {
        marginRight: 0,
        borderStartStartRadius: 10,
        borderEndStartRadius: 10,
        width: '65%',
        
    },
    inlineRight: {
        borderStartEndRadius: 10,
        borderEndEndRadius: 10,
        width: '35%',
        
    },
    input: {
        flex: 1,
        flexDirection: 'row',
        fontSize: 16,
        marginRight: 10,
        height: 40,
        width: '100%',
        marginVertical: 0,
        paddingHorizontal: 10,
    },

    button: {
        alignItems: "center",
        width: "100%",
        height: 40,
        alignSelf: 'center',
        justifyContent: 'center',
        borderEndEndRadius: 10,
        borderTopEndRadius: 10,
        marginVertical: 0,
        
    },

    animatedView: {
     
    }
});
