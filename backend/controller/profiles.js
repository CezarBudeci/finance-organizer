import express from 'express';
import ProfileService from '../service/profileService.js';
import { throwInvalidArgumentError } from '../util/errorUtil.js';

const profileRouter = express.Router();

profileRouter.get('/', (req, res) => {
    if (!req.user) {
        throwInvalidArgumentError('Invalid user');
    }

    ProfileService.getProfiles(req.user)
        .then(result => {
            res.json(result);
            return;
        })
        .catch(err => next(err));
});

profileRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        throwInvalidArgumentError('Invalid id');
    }

    if (!req.user) {
        throwInvalidArgumentError('Invalid user');
    }

    ProfileService.getProfile(id, _, req.user)
        .then(result => {
            res.json(result);
            return;
        })
        .catch(err => next(err));
});

profileRouter.post('/', (req, res) => {
    if (!req.user) {
        throwInvalidArgumentError('Invalid user');
    }

    const profile = req.body.profile;
    if (!profile || !profile.name || !profile.currency) {
        throwInvalidArgumentError('Invalid profile data');
    }

    profile.user = req.user;

    ProfileService.addProfile(profile)
        .then(result => {
            res.json(result);
            return;
        })
        .catch(err => next(err));
});

profileRouter.put('/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        throwInvalidArgumentError('Invalid id');
    }

    if (!req.user) {
        throwInvalidArgumentError('Invalid user');
    }

    const profile = req.body.profile;
    if (
        !profile ||
        !profile.name ||
        !profile.currency ||
        !profile.expenses ||
        profile.expenses.length !== 1
    ) {
        throwInvalidArgumentError('Invalid profile data');
    }

    ProfileService.editProfile(
        id,
        profile.name,
        profile.description,
        profile.currency,
        profile.expenses[0],
        req.user
    )
        .then(result => {
            res.json(result);
            return;
        })
        .catch(err => next(err));
});

profileRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        throwInvalidArgumentError('Invalid id');
    }

    if (!req.user) {
        throwInvalidArgumentError('Invalid user');
    }
    // TODO: add check for user
    ProfileService.deleteProfile(id)
        .then(() => {
            res.sendStatus(204);
            return;
        })
        .catch(err => next(err));
});

export default profileRouter;
