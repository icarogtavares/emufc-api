'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

class UsersController {

  constructor(User) {
    this.User = User;
  }

  findAll(req, res, next) {
    this.User.findAll({
      attributes: { exclude: ['password', 'created_at', 'updated_at', 'deleted_at'] }
    }).then(users => res.send(users)).catch(err => next((0, _ramda.assoc)('status', 400, err)));
  }

  findOne(req, res, next) {
    this.User.findById(req.params.id, {
      attributes: { exclude: ['password', 'created_at', 'updated_at', 'deleted_at'] }
    }).then(user => {
      (0, _ramda.isNil)(user) ? next() : res.send(user);
    }).catch(err => next((0, _ramda.assoc)('status', 400, err)));
  }

  save(req, res, next) {
    this.User.create(req.body).then(user => res.status(201).send(user)).catch(err => next((0, _ramda.assoc)('status', 400, err)));
  }

  update(req, res, next) {
    this.User.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(rowsAffected => {
      (0, _ramda.equals)(rowsAffected[0], 0) ? next() : res.sendStatus(200);
    }).catch(err => next((0, _ramda.assoc)('status', 400, err)));
  }

}
exports.default = UsersController;