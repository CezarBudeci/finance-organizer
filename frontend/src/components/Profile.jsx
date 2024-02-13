import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCurrency } from '../reducers/currenciesReducer';

const Profile = () => {
    const id = useParams().id;

    const dispatch = useDispatch();
    const profile = useSelector(state =>
        state.profiles.find(profile => profile.id === id)
    );

    const currencies = useSelector(state => state.currencies);
    console.log(currencies);
    useEffect(() => {
        dispatch(getCurrency(profile.currency));
    }, [profile.currency]);

    return (
        <div>
            <Typography>{profile.description}</Typography>
            <Typography>{profile.balance}</Typography>
            {currencies && currencies.length === 1 && (
                <Typography>{currencies[0].symbol}</Typography>
            )}
        </div>
    );
};

export default Profile;
