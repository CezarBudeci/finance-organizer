import express from 'express';
import BalanceService from '../service/balanceService.js';

const balanceRouter = express.Router();

balanceRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        throwInvalidArgumentError('Invalid id');
    }

    if (!req.user) {
        throwInvalidArgumentError('Invalid user');
    }

    BalanceService.getBalance(id)
        .then(result => {
            res.json(result);
            return;
        })
        .catch(err => next(err));
});

balanceRouter.get('/profiles/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        throwInvalidArgumentError('Invalid id');
    }

    if (!req.user) {
        throwInvalidArgumentError('Invalid user');
    }

    BalanceService.getBalance(undefined, id)
        .then(result => {
            res.json(result);
            return;
        })
        .catch(err => next(err));
});

balanceRouter.post('/profiles/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        throwInvalidArgumentError('Invalid id');
    }

    if (!req.user) {
        throwInvalidArgumentError('Invalid user');
    }

    const body = req.body;
    if (!body || !body.amount) {
        throwInvalidArgumentError('Invalid balance data');
    }

    BalanceService.addBalance(body.amount, id)
        .then(result => {
            res.json(result);
            return;
        })
        .catch(err => next(err));
});

balanceRouter.put('/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        throwInvalidArgumentError('Invalid id');
    }

    if (!req.user) {
        throwInvalidArgumentError('Invalid user');
    }

    const body = req.body;
    if (!body || !body.amount) {
        throwInvalidArgumentError('Invalid balance data');
    }

    BalanceService.addBalance(id, body.amount)
        .then(result => {
            res.json(result);
            return;
        })
        .catch(err => next(err));
});

export default balanceRouter;
