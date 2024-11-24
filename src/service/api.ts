import axios, { AxiosInstance } from 'axios';

const api:AxiosInstance = axios.create({
    baseURL: process.env.BACKEND_URL,
    headers: {
        "Context-Type":"application/json",
    },
});

export default api;