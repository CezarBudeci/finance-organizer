import { IconButton, Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import { resetMainMenu, setIsOpen } from '../reducers/mainMenuReducer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../reducers/userReducer';

const MainMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const mainMenu = useSelector(state => state.mainMenu);
    const [anchorElement, setAnchorElement] = useState(null);

    const handleClick = event => {
        setAnchorElement(event.currentTarget);
        dispatch(setIsOpen(true));
    };

    const handleClose = () => {
        dispatch(resetMainMenu());
        setAnchorElement(null);
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div>
            <IconButton
                color={mainMenu.isOpen ? 'secondary' : 'primary'}
                id="menu-button"
                aria-controls={mainMenu.isOpen ? 'main-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={mainMenu.isOpen ? 'true' : undefined}
                onClick={handleClick}>
                <MenuIcon />
            </IconButton>
            <Menu
                id="main-menu"
                anchorEl={anchorElement}
                open={mainMenu.isOpen}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'menu-button',
                }}>
                <MenuItem
                    onClick={() => {
                        navigate('/#');
                    }}>
                    Account
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
};

export default MainMenu;
