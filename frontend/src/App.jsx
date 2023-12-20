import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import './styles/main.css';
import RegistrationForm from './components/RegistrationForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { resetUser } from './reducers/userReducer';
import InfoAlert from './components/InfoAlert';

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    useEffect(() => {
        if (window.location.href.indexOf('register') > -1) {
            return;
        }
        if (!user.token || !user.username || !user.email) {
            dispatch(resetUser());
            navigate('/');
        }
    }, [user.token, user.username, user.email]);

    return (
        <div className="app">
            <Header />
            <InfoAlert />
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/register" element={<RegistrationForm />} />
            </Routes>
        </div>
    );
}
// TODO: create theme with mui

export default App;
