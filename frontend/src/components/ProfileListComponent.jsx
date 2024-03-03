import {
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { populateProfileCurrency } from '../reducers/currenciesReducer';

const ProfileListComponent = ({ profile }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (typeof profile.currency === 'string') {
            dispatch(populateProfileCurrency(profile.currency, profile.id));
        }
    }, [profile.currency]);
    return (
        <div>
            <Card variant="outlined">
                <CardActionArea
                    onClick={() => navigate(`/profiles/${profile.id}`)}>
                    <CardHeader title={profile.name} />

                    <CardContent>
                        <Typography>{profile.description}</Typography>
                        <Typography>{profile.balance}</Typography>
                        <Typography>{profile.currency.symbol}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
};

export default ProfileListComponent;
