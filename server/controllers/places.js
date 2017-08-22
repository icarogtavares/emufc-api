import { assoc } from 'ramda'

class PlacesController {

  constructor(place) {
    this.Place = place;
  }

  getAll(req, res, next) {
    this.Place.findAll({
      attributes:{ exclude: ['created_at', 'updated_at', 'deleted_at']}
    })
      .then(places => {
        res.send(places);
      })
      .catch(err => next(assoc('status', 400, err)));
  }

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
      .then(place => {
        res.json(place);
      })
      .catch(err => next(assoc('status', 400, err)))
  }

}

export default PlacesController;