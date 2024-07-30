import { ThemedFilter } from "@/components/ThemedFilter";
import ThemedFriend from "@/components/ThemedFriend";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { friends, users } from "@/constants/Atoms";
import { friendsFriendsAndDebtApi } from "@/hooks/app-initializer";
import { FriendModel, FriendModelPagedResultDto, UserDtoPagedResultDto } from "@/shared/friends-and-debt/friends-and-debt";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, ListRenderItem, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useRecoilState } from "recoil";
import debounce from 'lodash.debounce'; 
import _, { set } from "lodash";

type ContactScreenProps = {
    id: number;
    introduce?: string;
    name?: string;
}

export default function ContactScreen() {
    const [selectedValue, setSelectedValue] = useState<string | ''>('1');
    const [_friends, setFriends] = useRecoilState<FriendModel[]>(friends);
    const [searchText, setSearchText] = useState<string>('');
    const [page, setPage] = useState<number>(0);
    const [pageSize] = useState<number>(20);
    const [total, setTotal] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);


    const searchInputRef = useRef<TextInput>(null);
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        setSearchText('');
        setPage(0);
        fetchData();
    }, [selectedValue]);
    useEffect(() => {
        setPage(0);
        fetchData();
    }, [searchText]);
    useEffect(() => {
        fetchData();
    }, [page]);
    
    const isHaveMore = total > _friends.length;

    const fetchData = async  () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const skipCount = (page) * pageSize;
            if(searchText === '' || selectedValue !== '2')
            {
                var data = await friendsFriendsAndDebtApi().getAll((Number.parseInt(selectedValue)), skipCount, pageSize);
                setFriends(data.items || []);
                setTotal(data.totalCount);
            }
            else{
                var users = await friendsFriendsAndDebtApi().getUsers(searchText, true, skipCount, pageSize);
                const src: FriendModelPagedResultDto = castToFriendModelPagedResultDto(users);
                setFriends(src.items??[]);
                setTotal(users.totalCount);
            }

        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
        finally {
            setIsLoading(false);
        }
    };

    const castToFriendModelPagedResultDto = (userDtoPagedResult: UserDtoPagedResultDto): FriendModelPagedResultDto => {
        return {
            items: (userDtoPagedResult?.items??[]).map(user => ({
                id: user.id,
                introduce: '',
                ownerName: user.name,
                friendName: user.name,
            })),
            totalCount: userDtoPagedResult.totalCount
        };
    };

    
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
        } finally {
            setSelectedValue(selectedValue == '' ? '0' : value);
        }
    };

    const handleSearch = () => {
        if(searchText == ''){
            searchInputRef.current?.focus();
        }else{
            setSearchText('');
            searchInputRef.current?.clear();
        }
    };

    const renderItem: ListRenderItem<FriendModel> = ({ item, index })  => (
<>
    <ThemedFriend friend={item} type={
        (_friends?.length ?? 0) - 1 != index ? 'first' : 'last'
    } />
    

</>

    );

    const renderFooter = () => (
        <ThemedView style={{ paddingVertical: 20, alignItems: 'center' }}>
          {isLoading ? <ActivityIndicator /> : null}
        </ThemedView>
    );

    const handleLoadMore = () => {
        return (
            <FlatList
            data={_friends?? []}
            ref={flatListRef}
            renderItem={renderItem}
            onRefresh = {fetchData}
            onEndReachedThreshold={0.5}
            keyExtractor={(item: FriendModel)  => item.id.toString()}
            refreshing={isLoading}
            />
        )
    };

    const debouncedOnChangeText = useCallback(
        debounce((newText) => {
            setSearchText(newText);
        }, 1000),
        [] 
    );

    return (<>
        <ThemedView
            style={[styles.form
            ]}>
            <SafeAreaView style={styles.safeAreaView}>
                <ThemedFilter onPressAction={handlePress} tags={option} value={selectedValue}/>
                {
                    selectedValue == '2' ? <ThemedView style={styles.searchContainer} >
                        <TextInput
                          style={styles.input}
                          placeholder="Tìm kiếm..."
                          onChangeText={debouncedOnChangeText}
                          onBlur={() =>{
                            setPage(0);
                            fetchData();
                          }}
                          ref={searchInputRef} />
                        <TouchableOpacity style={styles.searchIcon} onPress={() => handleSearch()}>
                            <Ionicons name={searchText==''? "search" : "close"} size={24} color="gray" />
                        </TouchableOpacity>
                    </ThemedView> : <></>
                }
                <ThemedView style={{ flex: 1}}>
                    { isLoading? renderFooter() : handleLoadMore() }
                </ThemedView>
                {
                    Math.ceil(total / pageSize) > 1 && (<> 
                        <ThemedView style={[styles.navigator]}>
                            <ThemedText>Page: {page + 1} / {Math.ceil(total / pageSize)}</ThemedText>
                            <TouchableOpacity onPress={() => {
                                setPage(page < 1 ? 0 : page - 1);
                                // fetchData();
                            }}>
                                <ThemedText>Prev</ThemedText>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                setPage((page + 1) >= Math.ceil(total / pageSize) ? page : page + 1);
                                // fetchData();
                            }}>
                                <ThemedText>Next</ThemedText>
                            </TouchableOpacity>
                        </ThemedView>
                    </>
                    )
                }
            </SafeAreaView>
        </ThemedView>
    </>)
}

const styles = StyleSheet.create({
    navigator: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 24,
        padding: 8,
    },
    form: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        width: '100%',
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        margin: 8,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
        height: 48,
        gap: 8,
    },
    searchIcon : {
        width: 48,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderBlockColor: 'gray',
        borderRadius: 10,
        borderWidth: 1,
    },

    safeAreaView: {
        flex: 1, // Đảm bảo SafeAreaView chiếm toàn bộ màn hình
    },

    container: {
        backgroundColor: 'white',
        borderRadius: 10,
    },
    inputContainer: {
        backgroundColor: '#f0f0f0', // Màu nền của input
        borderRadius: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 16,
        marginRight: 0
    },
});  

