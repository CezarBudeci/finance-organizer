import Profile from '../model/profile.js';
import { throwInvalidArgumentError } from '../util/errorUtil.js';
import CurrencyService from './currencyService.js';
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
        !profile.user._id
    ) {
        throwInvalidArgumentError(errorMessage);
    }

    const existingCurrency = CurrencyService.getCurrency(profile.currency);
    if (!existingCurrency) {
        throwInvalidArgumentError('Invalid currency');
    }
    profile.currency = existingCurrency.code;
    profile.expenses = [];
    profile.balance = 0;

    const newProfile = new Profile(profile);
    return newProfile.save().then(result => result);
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

    return Profile.findOne(options)
        .populate('user', { email: 1 })
        .populate('expenses', {
            amount: 1,
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
        .populate('user', { email: 1 })
        .populate('expenses', {
            amount: 1,
            category: 1,
            description: 1,
            date: 1,
        });
};

const editProfile = (id, name, description, currency, user) => {
    if (!id && !user) {
        throwInvalidArgumentError(errorMessage);
    }

    if (!name && !currency) {
        throwInvalidArgumentError(errorMessage);
    }

    return getProfile(id, undefined, user)
        .then(result => {
            if (name) {
                result.name = name;
            }

            if (description) {
                result.description = description;
            }

            if (currency) {
                result.currency = currency;
            }

            return result.save();
        })
        .then(() => getProfile(id, undefined, user));
};

const deleteProfile = (id, user) => {
    if (!id || !user) {
        throwInvalidArgumentError(errorMessage);
    }

    let options = {};

    if (id) {
        options._id = id;
    }

    if (user) {
        options.user = user;
    }

    let expensesIds = [];

    return Profile.findOne(options)
        .then(result => {
            if (result) {
                result.expenses.forEach(expense =>
                    expensesIds.push(expense._id)
                );
            }

            return ExpenseService.deleteExpenses(expensesIds);
        })
        .then(() => {
            return Profile.findByIdAndDelete(id);
        });
};

const ProfileService = {
    addProfile,
    getProfile,
    getProfiles,
    editProfile,
    deleteProfile,
};

export default ProfileService;
