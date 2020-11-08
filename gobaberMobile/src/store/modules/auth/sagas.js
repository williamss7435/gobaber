import {Alert} from 'react-native';
import {all, call, put, takeLatest} from 'redux-saga/effects';

import goBarberApi from '../../../services/api';
import * as RootNavigation from '../../../routes/rootNavigation';
import {signInSuccess, signFailure} from './actions';

export function* signIn({payload}) {
    try {
        const {email, password} = payload;

        const response = yield call(goBarberApi.post, 'sessions', {
            email,
            password,
        });
        const {token, user} = response.data;

        if (user.provider) {
            Alert.alert(
                'Erro no login',
                'Usuário náo pode ser prestador de serviço',
            );
            return;
        }

        goBarberApi.defaults.headers.Authorization = `Bearer ${token}`;
        yield put(signInSuccess(token, user));

        RootNavigation.navigate('App');
    } catch (error) {
        Alert.alert(
            'Falha na autenticação',
            'Houve um erro no login, verifique o seus dados',
        );
        yield put(signFailure());
    }
}

export function* signUp({payload}) {
    try {
        const {name, email, password} = payload;

        yield call(goBarberApi.post, 'users', {
            name,
            email,
            password,
        });

        RootNavigation.navigate('SignIn');
    } catch (error) {
        Alert.alert(
            'Falha no cadastro',
            'Houve um erro no cadastro, verifique seus dados',
        );
        yield put(signFailure());
    }
}

export function setToken({payload}) {
    if (!payload) {
        return;
    }

    const {token} = payload.auth;

    if (token) {
        goBarberApi.defaults.headers.Authorization = `Bearer ${token}`;
    }
}

export function signOut() {
    //RootNavigation.navigate('SignIn');
}

export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_UP_REQUEST', signUp),
    takeLatest('@auth/SIGN_OUT', signOut),
]);
