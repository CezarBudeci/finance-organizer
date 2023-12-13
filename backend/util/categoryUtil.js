import { categories } from '../data/categories.js';
import CategoryService from '../service/categoryService.js';
import {
    throwInternalServerError,
    throwInvalidArgumentError,
} from './errorUtil.js';

export const initializeCategories = () => {
    if (!categories || !categories.length) {
        throwInvalidArgumentError('Invalid categories');
    }

    return CategoryService.deleteAllCategories()
        .then(_ => {
            const categoriesObjects = categories.map(category => {
                return {
                    name: category,
                };
            });
            CategoryService.addCategories(categoriesObjects);
        })
        .then(() => {})
        .catch(err => throwInternalServerError(err.message));
};
