const { assoc, equals, isNil } = require('ramda')
const jwt = require('jsonwebtoken')
const { compareSync } = require('bcrypt')
const usersService = require('../services/users')
const cfg = require('../config/config')

const findAll = (req, res, next) => {
  usersService.findAll()
    .then(users => res.send(users))
    .catch(err => next(assoc('status', 400, err)))
}

const findOne = (req, res, next) => {
  usersService.findById(req.params.id)
    .then((user) => {
      isNil(user) ? next() : res.send(user) // eslint-disable-line no-unused-expressions
    })
    .catch(err => next(assoc('status', 400, err)))
}

const save = (req, res, next) => {
  usersService.create(req.body)
    .then(user => res.status(201).send(user))
    .catch(err => next(assoc('status', 400, err)))
}

const update = (req, res, next) => {
  usersService.update(req.params.id, req.body)
    .then((rowsAffected) => {
      equals(rowsAffected[0], 0) ? next() : res.sendStatus(200) // eslint-disable-line no-unused-expressions
    })
    .catch(err => next(assoc('status', 400, err)))
}

const remove = (req, res, next) => {
  usersService.remove(req.params.id)
    .then((rowsAffected) => {
      equals(rowsAffected, 0) ? next() : res.sendStatus(204) // eslint-disable-line no-unused-expressions
    })
    .catch(err => next(assoc('status', 400, err)))
}

const login = (req, res, next) => {
  usersService.findByUsername(req.body.username)
    .then((user) => {
      if (isNil(user)) { throw new Error('User does not exist!') }

      if (compareSync(req.body.password, user.password)) {
        const payload = { id: user.id }
        const token = jwt.sign(payload, cfg.security.jwtSecret, { expiresIn: '7d' })
        usersService.updateToken(user.id, token)
          .then((rowsAffected) => {
            if (equals(rowsAffected[0], 0)) {
              throw new Error('Usuário não encontra-se mais no banco.')
            }
            return res.send({ token })
          })
      } else {
        throw new Error('Invalid password')
      }
    })
    .catch(err => next(assoc('status', 400, err)))
}

module.exports = {
  findAll,
  findOne,
  save,
  update,
  remove,
  login,
}
