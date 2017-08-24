'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

class PlacesController {

  constructor(Place) {
    this.Place = Place;
  }

  findAll(req, res, next) {
    this.Place.findAll({
      attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] }
    }).then(places => res.send(places)).catch(err => next((0, _ramda.assoc)('status', 400, err)));
  }

  findOne(req, res, next) {
    this.Place.findById(req.params.id, {
      attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] }
    }).then(place => {
      (0, _ramda.isNil)(place) ? next() : res.send(place);
    }).catch(err => next((0, _ramda.assoc)('status', 400, err)));
  }

  save(req, res, next) {
    this.Place.create(req.body).then(place => res.status(201).send(place)).catch(err => next((0, _ramda.assoc)('status', 400, err)));
  }

  update(req, res, next) {
    this.Place.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(rowsAffected => {
      (0, _ramda.equals)(rowsAffected[0], 0) ? next() : res.sendStatus(200);
    }).catch(err => next((0, _ramda.assoc)('status', 400, err)));
  }

  delete(req, res, next) {
    this.Place.destroy({
      where: {
        id: req.params.id
      }
    }).then(rowsAffected => {
      (0, _ramda.equals)(rowsAffected, 0) ? next() : res.sendStatus(204);
    }).catch(err => next((0, _ramda.assoc)('status', 400, err)));
  }

}
exports.default = PlacesController;