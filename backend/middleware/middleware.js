import auth from '../firebase/firebaseAuth.js';
import UserService from '../service/userService.js';
import {
    throwForbiddenError,
    throwInternalServerError,
    throwUnauthorizedError,
} from '../util/errorUtil.js';

export const authenticate = (req, _, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        throwUnauthorizedError();
    }

    if (!auth || !auth.currentUser) {
        throwUnauthorizedError();
    }

    const authorizationToken = authorization.split('Bearer ')[1];

    auth.currentUser
        .getIdTokenResult(false)
        .then(result => {
            if (!result && !result.token) {
                throwUnauthorizedError();
            }
            if (result.token !== authorizationToken) {
                throwForbiddenError();
            }

            const currentUser = auth.currentUser;

            return UserService.getUser(currentUser);
        })
        .then(user => {
            req.user = user;
            return next();
        })
        .catch(() => {
            throwInternalServerError();
        });
};

export const errorHandler = (err, _, res, next) => {
    const errorMessage = { error: err?.message };
    switch (err.name) {
        case 'ValidationError':
        case 'MongoServerError':
        case 'InvalidArgumentError':
            res.status(400).send(errorMessage);
            return;
        case 'UnauthorizedError':
            res.status(401).send(errorMessage);
            return;
        case 'ForbiddenError':
            res.status(403).send(errorMessage);
            return;
        case 'SyntaxError':
        case 'ReferenceError':
        case 'InternalServerError':
        case 'CastError':
            res.status(500).send(errorMessage);
            return;
        case 'FirebaseError':
            const firebaseErrorMessageArray = err.message.split('Firebase: ');
            const firebaseError = {
                error: firebaseErrorMessageArray[
                    firebaseErrorMessageArray.length - 1
                ],
            };

            if (
                err.message.includes('invalid-login-credentials') ||
                err.message.includes('weak-password') ||
                err.message.includes('email-already-in-use')
            ) {
                res.status(400).send(firebaseError);
                return;
            } else {
                res.status(500).send(firebaseError);
                return;
            }

            return;
        default:
            break;
    }

    next(err);
};
