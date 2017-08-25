import { assoc, equals, isNil } from 'ramda'
import jwt from 'jsonwebtoken'
import cfg from '../config/config'

export default class UsersController {

  constructor(User) {
    this.User = User;
  }

  findAll(req, res, next) {
    this.User.findAll({
      attributes : { exclude: ['password', 'created_at', 'updated_at', 'deleted_at'] }
    })
      .then(users => res.send(users))
      .catch(err => next(assoc('status', 400, err)));
  }

  findOne(req, res, next) {
    this.User.findById(req.params.id, {
        attributes : { exclude: ['password', 'created_at', 'updated_at', 'deleted_at'] }
    })
        .then(user => {
          isNil(user) ? next() : res.send(user);
        })
        .catch(err => next(assoc('status', 400, err)));
  }

  save(req, res, next) {
    this.User.create(req.body)
      .then(user => res.status(201).send(user))
      .catch(err => next(assoc('status', 400, err)));
  }

  update(req, res, next) {
    this.User.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then(rowsAffected => {
        equals(rowsAffected[0], 0) ? next() : res.sendStatus(200);
      })
      .catch(err => next(assoc('status', 400, err)))
  }

  login(req, res, next) {

    this.User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then(user => {
        if(isNil(user))
          throw new Error('User does not exist!');

        if(this.User.isPassword(user.password, req.body.password)) {
          const payload = { id : user.id };
          const token = jwt.sign(payload, cfg.security.jwtSecret, {expiresIn: '7d'});
          this.User.update({
            access_token: token
          }, {
            where : {
              id : user.id
            }
          })
            .then(rowsAffected => {
              if(equals(rowsAffected[0], 0)) {
                throw new Error('Usuário não encontra-se mais no banco.')
              }
              res.send({token: token})
            })
        }
      })
        .catch(err => next(assoc('status', 400, err)));
	}

}
