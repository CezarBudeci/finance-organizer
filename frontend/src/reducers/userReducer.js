import { createSlice } from '@reduxjs/toolkit';
import UserService from '../services/userService';
import AuthenticationService from '../services/authenticationService';
import { createAlert } from './alertReducer';
import { ERROR, INFO } from '../utils/constants';
import { resetMainMenu } from './mainMenuReducer';

const initialState = {
    username: '',
    email: '',
    token: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(_, action) {
            return action.payload;
        },
        setToken(state, action) {
            return {
                username: state.username,
                email: state.email,
                token: action.payload.token,
            };
        },
        resetUser() {
            return initialState;
        },
    },
});

export const { setUser, setToken, resetUser } = userSlice.actions;

export const login = (email, password) => {
    return dispatch => {
        return UserService.login(email, password)
            .then(data => {
                dispatch(setUser(data));
                AuthenticationService.setToken(data.token ?? null);
            })
            .catch(err => {
                dispatch(resetUser());
                AuthenticationService.setToken(null);
                console.log(err);
                if (err.name === 'AxiosError') {
                    dispatch(createAlert(err.response.data.error, ERROR, 3));
                } else {
                    dispatch(createAlert(err.message, ERROR, 3));
                }
            });
    };
};

export const registerUser = (email, username, password) => {
    return dispatch => {
        return UserService.register(email, username, password)
            .then(() => {
                dispatch(createAlert('Account successfully created', INFO, 3));
                setTimeout(() => {
                    window.location = '/';
                }, 1500);
            })
            .catch(err => {
                if (err.name === 'AxiosError') {
                    dispatch(createAlert(err.response.data.error, ERROR, 3));
                } else {
                    dispatch(createAlert(err.message, ERROR, 3));
                }
            });
    };
};

export const refreshToken = () => {
    return dispatch => {
        return UserService.refreshToken()
            .then(data => {
                dispatch(setToken(data.token));
                AuthenticationService.setToken(data.token ?? null);
            })
            .catch(err => {
                dispatch(resetUser());
                AuthenticationService.setToken(null);
                if (err.name === 'AxiosError') {
                    dispatch(createAlert(err.response.data.error, ERROR, 3));
                } else {
                    dispatch(createAlert(err.message, ERROR, 3));
                }
            });
    };
};

export const logout = () => {
    return dispatch => {
        return UserService.logout()
            .then(() => {})
            .catch(err => {
                if (err.name === 'AxiosError') {
                    dispatch(createAlert(err.response.data.error, ERROR, 3));
                } else {
                    dispatch(createAlert(err.message, ERROR, 3));
                }
            })
            .finally(() => {
                dispatch(resetUser());
                dispatch(resetMainMenu());
                AuthenticationService.setToken(null);
            });
    };
};

export default userSlice.reducer;
