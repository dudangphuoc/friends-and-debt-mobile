import { StyleSheet, Modal, Alert, SafeAreaView, Pressable, ListRenderItem, useColorScheme, TouchableOpacity, FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FloatingAction } from "react-native-floating-action";
import React, { useEffect, useState } from 'react';
import CreateBoardComponent from '../../components/CreateBoard';
import { boardFriendsAndDebtApi } from '@/hooks/app-initializer';
import { useRecoilState } from 'recoil';
import { BoardModel, CreateBoardModel } from '@/shared/friends-and-debt/friends-and-debt';
import { createBoard, userCredentials } from '@/constants/Atoms';
import { borderRadius, globalStyle } from '@/constants/Styles';
import { ThemedFilter } from '@/components/ThemedFilter';
import { ThemedBoard } from '@/components/ThemedBoard';

export default function BoardScreen() {
  const [board, setBoard] = useRecoilState<CreateBoardModel>(createBoard);
  const [modalVisible, setModalVisible] = useState(false);
  const [boardsModelResult, setBoardsModelResult] = useState<BoardModel[]>();
  const [refreshing, setRefreshing] = React.useState(false);

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

  const option = [
    {
      name: "Payment received",
      value: "PaymentReceived1",
    },
    {
      name: "Payment sent",
      value: "PaymentSent2",
    },
    {
      name: "Payment received",
      value: "PaymentReceived3",
    },
    {
      name: "Payment sent",
      value: "PaymentSent4",
    },
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
    await boardFriendsAndDebtApi().create(board);
    refreshingData();
  };

  const onSwipeFromRight = async (item: BoardModel) => {
    await boardFriendsAndDebtApi().delete(item.id).then(async (response) => {
      await refreshingData();
    });
  };

  const handlePress = (value: string) => {

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
            
            <CreateBoardComponent />

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

  const renderItem: ListRenderItem<BoardModel> = ({ item, index }) => <ThemedBoard boardModel={item} rightActions={RightActions(item)} type={
    (boardsModelResult?.length ?? 0) - 1 != index ? 'primary' : 'secondary'
  } />

  const RightActions = (item: BoardModel) => (
    <Pressable style={[globalStyle.rightActions, globalStyle.boarder, {
      borderStartStartRadius: borderRadius,
      borderEndStartRadius: borderRadius,
    }]} onPress={async () => { await onSwipeFromRight(item) }}>
      <ThemedText style={styles.text} >Delete</ThemedText>
    </Pressable>
  );

  return (
    <>
      <ThemedView
        style={[styles.form
        ]}>
        <SafeAreaView style={styles.safeAreaView}>
          <ThemedFilter onPressAction={handlePress} tags={option} />

          <FlatList
            style={[styles.scrollView]}
            data={boardsModelResult ?? []}
            renderItem={renderItem}
            
            keyExtractor={(item: BoardModel) => item.id.toString()}
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
        </SafeAreaView>
      </ThemedView>
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
  form: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    width: '100%',
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
  inlineAction: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
});
