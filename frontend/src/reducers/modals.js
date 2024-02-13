import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    addProfileModal: {
        isOpen: false,
    },
    addExpenseModal: {
        isOpen: false,
    },
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
            stateCopy.addProfileModal.isOpen =
                !stateCopy.addProfileModal.isOpen;
            return stateCopy;
        },
        toggleAddExpenseModalIsOpen(state) {
            const stateCopy = { ...state };
            stateCopy.addExpenseModal.isOpen =
                !stateCopy.addExpenseModal.isOpen;
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
    resetModals,
} = modals.actions;

export default modals.reducer;
