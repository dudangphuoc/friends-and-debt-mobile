import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View, Image, ImageBackground, Animated } from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { useAuth } from "@/hooks/auth";
import { tokenAuthFriendsAndDebtApi } from "@/hooks/app-initializer";
import { AuthenticateModel } from "@/shared/friends-and-debt/friends-and-debt";
import { notifyMessage } from "@/components/Toast";
import { lightStyle } from "@/constants/Styles";
import { BlurView } from 'expo-blur';
import React from "react";

export default function LoginScreen() {
  const [email, setEmail] = useState("admin");
  const [password, setPassword] = useState("123qwe");
  const { signIn } = useAuth();
  const [isFocused, setIsFocused] = useState(false);
  const onLogin = async () => {
    try {
      let model: AuthenticateModel = {
        userNameOrEmailAddress: email,
        password: password,
        rememberClient: true
      };
      var result = await tokenAuthFriendsAndDebtApi().authenticate(model);
      signIn(result);
      console.log(result);
    } catch (error: any) {
      notifyMessage(error.response.error.details);
    }
  };

  return (

    <ImageBackground style={[styles.container, styles.center]}
      blurRadius={5}
      resizeMode="cover"
      source={require('@/assets/images/pngegg.png')}
    >
      <BlurView intensity={10} tint="light"
        style={[styles.container_wraper, styles.center, lightStyle.glassmorphism, lightStyle.neonBorder]}>
        <ThemedText style={{ fontSize: 24 }}>Friends And Debt</ThemedText>
        <ThemedTextInput
          style={styles.textInput}
          value={email}
          placeholder="Enter your username or email"
          onChangeText={(text: any) => setEmail(text)}
          placeholderTextColor="#000"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <ThemedTextInput
          style={styles.textInput}
          value={password}
          onChangeText={(text: any) => setPassword(text)}
          placeholder="Type password"
          placeholderTextColor="#000"
          secureTextEntry={true}
          autoCorrect={false}
          autoCapitalize='none'
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <ThemedView style={styles.separator} />
        <Pressable onPress={onLogin} style={[styles.button, lightStyle.glassmorphism]}>
          <ThemedText style={styles.text} >Login</ThemedText>
        </Pressable>
      </BlurView>

    </ImageBackground>

  );
}

const styles = StyleSheet.create({
 
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#016cf5",
     justifyContent: 'center',
     alignItems: 'center',
     height: '100%',
     width: '100%',
  },
  container_wraper: {
    width: "85%",
    maxWidth: 400,
    paddingVertical: 32,
    backgroundColor: 'rgba( 255, 255, 255, 0.5 )',
    borderRadius: 10,
    overflow: 'hidden',
    zIndex: 999999,
    position: 'relative',
  },

  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  separator: {
    marginTop: 16,
  },
  textInput: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "#016cf5",
    marginTop: 8,
    width: "80%",
    borderRadius: 10,
    tintColor: "white",
    color: "rgb(32, 33, 36)",
  },
  text: {
    color: "white",
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: "80%",
    backgroundColor: "rgba( 1, 108, 245, 1)",
    marginTop: 8,
    borderRadius: 10,
    alignItems: "center",
  },
});
