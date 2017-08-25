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

  login(req, res, next) {

    async.waterfall([callback => {
      this.User.findOne({
        where: {
          email: req.body.email
        }
      }).then(user => {
        if ((0, _ramda.isNil)(user)) return callback({ msg: 'Usuário inválido.' });

        callback(err, user);
      }).catch(err => callback(err));
    }, (user, callback) => {
      if (this.User.isPassword(user.password, req.body.password)) {
        const payload = { id: user.id };
        const token = jwt.sign(payload, cfg.security.jwtSecret, { expiresIn: '7d' });
        this.User.update({
          access_token: token
        }, {
          where: {
            id: user.id
          }
        }).then(rowsAffected => {
          (0, _ramda.equals)(rowsAffected[0], 0) ? callback({ msg: "Usuário não encontra-se mais no banco" }) : callback(null, token);
        }).catch(err => callback(err));
      } else {
        callback({ msg: "Senha inválida." });
      }
    }], (err, token) => {
      if (err) return next((0, _ramda.assoc)('status', 400, err));

      res.send({ token: token });
    });
  }

}
exports.default = UsersController;