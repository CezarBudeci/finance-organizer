import { useDispatch, useSelector } from 'react-redux';
import ProfileListComponent from './ProfileListComponent';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { IconButton } from '@mui/material';
import CreateProfile from './CreateProfile';
import { toggleAddProfileModalIsOpen } from '../reducers/modals';
import { useEffect } from 'react';
import { initializeProfiles } from '../reducers/profilesReducer';

const Profiles = () => {
    const dispatch = useDispatch();
    const profiles = useSelector(state => state.profiles);
    const addProfileModal = useSelector(state => state.modals.addProfileModal);

    const toggleModal = () => {
        dispatch(toggleAddProfileModalIsOpen());
    };

    useEffect(() => {
        dispatch(initializeProfiles());
    }, []);
    return (
        <div>
            <IconButton aria-label="Add profile" onClick={toggleModal}>
                <AddCircleOutlineIcon />
            </IconButton>
            <CreateProfile
                isOpen={addProfileModal.isOpen}
                toggleModal={toggleModal}
            />
            {profiles &&
                profiles.map(profile => (
                    <ProfileListComponent key={profile.id} profile={profile} />
                ))}
        </div>
    );
};

export default Profiles;
