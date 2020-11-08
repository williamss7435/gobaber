import React, {useMemo} from 'react';
import {formatRelative, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt';

import Background from '../../../components/Background';
import {Container, Avatar, Name, Time, SubmitButton} from './styles';
import api from '../../../services/api';

export default function Confirm({route, navigation}) {
    const provider = route.params.provider;
    const time = route.params.time;

    const dateFormatted = useMemo(() => {
        return formatRelative(parseISO(time), new Date(), {locale: pt});
    }, [time]);

    async function handleAddAppointment() {
        await api.post('appointments', {
            provider_id: provider.id,
            date: time,
        });
        navigation.navigate('Dashboard');
    }

    return (
        <Background>
            <Container>
                <Avatar
                    source={{
                        uri: provider.avatar
                            ? `http://10.0.2.2:3333/files/${provider.avatar.path}`
                            : null,
                    }}
                />
                <Name>{provider.name}</Name>
                <Time>{dateFormatted}</Time>
                <SubmitButton onPress={handleAddAppointment}>
                    Confirmar Agendamento
                </SubmitButton>
            </Container>
        </Background>
    );
}
