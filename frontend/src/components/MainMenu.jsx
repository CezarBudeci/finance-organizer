import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/userReducer';

const MainMenu = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div>
            <Button
                className="general-button"
                variant="outlined"
                color="primary"
                onClick={handleLogout}>
                Logout
            </Button>
        </div>
    );
};

export default MainMenu;
