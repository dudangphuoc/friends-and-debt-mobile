import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View, Image, ImageBackground, Animated } from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { useAuth } from "@/hooks/auth";
import { accountFriendsAndDebtApi, tokenAuthFriendsAndDebtApi } from "@/hooks/app-initializer";
import { AuthenticateModel, RegisterInput } from "@/shared/friends-and-debt/friends-and-debt";
import { notifyMessage } from "@/components/Toast";
import { lightStyle, textColor, textColorLight } from "@/constants/Styles";
import { BlurView } from 'expo-blur';
import React from "react";
type LoginScreenProps = RegisterInput & AuthenticateModel & {
  rePassword?: string;
};

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [isLoad, setIsLoad] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const [input, setInput] = useState<LoginScreenProps>({
    name: "",
    surname: "",
    userName: "",
    emailAddress: "",
    password: "123qwe",
    rePassword: "",
    captchaResponse: "",
    userNameOrEmailAddress: "admin",
    rememberClient: true
  });


  const login = async () => {
    let model: AuthenticateModel = input;
      tokenAuthFriendsAndDebtApi().authenticate(model).then((result) => {
        signIn(result);
      }).catch((error) => {
        notifyMessage("Login failed",);
      });
  };
  const register = async () => {
    try {
      let model: RegisterInput = input;
      accountFriendsAndDebtApi().register(model).then((result) => {
        notifyMessage("Register success");
      })
      .then(() => {
        setIsRegister(false);
        setInput({ ...input, password: input.password, userNameOrEmailAddress: input.userNameOrEmailAddress });
      })
      .catch((error) => { 
        console.log(error);
        notifyMessage("Register failed");
      } );
    } catch (error: any) {
      notifyMessage(error.response.error.details);
    }
  };
  const onPress = async () => {
    setIsLoad(true);
    
    if (isRegister) {
      register().finally(() => {
        setIsLoad(false);
      });
      return;
    }

    login().finally(() => {
      setIsLoad(false);
    });
  };

  const renderRegister = () => {
    return (
      <>
        <ThemedTextInput
          style={styles.textInput}
          value={input?.name}
          placeholder="Enter your name"
          onChangeText={(text: string) => setInput({ ...input, name: text })}
          placeholderTextColor="#000"
        />
        <ThemedTextInput
          style={styles.textInput}
          value={input?.surname}
          placeholder="Enter your surname"
          onChangeText={(text: string) => setInput({ ...input, surname: text })}
          placeholderTextColor="#000"
        />

        <ThemedTextInput
          style={styles.textInput}
          value={input?.userName}
          placeholder="Enter your username"
          onChangeText={(text: string) => setInput({ ...input, userName: text })}
          placeholderTextColor="#000" />

        <ThemedTextInput
          style={styles.textInput}
          value={input?.emailAddress}
          placeholder="Enter your email"
          onChangeText={(text: string) => setInput({ ...input, emailAddress: text })}
          placeholderTextColor="#000" />

        <ThemedTextInput
          style={styles.textInput}
          value={input?.password}
          placeholder="Enter your password"
          onChangeText={(text: string) => setInput({ ...input, password: text })}
          placeholderTextColor="#000"
          secureTextEntry={true}
          autoCorrect={false}
          autoCapitalize='none'
        />

        <ThemedTextInput
          style={styles.textInput}
          value={input?.rePassword}
          placeholder="Re-enter your password"
          onChangeText={(text: string) => setInput({ ...input, rePassword: text })}
          placeholderTextColor="#000"
          secureTextEntry={true}
          autoCorrect={false}
          autoCapitalize='none'
        />
      </>
    );
  };

  const renderLogin = () => {
    return (<>
      <ThemedTextInput
        style={styles.textInput}
        value={input.userNameOrEmailAddress}
        placeholder="Enter your username or email"
        onChangeText={(text: string) => setInput({ ...input, userNameOrEmailAddress: text })}
        placeholderTextColor="#000"
      />

      <ThemedTextInput
        style={styles.textInput}
        value={input.password}
        onChangeText={(text: string) => setInput({ ...input, password: text })}
        placeholder="Type password"
        placeholderTextColor="#000"
        secureTextEntry={true}
        autoCorrect={false}
        autoCapitalize='none'
      />
    </>);

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
        {isRegister ? renderRegister() : renderLogin()
        }
        <ThemedView style={styles.separator}>
          <Pressable onPress={() => { 
            setInput({ ...input, password: "", rePassword: ""});
            setIsRegister(!isRegister) }}>
            <ThemedText type="Subheadline_Regular" style={[styles.separatorText]} >{!isRegister ? 'Register here.' : 'Login here.'}</ThemedText>
          </Pressable>
          <Pressable onPress={
            () => {
              notifyMessage("Forgot password commin soon");
            } 
          }>
            <ThemedText type="Subheadline_Regular" style={[styles.separatorText]} >Forgot password?</ThemedText>
          </Pressable>
        </ThemedView>
        <Pressable disabled={isLoad} onPress={onPress} style={[styles.button, lightStyle.glassmorphism]}>
          <ThemedText style={styles.text} >{!isRegister ? 'Login' : 'Register'}</ThemedText>
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
    width: "80%",
    gap: 10,
  },
  separatorText: {
    color: textColor,
    lineHeight: 24,
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
    marginTop: 32,
    borderRadius: 10,
    alignItems: "center",
  },
});
