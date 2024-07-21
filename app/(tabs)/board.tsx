import { Image, StyleSheet, Platform, Button, View, Modal, Alert, SafeAreaView, Pressable, ScrollView, RefreshControl, TouchableHighlight, FlatList, ListRenderItem, useColorScheme } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { FloatingAction } from "react-native-floating-action";
import React, { useEffect, useState } from 'react';
import CreateBoardComponent from '../../components/CreateBoard';
import { accessToken, boardFriendsAndDebtApi } from '@/hooks/app-initializer';
import { useRecoilState } from 'recoil';
import { AuthenticateResultModel, BoardModel, CreateBoardModel } from '@/shared/friends-and-debt/friends-and-debt';
import { userCredentials } from '@/constants/Atoms';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import Animated from 'react-native-reanimated';
import { globalStyle } from '@/constants/Styles';

export default function BoardScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [boardsModelResult, setBoardsModelResult] = useState<BoardModel[]>();
  const [refreshing, setRefreshing] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    refreshingData();
  }, []);

  const refreshingData = () => {
    boardFriendsAndDebtApi().getBoardsByUser()
      .then((response) => {
        setBoardsModelResult(response)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const actions = [
    {
      text: "Add new board",
      icon: require("@/assets/icons/board.png"),
      name: "bt_add_board",
      position: 2
    }
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      refreshingData();
      setRefreshing(false);
    }, 1000);
  };

  const onPressButton = (name?: string) => {
    if (name == "bt_add_board")
      setModalVisible(!modalVisible);
  };

  const onCreateBoard = async () => {
    setModalVisible(!modalVisible);
    var modelInstance: CreateBoardModel = {
      name: name,
      color: color
    }
    await boardFriendsAndDebtApi().create(modelInstance);
    refreshingData();
  };

  const onSwipeFromRight = async (item: BoardModel) => {
    await boardFriendsAndDebtApi().delete(item.id).then(async (response) => {
        await refreshingData();
     });
  };

  const renderModel = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <SafeAreaView style={styles.safeAreaView}>
          <ThemedView style={{ flex: 1 }}>
            <ThemedView style={{ padding: 20 }} >
              <ThemedText type="title">Board</ThemedText>
            </ThemedView>
            <CreateBoardComponent
              color={color}
              name={name}
              onNameChange={(text: string) => setName(text)}
              onColorChange={(text: string) => setColor(text)} />

            <ThemedView style={styles.inlineAction}>
              <Pressable
                onPress={() => setModalVisible(!modalVisible)}>
                <ThemedText style={styles.titleContainer}>Cancel</ThemedText>
              </Pressable>
              <Pressable
                onPress={() => onCreateBoard()}>
                <ThemedText style={styles.titleContainer}>Save</ThemedText>
              </Pressable>
            </ThemedView>
          </ThemedView>
        </SafeAreaView>

      </Modal>
    );
  };

  const renderItem: ListRenderItem<BoardModel> = ({ item }) =>
    
    <GestureHandlerRootView style={[globalStyle.boarder, globalStyle.background]}>
      <Swipeable renderRightActions={() => <RightActions item={item} 
      />}>
        <Pressable onPress={() => {
          router.push(`/board-detail?boardId=${item.id}`);
        }} >

          <ThemedView style={globalStyle.item}>
            <ThemedText type='defaultSemiBold'>{item.name}</ThemedText>
            <ThemedText>
              <ThemedText type='default' style={globalStyle.inlineFotter}>Card: {item.cards?.length} </ThemedText> 
              <ThemedText type='default' style={globalStyle.inlineFotter}>Member: {item.members?.length}</ThemedText>
            </ThemedText>
          </ThemedView>
        </Pressable>

      </Swipeable>
    </GestureHandlerRootView>
    ;

  const RightActions = ({ item }: { item: BoardModel }) => (
    <Pressable style={[globalStyle.rightActions, globalStyle.boarder]} onPress={async () =>{await onSwipeFromRight(item)}}>
        <ThemedText style={styles.text} >Delete</ThemedText>
    </Pressable>
  );
  
  return (
    < >
      <Animated.View
        style={[
          globalStyle.header
        ]}>
        <Image
          source={require('@/assets/images/signpost.png')}
          style={styles.reactLogo} />
      </Animated.View>

      <FlatList
        style={[styles.scrollView]}
        // scrollEventThrottle={16}
        data={boardsModelResult ?? []}
        renderItem={renderItem}
        
        keyExtractor={(item: BoardModel) => item.id.toString()}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
      
      {renderModel()}
      <FloatingAction
        position="right"
        actionsPaddingTopBottom={18}
        actions={actions}
        onPressItem={onPressButton}
      />

    </>
  );
}

const styles = StyleSheet.create({


  actionText: {
    color: 'white',
    fontWeight: '600',
    padding: 20,
  },
  form: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    width: '100%',
  },

  safeAreaView: {
    flex: 1, // Đảm bảo SafeAreaView chiếm toàn bộ màn hình
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },

  reactLogo: {
    height: 250,
    width: "auto",
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  inlineAction: {
    flexDirection: 'row', // Sắp xếp theo hàng
    justifyContent: 'space-around', // Cách đều các button
    alignItems: 'center', // Căn giữa theo chiều dọc
    height: 64,
    borderTopColor: 'grey',
    borderTopWidth: 1,
  },
  text: {
    color: "white",
  },
  scrollView: {
    flex: 1,
  },
  wrapper: {
  },
});
