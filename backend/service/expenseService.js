import Expense from '../model/expense.js';
import Profile from '../model/profile.js';
import {
    throwInvalidArgumentError,
    throwNotFoundError,
} from '../util/errorUtil.js';
import ProfileService from './profileService.js';

const errorMessage = 'Invalid expense data';

const addExpense = (amount, category, description, date, profileId, user) => {
    if (!amount || !category || !date || !profileId || !user) {
        throwInvalidArgumentError(errorMessage);
    }

    amount = Number(amount);

    return ProfileService.getProfile(profileId, undefined, user)
        .populate('expenses')
        .then(existingProfile => {
            const expense = new Expense({
                amount,
                category,
                description,
                date,
                profile: existingProfile,
            });

            return expense
                .save()
                .then(storedExpense => {
                    if (storedExpense.amount < 0) {
                        storedExpense.amount = storedExpense.amount * -1;
                        existingProfile.balance =
                            existingProfile.balance - storedExpense.amount;
                    } else {
                        existingProfile.balance =
                            existingProfile.balance + storedExpense.amount;
                    }
                    if (!existingProfile.expenses) {
                        existingProfile.expenses = [];
                    }

                    existingProfile.expenses.push(storedExpense);

                    return existingProfile.save();
                })
                .then(updatedProfile => {
                    return ProfileService.getProfile(
                        updatedProfile._id,
                        undefined,
                        user
                    )
                        .populate('user', { email: 1 })
                        .populate('expenses', {
                            amount: 1,
                            description: 1,
                            category: 1,
                            date: 1,
                        });
                })
                .then(populatedProfile => populatedProfile);
        });
};

const getExpense = id => {
    if (!id) {
        throwInvalidArgumentError(errorMessage);
    }

    return Expense.findById(id);
};

const editExpense = (
    id,
    amount,
    category,
    description,
    date,
    profileId,
    user
) => {
    if (!id || !amount || !category || !date || !profileId || !user) {
        throwInvalidArgumentError(errorMessage);
    }

    amount = Number(amount);

    return ProfileService.getProfile(profileId, undefined, user)
        .populate('expenses', { _id: 1, amount: 1 })
        .then(result => {
            if (!result) {
                throwNotFoundError('Profile not found');
            }

            const profileExpense = result.expenses.find(profileExpense => {
                return profileExpense._id.toString() === id;
            });

            if (profileExpense.amount < 0) {
                profileExpense.amount = profileExpense.amount * -1;
                result.balance = result.balance + profileExpense.amount;
            } else {
                result.balance = result.balance - profileExpense.amount;
            }

            result.expenses = result.expenses.filter(item => item._id !== id);

            const newExpense = {
                amount,
                category,
                description,
                date,
            };

            return Expense.findByIdAndUpdate(id, newExpense, {
                new: true,
            })
                .then(updatedExpense => {
                    if (updatedExpense.amount < 0) {
                        updatedExpense.amount = updatedExpense.amount * -1;
                        result.balance = result.balance - updatedExpense.amount;
                    } else {
                        result.balance = result.balance + updatedExpense.amount;
                    }

                    return result.save();
                })
                .then(updatedProfile =>
                    ProfileService.getProfile(
                        updatedProfile._id,
                        undefined,
                        user
                    )
                );
        });
};

const deleteExpense = (id, profileId, user) => {
    if (!id || !user) {
        throwInvalidArgumentError(errorMessage);
    }

    return ProfileService.getProfile(profileId, undefined, user).then(
        storedProfile => {
            return getExpense(id).then(storedExpense => {
                if (!storedExpense) {
                    return;
                }
                if (storedExpense.amount < 0) {
                    storedExpense.amount = storedExpense.amount * -1;
                    storedProfile.balance =
                        storedProfile.balance + storedExpense.amount;
                } else {
                    storedProfile.balance =
                        storedProfile.balance - storedExpense.amount;
                }
                return Expense.findByIdAndDelete(id)
                    .then(() => {
                        storedProfile.expenses = storedProfile.expenses.filter(
                            expense => expense._id.toString !== id.toString()
                        );

                        return storedProfile.save();
                    })
                    .then(updatedProfile => {
                        return ProfileService.getProfile(
                            updatedProfile._id,
                            undefined,
                            user
                        );
                    });
            });
        }
    );
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
