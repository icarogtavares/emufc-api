const { assoc, equals, isNil } = require('ramda')
const responsiblesService = require('../services/responsibles')

const findAll = (req, res, next) => {
  responsiblesService.findAll()
    .then(responsibles => res.send(responsibles))
    .catch(err => next(assoc('status', 400, err)))
}

const findOne = (req, res, next) => {
  responsiblesService.findById(req.params.id)
    .then((responsible) => {
      isNil(responsible) ? next() : res.send(responsible) // eslint-disable-line no-unused-expressions
    })
    .catch(err => next(assoc('status', 400, err)))
}

const save = (req, res, next) => {
  responsiblesService.create(req.body)
    .then(responsible => res.send(responsible))
    .catch(err => next(assoc('status', 400, err)))
}

const update = (req, res, next) => {
  responsiblesService.update(req.params.id, req.body)
    .then((rowsAffected) => {
      equals(rowsAffected[0], 0) ? next() : res.sendStatus(200) // eslint-disable-line no-unused-expressions
    })
    .catch(err => next(assoc('status', 400, err)))
}

const remove = (req, res, next) => {
  responsiblesService.remove(req.params.id)
    .then((rowsAffected) => {
      equals(rowsAffected, 0) ? next() : res.sendStatus(204) // eslint-disable-line no-unused-expressions
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
