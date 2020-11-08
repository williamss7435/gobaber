import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import {signUpRequest} from '../../store/modules/auth/actions';

export default function SignIn(){
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setpasswordError] = useState(null);
    const [nameError, setNameError] = useState(null);

    function handlerSubmit(e){
        e.preventDefault();
        e.stopPropagation();

        setEmailError('');
        setpasswordError('');
        setNameError('');

        const errors = {
            name: false,
            email: false,
            password: false,
        }

        if(!name || name.length < 4){
            setNameError('O nome deve conter pelo menos 4 caracteres');
            errors.name = true;
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

        if(errors.name || errors.email || errors.password)
            return;
        
        dispatch(signUpRequest(name, email, password));
    }


    return(
        <>
            <img src={logo} alt="GoBarber"/>

            <form onSubmit={handlerSubmit}>
                {<span>{nameError}</span>}
                <input type="text" placeholder="Seu Nome Completo" value={name} onChange={(e) => setName(e.target.value)}/>
                {<span>{emailError}</span>}
                <input type="email" placeholder="Seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
                {<span>{passwordError}</span>}
                <input type="password" placeholder="Sua senha secreta" value={password} onChange={(e) => setPassword(e.target.value)}/>

                <button type="submit">Acessar</button>
                <Link to="/register">Cria conta gratuita</Link>
            </form>
        </>
    )
}