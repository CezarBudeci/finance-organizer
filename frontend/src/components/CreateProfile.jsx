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

        if (name && description && currencyCode) {
            dispatch(addProfile({ name, description, currency: currencyCode }));
        }

        toggleModal();
    };

    useEffect(() => {
        if (isOpen) {
            if (!currencies || currencies.length === 0) {
                dispatch(initializeCurrencies());
            }
        }
    }, [isOpen]);

    return (
        <div>
            <Modal open={isOpen} onClose={toggleModal}>
                <Box sx={style}>
                    <Typography variant="h4" component="h3">
                        New profile
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h4">Login</Typography>
                        <div>
                            <div>
                                <TextField
                                    label="Name"
                                    variant="standard"
                                    color="secondary"
                                    name="name"
                                    type="name"
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Description"
                                    variant="standard"
                                    color="secondary"
                                    type="description"
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
                                            label="Currency"
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
                                    <Button onClick={toggleModal}>close</Button>
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

export default CreateProfile;
