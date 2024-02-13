import { Typography } from '@mui/material';

const Expense = ({ expense }) => {
    return (
        <div>
            <Typography>
                {expense.type === 'INCOME' ? '+' : '-'}
                {expense.amount}
            </Typography>
            <Typography>{expense.category}</Typography>
            <Typography>{expense.description}</Typography>
            <Typography>{expense.date}</Typography>
        </div>
    );
};

export default Expense;
