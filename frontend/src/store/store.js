import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer';
import alertReducer from '../reducers/alertReducer';
import mainMenuReducer from '../reducers/mainMenuReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        alert: alertReducer,
        mainMenu: mainMenuReducer,
    },
});

export default store;
