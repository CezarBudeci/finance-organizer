import axios from 'axios';
import AuthenticationService from './authenticationService';

const profilesPath = '/profiles';

const getProfiles = () => {
    return axios
        .get(`${profilesPath}/`, {
            headers: { Authorization: AuthenticationService.getToken() },
        })
        .then(res => res.data);
};

const getProfile = id => {
    return axios
        .get(`${profilesPath}/${id}`, {
            headers: { Authorization: AuthenticationService.getToken() },
        })
        .then(res => res.data);
};
