import {
    Autocomplete,
    Box,
    Button,
    Modal,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeCurrencies } from '../reducers/currenciesReducer';
import { validateTextInput } from '../utils/inputUtils';
import { addProfile } from '../reducers/profilesReducer';
import { createAlert } from '../reducers/alertReducer';
import { ERROR, modalStyle } from '../utils/constants';

const CreateProfile = ({ isOpen, toggleModal }) => {
    const dispatch = useDispatch();
    const currencies = useSelector(state => state.currencies);

    const handleSubmit = e => {
        e.preventDefault();

        const name = validateTextInput(dispatch, e.target.name.value);
        const description = validateTextInput(
            dispatch,
            e.target.description.value
        );
        const currency = validateTextInput(dispatch, e.target.currency.value);

        const currencyObjects = Object.values(currencies).filter(
            value => value.label === currency
        );
        const currencyCode =
            currencyObjects.length > 0 ? currencyObjects[0].code : undefined;

        if (name && currencyCode) {
            dispatch(addProfile({ name, description, currency: currencyCode }));
            toggleModal();
        } else {
            dispatch(createAlert('Check your inputs', ERROR, 3));
        }
    };

    useEffect(() => {
        if (isOpen) {
            dispatch(initializeCurrencies());
        }
    }, [isOpen]);

    return (
        <div>
            <Modal open={isOpen} onClose={toggleModal}>
                <Box sx={modalStyle}>
                    <div className="modal-content-wrapper">
                        <Typography variant="h4" component="h3">
                            New profile
                        </Typography>
                        <form
                            className="modal-form-content-wrapper"
                            onSubmit={handleSubmit}>
                            <div>
                                <div className="modal-form-input-wrapper">
                                    <TextField
                                        label="Name"
                                        variant="standard"
                                        color="secondary"
                                        name="name"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="modal-form-input-wrapper">
                                    <TextField
                                        label="Description"
                                        variant="standard"
                                        color="secondary"
                                        type="text"
                                        name="description"
                                    />
                                </div>
                                <div>
                                    <Autocomplete
                                        disablePortal
                                        options={currencies}
                                        renderInput={params => (
                                            <TextField
                                                {...params}
                                                label="Currency *"
                                                variant="standard"
                                                name="currency"
                                            />
                                        )}
                                        renderOption={(props, option) => (
                                            <Typography {...props}>
                                                {option.symbol} ({option.label})
                                            </Typography>
                                        )}
                                    />
                                </div>
                                <div className="modal-form-buttons-wrapper">
                                    <div>
                                        <Button
                                            className="cancel-button"
                                            variant="outlined"
                                            color="primary"
                                            onClick={toggleModal}>
                                            close
                                        </Button>
                                    </div>
                                    <div>
                                        <Button
                                            className="general-button"
                                            variant="outlined"
                                            color="primary"
                                            type="submit">
                                            save
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default CreateProfile;
