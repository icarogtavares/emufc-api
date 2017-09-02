import { assoc, equals, isNil } from 'ramda'
import * as equipmentsService from '../services/equipments'

export const findAll = (req, res, next) => {
    equipmentsService.findAll()
        .then(equipments => res.send(equipments))
        .catch(err => next(assoc('status', 400, err)));
}

export const findOne = (req, res, next) => {
    equipmentsService.findById(req.params.id)
        .then(equipment => {
            isNil(equipment) ? next() : res.send(equipment);
        })
        .catch(err => next(assoc('status', 400, err)));
}

export const save = (req, res, next) => {
    equipmentsService.create(req.body)
        .then(equipment => res.send(equipment))
        .catch(err => next(assoc('status', 400, err)));
}

export const update = (req, res, next) => {
    equipmentsService.update(req.params.id, req.body)
        .then(rowsAffected => {
            equals(rowsAffected[0], 0) ? next() : res.sendStatus(200);
        })
        .catch(err => next(assoc('status', 400, err)))
}

export const remove = (req, res, next) => {
    equipmentsService.remove(req.params.id)
        .then(rowsAffected => {
        equals(rowsAffected, 0) ? next() : res.sendStatus(204);
    })
    .catch(err => next(assoc('status', 400, err)))
}