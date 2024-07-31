import { atom, AtomEffect, atomFamily, RecoilState, useRecoilValue } from "recoil";
import { recoilPersist } from "recoil-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthenticateResultModel, CreateBoardModel, FriendModel, FriendModelPagedResultDto, UserDtoPagedResultDto } from "@/shared/friends-and-debt/friends-and-debt";
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

export const userHeaderText = atom<string>({
    key: 'userHeaderText',
    default: '',
});

export const userHeaderLabel = atom<string | null>({
    key: 'userHeaderLabel',
    default: '',
});

export const eventHeader = atomFamily({
  key: 'eventHeader',
  default: (msg:string) => {},
});
export const headerSearchText = atom({
  key: 'headerSearchText',
  default:'',
});



export const friendsReloadState = atom<boolean>({
  key: 'friendsReload',
  default: false,
});

export const friendTabsSelected = atom<string>({
  key: 'friendTabsSelected',
  default: '0',
})

export const friendSearching = atom<boolean>({
  key: 'friendSearching',
  default: false,
});

export const friends = atom<FriendModel[]>({
  key: 'friendModelPagedResultDto',
  default: [],
});

export const users = atom<UserDtoPagedResultDto>({
  key: 'users',
  default: {
    items: [],
    totalCount: 0,
  },
});

export const filterValues = atom<string>({
  key: 'filterValues',
  default: '',
});

//Board
export const createBoard = atom<CreateBoardModel>({
  key: 'createBoard',
  default:{
    name: '',
  },
});

export const currentBoardIdState = atom<number>({
  key: 'currentBoardId',
  default: 0,
});

