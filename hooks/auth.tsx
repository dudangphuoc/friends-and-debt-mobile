import React, { FC, ReactNode } from "react";
import { useRouter, useSegments } from "expo-router";
import { useRecoilState } from "recoil";
import { userCredentials } from '@/constants/Atoms';
import { IAuthenticateResultModel } from "@/shared/friends-and-debt/friends-and-debt";

type CredentialsContext = {
  signIn: (userCredentials: IAuthenticateResultModel) => void;
  signOut: () => void;
  user: IAuthenticateResultModel | null;
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

function useProtectedRoute(user: IAuthenticateResultModel | null) {
  const segments = useSegments();
  const router = useRouter();
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
  const [user, setAuth] = useRecoilState<IAuthenticateResultModel | null>(userCredentials);
  useProtectedRoute(user);
  return (
    <AuthContext.Provider
      value={{
        signIn: (userCredentials: IAuthenticateResultModel) => setAuth(userCredentials),
        signOut: () => setAuth(null),
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
