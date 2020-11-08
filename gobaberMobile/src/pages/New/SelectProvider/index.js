import React, {useEffect, useState} from 'react';

import Background from '../../../components/Background';
import {Container, ProviderList, Provider, Avatar, Name} from './styles';

import api from '../../../services/api';

export default function SelectProvider({navigation}) {
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        (async function loadProvider() {
            const response = await api.get('providers');
            setProviders(response.data);
        })();
    }, []);

    return (
        <Background>
            <Container>
                <ProviderList
                    data={providers}
                    keyExtractor={(provider) => String(provider.id)}
                    renderItem={({item: provider}) => {
                        return (
                            <Provider
                                onPress={() =>
                                    navigation.navigate('SelectDateTime', {
                                        provider,
                                    })
                                }>
                                <Avatar
                                    source={{
                                        uri: provider.avatar
                                            ? `http://10.0.2.2:3333/files/${provider.avatar.path}`
                                            : null,
                                    }}
                                />
                                <Name>{provider.name}</Name>
                            </Provider>
                        );
                    }}
                />
            </Container>
        </Background>
    );
}
