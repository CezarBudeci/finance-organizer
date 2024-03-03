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

profileRouter.get('/:id', (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        throwInvalidArgumentError('Invalid id');
    }

    if (!req.user) {
        throwInvalidArgumentError('Invalid user');
    }

    ProfileService.getProfile(id, undefined, req.user)
        .then(result => {
            res.json(result);
            return;
        })
        .catch(err => next(err));
});

profileRouter.post('/', (req, res, next) => {
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

profileRouter.put('/:id', (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        throwInvalidArgumentError('Invalid id');
    }

    if (!req.user) {
        throwInvalidArgumentError('Invalid user');
    }

    const profile = req.body;
    if (!profile || !profile.name || !profile.currency) {
        throwInvalidArgumentError('Invalid profile data');
    }

    ProfileService.editProfile(
        id,
        profile.name,
        profile.description,
        profile.currency,
        req.user
    )
        .then(result => {
            res.json(result);
            return;
        })
        .catch(err => next(err));
});

profileRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        throwInvalidArgumentError('Invalid id');
    }

    if (!req.user) {
        throwInvalidArgumentError('Invalid user');
    }

    ProfileService.deleteProfile(id, req.user)
        .then(() => {
            res.sendStatus(204);
            return;
        })
        .catch(err => next(err));
});

export default profileRouter;
