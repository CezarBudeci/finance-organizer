import axios from 'axios';
import AuthenticationService from './authenticationService';
const path = '/api';

const login = (email, password) => {
    return axios
        .post(`${path}/login`, { email, password })
        .then(res => res.data);
};

const register = (email, username, password) => {
    return axios
        .post(`${path}/register`, { email, username, password })
        .then(res => res.data);
};

const refreshToken = () => {
    return axios
        .get(`${path}/refresh`, {
            headers: {
                Authorization: AuthenticationService.getToken(),
            },
        })
        .then(res => res.data);
};

const logout = () => {
    return axios
        .get(`${path}/logout`, {
            headers: {
                Authorization: AuthenticationService.getToken(),
            },
        })
        .then(res => res.data);
};

const UserService = {
    login,
    register,
    refreshToken,
    logout,
};

export default UserService;
