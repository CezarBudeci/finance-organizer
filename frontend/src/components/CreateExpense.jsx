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
import { initializeCategories } from '../reducers/categoriesReducer';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { addExpense } from '../reducers/profilesReducer';
import { validateNumberInput } from '../utils/inputUtils';
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

const CreateExpense = ({ profileId, isOpen, toggleModal }) => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories);

    const handleSubmit = e => {
        e.preventDefault();

        const amount = validateNumberInput(dispatch, e.target.amount.value);

        const category = e.target.category.value;

        let description = null;

        if (e.target.description.value) {
            description = e.target.description.value.trim();
        }

        const date = e.target.date.value;

        if (amount && category && date) {
            const newExpense = {
                amount,
                category,
                date,
                description: description ? description : null,
            };

            dispatch(addExpense(profileId, newExpense));
            toggleModal();
        } else {
            dispatch(createAlert('Check your inputs', ERROR, 3));
        }
    };

    useEffect(() => {
        if (isOpen) {
            if (!categories || categories.length === 0) {
                dispatch(initializeCategories());
            }
        }
    }, [isOpen]);

    return (
        <div>
            <Modal open={isOpen} onClose={toggleModal}>
                <Box sx={style}>
                    <Typography variant="h4" component="h3">
                        New expense
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div>
                                <TextField
                                    label="Amount"
                                    variant="standard"
                                    color="secondary"
                                    name="amount"
                                    type="number"
                                    required
                                />
                            </div>
                            <div>
                                <Autocomplete
                                    disablePortal
                                    options={categories}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            label="Category *"
                                            variant="standard"
                                            name="category"
                                        />
                                    )}
                                    getOptionLabel={option => option}
                                    renderOption={(props, option) => (
                                        <Typography
                                            variant="standard"
                                            {...props}>
                                            {option}
                                        </Typography>
                                    )}
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
                                <DatePicker
                                    name="date"
                                    label="Date *"
                                    defaultValue={dayjs(new Date())}
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

export default CreateExpense;
