import { IconButton, Tooltip, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { removeExpense } from '../reducers/profilesReducer';
import { toggleEditExpenseModalIsOpen } from '../reducers/modalsReducer';
import UpdateExpense from './UpdateExpense';
import { getBalanceColor, getBorderColor } from '../utils/styleUtils';

const Expense = ({ profileId, expense }) => {
    const dispatch = useDispatch();
    const editExpenseModalIsOpen = useSelector(
        state => state.modals.editExpenseModalIsOpen
    );

    const toggleEditModal = () => {
        dispatch(toggleEditExpenseModalIsOpen());
    };

    const handleEdit = () => {
        toggleEditModal();
    };

    const handleDelete = () => {
        dispatch(removeExpense(profileId, expense.id));
    };
    const formatDate = date => {
        return new Date(date).toLocaleDateString(navigator.language);
    };
    return (
        <div className="expense-wrapper">
            <div
                className="expense-components-wrapper"
                style={getBorderColor(expense.amount)}>
                <div className="expense-components-title">
                    <Typography
                        style={getBalanceColor(expense.amount)}
                        variant="h6">
                        {expense.amount}
                    </Typography>
                </div>
                <div className="expense-component-content-wrapper">
                    <div className="expense-component-nested-content-wrapper">
                        <Typography>Category: {expense.category}</Typography>
                        <Typography>
                            Date: {formatDate(expense.date)}
                        </Typography>
                    </div>
                    <div>
                        <Typography>
                            Description: {expense.description}
                        </Typography>
                    </div>
                </div>
                <div>
                    <Tooltip title="Edit expense">
                        <IconButton
                            aria-label="Edit expense"
                            onClick={handleEdit}>
                            <EditOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete expense">
                        <IconButton
                            aria-label="Delete expense"
                            onClick={handleDelete}>
                            <DeleteOutlineOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                <UpdateExpense
                    profileId={profileId}
                    isOpen={editExpenseModalIsOpen}
                    toggleModal={toggleEditModal}
                    expense={expense}
                />
            </div>
        </div>
    );
};

export default Expense;
