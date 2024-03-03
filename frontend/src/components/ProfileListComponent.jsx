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
import { getBalanceColor } from '../utils/styleUtils';

const ProfileListComponent = ({ profile }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (typeof profile.currency === 'string') {
            dispatch(populateProfileCurrency(profile.currency, profile.id));
        }
    }, [profile.currency]);

    return (
        <div className="profile-list-item">
            <Card variant="outlined">
                <CardActionArea
                    onClick={() => navigate(`/profiles/${profile.id}`)}>
                    <CardHeader title={profile.name} />

                    <CardContent className="profile-card-content-wrapper">
                        <div className="profile-card-content">
                            <Typography>{profile.description}</Typography>
                            <Typography>
                                <span style={getBalanceColor(profile.balance)}>
                                    {profile.balance}
                                </span>{' '}
                                <span>{profile.currency.symbol}</span>
                            </Typography>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
};

export default ProfileListComponent;
