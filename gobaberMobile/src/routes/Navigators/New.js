import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import SelectProvider from '../../pages/New/SelectProvider';
import SelectDateTime from '../../pages/New/SelectDateTime';
import Confirm from '../../pages/New/Confirm';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default function New({navigation}) {
    const {Navigator, Screen} = createStackNavigator();

    return (
        <Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerTintColor: '#fff',
                headerLeftContainerStyle: {
                    marginLeft: 20,
                },
            }}>
            <Screen
                options={{
                    title: 'Selecione o prestador',
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Dashboard')}>
                            <Icon name="chevron-left" size={25} color="#fff" />
                        </TouchableOpacity>
                    ),
                }}
                name="SelectProvider"
                component={SelectProvider}
            />
            <Screen
                options={{
                    title: 'Selecione o horário',
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('SelectProvider')
                            }>
                            <Icon name="chevron-left" size={25} color="#fff" />
                        </TouchableOpacity>
                    ),
                }}
                name="SelectDateTime"
                component={SelectDateTime}
            />
            <Screen
                options={{
                    title: 'Confirmar agendamento',
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('SelectDateTime')
                            }>
                            <Icon name="chevron-left" size={25} color="#fff" />
                        </TouchableOpacity>
                    ),
                }}
                name="Confirm"
                component={Confirm}
            />
        </Navigator>
    );
}
