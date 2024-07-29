import { Image, StyleSheet, Platform, SafeAreaView, Pressable } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { useRecoilState } from 'recoil';
import { CreateBoardModel } from '@/shared/friends-and-debt/friends-and-debt';
import { createBoard } from '@/constants/Atoms';


export type FormCreateBoardProps = {
};

export default function CreateBoardComponent({}: FormCreateBoardProps) {
    const [board, setBoard] = useRecoilState<CreateBoardModel>(createBoard);

    return (
        <ThemedView style={{ padding: 20, flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <ThemedView style={styles.form}>
                <ThemedView style={styles.inlineForm}>
                    <ThemedText style={styles.inlineFormLabel}>Name</ThemedText>
                    <ThemedTextInput 
                        type='default'
                        style={styles.inlineFormInput}
                        placeholder="Board name"
                        value={board.name}
                        onChangeText={(text) => setBoard({ ...board, name: text })} 
                    />
                </ThemedView>
                {/* <ThemedView style={styles.inlineForm}>
                    <ThemedText style={styles.inlineFormLabel}>Color</ThemedText>
                    <ThemedTextInput
                        value={color}
                        style={styles.inlineFormInput}
                        placeholder="color"
                        onChangeText={onColorChange}
                    />
                </ThemedView> */}

            </ThemedView>

        </ThemedView>
    );
}

const styles = StyleSheet.create({
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
        backgroundColor: 'lightblue'
    },

    inlineForm: {
        flexDirection: 'column', // Sắp xếp theo hàng
        justifyContent: 'flex-start', // Cách đều các button
        alignItems: 'flex-start', // Căn giữa theo chiều dọc
        marginVertical: 16,
    },

    inlineFormLabel: {
        width: '20%',
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
