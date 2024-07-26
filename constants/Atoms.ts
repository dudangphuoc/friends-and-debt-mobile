import { atom, AtomEffect, RecoilState, useRecoilValue } from "recoil";
import { recoilPersist } from "recoil-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthenticateResultModel } from "@/shared/friends-and-debt/friends-and-debt";

const { persistAtom } = recoilPersist({
    key: 'recoil-persist',
    storage: AsyncStorage,
})

export const persistAtomEffect = <T>(param: Parameters<AtomEffect<T>>[0]) => {
    param.getPromise(userCredentials).then(() => persistAtom(param))
}

type SetSelf = (newValue: any | ((prevState: any) => any)) => void;
type OnSet = (effect: (newValue: any, oldValue: any | undefined, isReset: boolean) => void) => void;

const localStorageEffect = <T>(key: string) =>  ({
  setSelf,
  onSet,
}: {
  setSelf: SetSelf;
  onSet: OnSet;
}) => {
  AsyncStorage.getItem(key).then((savedValue) => {
    if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
  });
  onSet(async (newValue, _, isReset) => {
    isReset
      ? await AsyncStorage.removeItem(key)
      : await AsyncStorage.setItem(key, JSON.stringify(newValue));
  });
};
  
export const userCredentials = atom<AuthenticateResultModel | null>({
    key: 'user',
    default: null,
    effects: [
        localStorageEffect('current_user'),
      ]
});

export const userHeaderText = atom<string | null>({
    key: 'userHeaderText',
    default: '',
});

export const userHeaderLabel = atom<string | null>({
    key: 'userHeaderLabel',
    default: '',
});


export const eventHeaderText = atom({
  key: 'eventHeaderText',
  default: () => {} ,
});