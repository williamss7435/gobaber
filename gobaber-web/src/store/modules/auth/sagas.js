import {all, call, put, takeLatest} from 'redux-saga/effects';
import {} from 'react-router-dom';

import goBarberApi from '../../../services/goBarberApi';

import {signInSuccess, signFailure} from './actions';
import history from '../../../services/history';
import {toast} from 'react-toastify';

export function* signIn({payload}){
   try {
    const {email, password} = payload;
    
    const response = yield call(goBarberApi.post, 'sessions', {
        email,
        password
    });

    const {token, user} = response.data;

    if(!user.provider){
        toast.error('Usuário náo é um prestador');
        return;
    }

    goBarberApi.defaults.headers.Authorization = `Bearer ${token}`;
    yield put(signInSuccess(token, user));

    history.push('/dashboard');

   } catch (error) {
    toast.error('Falha na autenticação');
    yield put(signFailure());
   }
}

export function* signUp({payload}){
    try {
        const {name, email, password} = payload;

        yield call(goBarberApi.post, 'users', {
            name, email, password, provider: true
        });

        history.push('/');
    } catch (error) {
        toast.error('Falha no cadastro, verifique seus dados!');
        yield put(signFailure());
    }
}

export function setToken({payload}){
    if(!payload)
        return;

    const {token} = payload.auth;

    if(token){
        goBarberApi.defaults.headers.Authorization = `Bearer ${token}`;
    }
}

export function signOut(){
    history.push('/');
}

export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_UP_REQUEST', signUp),
    takeLatest('@auth/SIGN_OUT', signOut)
]);