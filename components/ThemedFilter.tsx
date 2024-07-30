import { mainColor, textColor, textColorLight } from "@/constants/Styles";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { Text, type TextProps, StyleSheet, ScrollView, KeyboardAvoidingView, Pressable, PressableProps , } from 'react-native';
import React, { useEffect, useState } from "react";
import { filterValues } from "@/constants/Atoms";
import { useRecoilState } from "recoil";
type FilterProps = {
    name: string;
    value: string;
}

export type ThemedFilterProps = PressableProps &{
    tags: FilterProps[];
    value?: string;
    onPressAction: (value: string) => void;
};

export function ThemedFilter({ tags, value, onPressAction: onPressAction, ...rest}: ThemedFilterProps) {
    const [filterValue, setFilterValue] = useRecoilState<string>(filterValues);

    useEffect(() => {
        if(value){
            setFilterValue(value);
        }
    }, [filterValue]);
    
    const handlePress = (value: string) => {
        try{
            setFilterValue(filterValue == value? '': value);
        } finally{
            onPressAction(value);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} >
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}
                contentContainerStyle={styles.scrollView}
            >
                {tags.map((tag, index) => {
                    return (
                        <Pressable onPress={() => handlePress(tag.value)} key={index} {...rest}>
                            <ThemedView style={[styles.box, filterValue==tag.value ? styles.Selected: styles.noneSelected]} >
                                <ThemedText style={
                                [styles.text, {
                                    color:  filterValue==tag.value ? textColorLight : textColor
                                }]} 
                                type="Subheadline_Regular">{tag.name}</ThemedText>
                            </ThemedView>
                        </Pressable>
                    )
                })}
            </ScrollView >  
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },

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