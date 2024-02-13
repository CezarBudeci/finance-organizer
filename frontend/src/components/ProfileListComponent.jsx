import {
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProfileListComponent = ({ profile }) => {
    const navigate = useNavigate();
    return (
        <div>
            <Card variant="outlined">
                <CardActionArea
                    onClick={() => navigate(`/profiles/${profile.id}`)}>
                    <CardHeader title={profile.name} />

                    <CardContent>
                        <Typography>{profile.description}</Typography>
                        <Typography>{profile.balance}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
};

export default ProfileListComponent;
