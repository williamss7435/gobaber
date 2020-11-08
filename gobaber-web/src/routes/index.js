import React from 'react';
import {Switch} from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';

import Route from './RouteWrapper';

export default function Routes(){
    return (
        <Switch>
            <Route path="/" exact component={SignIn}></Route>
            <Route path="/register" component={SignUp}></Route>
            <Route path="/profile" component={Profile} isPrivate={true}></Route>
            <Route path="/dashboard" component={Dashboard} isPrivate={true}></Route>

            <Route path="/" component={() => <h1>404</h1>}></Route>
        </Switch>
    )
}