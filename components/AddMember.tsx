import { globalStyle } from "@/constants/Styles";
import { Animated, SafeAreaView, Image, StyleSheet, Pressable } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { BoardModel } from "@/shared/friends-and-debt/friends-and-debt";
import { ThemedTextInput } from "./ThemedTextInput";
import { ThemedTextSearch } from "./ThamedTextSearch";


export type FormAddMemberProps = {
    board: number;
    onSubmit: (board?: number) => void;
    onCancel: () => void;
};

export default function AddMemberComponent({ board, onSubmit, onCancel }: FormAddMemberProps) {
    return (<>
        <ThemedView style={{ padding: 20, flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <ThemedView style={styles.form}>
                <ThemedView style={styles.inlineForm}>
                    <ThemedText style={styles.inlineFormLabel}>Description</ThemedText>
                    <ThemedTextSearch
                        style={styles.inlineFormInput}
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
                     onPress={() => onSubmit(board)}>
                    <ThemedText style={styles.titleContainer}>Save</ThemedText>
                </Pressable>
        </ThemedView>
    </>)
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