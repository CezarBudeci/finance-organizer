import { createTheme } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        },

        secondary: {
            main: orange.A700,
        },
    },
    typography: {
        fontFamily: ['Arial', 'sans-serif', 'Roboto'],
    },
});

export default theme;
