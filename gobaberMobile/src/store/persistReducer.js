import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';

export default (reduces) => {
    const persistedReducer = persistReducer(
        {
            key: 'gobarber',
            storage: AsyncStorage,
            whitelist: ['auth', 'user'],
        },
        reduces,
    );

    return persistedReducer;
};
