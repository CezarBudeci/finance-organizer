import { createAlert } from '../reducers/alertReducer';
import { ERROR } from './constants';

export const validateTextInput = (dispatch, value) => {
    value.trim();

    if (value) {
        return value;
    } else {
        dispatch(createAlert('Check your inputs', ERROR, 3));
        return null;
    }
};
