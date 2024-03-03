import express from 'express';
import ExpenseService from '../service/expenseService.js';
import { throwInvalidArgumentError } from '../util/errorUtil.js';

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

expenseRouter.post('/profiles/:id', (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        throwInvalidArgumentError('Invalid id');
    }

    if (!req.user) {
        throwInvalidArgumentError('Invalid user');
    }

    const expense = req.body;
    if (!expense || !expense.amount || !expense.category || !expense.date) {
        throwInvalidArgumentError('Invalid expense data');
    }

    ExpenseService.addExpense(
        expense.amount,
        expense.category,
        expense.description,
        expense.date,
        id,
        req.user
    )
        .then(result => {
            res.json(result);
            return;
        })
        .catch(err => {
            next(err);
        });
});

expenseRouter.put('/:id/profiles/:profileId', (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        throwInvalidArgumentError('Invalid id');
    }

    const profileId = req.params.profileId;
    if (!profileId) {
        throwInvalidArgumentError('Invalid profile id');
    }

    if (!req.user) {
        throwInvalidArgumentError('Invalid user');
    }

    const expense = req.body;
    if (
        !expense ||
        !expense.amount ||
        !expense.category ||
        !expense.date ||
        !profileId
    ) {
        throwInvalidArgumentError('Invalid data');
    }

    ExpenseService.editExpense(
        id,
        expense.amount,
        expense.category,
        expense.description,
        expense.date,
        profileId,
        req.user
    )
        .then(result => {
            res.json(result);
            return;
        })
        .catch(err => next(err));
});

expenseRouter.delete('/:id/profiles/:profileId', (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        throwInvalidArgumentError('Invalid id');
    }

    const profileId = req.params.profileId;
    if (!profileId) {
        throwInvalidArgumentError('Invalid profile id');
    }

    if (!req.user) {
        throwInvalidArgumentError('Invalid user');
    }

    ExpenseService.deleteExpense(id, profileId, req.user)
        .then(result => {
            res.json(result);
            return;
        })
        .catch(err => {
            next(err);
        });
});

export default expenseRouter;
