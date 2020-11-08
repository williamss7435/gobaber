import axios from 'axios';

const goBaberApi = axios.create({
    baseURL: 'http://localhost:3333/'
});

export default goBaberApi;