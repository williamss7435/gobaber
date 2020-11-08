import React, {useState, useEffect, useMemo} from 'react';


import GoBarberApi from '../../services/goBarberApi';
import {parseISO, formatDistance} from 'date-fns';
import pt from 'date-fns/locale/pt';

import {MdNotifications } from 'react-icons/md';
import {
    Container, 
    Badge, 
    NotificationList, 
    Notification, 
    Scroll
} from './styles';

export default function Notifications(){
    const [visible, setVisible] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        (async function loadNotification(){
            const response = await GoBarberApi.get('notifications');
        
            const data = response.data.map(notification => ({
                ...notification,
                timeDistance: formatDistance(
                    parseISO(notification.createdAt),
                    new Date(),
                    {addSuffix: true, locale: pt}
                )
            }))

            setNotifications(data);
        })();
    }, []);

    const hasUnred = useMemo(
        () => !! notifications.find(notification => notification.read === false),
        [notifications]
        )

    async function handleMarkAsRead(id){
        await GoBarberApi.put(`notifications/${id}`);
       setNotifications(
        notifications.map(notification => 
            notification._id === id ? {...notification, read: true} : notification
        )
       )
    }

    function handleToggleVisible(){
        setVisible(!visible);
    }

    return (
        <Container>
            <Badge hasUnread={hasUnred} onClick={handleToggleVisible}>
                <MdNotifications color="#7159c1" size={20} />
            </Badge>

            <NotificationList visible={visible}>
                <Scroll>
                {
                    notifications.map(notification => (
                        <Notification key={notification._id} unread={!notification.read}>
                            <p>{notification.content}</p>
                            <time>{notification.timeDistance}</time>
                            {!notification.read && <button type="button" onClick={() => handleMarkAsRead(notification._id)}>Marcar como lida</button>}
                        </Notification>
                    ))
                }
                </Scroll>
            </NotificationList>
        </Container>
    );
}