import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// export const userCredentials =  atom({
//     key: 'userCredentials', // Key duy nhất để xác định atom
//     default: {email: "", password: ""}, // Giá trị mặc định của state
//     // effects_UNSTABLE: [persistAtom], // Lưu trạng thái của atom vào localStorage
// });

export const userCredentials = atom({
    key: 'userCredentials',
    default: {email: "", password: ""},
    // effects_UNSTABLE: [
    //   ({ setSelf, onSet }) => {
    //     const loadPersisted = async () => {
    //       const savedValue = await AsyncStorage.getItem('myAtom');
    //       if (savedValue !== null) {
    //         setSelf(JSON.parse(savedValue));
    //       }
    //     };
    //     loadPersisted();
    //     onSet(async (newValue, _, isReset) => {
    //       isReset
    //         ? await AsyncStorage.removeItem('myAtom')
    //         : await AsyncStorage.setItem('myAtom', JSON.stringify(newValue));
    //     });
    //   },
    // ],
  });
  