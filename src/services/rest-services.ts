import axios from 'axios';

const api = axios.create({
    baseURL: '/',
    withCredentials: true,
    headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache', 'Content-Type': 'application/json' },
});


export const logginn = async (): Promise<void> => {
    const response = await api.get(`${''}/`,  {
        headers: {},

    });
    return JSON.parse(response.data);
}
