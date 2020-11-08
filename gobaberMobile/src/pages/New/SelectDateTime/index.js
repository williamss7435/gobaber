import React, {useEffect, useState} from 'react';

import Background from '../../../components/Background';
import DateInput from '../../../components/DateInput';

import api from '../../../services/api';

import {Container, Hour, HourList, Title} from './styles';

export default function SelectDateTime({route, navigation}) {
    const [date, setDate] = useState(new Date());
    const [hours, setHours] = useState([]);

    const provider = route.params.provider;

    useEffect(() => {
        (async function loadAvailable() {
            const response = await api.get(
                `providers/${provider.id}/available`,
                {
                    params: {
                        date: date.getTime(),
                    },
                },
            );
            setHours(response.data);
        })();
    }, [date, provider.id]);

    function handlerSelectHour(time) {
        navigation.navigate('Confirm', {
            provider,
            time,
        });
    }

    return (
        <Background>
            <Container>
                <DateInput date={date} onChange={setDate} />
                <HourList
                    data={hours}
                    keyExtractor={(item) => String(item.time)}
                    renderItem={({item}) => (
                        <Hour
                            onPress={() => handlerSelectHour(item.value)}
                            enabled={item.available}>
                            <Title>{item.time}</Title>
                        </Hour>
                    )}
                />
            </Container>
        </Background>
    );
}
