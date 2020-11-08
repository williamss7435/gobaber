import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import logo from '../../assets/logo.svg';

import {signInRequest} from '../../store/modules/auth/actions';

export default function SignIn(){
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setpasswordError] = useState('');

    function handlerSubmit(e){
        e.preventDefault();
        e.stopPropagation();

        setEmailError('');
        setpasswordError('');
        const errors = {
            email: false,
            password: false,
        }
    
        if(!email || email === ''){
            setEmailError('O email é obrigatório');
            errors.email = true;
        }
        else if(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i.test(email)){
            setEmailError('Insira um email valido');
            errors.email = true;
        }
        

        if(!password || password === ''){
            setpasswordError('A senha é obrigatória');
            errors.password = true;
        }
        else if (password.length < 6){
            setpasswordError('No mínimo 6 caracteres');
            errors.password = true;
        }

        if(errors.email || errors.password)
            return;
    
        dispatch(signInRequest(email, password));
    }


    return(
        <>
            <img src={logo} alt="GoBarber"/>

            <form onSubmit={handlerSubmit}>
                {<span>{emailError}</span>}
                <input type="email" placeholder="Seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
                {<span>{passwordError}</span>}
                <input type="password" placeholder="Sua senha secreta" value={password} onChange={(e) => setPassword(e.target.value)}/>

                <button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>
                <Link to="/register">Cria conta gratuita</Link>
            </form>
        </>
    )
}