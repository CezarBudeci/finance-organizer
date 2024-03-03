import { IconButton, Tooltip, Typography } from '@mui/material';
import Expense from './Expense';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from 'react-redux';
import { toggleAddExpenseModalIsOpen } from '../reducers/modalsReducer';

const Expenses = ({ profileId, expenses }) => {
    const dispatch = useDispatch();

    const toggleModal = () => {
        dispatch(toggleAddExpenseModalIsOpen());
    };

    return (
        <div className="expenses-wrapper">
            <div className="expenses-header">
                <Typography variant="h5">Expenses</Typography>
                <Tooltip title="Add Expense">
                    <IconButton aria-label="Add expense" onClick={toggleModal}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Tooltip>
            </div>
            <div className="expenses-list-wrapper">
                {expenses &&
                    expenses.map(expense => (
                        <Expense
                            key={expense.id}
                            profileId={profileId}
                            expense={expense}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Expenses;
