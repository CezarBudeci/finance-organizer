import { currencies } from '../data/currencies.js';

const getCurrencies = () => {
    return currencies;
};

const getCurrency = key => {
    return currencies[key];
};

const CurrencyService = { getCurrencies, getCurrency };

export default CurrencyService;
