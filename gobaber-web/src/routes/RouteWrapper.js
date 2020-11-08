import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import DefaultLayout from '../pages/_layouts/default';
import AuthLayout from '../pages/_layouts/auth';

import {store} from '../store/index';

export default function RouteWrapper({
    component: Component,
    isPrivate = false,
    ...rest
}){
    const {signed} = store.getState().auth;
    
    if(!signed && isPrivate){
        return <Redirect  to={{pathname: '/'}}/>
    }

    if(signed && !isPrivate){
        return <Redirect to="/dashboard"/>
    }

    return (
        signed ?
        <AuthLayout><Route {...rest} component={Component}></Route></AuthLayout>
        :
        <DefaultLayout><Route {...rest} component={Component}></Route></DefaultLayout>
    )

}