import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    addProfileModalIsOpen: false,
    addExpenseModalIsOpen: false,
    editProfileModalIsOpen: false,
    editExpenseModalIsOpen: false,
};

const modals = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        setModals(_, action) {
            return action.payload;
        },
        toggleAddProfileModalIsOpen(state) {
            const stateCopy = { ...state };
            stateCopy.addProfileModalIsOpen = !stateCopy.addProfileModalIsOpen;
            return stateCopy;
        },
        toggleAddExpenseModalIsOpen(state) {
            const stateCopy = { ...state };
            stateCopy.addExpenseModalIsOpen = !stateCopy.addExpenseModalIsOpen;
            return stateCopy;
        },
        toggleEditProfileModalIsOpen(state) {
            const stateCopy = { ...state };
            stateCopy.editProfileModalIsOpen =
                !stateCopy.editProfileModalIsOpen;
            return stateCopy;
        },
        toggleEditExpenseModalIsOpen(state) {
            const stateCopy = { ...state };
            stateCopy.editExpenseModalIsOpen =
                !stateCopy.editExpenseModalIsOpen;
            return stateCopy;
        },
        resetModals() {
            return initialState;
        },
    },
});

export const {
    setModals,
    toggleAddProfileModalIsOpen,
    toggleAddExpenseModalIsOpen,
    toggleEditProfileModalIsOpen,
    toggleEditExpenseModalIsOpen,
    resetModals,
} = modals.actions;

export default modals.reducer;
