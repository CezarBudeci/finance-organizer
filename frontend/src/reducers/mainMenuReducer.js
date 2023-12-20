import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
};

const mainMenuSlice = createSlice({
    name: 'mainMenu',
    initialState,
    reducers: {
        setIsOpen(state, action) {
            return {
                anchorElement: state.anchorElement,
                isOpen: action.payload,
            };
        },
        resetMainMenu() {
            return initialState;
        },
    },
});

export const { setIsOpen, resetMainMenu } = mainMenuSlice.actions;

export default mainMenuSlice.reducer;
