import { borderRadius } from "@/constants/Styles";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { ActivityIndicator, Pressable, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from "react-native";

//info
// -name
// -introduce
//action 
// - appdrove
// - denied
// - delete

type ContactScreenProps = {
    id: number;
    introduce?: string;
    friendName?: string;
}

type ThemedFriendProps = {
    friend: ContactScreenProps;
    type?: 'first' | 'last';
}
export default function ThemedFriend({friend}: ThemedFriendProps) {
    return (
        <>
             <ThemedView key={friend.id} style={[styles.container, styles.border]}>
                <ThemedText type="Subheadline_Bold">{friend.friendName}</ThemedText>

                <ThemedText type="Subheadline_Regular">{friend.introduce}</ThemedText>
                <ThemedView style={[styles.inlineFotter]}>

                    <Pressable>
                        <ThemedText>appdrove</ThemedText>
                    </Pressable>
                    <Pressable>
                        <ThemedText>denied</ThemedText>
                    </Pressable>
                    <Pressable>
                        <ThemedText>delete</ThemedText>
                    </Pressable>

                </ThemedView>
            </ThemedView>
        </>
    );
}

const styles = StyleSheet.create({
    border: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },

    container: {
        width: '100%',
        marginVertical: 0,
        marginHorizontal: 0,
        paddingHorizontal: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    inlineFotter: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 10,
    },
   
   
});  