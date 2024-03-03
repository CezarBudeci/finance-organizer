import { IconButton, Tooltip, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { removeExpense } from '../reducers/profilesReducer';
import { toggleEditExpenseModalIsOpen } from '../reducers/modalsReducer';
import UpdateExpense from './UpdateExpense';

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
        <div>
            <Typography>{expense.amount}</Typography>
            <Typography>{expense.category}</Typography>
            <Typography>{expense.description}</Typography>
            <Typography>{formatDate(expense.date)}</Typography>
            <Tooltip title="Edit expense">
                <IconButton aria-label="Edit expense" onClick={handleEdit}>
                    <EditOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete expense">
                <IconButton aria-label="Delete expense" onClick={handleDelete}>
                    <DeleteOutlineOutlinedIcon />
                </IconButton>
            </Tooltip>
            <UpdateExpense
                profileId={profileId}
                isOpen={editExpenseModalIsOpen}
                toggleModal={toggleEditModal}
                expense={expense}
            />
        </div>
    );
};

export default Expense;
