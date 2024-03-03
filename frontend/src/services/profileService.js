import axios from 'axios';
import AuthenticationService from './authenticationService';

const profilesPath = '/api/profiles';
const expensesPath = '/api/expenses';

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

const addExpense = (profileId, expense) => {
    return axios
        .post(`${expensesPath}/profiles/${profileId}`, expense, {
            headers: { Authorization: AuthenticationService.getToken() },
        })
        .then(res => res.data);
};

const editExpense = (profileId, expense) => {
    return axios
        .put(`${expensesPath}/${expense.id}/profiles/${profileId}`, expense, {
            headers: { Authorization: AuthenticationService.getToken() },
        })
        .then(res => res.data);
};

const deleteExpense = (profileId, expenseId) => {
    return axios
        .delete(`${expensesPath}/${expenseId}/profiles/${profileId}`, {
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
    addExpense,
    editExpense,
    deleteExpense,
    deleteProfile,
};

export default ProfileService;
