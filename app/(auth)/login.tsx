import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { useAuth } from "@/hooks/auth";
import { friendsAndDebtApi } from "@/hooks/app-initializer";
import { AuthenticateModel } from "@/shared/friends-and-debt/friends-and-debt";
import { notifyMessage } from "@/components/Toast";

const checkBiometrics = async () => {
  const compatible = await LocalAuthentication.hasHardwareAsync();
  if (!compatible) {
    // Thiết bị không hỗ trợ xác thực sinh trắc học
    return false;
  }

  const enrolled = await LocalAuthentication.isEnrolledAsync();
  if (!enrolled) {
    // Người dùng chưa đăng ký vân tay/Face ID
    return false;
  }

  return true;
};

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [biometrics, setBiometrics] = useState(false);
  const { signIn } = useAuth();
  const authenticate = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Xác thực bằng vân tay',
        cancelLabel: 'Hủy',
        disableDeviceFallback: true, // Tắt tùy chọn nhập mã PIN/mật khẩu
      });
  
      if (result.success) {
        // Xác thực thành côngooooooooooooo
        setEmail("user123");
        setPassword("123qwe");
        onLogin();
        
      } else {
        // Xác thực thất bại
      }
    } catch (error) {
      console.error(error);
      // Xử lý lỗi
    }
  };

  const onLogin = async () => {
    try {
      var model = new AuthenticateModel()
      model.userNameOrEmailAddress = email;
      model.password = password;
      model.rememberClient = true;
      var result = await friendsAndDebtApi().authenticate(model);

      if (result) {
        signIn(result);


    }
    catch(error:any) {
      var message = error.response;
      notifyMessage(message.error.details);
    }

  
  };

  useEffect(() => {
    checkBiometrics().then(setBiometrics);
   }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={{ fontSize: 24 }}>Login</ThemedText>
      <ThemedTextInput  
         style={styles.textInput}
         value={email}
         placeholder="Type email"
         onChangeText={(text:any) => setEmail(text)}
       />
  
      <ThemedTextInput
        style={styles.textInput}
        value={password}
        onChangeText={(text:any) => setPassword(text)}
        placeholder="Type password"
        secureTextEntry={true}
        autoCorrect={false}
        autoCapitalize='none'
      />
      <ThemedView style={styles.separator} />
      <Pressable onPress={onLogin} style={styles.button}>
        <ThemedText style={styles.text} >Login</ThemedText>
      </Pressable>
      {/* <Pressable onPress={authenticate} style={styles.button} disabled={!biometrics}>
        <ThemedText style={styles.text}>Biometrics</ThemedText>
      </Pressable> */}
      {/* <Pressable onPress={() => router.push("/register")} style={styles.button}>
        <Text style={styles.text}>Register</Text>
      </Pressable> */}
     
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    borderColor: "grey",
    marginTop: 8,
    width: "80%",
    borderRadius: 10,
  },
  text: {
    color: "white",
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: "80%",
    backgroundColor: "#05BFDB",
    marginTop: 8,
    borderRadius: 10,
    alignItems: "center",
  },
});
