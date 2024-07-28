import { type TextProps, StyleSheet, Animated, Pressable, Image, } from 'react-native';

import { useEffect, useRef, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BoardModel } from '@/shared/friends-and-debt/friends-and-debt';
import { borderColorOffBlack, borderRadius, globalStyle } from '@/constants/Styles';
import { router } from 'expo-router';
import { GestureHandlerRootView, Swipeable,

 } from 'react-native-gesture-handler';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

export type ThemedBoardProps = TextProps & {
    boardModel: BoardModel;
    rightActions: React.ReactNode;
    type?: 'primary' | 'secondary';
};



export function ThemedBoard({ boardModel, rightActions, type }: ThemedBoardProps) {
    const onSwipeableLeftDrag = useRef(new Animated.Value(0)).current;
    const interpolatedDrag = onSwipeableLeftDrag.interpolate({
        inputRange: [0, 1],
        outputRange: [borderRadius, 0],
    });
   const LeftActions = () => (
    <Pressable style={[globalStyle.rightActions, globalStyle.boarder, {
      borderEndEndRadius: borderRadius,
      borderStartEndRadius: borderRadius,
    }]} onPress={async () => { router.push(`/board-detail?boardId=${boardModel.id}`) }}>
      <ThemedText type='Subheadline_Regular' >Info</ThemedText>
    </Pressable>
  );
    
    //onPress={() => router.push(`/board-detail?boardId=${boardModel.id}`)}
    return (<>
        <GestureHandlerRootView style={[styles.continerWrapper]} >
            <Swipeable activeOffsetX={[-20, 20]} friction={4} leftThreshold={40} rightThreshold={40}
                renderRightActions={() => <LeftActions></LeftActions>}
                renderLeftActions={() => rightActions}
                containerStyle={[styles.container, 
                    type === 'primary' ? styles.borderBottom : styles.default,
                ]} 
            >
                <Animated.View style={[styles.innerContainer, { 
                    borderEndEndRadius: interpolatedDrag,
                    borderStartEndRadius: interpolatedDrag,
                    }]}
                    >
                    <ThemedView style={[styles.cardLeft]}>
                        <ThemedView style={{}}>
                            <ThemedText type='Subheadline_Bold' style={{}}>{boardModel.name}</ThemedText>
                        </ThemedView>

                        <ThemedView style={[styles.inlineFotter]}>
                            <ThemedText type='Subheadline_Regular'>Card: {boardModel.cards?.length} </ThemedText>
                            <ThemedText type='Subheadline_Regular'>Member: {boardModel.members?.length}</ThemedText>
                        </ThemedView>
                    </ThemedView>
                    <Pressable style={[styles.cardRight]}
                        onPress={() => router.push(`/board-detail?boardId=${boardModel.id}`)}
                    >
                        <Image source={require("@/assets/icons/Property 1=linear.png")} style={styles.image} />
                    </Pressable>
                </Animated.View>
            </Swipeable>
        </GestureHandlerRootView>
    </>);
}

const styles = StyleSheet.create({
    continerWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    container: {
        width: '100%',
        marginVertical: 0,
        marginHorizontal: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    innerContainer: {
        width: '100%',
        height: 100,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: borderRadius
    },
    cardLeft: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 10,
    },
    cardRight: {
        width: 50,
        height: '100%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor: borderColorOffBlack,
        borderWidth: 1.2,
        borderRadius: 100,
    },
    image: {
        width: 24,
        height: 24,
    },
    inlineFotter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    default: {
        marginBottom: 4,
    },
});
