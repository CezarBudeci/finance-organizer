import express from 'express';
import { categories } from '../data/categories.js';

const categoryRouter = express.Router();

categoryRouter.get('/', (req, res) => {
    if (!req.user) {
        throwInvalidArgumentError('Invalid user');
    }

    res.json(categories);
    return;
});

export default categoryRouter;
