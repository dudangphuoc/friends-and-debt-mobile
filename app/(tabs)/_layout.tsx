import { Tabs, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import HeaderView from '@/components/HeaderView';
import { useRecoilState } from 'recoil';
import { userHeaderText } from '@/constants/Atoms';


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [_, setHeaderText] = useRecoilState<string >(userHeaderText);
  const [headerShown, setHeaderShown] = useState(false);
  useEffect(() => {

  }, []);

  return (
    <Tabs
      initialRouteName='board'
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: headerShown,
        header: () => <HeaderView />,
      }}>
      <Tabs.Screen
        name="index"
        listeners={
          {
            tabPress: (e) => {
              setHeaderText("index");
              setHeaderShown(true);
            },
          }
        }
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="board"
        listeners={
          {
            tabPress: (e) => {
              setHeaderText("Board");
              setHeaderShown(true);
            },
          }
        }
        options={{
          title: 'Board',
          tabBarIcon: ({ color, focused }) => {
            return (
              <TabBarIcon name={focused ? 'clipboard' : 'clipboard-outline'} color={color} />
            )
          },
        }}
      />

      <Tabs.Screen
        name="setting"
        listeners={
          {
            tabPress: (e) => {
              setHeaderText("setting");
              setHeaderShown(false);
            },
          }
        }
        options={{
          title: 'Setting',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="board-detail"
        listeners={
          {
            tabPress: (e) => {
              setHeaderText("search");
              setHeaderShown(false);
            },
          }
        }
        options={{
          title: 'BoardDetail',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
          ),
          tabBarButton: () => null, //hide tab bar on this screen
        }}
      />
    </Tabs>
  );
}
