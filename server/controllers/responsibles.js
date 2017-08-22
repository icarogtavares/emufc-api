import { assoc } from 'ramda'

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



}