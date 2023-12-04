import express from 'express';
import FirebaseService from '../service/firebaseService.js';
import UserService from '../service/userService.js';
import { authenticate } from '../middleware/middleware.js';
import {
    throwInternalServerError,
    throwInvalidArgumentError,
} from '../util/errorUtil.js';
import auth from '../firebase/firebaseAuth.js';

const userRouter = express.Router();

userRouter.post('/login', (req, res, next) => {
    const body = req.body;
    if (!body.email || !body.password) {
        throwInvalidArgumentError('Invalid credentials');
    }

    FirebaseService.signIn(body.email, body.password)
        .then(response => {
            const user = response.user;
            UserService.getUser(body.username, body.email)
                .then(result => {
                    res.send({
                        email: user.email,
                        username: result.username,
                        token: user.stsTokenManager
                            ? user.stsTokenManager.accessToken
                            : throwInternalServerError(
                                  'Could not get access token'
                              ),
                    });
                    return;
                })
                .catch(err => next(err));
        })
        .catch(err => next(err));
});

userRouter.post('/register', (req, res, next) => {
    const body = req.body;
    if (!body.email || !body.password || !body.username) {
        throwInvalidArgumentError(
            'User must have email, username and password'
        );
    }

    FirebaseService.register(body.email, body.password)
        .then(response => {
            let user = response.user;
            user.username = body.username;
            return UserService.createUser(user);
        })
        .then(result => {
            res.send(result);
            return;
        })
        .catch(err => {
            if (
                !(
                    err.name.includes('ValidationError') ||
                    err.name.includes('MongoServerError')
                )
            ) {
                return next(err);
            }

            if (!auth || !auth.currentUser) {
                return next(err);
            }

            return auth.currentUser.delete().then(() => {
                return next(err);
            });
        });
});

userRouter.get('/refresh', authenticate, (_, res) => {
    FirebaseService.refreshToken().then(result => {
        if (!result || !result.token) {
            throwInternalServerError('Failed to refresh token');
        }
        res.send({ token: result.token });
        return;
    });
});

userRouter.get('/logout', authenticate, (_, res) => {
    FirebaseService.signOut().then(() => {
        res.sendStatus(200);
        return;
    });
});

export default userRouter;
