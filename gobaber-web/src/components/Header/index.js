import React from 'react';
import { Link } from 'react-router-dom';

import Notifications from '../Notifications/index';

import {Container, Content, Profile} from './styles';
import logo from '../../assets/logo-purple.svg';
import defaultUser from '../../assets/default-user.jpg';
import { useSelector } from 'react-redux';

export default function Header(){
    const profile = useSelector(state => state.user.profile);

    return (
        <Container>
            <Content>
                <nav>
                    <img src={logo} alt="GoBarber"/>
                    <Link to="/dashboard">DASHBOARD</Link>
                </nav>
                <aside>
                    <Notifications></Notifications>
                    <Profile>
                        <div>
                            <strong>{profile.name}</strong>
                            <Link to="/profile">Meu perfil</Link>
                        </div>
                        <img src={profile.avatar ? profile.avatar.url : defaultUser} alt={profile.name}/>
                    </Profile>
                </aside>
            </Content>
        </Container>
    );
}