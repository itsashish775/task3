import Axios from "axios";
const API_URL = "http://localhost:3333/api"
// const API_URL = "https://task2-lkow.onrender.com/api"

function authRequestInterceptor(config) {
    if (config && config.headers) {
        
    }
    return config;
}

export const axios = Axios.create({
    baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {

        const message = error.response?.data?.message || error.message;
        console.error(message);

        return Promise.reject(error);
    }
);
