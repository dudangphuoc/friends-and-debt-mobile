import { borderRadius } from "@/constants/Styles";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { ActivityIndicator, Pressable, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useRecoilState } from "recoil";
import { currentBoardIdState, friends, friendSearching, friendsReloadState, friendTabsSelected } from "@/constants/Atoms";
import { last } from "lodash";
import { boardFriendsAndDebtApi, friendsFriendsAndDebtApi } from "@/hooks/app-initializer";
import { FriendModel } from "@/shared/friends-and-debt/friends-and-debt";

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
    userId: number;
}

type ThemedFriendProps = {
    friend: ContactScreenProps;
    type?: 'first' | 'last';
}
export default function ThemedFriend({ friend, type }: ThemedFriendProps) {

    const [selectedValue, setSelectedValue] = useRecoilState<string>(friendTabsSelected);
    const [searching, setSearching] = useRecoilState<boolean>(friendSearching);
    const [friendsReload, setFriendsReload] = useRecoilState<boolean>(friendsReloadState);
    const [currentBoardId, setCurrentBoardId] = useRecoilState<number>(currentBoardIdState);

    const onDelete = () => {
        friendsFriendsAndDebtApi().delete(friend.id).finally(() => setFriendsReload(!friendsReload));
    };

    const onApprove = () => {
        friendsFriendsAndDebtApi().approve(friend.id).finally(() => setFriendsReload(!friendsReload));
    };

    const onInvite = () => {
        friendsFriendsAndDebtApi().create({
            introduce: 'Add a friend with me, please.',
            userId: friend.id,
        }).finally(() => setFriendsReload(!friendsReload));
    };

    const onAddMember = () => {
        console.log('add member', friend.userId , '|', currentBoardId);
        if (currentBoardId > 0) {
            boardFriendsAndDebtApi().addMembers({
                id: currentBoardId,
                userId: friend.userId,
            })
            .finally(() => setFriendsReload(!friendsReload));

        };
    }

    const option = {
        appdrove: {
            title: 'Appdrove',
            onPress: onApprove,
            visible: selectedValue === '1',
        },
        denied: {
            title: selectedValue === '0' ? 'Unfriend' : selectedValue === '1' ? 'Denied' : 'Cancel',
            onPress: onDelete,
            visible: (!searching) && (selectedValue === '0' || selectedValue === '1' || selectedValue === '2'),
        },
        invite: {
            title: 'Invite',
            onPress: onInvite,
            visible: (selectedValue === '2' && searching)
        },

        addMember: {
            title: 'Add Member',
            onPress: onAddMember,
            visible: (selectedValue === '50')
        }
    }

    return (
        <>
            <ThemedView key={friend.id} style={[styles.container, styles.border, type == 'last' && styles.last]}>
                <ThemedText type="Subheadline_Bold">{friend.friendName}</ThemedText>
                <ThemedText type="Subheadline_Regular">{friend.introduce}</ThemedText>
                <ThemedView style={[styles.inlineFotter]}>
                    {
                        option.appdrove.visible && (
                            <Pressable onPress={option.appdrove.onPress}>
                                <ThemedText>{option.appdrove.title}</ThemedText>
                            </Pressable>
                        )
                    }
                    {
                        option.denied.visible && (
                            <Pressable onPress={option.denied.onPress}>
                                <ThemedText>{option.denied.title}</ThemedText>
                            </Pressable>
                        )
                    }
                    {
                        option.invite.visible && (
                            <Pressable onPress={option.invite.onPress}>
                                <ThemedText>{option.invite.title}</ThemedText>
                            </Pressable>
                        )
                    }
                    {
                        option.addMember.visible && (
                            <Pressable onPress={option.addMember.onPress}>
                                <ThemedText>{option.addMember.title}</ThemedText>
                            </Pressable>
                        )
                    }
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
        paddingVertical: 16,
    },
    inlineFotter: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 16,
    },

    last: {
        borderBottomWidth: 0,
        paddingBottom: 50,
    }


});  