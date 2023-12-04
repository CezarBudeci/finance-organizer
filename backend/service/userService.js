import { throwInvalidArgumentError } from '../util/errorUtil.js';
import User from '../model/user.js';

const createUser = user => {
    if (!user) {
        throwInvalidArgumentError('Invalid user credentials');
    }

    if (!user.username || !user.email) {
        throwInvalidArgumentError('Invalid username or email');
    }

    const newUser = new User({
        username: user.username,
        email: user.email,
    });

    return newUser.save();
};

const getUser = (username, email) => {
    let options = {};
    if (username) {
        options.username = username;
    } else if (email) {
        options.email = email;
    } else {
        throwInvalidArgumentError('Invalid credentials');
    }

    return User.findOne(options);
};

const UserService = {
    createUser,
    getUser,
};

export default UserService;
