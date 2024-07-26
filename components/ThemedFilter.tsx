import { mainColor, textColor, textColorLight } from "@/constants/Styles";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { Text, type TextProps, StyleSheet, ScrollView, KeyboardAvoidingView, Pressable , } from 'react-native';
import React, { useState } from "react";

type FilterProps = {
    name: string;
    value: string;
}

export type ThemedFilterProps = {
    tags: FilterProps[];
    onPress: (value: string) => void;
};

export function ThemedFilter({ tags, onPress }: ThemedFilterProps) {
    const [selectedValue, setSelectedValue] = useState<string | null>('');
    
    const handlePress = (value: string) => {
        setSelectedValue(value);
        onPress(value);
    };

    return (
        <KeyboardAvoidingView >
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}
                contentContainerStyle={styles.scrollView}
            >
                {tags.map((tag, index) => {
                    return (<>
                        <Pressable onPress={() => handlePress(tag.value)} key={index}>
                            <ThemedView key={index} style={[styles.box, selectedValue==tag.value ? styles.Selected: styles.noneSelected]}>
                                <ThemedText style={
                                [styles.text, {
                                    color:  selectedValue==tag.value ? textColorLight : textColor
                                }]} 
                                type="Subheadline_Regular">{tag.name}</ThemedText>
                            </ThemedView>
                        </Pressable>
                    </>)
                })}
            </ScrollView >  
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        marginVertical: 10,
    },
    box: {
        flexDirection: 'row',
        marginHorizontal: 5,
        padding: 5,
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#222',
    },
    Selected: {
        backgroundColor: mainColor,
    },
    noneSelected: {
        backgroundColor: 'transparent',
    },
    text: {
        color: textColorLight,
    }
});