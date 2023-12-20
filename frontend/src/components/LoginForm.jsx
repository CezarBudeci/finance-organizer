import { Button, Link, TextField, Typography } from '@mui/material';
import { validateTextInput } from '../utils/inputUtils';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/userReducer';

const LoginForm = () => {
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();

        const email = validateTextInput(dispatch, e.target.email.value);
        const password = validateTextInput(dispatch, e.target.password.value);

        if (email && password) {
            dispatch(login(email, password));
        }
    };

    return (
        <div className="login-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <Typography variant="h4">Login</Typography>
                <div>
                    <div>
                        <TextField
                            label="E-mail"
                            variant="standard"
                            color="secondary"
                            name="email"
                            type="email"
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
                        <Button
                            variant="outlined"
                            color="primary"
                            type="submit">
                            Login
                        </Button>
                    </div>
                    <div>
                        <Typography>
                            Don&apos;t have an account?{' '}
                            <Link href="/register">Create account</Link>
                        </Typography>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
