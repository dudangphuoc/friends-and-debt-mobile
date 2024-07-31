import { globalStyle, textColor } from "@/constants/Styles";
import { Animated, SafeAreaView, Image, StyleSheet, Pressable, FlatList, ListRenderItem } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { BoardModel, FriendModel } from "@/shared/friends-and-debt/friends-and-debt";
import { ThemedTextInput } from "./ThemedTextInput";
import { ThemedTextSearch } from "./ThamedTextSearch";
import { useRecoilState } from "recoil";
import { currentBoardIdState, friends, friendsReloadState, friendTabsSelected } from "@/constants/Atoms";
import { useCallback, useEffect, useState } from "react";
import { friendsFriendsAndDebtApi } from "@/hooks/app-initializer";
import ThemedFriend from "./ThemedFriend";
import { debounce, set } from "lodash";


export type FormAddMemberProps = {
    board: number;
    onSubmit: (board?: number) => void;
    onCancel: () => void;
};

export default function AddMemberComponent({ board, onSubmit, onCancel }: FormAddMemberProps) {
    const [friends, setFriends] = useState<FriendModel[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const [searchText, setSearchText] = useState<string>('');
    const [page, setPage] = useState<number>(0);
    const [pageSize] = useState<number>(10);
    const [selectedValue, setSelectedValue] = useRecoilState<string>(friendTabsSelected);
    const [friendsReload, setFriendsReload] = useRecoilState<boolean>(friendsReloadState);
    const [currentBoardId, setCurrentBoardId] = useRecoilState<number>(currentBoardIdState);
    const [memberUpdate, setMemberUpdate] = useState<number>(0);

    useEffect(() => {
        setSelectedValue('50');
        setSearchText('');
        setPage(0);
        fetchData();
    }, []);

    useEffect(() => {
        setPage(0);
        setTotal(0);
        setFriends([]);
        setMemberUpdate(memberUpdate + 1);
    }, [friendsReload]);


    useEffect(() => {
        fetchData();
    }, [searchText, memberUpdate]);

    const fetchData = async  () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const skipCount = (page) * pageSize;
            var data = await friendsFriendsAndDebtApi().getAll(searchText,currentBoardId, 0, skipCount, pageSize);
            setFriends([...friends, ...data.items || []]);
            setTotal(data.totalCount);
            setPage(page + 1);
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
        finally {
            setIsLoading(false);
        }
    };
    const debouncedOnChangeText = useCallback(
        debounce((newText) => {
            setPage(0);
            setFriends([]);
            setSearchText(newText);
        }, 1000),
        [] 
    );

    const renderItem: ListRenderItem<FriendModel> = ({ item, index }) => (
        <>
            <ThemedFriend friend={item} type={
                (friends?.length ?? 0) - 1 != index ? 'first' : 'last'
            } />
        </>

    );

    return (<>
        <ThemedView style={{ paddingHorizontal: 10, flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <ThemedView style={styles.form}>
                <ThemedView style={styles.inlineForm}>
                    <ThemedTextInput 
                    placeholderTextColor={textColor}
                    onChangeText={debouncedOnChangeText}
                    style={styles.inlineFormInput} placeholder="search..." />
                </ThemedView>
                <ThemedView>
                    <FlatList
                    extraData={friends??[]}
                    data={friends?? []}
                    renderItem={renderItem}
                    onEndReached={fetchData}
                    onEndReachedThreshold={0.5}
                    keyExtractor={(item: FriendModel)  => item.id.toString()}
                    refreshing={isLoading}
                    removeClippedSubviews={true}
                    initialNumToRender={2}
                    maxToRenderPerBatch={1}
                    updateCellsBatchingPeriod={100}
                    windowSize={7}
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
        backgroundColor: 'white',
      },
    inlineForm: {
        flexDirection: 'column', // Sắp xếp theo hàng
        justifyContent: 'flex-start', // Cách đều các button
        alignItems: 'flex-start', // Căn giữa theo chiều dọc
    },

    inlineFormLabel: {
        width: '50%',
        fontSize: 18,
        textAlign: 'left',
        marginRight: 8,
    },

    inlineFormInput: {
        width: '100%',
        height: 48,
        paddingHorizontal: 24,
        // paddingVertical: 10,
        borderWidth: 1,
        borderColor: textColor,
        marginTop: 8,
        borderRadius: 10,
        color: textColor,
    },

});