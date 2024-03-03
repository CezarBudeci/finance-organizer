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
import { editProfile } from '../reducers/profilesReducer';
import { createAlert } from '../reducers/alertReducer';
import { ERROR } from '../utils/constants';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const UpdateProfile = ({ isOpen, toggleModal, profile }) => {
    const dispatch = useDispatch();
    const currencies = useSelector(state => state.currencies);

    const handleSubmit = e => {
        e.preventDefault();

        const name = validateTextInput(dispatch, e.target.name.value);

        let description = null;

        if (e.target.description.value) {
            description = e.target.description.value.trim();
        }

        const currency = validateTextInput(dispatch, e.target.currency.value);

        const currencyObjects = Object.values(currencies).filter(
            value => value.label === currency
        );
        const currencyCode =
            currencyObjects.length > 0 ? currencyObjects[0].code : undefined;

        if (name && currencyCode) {
            if (
                profile.name === name &&
                profile.description === description &&
                profile.currency.code === currencyCode
            ) {
                dispatch(
                    createAlert(
                        'Profile data must be different than current',
                        ERROR,
                        3
                    )
                );
            } else {
                let updatedProfile = {
                    id: profile.id,
                    name,
                    description,
                    currency: currencyCode,
                };

                dispatch(editProfile(updatedProfile));
                toggleModal();
            }
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
                <Box sx={style}>
                    <Typography variant="h4" component="h3">
                        Edit profile
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div>
                                <TextField
                                    label="Name"
                                    variant="standard"
                                    color="secondary"
                                    name="name"
                                    type="text"
                                    required
                                />
                            </div>
                            <div>
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
                            <div>
                                <div>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={toggleModal}>
                                        close
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        type="submit">
                                        save
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default UpdateProfile;
