import { createSlice } from '@reduxjs/toolkit';
import ProfileService from '../services/profileService';
import { ERROR } from '../utils/constants';
import { resetUser } from './userReducer';
import AuthenticationService from '../services/authenticationService';
import { createAlert } from './alertReducer';
import { populateProfileCurrency } from './currenciesReducer';

const initialState = [];

const sortExpenses = expenses => {
    expenses.forEach(
        expense => (expense.date = new Date(expense.date).getTime())
    );
    return expenses.sort((a, b) => {
        if (a.date > b.date) {
            return -1;
        }

        if (a.date < b.date) {
            return 1;
        }

        return 0;
    });
};

const sortProfiles = profiles => {
    profiles.forEach(profile => {
        if (profile.expenses) {
            profile.expenses = sortExpenses(profile.expenses);
        }
    });

    return profiles.sort((a, b) => {
        if (a.balance > b.balance) {
            return -1;
        }

        if (a.balance < b.balance) {
            return 1;
        }

        return 0;
    });
};

const profilesSlice = createSlice({
    name: 'profiles',
    initialState,
    reducers: {
        setProfiles(_, action) {
            let profiles = action.payload;

            return sortProfiles(profiles);
        },
        addProfileAction(state, action) {
            let payload = action.payload;
            let stateCopy = [...state];
            stateCopy.push(payload);
            return sortProfiles(stateCopy);
        },
        updateProfile(state, action) {
            const payload = action.payload;
            const profileToUpdate = state.find(
                profile => profile.id === payload.id
            );

            const updatedProfile = {
                ...profileToUpdate,
                name: payload.name ? payload.name : profileToUpdate.name,
                description: payload.description
                    ? payload.description
                    : profileToUpdate.description,
                expenses: payload.expenses
                    ? payload.expenses
                    : profileToUpdate.expenses,
                balance:
                    payload.balance !== null &&
                    typeof payload.balance === 'number'
                        ? payload.balance
                        : profileToUpdate.balance,
            };

            let updatedState = state.map(profile =>
                profile.id === payload.id ? updatedProfile : profile
            );

            return sortProfiles(updatedState);
        },
        addCurrency(state, action) {
            const payload = action.payload;
            const profileToUpdate = state.find(
                profile => profile.id === payload.id
            );

            const updatedProfile = {
                ...profileToUpdate,
                currency: payload.currency
                    ? payload.currency
                    : profileToUpdate.currency,
            };

            let updatedState = state.map(profile =>
                profile.id === payload.id ? updatedProfile : profile
            );

            return sortProfiles(updatedState);
        },
        deleteProfile(state, action) {
            let stateCopy = [...state];
            const index = stateCopy.findIndex(
                profile => profile.id === action.payload.id
            );
            stateCopy.splice(index, 1);
            return sortProfiles(stateCopy);
        },
        resetProfiles() {
            return initialState;
        },
    },
});

export const {
    setProfiles,
    addProfileAction,
    updateProfile,
    addCurrency,
    deleteProfile,
    resetProfiles,
} = profilesSlice.actions;

export const initializeProfiles = () => {
    return dispatch => {
        return ProfileService.getProfiles()
            .then(data => {
                dispatch(setProfiles(data));
            })
            .catch(err => {
                if (err.name === 'AxiosError') {
                    if (err.response.status !== 404) {
                        dispatch(
                            createAlert(err.response.data.error, ERROR, 3)
                        );
                    }
                } else {
                    dispatch(createAlert(err.message, ERROR, 3));
                }
                if (err.response) {
                    if (err.response.status === 401) {
                        dispatch(resetUser());
                        AuthenticationService.setToken(null);
                    }
                }
            });
    };
};

export const addProfile = profile => {
    return dispatch => {
        return ProfileService.addProfile({ profile })
            .then(data => {
                dispatch(addProfileAction(data));
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 401) {
                        dispatch(resetUser());
                        AuthenticationService.setToken(null);
                    }
                }

                if (err.name === 'AxiosError') {
                    dispatch(createAlert(err.response.data.error, ERROR, 3));
                } else {
                    dispatch(createAlert(err.message, ERROR, 3));
                }
            });
    };
};

export const editProfile = profile => {
    return dispatch => {
        return ProfileService.editProfile(profile)
            .then(data => {
                dispatch(updateProfile(data));
                dispatch(populateProfileCurrency(data.currency, data.id));
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 401) {
                        dispatch(resetUser());
                        AuthenticationService.setToken(null);
                    }
                }

                if (err.name === 'AxiosError') {
                    dispatch(createAlert(err.response.data.error, ERROR, 3));
                } else {
                    dispatch(createAlert(err.message, ERROR, 3));
                }
            });
    };
};

export const addExpense = (profileId, expense) => {
    return dispatch => {
        return ProfileService.addExpense(profileId, expense)
            .then(data => {
                dispatch(updateProfile(data));
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 401) {
                        dispatch(resetUser());
                        AuthenticationService.setToken(null);
                    }
                }

                if (err.name === 'AxiosError') {
                    dispatch(createAlert(err.response.data.error, ERROR, 3));
                } else {
                    dispatch(createAlert(err.message, ERROR, 3));
                }
            });
    };
};

export const editExpense = (profileId, expense) => {
    return dispatch => {
        return ProfileService.editExpense(profileId, expense)
            .then(data => {
                dispatch(updateProfile(data));
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 401) {
                        dispatch(resetUser());
                        AuthenticationService.setToken(null);
                    }
                }

                if (err.name === 'AxiosError') {
                    dispatch(createAlert(err.response.data.error, ERROR, 3));
                } else {
                    dispatch(createAlert(err.message, ERROR, 3));
                }
            });
    };
};

export const removeExpense = (profileId, expenseId) => {
    return dispatch => {
        return ProfileService.deleteExpense(profileId, expenseId)
            .then(res => {
                dispatch(updateProfile(res));
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 401) {
                        dispatch(resetUser());
                        AuthenticationService.setToken(null);
                    }
                }

                if (err.name === 'AxiosError') {
                    dispatch(createAlert(err.response.data.error, ERROR, 3));
                } else {
                    dispatch(createAlert(err.message, ERROR, 3));
                }
            });
    };
};

export const removeProfile = id => {
    return dispatch => {
        return ProfileService.deleteProfile(id)
            .then(() => {
                dispatch(deleteProfile(id));
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 401) {
                        dispatch(resetUser());
                        AuthenticationService.setToken(null);
                    }
                }

                if (err.name === 'AxiosError') {
                    dispatch(createAlert(err.response.data.error, ERROR, 3));
                } else {
                    dispatch(createAlert(err.message, ERROR, 3));
                }
            });
    };
};

export default profilesSlice.reducer;
