import Balance from '../model/balance.js';
import { throwInvalidArgumentError } from '../util/errorUtil.js';
import ProfileService from './profileService.js';

const errorMessage = 'Invalid balance data';

const addBalance = (amount, profileId) => {
    if (!amount && !profileId) {
        throwInvalidArgumentError(errorMessage);
    }

    return ProfileService.getProfile(profileId).then(result => {
        const newBalance = new Balance({ amount, profile: result });
        return newBalance.save();
    });
};

const editBalance = (id, amount) => {
    if (!id || !amount) {
        throwInvalidArgumentError(errorMessage);
    }

    const balance = {
        amount,
    };

    return Balance.findByIdAndUpdate(id, balance, { new: true });
};

const getBalance = (id, profileId) => {
    if (id) {
        return Balance.findById(id);
    }

    if (profileId) {
        return Balance.find({ profile: { _id: profileId } });
    }

    throwInvalidArgumentError(errorMessage);
};

const deleteBalance = id => {
    if (!id) {
        throwInvalidArgumentError(errorMessage);
    }

    return Balance.findByIdAndDelete(id);
};

const BalanceService = { addBalance, editBalance, getBalance, deleteBalance };

export default BalanceService;
