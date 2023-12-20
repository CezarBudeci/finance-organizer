import { useSelector } from 'react-redux';
import { ERROR, INFO } from '../utils/constants';
import { Alert } from '@mui/material';

const InfoAlert = () => {
    const alert = useSelector(state => state.alert);

    if (!alert) {
        return <></>;
    }

    if (alert.type === INFO) {
        return <Alert severity="success">{alert.message}</Alert>;
    }

    if (alert.type === ERROR) {
        return <Alert severity="error">{alert.message}</Alert>;
    }
};

export default InfoAlert;
