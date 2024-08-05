import React, { FC, ReactNode, useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { useRecoilState } from "recoil";
import { userCredentials } from '@/constants/Atoms';
import { AuthenticateResultModel } from "@/shared/friends-and-debt/friends-and-debt";
import { accessToken, setAccessToken } from "./app-initializer";

type CredentialsContext = {
  signIn: (userCredentials: AuthenticateResultModel) => void;
  signOut: () => void;
  user: AuthenticateResultModel | null;
};

type AuthProviderProps = {
  // userCredentials: UserCredentials | null;
  children?: ReactNode;
};

const AuthContext = React.createContext<CredentialsContext>({
  signIn: () => { },
  signOut: () => { },
  user: null,
});

export function useAuth() {
  return React.useContext(AuthContext);
}

function useProtectedRoute() {
  const [user, setAuth] = useRecoilState<AuthenticateResultModel | null>(userCredentials);
 
  const segments = useSegments();
  const router = useRouter();
  setAccessToken(user);
 
  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if ((!user && !inAuthGroup) || (user?.accessToken == "")) {
      router.replace("/login");
    }
    else if (user && (inAuthGroup || segments[0] === "[...404]")) {
      router.replace("/");
    }
  }, [user, segments]);
}

export const Provider: FC<AuthProviderProps> = (props) => {
  const [user, setAuth] = useRecoilState<AuthenticateResultModel | null>(userCredentials);
  const { signOut } = useAuth();
  useProtectedRoute();
    
  if (user === null) {
    signOut();
    // Thực hiện các hành động khi token không hợp lệ (ví dụ: hiển thị thông báo, chuyển hướng, ...)
  }
  else if (user?.expireInSeconds !== undefined) {
    const startTime = new Date().getTime(); // Thời điểm bắt đầu
    setTimeout(() => {
      const currentTime = new Date().getTime();
      const elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000);
      if (elapsedTimeInSeconds >= user?.expireInSeconds) {
        setAuth(null)
        signOut();
        console.log("Hết hạn token");
        // Thực hiện các hành động khi hết hạn (ví dụ: hiển thị thông báo, chuyển hướng, ...)
      }
    }, user?.expireInSeconds * 1000); // Chuyển đổi expireInSeconds sang mili giây
  }

  return (
    <AuthContext.Provider
      value={{
        signIn: (userCredentials: AuthenticateResultModel) => setAuth(userCredentials),
        signOut: () => setAuth(null),
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
