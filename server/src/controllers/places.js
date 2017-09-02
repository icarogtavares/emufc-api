import { assoc, equals, isNil } from 'ramda'
import * as placesService from '../services/places'

export const findAll = (req, res, next) => {

  placesService.findAll()
    .then(places => res.send(places))
    .catch(err => next(assoc('status', 400, err)));
}

export const findById = (req, res, next) => {

  placesService.findById(req.params.id)
    .then(place => {
        isNil(place) ? next() : res.send(place);
    })
    .catch(err => next(assoc('status', 400, err)));
}
export const save = (req, res, next) => {
  placesService.create(req.body)
    .then(place => res.status(201).send(place))
    .catch(err => next(assoc('status', 400, err)));
}

export const update = (req, res, next) => {
  placesService.update(req.params.id, req.body)
    .then(rowsAffected => {
      equals(rowsAffected[0], 0) ? next() : res.sendStatus(200);
    })
    .catch(err => next(assoc('status', 400, err)))
}

export const remove = (req, res, next) => {
  placesService.remove(req.params.id)
    .then(rowsAffected => {
      equals(rowsAffected, 0) ? next() : res.sendStatus(204);
    })
    .catch(err => next(assoc('status', 400, err)))
}