import express from 'express';
import ExpenseService from '../service/expenseService.js';

const expenseRouter = express.Router();

expenseRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        throwInvalidArgumentError('Invalid id');
    }

    if (!req.user) {
        throwInvalidArgumentError('Invalid user');
    }

    ExpenseService.getExpense(id)
        .then(result => {
            res.json(result);
            return;
        })
        .catch(err => next(err));
});

expenseRouter.get('/profiles/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        throwInvalidArgumentError('Invalid id');
    }

    if (!req.user) {
        throwInvalidArgumentError('Invalid user');
    }

    ExpenseService.getExpense(undefined, id)
        .then(result => {
            res.json(result);
            return;
        })
        .catch(err => next(err));
});

export default expenseRouter;
