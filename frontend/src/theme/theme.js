import { createTheme } from '@mui/material/styles';
import { lightGreen } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        },

        secondary: {
            main: lightGreen.A400,
        },
    },
    typography: {
        fontFamily: ['Arial', 'sans-serif', 'Roboto'],
    },
});

export default theme;
