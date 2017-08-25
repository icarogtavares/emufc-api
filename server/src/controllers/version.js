import { assoc, isNil } from 'ramda'

export default class VersionController {

    constructor(Version) {
        this.Version = Version;
    }

    currentVersion(req, res, next) {
        this.Version.findById(1)
            .then(version => {
                isNil(version) ? next() : res.send(version);
            })
            .catch(err => next(assoc('status', 400, err)));
    }

    incrementVersion(req, res, next) {
        this.Version.build({id: 1}, {isNewRecord: false}).increment('current')
            .then(version => {
                res.sendStatus(200);
            })
            .catch(err => next(assoc('status', 400, err)));
    }

}