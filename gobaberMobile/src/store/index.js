import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore} from 'redux-persist';

import rootReducer from './modules/rootReducer';
import rootSagas from './modules/rootSaga';
import persistReducer from './persistReducer';

const sagamiddleware = createSagaMiddleware();
const store = createStore(
    persistReducer(rootReducer),
    applyMiddleware(sagamiddleware),
);
const persistor = persistStore(store);

sagamiddleware.run(rootSagas);

export {store, persistor};
