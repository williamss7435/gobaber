import React, { useState, useMemo } from 'react';
import {format, subDays, addDays, setHours, setMinutes, setSeconds, isBefore, isEqual, parseISO, setMilliseconds} from 'date-fns';
import {utcToZonedTime} from 'date-fns-tz';
import pt from 'date-fns/locale/pt';

import {Container, Time} from './styles';
import {MdChevronRight, MdChevronLeft} from 'react-icons/md';
import { useEffect } from 'react';
import goBaberApi from '../../services/goBarberApi';

const range = [
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
]

export default function Dashboards(){
    const [schedule, setSchedule] = useState([]);
    const [date, setDate] = useState(new Date());

    const dateFormatted = useMemo(
        () => format(date, "d 'de' MMMM", {locale: pt}), [date]
    );
    
    useEffect(() => {
        (async function() {
            const response = await goBaberApi.get('schedule', {
                params: {date}
            })


            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            const data = range.map(hour => {
                const checkDate = setMilliseconds(setSeconds(setMinutes(setHours(date, hour), 0), 0), 0);
                const compareDate = utcToZonedTime(checkDate, timezone);

                return {
                    time: `${hour}:00h`,
                    past: isBefore(compareDate, new Date()),
                    appointment: response.data.appointments.find(a => {
                        return isEqual(parseISO(a.date), compareDate);
                    }),
                }
            });
            
            setSchedule(data);

        })();
    }, [date]);


    function handlePrevDay(){
        setDate(subDays(date, 1));
    }

    function handleNextDay(){
        setDate(addDays(date, 1));
    }

    return(
        <Container>
            <header>
                <button type="button" onClick={handlePrevDay}>
                    <MdChevronLeft size="36" color="#fff"></MdChevronLeft>
                </button>
                <strong>{dateFormatted}</strong>
                <button type="button" onClick={handleNextDay}>
                    <MdChevronRight size="36" color="#fff"></MdChevronRight>
                </button>
            </header>

            <ul>
                {schedule.map(time => {
                    return (
                        <Time key={time.time} past={time.past} available={!time.appointment}>
                            <strong>{time.time}</strong>
                            <span>{time.appointment ? time.appointment.user.name : 'Em Aberto'}</span>
                        </Time>
                    )
                })}
            </ul>
        </Container>
    )
}