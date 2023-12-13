import Expense from '../model/expense.js';
import BalanceService from './balanceService.js';
import CategoryService from './categoryService.js';
import ProfileService from './profileService.js';

const errorMessage = 'Invalid expense data';

const types = {
    income: 'income',
    expense: 'expense',
};

const addExpense = (amount, category, description, date, profileId) => {
    if (!id || !amount || !category || !date || !profileId) {
        throwInvalidArgumentError(errorMessage);
    }

    if (!category.name && !category.id) {
        throwInvalidArgumentError(errorMessage);
    }

    amount = Number(amount);

    let type = types.income;
    if (amount < 0) {
        amount *= -1;
        type = types.expense;
    }

    return ProfileService.getProfile(profileId).then(existingProfile => {
        return CategoryService.getCategory(category.id, category.name).then(
            result => {
                const expense = new Expense({
                    amount,
                    type,
                    category: result,
                    description,
                    date,
                    profile: existingProfile,
                });

                return expense.save().then(storedExpense => {
                    existingProfile.expenses.push(storedExpense);
                    return existingProfile
                        .save()
                        .then(storedProfile => {
                            return BalanceService.getBalance(storedProfile._id);
                        })
                        .then(() => storedExpense);
                });
            }
        );
    });
};

const getExpense = id => {
    if (!id) {
        throwInvalidArgumentError(errorMessage);
    }

    return Expense.findById(id);
};

const editExpense = (id, amount, category, description, date) => {
    if (!id || !amount || !category || !date) {
        throwInvalidArgumentError(errorMessage);
    }

    if (!category.name && !category.id) {
        throwInvalidArgumentError(errorMessage);
    }

    amount = Number(amount);

    let type = types.income;
    if (amount < 0) {
        amount *= -1;
        type = types.expense;
    }

    return Expense.findById(id).then(result => {
        const existingExpense = result;
        if (amount) {
            existingExpense.amount = amount;
        }

        if (type) {
            existingExpense.type = type;
        }

        if (category) {
            existingExpense.category = category;
        }

        if (description) {
            existingExpense.description = description;
        }

        return Expense.findByIdAndUpdate(existingExpense._id, existingExpense, {
            new: true,
        });
    });
};

const deleteExpense = id => {
    if (!id) {
        throwInvalidArgumentError(errorMessage);
    }

    return Expense.findByIdAndDelete(id);
};

const deleteExpenses = ids => {
    if (!ids) {
        throwInvalidArgumentError(errorMessage);
    }

    return Expense.deleteMany({ _id: { $in: ids } });
};

const ExpenseService = {
    addExpense,
    getExpense,
    editExpense,
    deleteExpense,
    deleteExpenses,
};

export default ExpenseService;
