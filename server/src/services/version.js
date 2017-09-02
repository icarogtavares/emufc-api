import { getModel } from '../models'

export const currentVersion = () => {
    return getModel('version')
        .then(Version =>
            Version.findById(1))
}

export const incrementVersion = () => {
    return getModel('version')
        .then(Version =>
            Version.build({id: 1}, {isNewRecord: false}).increment('current'))
}