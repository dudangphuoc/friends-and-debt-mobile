import { ThemedFilter } from "@/components/ThemedFilter";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useRecoilState } from "recoil";

export default function ContactScreen() {
    /// [1] friend requests
    /// [2] friends
    const [selectedValue, setSelectedValue] = useState<string | ''>('0');
    useEffect(() => {}, [selectedValue]);
    const option = [
        {
            name: "Friends",
            value: "0",
        },
        {
            name: "Friend requests",
            value: "1",
        },
        {
            name: "Send requests",
            value: "2",
        },
    ];
    const handlePress = (value: string) => {
        try {
            console.log(value);
        } finally {
            setSelectedValue(selectedValue == ''? '0' : value);
        }
    };

    return (<>
        <ThemedView
            style={[styles.form
            ]}>
            <SafeAreaView style={styles.safeAreaView}>
                <ThemedFilter onPress={handlePress} tags={option} value={selectedValue} />

            </SafeAreaView>
        </ThemedView>
    </>)
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        width: '100%',
    },
    safeAreaView: {
        flex: 1, // Đảm bảo SafeAreaView chiếm toàn bộ màn hình
    },
});  