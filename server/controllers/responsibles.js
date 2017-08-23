import { assoc, equals } from 'ramda'

export default class ResponsiblesController {

    constructor(Responsible) {
        this.Responsible = Responsible;
    }

    getAll(req, res, next) {
        this.Responsible.findAll({
            attributes:{ exclude: ['created_at', 'updated_at', 'deleted_at']}
          })
            .then(responsibles => res.send(responsibles))
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
              if(equals(rowsAffected, 0)){
                  return next();
              }
              res.sendStatus(200);
            })
            .catch(err => next(assoc('status', 400, err)))
    }

}