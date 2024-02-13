import { createSlice } from '@reduxjs/toolkit';
import CurrencyService from '../services/currencyService';
import AuthenticationService from '../services/authenticationService';
import { resetUser } from './userReducer';
import { createAlert } from './alertReducer';
import { ERROR } from '../utils/constants';

const initialState = [];

const currenciesSlice = createSlice({
    name: 'currencies',
    initialState,
    reducers: {
        setCurrencies(_, action) {
            return action.payload;
        },
        resetCurrencies() {
            return initialState;
        },
    },
});

export const { setCurrencies, resetCurrencies } = currenciesSlice.actions;

export const initializeCurrencies = () => {
    return dispatch => {
        return CurrencyService.getCurrencies()
            .then(data => {
                Object.values(data).map(value => {
                    value.label = value.name;
                    delete value.name;
                });

                dispatch(setCurrencies(Object.values(data)));
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 401) {
                        dispatch(resetUser());
                        AuthenticationService.setToken(null);
                    }
                }

                if (err.name === 'AxiosError') {
                    dispatch(createAlert(err.response.data.error, ERROR, 3));
                } else {
                    dispatch(createAlert(err.message, ERROR, 3));
                }
            });
    };
};

export const getCurrency = key => {
    return dispatch => {
        return CurrencyService.getCurrency(key)
            .then(data => {
                console.log(data);
                data.label = data.name;
                delete data.name;

                dispatch(setCurrencies([data]));
            })
            .catch(err => {
                console.log(err);
                if (err.response) {
                    if (err.response.status === 401) {
                        dispatch(resetUser());
                        AuthenticationService.setToken(null);
                    }
                }

                if (err.name === 'AxiosError') {
                    dispatch(createAlert(err.response.data.error, ERROR, 3));
                } else {
                    dispatch(createAlert(err.message, ERROR, 3));
                }
            });
    };
};

export default currenciesSlice.reducer;
