import { IconButton, Typography } from '@mui/material';
import Expense from './Expense';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Expenses = ({ expenses }) => {
    return (
        <div>
            <Typography>Expenses</Typography>
            <IconButton aria-label="Add expense" onClick={toggleModal}>
                <AddCircleOutlineIcon />
            </IconButton>
            <div>
                {expenses &&
                    expenses.map(expense => (
                        <Expense key={expense.id} expense={expense} />
                    ))}
            </div>
        </div>
    );
};

export default Expenses;
