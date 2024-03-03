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
import { editExpense } from '../reducers/profilesReducer';
import { validateNumberInput } from '../utils/inputUtils';
import { createAlert } from '../reducers/alertReducer';
import { ERROR, modalStyle } from '../utils/constants';

const UpdateExpense = ({ profileId, isOpen, toggleModal, expense }) => {
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

        const date = new Date(e.target.date.value).toISOString();
        if (amount && category && date) {
            if (
                expense.amount === amount &&
                expense.category === category &&
                expense.date === date &&
                expense.description === description
            ) {
                dispatch(
                    createAlert(
                        'Expense data must be different than current',
                        ERROR,
                        3
                    )
                );
            } else {
                const newExpense = {
                    id: expense.id,
                    amount,
                    category,
                    date,
                    description: description ? description : null,
                };

                dispatch(editExpense(profileId, newExpense));
                toggleModal();
            }
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
                <Box sx={modalStyle}>
                    <div className="modal-content-wrapper">
                        <Typography variant="h4" component="h3">
                            Edit expense
                        </Typography>
                        <form
                            className="modal-form-content-wrapper"
                            onSubmit={handleSubmit}>
                            <div>
                                <div className="modal-form-input-wrapper">
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
                                <div className="modal-form-input-wrapper">
                                    <TextField
                                        label="Description"
                                        variant="standard"
                                        color="secondary"
                                        type="description"
                                        name="description"
                                    />
                                </div>
                                <div className="modal-form-datepicker-wrapper">
                                    <DatePicker
                                        name="date"
                                        label="Date *"
                                        defaultValue={dayjs(new Date())}
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

export default UpdateExpense;
