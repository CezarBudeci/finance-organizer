import Profile from '../model/profile.js';
import { throwInvalidArgumentError } from '../util/errorUtil.js';
import CurrencyService from './currencyService.js';
import UserService from './userService.js';
import BalanceService from './balanceService.js';
import ExpenseService from './expenseService.js';

const errorMessage = 'Invalid profile data';

const addProfile = profile => {
    if (!profile) {
        throwInvalidArgumentError(errorMessage);
    }

    if (
        !profile.name ||
        !profile.currency ||
        !profile.user ||
        !profile.user.id
    ) {
        throwInvalidArgumentError(errorMessage);
    }

    const existingCurrency = CurrencyService.getCurrency(profile.currency);
    if (!existingCurrency) {
        throwInvalidArgumentError('Invalid currency');
    }
    profile.currency = existingCurrency.code;
    profile.expenses = [];

    return BalanceService.addBalance(0).then(result => {
        profile.balance = result;
        const newProfile = new Profile(profile);
        return newProfile.save();
    });
};

const getProfile = (id, name, user) => {
    if (!id && !name) {
        throwInvalidArgumentError(errorMessage);
    }

    if (!user) {
        throwInvalidArgumentError(errorMessage);
    }

    let options = {
        user,
    };

    if (id) {
        options._id = id;
    }

    if (name) {
        options.name = name;
    }

    return Profile.find(options)
        .populate('user', { email: e })
        .populate('balance', { amount: 1 })
        .populate('expenses', {
            amount: 1,
            type: 1,
            category: 1,
            description: 1,
            date: 1,
        });
};

const getProfiles = user => {
    if (!user || !user._id) {
        throwInvalidArgumentError(errorMessage);
    }

    return Profile.find({ user: { _id: user._id } })
        .populate('user', { email: e })
        .populate('balance', { amount: 1 })
        .populate('expenses', {
            amount: 1,
            type: 1,
            category: 1,
            description: 1,
            date: 1,
        });
};

const editProfile = (id, name, description, currency, expense, user) => {
    if (!id) {
        throwInvalidArgumentError(errorMessage);
    }

    if (!name && !description && !currency && !expense) {
        throwInvalidArgumentError(errorMessage);
    }
    // TODO: add check for user
    return Profile.findById(id).then(result => {
        const existingProfile = result;
        if (name) {
            existingProfile.name = name;
        }

        if (description) {
            existingProfile.description = description;
        }

        if (currency) {
            existingProfile.currency = currency;
        }

        if (expense) {
            existingProfile.expenses.push(expense);
        }

        return Profile.findByIdAndUpdate(id, existingProfile, { new: true })
            .populate('user', { email: e })
            .populate('balance', { amount: 1 })
            .populate('expenses', {
                amount: 1,
                type: 1,
                category: 1,
                description: 1,
                date: 1,
            });
    });
};

const addExpense = (id, expense) => {
    if (!id) {
        throwInvalidArgumentError(errorMessage);
    }

    if (!expense) {
        throwInvalidArgumentError(errorMessage);
    }

    return editProfile(id, _, _, _, expense);
};

const deleteProfile = id => {
    if (!id) {
        throwInvalidArgumentError(errorMessage);
    }

    let expensesIds = [];
    let balanceId;

    return Profile.findById(id)
        .then(result => {
            if (result) {
                result.expenses.forEach(expense =>
                    expensesIds.push(expense._id)
                );
                balanceId = result.balance._id;
            }

            return ExpenseService.deleteExpenses(expensesIds);
        })
        .then(_ => {
            if (balanceId) {
                return BalanceService.deleteBalance(balanceId);
            }
        });
};

const ProfileService = {
    addProfile,
    getProfile,
    getProfiles,
    editProfile,
    addExpense,
    deleteProfile,
};

export default ProfileService;
