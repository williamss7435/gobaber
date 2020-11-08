import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';

export default (reduces) => {

    const persistedReducer = persistReducer({
        key: 'gobarber',
        storage,
        whitelist: ['auth', 'user'],
    }, 
        reduces
    );

    return persistedReducer;
}