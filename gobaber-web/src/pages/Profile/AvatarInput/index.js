import React from 'react';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import goBaberApi from '../../../services/goBarberApi';

import {Container} from './styles';

export default function AvatarInput(){

    const avatar = useSelector(state => {
        return state.user.profile.avatar;
    });
    
    const [file, setFile] = useState(avatar && avatar.id);
    const [preview, setPreview] = useState(avatar && avatar.url);
    
    const ref = useRef();

    async function handleChange(e){
        const formData = new FormData();
        formData.append('file', e.target.files[0]);

        const response = await goBaberApi.post('files', formData);
        const {id, url} = response.data;

        setFile(id);
        setPreview(url);
    }


    return (
        <Container>
            <label htmlFor="avatar">

                {preview ?
                    <img src={preview} alt=""/>
                    :
                    <img src="" alt=""/>
                }
                <input 
                    type="file" 
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    data-file={file}
                    onChange={handleChange}
                    ref={ref}
                />

            </label>
        </Container>
    );
}