let token = null;

const setToken = newToken => {
    token = `Bearer ${newToken}`;
};

const getToken = () => token;

const AuthenticationService = {
    setToken,
    getToken,
};

export default AuthenticationService;
