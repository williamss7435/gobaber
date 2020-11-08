import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Dashboard from '../../pages/Dashboard';
import Profile from '../../pages/Profile';
import New from './New';

export default function App() {
    const {Navigator, Screen} = createBottomTabNavigator();

    return (
        <Navigator
            tabBarOptions={{
                keyboardHidesTabBar: true,
                activeTintColor: '#fff',
                inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
                style: {
                    backgroundColor: '#8d41a8',
                    borderTopColor: '#8d41a8',
                },
            }}>
            <Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    tabBarIcon: ({color}) => (
                        <Icon size={20} name="event" color={color} />
                    ),
                }}
            />
            <Screen
                name="New"
                component={New}
                options={{
                    unmountOnBlur: true,
                    tabBarVisible: false,
                    tabBarLabel: 'Agendar',
                    tabBarIcon: ({color}) => (
                        <Icon
                            size={20}
                            name="add-circle-outline"
                            color={color}
                        />
                    ),
                }}
            />
            <Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Meu Perfil',
                    tabBarIcon: ({color}) => (
                        <Icon size={20} name="person" color={color} />
                    ),
                }}
            />
        </Navigator>
    );
}
