import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import './styles/main.css';
import RegistrationForm from './components/RegistrationForm';
import InfoAlert from './components/InfoAlert';
import Profiles from './components/Profiles';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
function App() {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.isAuthorized) {
            navigate('/profiles');
        }
    }, [user.isAuthorized]);

    return (
        <div className="app">
            <Header />
            <InfoAlert />
            <Routes>
                <Route exec path="/" element={<LoginForm />} />
                <Route exec path="/register" element={<RegistrationForm />} />
                <Route exec path="/profiles" element={<PrivateRoute />}>
                    <Route exec path="/profiles" element={<Profiles />} />
                </Route>
                <Route exec path="/profiles/:id" element={<PrivateRoute />}>
                    <Route exec path="/profiles/:id" element={<Profile />} />
                </Route>
            </Routes>
        </div>
    );
}
// TODO: create theme with mui

export default App;
