import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer';
import alertReducer from '../reducers/alertReducer';
import mainMenuReducer from '../reducers/mainMenuReducer';
import profileReducer from '../reducers/profilesReducer';
import currenciesReducer from '../reducers/currenciesReducer';
import modals from '../reducers/modalsReducer';
import categoriesReducer from '../reducers/categoriesReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        alert: alertReducer,
        mainMenu: mainMenuReducer,
        profiles: profileReducer,
        modals: modals,
        currencies: currenciesReducer,
        categories: categoriesReducer,
    },
});

export default store;
