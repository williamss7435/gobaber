import React from 'react';

import {Wrapper} from './styles';
import Header from '../../../components/Header';

export default function AuthLayout({children}){
    return (
        <Wrapper>
            <Header></Header>
            {children}
        </Wrapper>
    );
}