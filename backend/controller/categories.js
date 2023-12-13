import express from 'express';
import CategoryService from '../service/categoryService.js';

const categoryRouter = express.Router();

categoryRouter.get('/', (req, res) => {
    if (!req.user) {
        throwInvalidArgumentError('Invalid user');
    }

    CategoryService.getCategories()
        .then(result => {
            res.json(result);
            return;
        })
        .catch(err => next(err));
});

categoryRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        throwInvalidArgumentError('Invalid id');
    }

    if (!req.user) {
        throwInvalidArgumentError('Invalid user');
    }

    CategoryService.getCategory(id, req.body.name ?? undefined)
        .then(result => {
            res.json(result);
            return;
        })
        .catch(err => next(err));
});

export default categoryRouter;
