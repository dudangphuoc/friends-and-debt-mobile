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

function useProtectedRoute(user: AuthenticateResultModel | null) {
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
  useProtectedRoute(user);

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
