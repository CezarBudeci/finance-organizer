import { Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import MainMenu from './MainMenu';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    const validateUser = () => {
        return user && user.token && user.username && user.email;
    };

    const navigateToProfiles = () => {
        navigate('/profiles');
    };

    return (
        <div className="header">
            <Typography variant="h2">Financy</Typography>
            {validateUser() ? (
                <Button className="general-button" onClick={navigateToProfiles}>
                    Profiles
                </Button>
            ) : (
                <></>
            )}

            {validateUser() ? <MainMenu /> : <></>}
        </div>
    );
};

export default Header;
