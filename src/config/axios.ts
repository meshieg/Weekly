import axios from 'axios'
import { getTokenFromStorage } from '../helpers/functions';

axios.interceptors.request.use(function (config) {

    const token = getTokenFromStorage();

    if (token) {
        config.headers.token = token;
    }

    return config;

}, function (error) {
    return Promise.reject(error);
}
);

export { axios as AxiosInstance };
