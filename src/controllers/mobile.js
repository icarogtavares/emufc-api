const { assoc } = require('ramda')
const Promise = require('bluebird')
const equipmentsService = require('../services/equipments')
const responsiblesService = require('../services/responsibles')
const placesService = require('../services/places')
const versionService = require('../services/version')

const findAll = (req, res, next) => {
  const equipments = equipmentsService.findAll()
  const responsibles = responsiblesService.findAll()
  const places = placesService.findAll()

  versionService.currentVersion()
    .then((version) => {
      if (version.current > req.get('VERSION')) {
        return Promise.all([equipments, responsibles, places])
      }

      throw new Error('Already up to date.')
    })
    .then(([equipments, responsibles, places]) => res.send({
      equipments,
      responsibles,
      places,
    }))
    .catch(err => next(assoc('status', 400, err)))
}

module.exports = {
  findAll,
}
