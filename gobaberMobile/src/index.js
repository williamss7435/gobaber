import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {StatusBar} from 'react-native';
import {store, persistor} from './store/index';

import Routes from './routes/routes';

export default function index() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
                <Routes />
            </PersistGate>
        </Provider>
    );
}
