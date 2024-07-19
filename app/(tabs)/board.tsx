import { Image, StyleSheet, Platform, Button, View, Modal, Alert, SafeAreaView, Pressable, ScrollView, RefreshControl } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { FloatingAction } from "react-native-floating-action";
import React, { useEffect, useState } from 'react';
import CreateBoardComponent from '../../components/+create-board';
import { accessToken, boardFriendsAndDebtApi } from '@/hooks/app-initializer';
import { useRecoilState } from 'recoil';
import { BoardModelPagedResultDto, CreateBoardModel, IAuthenticateResultModel } from '@/shared/friends-and-debt/friends-and-debt';
import { userCredentials } from '@/constants/Atoms';

export default function BoardScreen() {
  const [user, setAuth] = useRecoilState<IAuthenticateResultModel | null>(userCredentials);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [boardModelPagedResult, setBoardModelPagedResult] = useState<BoardModelPagedResultDto>();
  const [refreshing, setRefreshing] = React.useState(false);
  const router = useRouter();


  useEffect(() => {
    refreshingData();
  }, []);

  const refreshingData = () => {
    boardFriendsAndDebtApi().getAll("", 0, 100)
    .then((response) => {
      console.log(response);
      setBoardModelPagedResult(response)
    })
    .catch((e) => {
      console.log(e);
    });
  };


  const actions = [
    {
      text: "Add new board",
      icon: require("@/assets/images/partial-react-logo.png"),
      name: "bt_add_board",
      position: 2
    }
  ];
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      refreshingData();
      setRefreshing(false);
    }, 2000);
  }, []);

  const onPressButton = (name?: string) => {
    if (name == "bt_add_board")
      setModalVisible(!modalVisible);
  };

  const onCreateBoard = async () => {
    console.log('accessToken', user);
    console.log('Create board', name, color);
    setModalVisible(!modalVisible);
    var model = new CreateBoardModel();
    model.name = name;
    model.color = color;
    await boardFriendsAndDebtApi().create(model);
    refreshingData();
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

  const renderBoard = () => {
    return (
      <>
        {boardModelPagedResult?.items?.map((item, index) => {
          return (
            <ThemedView key={index} style={styles.boardItem}>
              <ThemedText style={styles.boardTitle}>{item.name}</ThemedText>

              <ThemedText style={styles.boardTitle}>
                <ThemedText style={styles.inlineFotter}>Card: {item.cards?.length}</ThemedText>
                <ThemedText style={styles.inlineFotter}>Member: {item.members?.length}</ThemedText>
              </ThemedText>

            </ThemedView>
          );
        })}
      </>
    );

  }

  return (
    < >
     <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        }>

       
          {renderBoard()}
        
      </ParallaxScrollView>
      </ScrollView>


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
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },

  inlineAction: {
    flexDirection: 'row', // Sắp xếp theo hàng
    justifyContent: 'space-around', // Cách đều các button
    alignItems: 'center', // Căn giữa theo chiều dọc
    height: 64,
    borderTopColor: 'grey',
    borderTopWidth: 1,
  },

  boardItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    borderWidth: 1,
    borderStyle: 'solid',
    borderCurve: 'circular',
    backgroundColor: '#313335',
    // borderBottomColor: 'grey',
    // borderBottomWidth: 1,
    borderRadius: 8,
    borderColor: '#444746',
    marginBottom: 8,
    height: 100,
  },

  boardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  inlineFotter: {
    marginVertical: 16,
    marginRight: 16,
  },

  text: {
    color: "white",
  },
  scrollView: {
    flex: 1,
  },
});
