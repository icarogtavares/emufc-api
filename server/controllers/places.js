import { assoc, equals } from 'ramda'

export default class PlacesController {

  constructor(Place) {
    this.Place = Place;
  }

  getAll(req, res, next) {
    this.Place.findAll({
      attributes:{ exclude: ['created_at', 'updated_at', 'deleted_at']}
    })
      .then(places => res.send(places))
      .catch(err => next(assoc('status', 400, err)));
  }

  //getOne

  save(req, res, next) {
    this.Place.create(req.body)
      .then(place => res.status(201).send(place))
      .catch(err => next(assoc('status', 400, err)));
  }

  update(req, res, next) {
    this.Place.update(req.body, {
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

  delete(req, res, next) {
    this.Place.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(rowsAffected => {
        if(equals(rowsAffected, 0)){
            return next();
        }
        res.sendStatus(204);
      })
      .catch(err => next(assoc('status', 400, err)))
  }

}