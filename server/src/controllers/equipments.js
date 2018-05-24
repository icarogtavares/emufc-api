const { assoc, equals, isNil } = require('ramda')
const equipmentsService = require('../services/equipments')

const findAll = (req, res, next) => {
  equipmentsService.findAll()
    .then(equipments => res.send(equipments))
    .catch(err => next(assoc('status', 400, err)))
}

const findOne = (req, res, next) => {
  equipmentsService.findById(req.params.id)
    .then((equipment) => {
      isNil(equipment) ? next() : res.send(equipment)
    })
    .catch(err => next(assoc('status', 400, err)))
}

const save = (req, res, next) => {
  equipmentsService.create(req.body)
    .then(equipment => res.send(equipment))
    .catch(err => next(assoc('status', 400, err)))
}

const update = (req, res, next) => {
  equipmentsService.update(req.params.id, req.body)
    .then((rowsAffected) => {
      equals(rowsAffected[0], 0) ? next() : res.sendStatus(200)
    })
    .catch(err => next(assoc('status', 400, err)))
}

const remove = (req, res, next) => {
  equipmentsService.remove(req.params.id)
    .then((rowsAffected) => {
      equals(rowsAffected, 0) ? next() : res.sendStatus(204)
    })
    .catch(err => next(assoc('status', 400, err)))
}

module.exports = {
  findAll,
  findOne,
  save,
  update,
  remove,
}
