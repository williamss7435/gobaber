import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import App from './Navigators/AppNavigator';

import {useSelector} from 'react-redux';
import {navigationRef} from './rootNavigation';

export default function Routes() {
    const {Navigator, Screen} = createStackNavigator();
    const signed = useSelector((state) => state.auth.signed);

    const initalRoute = signed ? 'App' : 'SignIn';

    if (signed) {
        return (
            <NavigationContainer ref={navigationRef}>
                <Navigator headerMode="none" initialRouteName={initalRoute}>
                    <Screen name="App" component={App} />
                </Navigator>
            </NavigationContainer>
        );
    } else {
        return (
            <NavigationContainer ref={navigationRef}>
                <Navigator headerMode="none" initialRouteName={initalRoute}>
                    <Screen name="SignIn" component={SignIn} />
                    <Screen name="SignUp" component={SignUp} />
                </Navigator>
            </NavigationContainer>
        );
    }
}
