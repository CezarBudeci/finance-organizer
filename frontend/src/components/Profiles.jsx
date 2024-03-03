import { useDispatch, useSelector } from 'react-redux';
import ProfileListComponent from './ProfileListComponent';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { IconButton, Tooltip, Typography } from '@mui/material';
import CreateProfile from './CreateProfile';
import { toggleAddProfileModalIsOpen } from '../reducers/modalsReducer';
import { useEffect } from 'react';
import { initializeProfiles } from '../reducers/profilesReducer';

const Profiles = () => {
    const dispatch = useDispatch();
    const profiles = useSelector(state => state.profiles);
    const addProfileModalIsOpen = useSelector(
        state => state.modals.addProfileModalIsOpen
    );

    const toggleModal = () => {
        dispatch(toggleAddProfileModalIsOpen());
    };

    useEffect(() => {
        dispatch(initializeProfiles());
    }, []);

    return (
        <div className="profiles-wrapper">
            <div className="profiles-header">
                <Typography variant="h4">Profiles</Typography>
                <Tooltip title="Add profile">
                    <IconButton aria-label="Add profile" onClick={toggleModal}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Tooltip>
            </div>
            <CreateProfile
                isOpen={addProfileModalIsOpen}
                toggleModal={toggleModal}
            />
            <div className="profiles-list-wrapper">
                {profiles &&
                    profiles.map(profile => (
                        <ProfileListComponent
                            key={profile.id}
                            profile={profile}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Profiles;
