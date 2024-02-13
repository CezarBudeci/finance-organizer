import axios from 'axios';
import AuthenticationService from './authenticationService';

const profilesPath = '/api/profiles';

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

const addProfile = profile => {
    return axios
        .post(`${profilesPath}`, profile, {
            headers: { Authorization: AuthenticationService.getToken() },
        })
        .then(res => res.data);
};

const editProfile = profile => {
    return axios
        .put(`${profilesPath}/${profile.id}`, profile, {
            headers: { Authorization: AuthenticationService.getToken() },
        })
        .then(res => res.data);
};

const deleteProfile = id => {
    return axios
        .delete(`${profilesPath}/${id}`, {
            headers: { Authorization: AuthenticationService.getToken() },
        })
        .then(res => res.data);
};

const ProfileService = {
    getProfile,
    getProfiles,
    addProfile,
    editProfile,
    deleteProfile,
};

export default ProfileService;
