import { Button, Link, TextField, Typography } from '@mui/material';
import { validateTextInput } from '../utils/inputUtils';
import { useDispatch } from 'react-redux';
import { createAlert } from '../reducers/alertReducer';
import { ERROR } from '../utils/constants';
import { registerUser } from '../reducers/userReducer';

const RegistrationForm = () => {
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();

        const email = validateTextInput(dispatch, e.target.email.value);
        const username = validateTextInput(dispatch, e.target.username.value);
        const password = validateTextInput(dispatch, e.target.password.value);
        const repassword = validateTextInput(
            dispatch,
            e.target.repassword.value
        );

        if (password !== repassword) {
            dispatch(createAlert('Passwords do not match', ERROR, 3));
        } else if (email && username && password) {
            dispatch(registerUser(email, username, password));
        }
    };

    return (
        <div className="login-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <Typography variant="h4">Register</Typography>
                <div className="login-form-compoenents-wrappers">
                    <div>
                        <TextField
                            label="E-mail"
                            variant="standard"
                            color="secondary"
                            type="email"
                            name="email"
                        />
                    </div>
                    <div>
                        <TextField
                            label="Username"
                            variant="standard"
                            color="secondary"
                            type="text"
                            name="username"
                        />
                    </div>
                    <div>
                        <TextField
                            label="Password"
                            variant="standard"
                            color="secondary"
                            type="password"
                            name="password"
                        />
                    </div>
                    <div>
                        <TextField
                            label="Repeat password"
                            variant="standard"
                            color="secondary"
                            type="password"
                            name="repassword"
                        />
                    </div>
                    <div>
                        <Button
                            className="general-button"
                            variant="outlined"
                            color="primary"
                            type="submit">
                            Register
                        </Button>
                    </div>
                    <div>
                        <Typography>
                            Return to login page: <Link href="/">Login</Link>
                        </Typography>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RegistrationForm;
