import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    message: '',
    type: '',
    id: '',
};

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setAlert(_, action) {
            return action.payload;
        },
        resetAlert() {
            return initialState;
        },
    },
});

export const { setAlert, resetAlert } = alertSlice.actions;

export const createAlert = (message, type, time) => {
    return (dispatch, getState) => {
        return new Promise(() => {
            const timeInMillis = time * 1000;
            const existingAlert = getState().alert;

            if (existingAlert.id) {
                clearTimeout(existingAlert.id);
            }

            const timeoutId = setTimeout(() => {
                dispatch(resetAlert());
            }, timeInMillis);

            dispatch(setAlert({ message, type, id: timeoutId }));
        });
    };
};

export default alertSlice.reducer;
