const { getModel } = require('../models')

const currentVersion = () => getModel('version')
  .then(Version =>
    Version.findById(1))

const incrementVersion = () => getModel('version')
  .then(Version =>
    Version.build({ id: 1 }, { isNewRecord: false }).increment('current'))

module.exports = {
  currentVersion,
  incrementVersion,
}
