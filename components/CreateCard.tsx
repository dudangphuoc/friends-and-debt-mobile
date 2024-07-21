import { BoardAddCardModel } from "@/shared/friends-and-debt/friends-and-debt";
import { ThemedView } from "./ThemedView";
import { Image, StyleSheet, Platform, SafeAreaView, Pressable } from 'react-native';
import { ThemedText } from "./ThemedText";
import { ThemedTextInput } from "./ThemedTextInput";
import { useState } from "react";

export type FormCreateCardProps = {
    card: BoardAddCardModel;
    onSubmit: (card:BoardAddCardModel) => void;
    onCancel: () => void;
};

export default function CreateCardComponent({ card, onSubmit, onCancel }: FormCreateCardProps) {
    const [data, setData] = useState<BoardAddCardModel>(card);
    const onDescriptionChange = (description: string) => {
        setData({ ...data, description });
    };
    const onTitleChange = (title: string) => {
        setData({ ...data, title });
        data.title = title;
    };

    const onAmountChange = (amount: string) => {
        setData({ ...data, amount: parseInt(amount) });
    };

    return (
        <>
            <ThemedView style={{ padding: 20, flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <ThemedView style={styles.form}>
                    <ThemedView style={styles.inlineForm}>
                        <ThemedText style={styles.inlineFormLabel}>Title</ThemedText>
                        <ThemedTextInput
                            style={styles.inlineFormInput}
                            placeholder="Title"
                            value={data.title}
                            onChangeText={onTitleChange}
                        />
                    </ThemedView>
                    <ThemedView style={styles.inlineForm}>
                        <ThemedText style={styles.inlineFormLabel}>Description</ThemedText>
                        <ThemedTextInput
                            value={data.description}
                            style={styles.inlineFormInput}
                            placeholder="Description"
                            onChangeText={onDescriptionChange}
                        />
                    </ThemedView>
                    <ThemedView style={styles.inlineForm}>
                        <ThemedText style={styles.inlineFormLabel}>Amount</ThemedText>
                        <ThemedTextInput
                            keyboardType="numeric"
                            value={data.amount.toString()}
                            style={styles.inlineFormInput}
                            placeholder="Description"
                            onChangeText={onAmountChange}
                        />
                    </ThemedView>
                </ThemedView>
            </ThemedView>
            
            <ThemedView style={styles.inlineAction}>
                <Pressable
                    onPress={() => onCancel()}>
                    <ThemedText style={styles.titleContainer}>Cancel</ThemedText>
                </Pressable>
                <Pressable
                    onPress={() => onSubmit(data)}>
                    <ThemedText style={styles.titleContainer}>Save</ThemedText>
                </Pressable>
            </ThemedView>
        </>
    );

}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
      },
    form: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        width: '100%',
    },
    inlineAction: {
        flexDirection: 'row', // Sắp xếp theo hàng
        justifyContent: 'space-around', // Cách đều các button
        alignItems: 'center', // Căn giữa theo chiều dọc
        height: 64,
        borderTopColor: 'grey',
        borderTopWidth: 1,
    },

    inlineForm: {
        flexDirection: 'column', // Sắp xếp theo hàng
        justifyContent: 'flex-start', // Cách đều các button
        alignItems: 'flex-start', // Căn giữa theo chiều dọc
        marginVertical: 16,
    },

    inlineFormLabel: {
        width: '50%',
        fontSize: 18,
        textAlign: 'left',
        marginRight: 8,
    },

    inlineFormInput: {
        width: '100%',
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: "grey",
        marginTop: 8,
        borderRadius: 10,
    },

});