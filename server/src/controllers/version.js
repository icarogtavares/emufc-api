import { assoc, isNil } from 'ramda'
import * as versionService from '../services/version'

export const currentVersion = (req, res, next) => {
    versionService.currentVersion()
        .then(version => {
            isNil(version) ? next() : res.send(version);
        })
        .catch(err => next(assoc('status', 400, err)));
}

export const incrementVersion = (req, res, next) => {
    versionService.incrementVersion()
        .then(version => {
            res.sendStatus(200);
        })
        .catch(err => next(assoc('status', 400, err)));
}