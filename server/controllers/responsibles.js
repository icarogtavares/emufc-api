import { assoc, equals, isNil } from 'ramda'

export default class ResponsiblesController {

    constructor(Responsible) {
        this.Responsible = Responsible;
    }

    findAll(req, res, next) {
        this.Responsible.findAll({
            attributes:{ exclude: ['created_at', 'updated_at', 'deleted_at'] }
          })
            .then(responsibles => res.send(responsibles))
            .catch(err => next(assoc('status', 400, err)));
    }

    findOne(req, res, next) {
        this.Responsible.findById(req.params.id, {
            attributes : { exclude: ['created_at', 'updated_at', 'deleted_at'] }
        })
            .then(responsible => {
                isNil(responsible) ? next() : res.send(responsible);
            })
            .catch(err => next(assoc('status', 400, err)));
    }

    save(req, res, next) {
        this.Responsible.create(req.body)
            .then(responsible => res.send(responsible))
            .catch(err => next(assoc('status', 400, err)));
    }

    update(req, res, next) {
        this.Responsible.update(req.body, {
            where: {
              id: req.params.id
            }
          })
            .then(rowsAffected => {
              equals(rowsAffected[0], 0) ? next() : res.sendStatus(200);
            })
            .catch(err => next(assoc('status', 400, err)))
    }

    delete(req, res, next) {
        this.Responsible.destroy({
          where: {
            id: req.params.id
          }
        })
          .then(rowsAffected => {
            equals(rowsAffected, 0) ? next() : res.sendStatus(204);
        })
        .catch(err => next(assoc('status', 400, err)))
    }

}