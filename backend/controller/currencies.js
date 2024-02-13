import express from 'express';
import CurrencyService from '../service/currencyService.js';
import { throwInvalidArgumentError } from '../util/errorUtil.js';

const currenciesRouter = express.Router();

currenciesRouter.get('/', (req, res) => {
    if (!req.user) {
        throwInvalidArgumentError('Invalid user');
    }

    res.json(CurrencyService.getCurrencies());
    return;
});

currenciesRouter.get('/:key', (req, res) => {
    const key = req.params.key;

    if (!req.user) {
        throwInvalidArgumentError('Invalid user');
    }

    if (!key) {
        throwInvalidArgumentError('Invalid key');
    }

    res.json(CurrencyService.getCurrency(key));
    return;
});

export default currenciesRouter;
