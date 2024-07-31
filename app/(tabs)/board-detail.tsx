import { Image, StyleSheet, Platform, Modal, SafeAreaView, Alert, Pressable, ListRenderItem, FlatList, Animated } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { boardFriendsAndDebtApi } from '@/hooks/app-initializer';
import { useEffect, useState } from 'react';
import { BoardAddCardModel, BoardModel, CardDto } from '@/shared/friends-and-debt/friends-and-debt';
import { FloatingAction, IActionProps } from 'react-native-floating-action';

import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { globalStyle, mainColor } from '@/constants/Styles';
import { truncateWords } from '@/constants/Helper';

import AddMemberComponent from '@/components/AddMember';
import CreateCardComponent from '@/components/CreateCard';
import { ThemedCard } from '@/components/ThemedCard';
import { useRecoilState } from 'recoil';
import { currentBoardIdState } from '@/constants/Atoms';
interface IBoardDetailScreenProps extends IActionProps {
  renderContent?: () => JSX.Element;
}

export default function BoardDetailScreen() {
  const { boardId } = useLocalSearchParams();
  const [boardModelResult, setBoardModelResult] = useState<BoardModel>();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentAction, setCurrentAction] = useState<IBoardDetailScreenProps>();
  const [refreshing, setRefreshing] = useState(false);
  const [boardAddCardModel, setBoardAddCardModel] = useState<BoardAddCardModel>({ boardId: 0, title: '', description: '', amount: 0 });
  const [currentBoardId, setCurrentBoardId] = useRecoilState<number>(currentBoardIdState);
  
  useEffect(() => {
    setBoardAddCardModel({ boardId: parseInt(boardId as string), title: '', description: '', amount: 0 });
    refreshingData();
    setCurrentBoardId(parseInt(boardId as string));
  }, [boardId]);

  const actions: IBoardDetailScreenProps[] = [
    {
      text: "Add new card",
      icon: require("@/assets/icons/credit-card.png"),
      name: "bt_add_card",
      renderContent: () => {
        return (
          <CreateCardComponent card={boardAddCardModel}
            onCancel={() => {
              setModalVisible(false);
            }}
            onSubmit={(card) => {
              onCradCreate(card);
            }}
          />
        );
      }
    },
    {
      text: "Udpate member",
      icon: require("@/assets/icons/team.png"),
      name: "bt_add_member",
      renderContent: () => {
        return (
          <AddMemberComponent 
            onCancel={() => {
              setModalVisible(false);
            } }
            onSubmit={(board) => { setModalVisible(false); } } 
            board={0} />
        );
      }
    }
  ];
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      refreshingData();
      setRefreshing(false);
    }, 1000);
  };

  function onCradCreate(card: BoardAddCardModel) {
    boardFriendsAndDebtApi().addCards(card).then((response) => {
      Alert.alert('Success', 'Create card success');
    })
      .catch((e) => {
        Alert.alert('Error', e.message);
      })
      .finally(() => {
        setModalVisible(false);
        refreshingData();
      });

  };

  const refreshingData = () => {
    var id = parseInt(boardId as string);
    boardFriendsAndDebtApi().get(id).then((response) => {
      setBoardModelResult(response);
    })
      .catch((e) => { });
  };

  const onPressButton = (name?: string) => {
    console.log(`call ${name}`);
    setCurrentAction(actions.find(x => x.name == name));
    setModalVisible(!modalVisible);
  };

  const onSwipeFromRight = async (item: CardDto) => {
    console.log(`call ${item.title}`);
    // await boardFriendsAndDebtApi().delete(item.id).then(async (response) => {
    //     await refreshingData();
    //  });
  };

  const RightActions = ( item: CardDto ) => (
    <Pressable style={[globalStyle.rightActions, globalStyle.boarder]} onPress={async () => 
    { await onSwipeFromRight(item) }}>
      <ThemedText style={styles.text} >Delete</ThemedText>
    </Pressable>
  );

  const renderItem: ListRenderItem<CardDto> = ({ item, index }) =>
  {
    return (
      <ThemedCard cardModel={item} rightActions={RightActions(item)} 
        type= {
           (boardModelResult?.cards?.length??0) - 1 != index ? 'primary' : 'secondary'
        }
      />
    );
  }


  const renderCardInfo = () => {
    return (<>
      <ThemedView style={{ backgroundColor: 'transparent' }}>
        <ThemedText type="title">{boardModelResult?.name}</ThemedText>
        <ThemedText type="subtitle">Create by {boardModelResult?.owner.name}</ThemedText>
        <ThemedText type="subtitle">Members: {boardModelResult?.members?.length}</ThemedText>
        <ThemedText type="subtitle">Cards: {boardModelResult?.cards?.length}</ThemedText>
      </ThemedView>
    </>);
  }

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
        <ThemedView style={[styles.modelHeader]}>

        </ThemedView>
        <SafeAreaView style={[ styles.safeAreaView]}>
          <ThemedView style={{ flex: 1 }}>
            <ThemedView style={{ padding: 10 }} >
              <ThemedText type='Subheadline_Bold'>{currentAction?.text}</ThemedText>
            </ThemedView>
            <ThemedView style={[styles.modelBody]}>
            {
              currentAction?.renderContent?.()
            }
            </ThemedView>
          </ThemedView>
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <>
      <ThemedView
        style={[styles.form
        ]}>
        <FlatList
          style={[styles.scrollView]}
          data={boardModelResult?.cards ?? []}
          renderItem={renderItem}
          keyExtractor={(item: CardDto) => item.id.toString()}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
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
  scrollView: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1, // Đảm bảo SafeAreaView chiếm toàn bộ màn hình
  },
  boarder: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderCurve: 'circular',
    borderRadius: 5,
    borderColor: '#444746',
  },
  text: {
    color: "white",
  },
  modelHeader: {
    // backgroundColor: mainColor,
    padding: 10,
    flexDirection: 'row',
    height: 70,
  },
  modelBody: {
   
    flex: 1,
  }
});
