import { createSlice } from '@reduxjs/toolkit';
import CategoryService from '../services/categoryService';
import AuthenticationService from '../services/authenticationService';
import { resetUser } from './userReducer';
import { createAlert } from './alertReducer';
import { ERROR } from '../utils/constants';

const initialState = [];

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories(_, action) {
            return action.payload;
        },
        resetCategories() {
            return initialState;
        },
    },
});

export const { setCategories, resetCategories } = categoriesSlice.actions;

export const initializeCategories = () => {
    return dispatch => {
        return CategoryService.getCategories()
            .then(data => {
                dispatch(setCategories(data));
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 401) {
                        dispatch(resetUser());
                        AuthenticationService.setToken(null);
                    }
                }

                if (err.name === 'AxiosError') {
                    dispatch(createAlert(err.response.data.error, ERROR, 3));
                } else {
                    dispatch(createAlert(err.message, ERROR, 3));
                }
            });
    };
};

export default categoriesSlice.reducer;
