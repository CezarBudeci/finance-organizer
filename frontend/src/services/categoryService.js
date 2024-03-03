import axios from 'axios';
import AuthenticationService from './authenticationService';

const categoriesPath = '/api/categories';

const getCategories = () => {
    return axios
        .get(`${categoriesPath}`, {
            headers: {
                Authorization: AuthenticationService.getToken(),
            },
        })
        .then(res => res.data);
};

const CategoryService = {
    getCategories,
};

export default CategoryService;
