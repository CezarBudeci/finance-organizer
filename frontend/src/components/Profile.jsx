import { IconButton, Tooltip, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Expenses from './Expenses';
import CreateExpense from './CreateExpense';
import {
    toggleAddExpenseModalIsOpen,
    toggleEditProfileModalIsOpen,
} from '../reducers/modalsReducer';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { removeProfile } from '../reducers/profilesReducer';
import UpdateProfile from './UpdateProfile';

const Profile = () => {
    const id = useParams().id;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profile = useSelector(state =>
        state.profiles.find(profile => profile.id === id)
    );

    const addExpenseModalIsOpen = useSelector(
        state => state.modals.addExpenseModalIsOpen
    );

    const editProfileModalIsOpen = useSelector(
        state => state.modals.editProfileModalIsOpen
    );

    const toggleModal = () => {
        dispatch(toggleAddExpenseModalIsOpen());
    };

    const toggleEditModal = () => {
        dispatch(toggleEditProfileModalIsOpen());
    };

    const handleDelete = () => {
        dispatch(removeProfile(id));
        navigate('/profiles');
    };

    const handleEdit = () => {
        toggleEditModal();
    };

    return (
        <div>
            <Typography>{profile.name}</Typography>
            <Typography>{profile.description}</Typography>
            <Typography>{profile.balance}</Typography>
            <Typography>{profile.currency.symbol}</Typography>

            <Tooltip title="Edit profile">
                <IconButton aria-label="Edit profile" onClick={handleEdit}>
                    <EditOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete profile">
                <IconButton aria-label="Delete profile" onClick={handleDelete}>
                    <DeleteOutlineOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Expenses profileId={id} expenses={profile.expenses} />
            <CreateExpense
                profileId={id}
                isOpen={addExpenseModalIsOpen}
                toggleModal={toggleModal}
            />
            <UpdateProfile
                isOpen={editProfileModalIsOpen}
                toggleModal={toggleEditModal}
                profile={profile}
            />
        </div>
    );
};

export default Profile;
