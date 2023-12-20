import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import MainMenu from './MainMenu';

const Header = () => {
    const user = useSelector(state => state.user);
    const validateUser = () => {
        return user && user.token && user.username && user.email;
    };
    return (
        <div className="header">
            <Typography variant="h2">Financy</Typography>
            {validateUser() ? <MainMenu /> : <></>}
        </div>
    );
};

export default Header;
