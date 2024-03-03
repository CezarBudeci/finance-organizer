import { createAlert } from '../reducers/alertReducer';
import { ERROR } from './constants';

export const validateTextInput = (dispatch, value) => {
    if (value) {
        value = value.trim();
        return value;
    } else {
        dispatch(createAlert('Check your inputs', ERROR, 3));
        return null;
    }
};

export const validateNumberInput = (dispatch, value) => {
    if (value) {
        value = value.trim();
        value = Number(value);

        if (value === 0) {
            dispatch(createAlert('Amount must be different than 0', ERROR, 3));
            return undefined;
        }

        return value;
    } else {
        dispatch(createAlert('Check your inputs', ERROR, 3));
        return undefined;
    }
};
