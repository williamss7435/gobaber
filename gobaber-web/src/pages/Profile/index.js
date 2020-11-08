import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {Container, Form} from './styles';

import {updateProfileRequest} from '../../store/modules/user/actions';
import {signOut} from '../../store/modules/auth/actions';
import AvatarInput from './AvatarInput/index';

export default function Profile(){
    const dispatch = useDispatch();
    const profile = useSelector(state => {
        return state.user.profile;
    })


    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    
    function handleSubmit(e){
        e.preventDefault();
        e.stopPropagation();

        dispatch(updateProfileRequest({
            name,
            email,
            oldPassword,
            password,
            confirmPassword,
            avatar_id: e.target[0].dataset.file ? e.target[0].dataset.file : null
        }));


    }

    function handleSignOut(){
        dispatch(signOut());
    }

    return(
        <Container>
            <Form onSubmit={handleSubmit}>
                <AvatarInput name="avatar_id"/>

                <input 
                    type="text" 
                    name="name" 
                    placeholder="Nome" 
                    value={name} 
                    onChange={(event) => setName(event.target.value)}
                />


                <input 
                    type="email" 
                    name="email" 
                    placeholder="Seu endereço de e-mail"
                    value={email} onChange={(event) => setEmail(event.target.value)}
                />    
            

                <hr/>

                <input 
                    type="password" 
                    name="oldPassword" 
                    placeholder="Sua senha atual"
                    value={oldPassword} onChange={(event) => setOldPassword(event.target.value)}
                />

                <input 
                    type="password" 
                    name="password" 
                    placeholder="Nova senha"
                    value={password} onChange={(event) => setPassword(event.target.value)}
                />
                <input 
                    type="password" 
                    name="confirmPassword" 
                    placeholder="Confirmação de senha"
                    value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}
                />

                <button type="submit">Atualizar perfil</button>
            </Form>
            <button type="button" onClick={handleSignOut}>Sair do GoBarber</button>
        </Container>
    )
}