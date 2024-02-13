import axios from 'axios';
import AuthenticationService from './authenticationService';

const currenciesPath = '/api/currencies';

const getCurrencies = () => {
    return axios
        .get(`${currenciesPath}`, {
            headers: {
                Authorization: AuthenticationService.getToken(),
            },
        })
        .then(res => res.data);
};

const getCurrency = key => {
    return axios
        .get(`${currenciesPath}/${key}`, {
            headers: {
                Authorization: AuthenticationService.getToken(),
            },
        })
        .then(res => res.data);
};

const CurrencyService = {
    getCurrencies,
    getCurrency,
};

export default CurrencyService;
