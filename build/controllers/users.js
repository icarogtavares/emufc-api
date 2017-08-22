'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

class UsersController {

  constructor(User) {
    this.User = User;
  }

  getAll(req, res, next) {
    this.User.findAll({
      attributes: ['id', 'username', 'email']
    }).then(users => {
      res.send(users);
    }).catch(err => {
      next(err);
    });
  }

  save(req, res, next) {
    this.User.create(req.body).then(user => res.status(201).send(user)).catch(err => next((0, _ramda.assoc)('status', 400, err)));
  }
}

exports.default = UsersController;