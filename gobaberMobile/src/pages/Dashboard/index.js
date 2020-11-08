import React, {useEffect, useState} from 'react';

import Background from '../../components/Background';
import Appointment from '../../components/Appointment';

import api from '../../services/api';
import {Container, Title, List} from './styles';
import {useFocusEffect} from '@react-navigation/native';

export default function Dashboard({navigation}) {
    const [appointments, setAppointments] = useState([]);

    useFocusEffect(() => {
        (async function () {
            const response = await api.get('appointments');
            setAppointments(response.data);
        })();
    }, []);

    async function handleCancel(id) {
        const response = await api.delete(`appointments/${id}`);

        setAppointments(
            appointments.map((appointment) => {
                return appointment.id === id
                    ? {...appointment, canceled_at: response.data.canceled_at}
                    : appointment;
            }),
        );
    }

    return (
        <Background>
            <Container>
                <Title>Agendamentos</Title>

                <List
                    data={appointments}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({item}) => (
                        <Appointment
                            OnCancel={() => handleCancel(item.id)}
                            data={item}
                        />
                    )}
                />
            </Container>
        </Background>
    );
}
