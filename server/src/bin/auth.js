const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const { eqProps, isNil, complement } = require('ramda')
const jwt = require('jsonwebtoken')
const db = require('../models')
const cfg = require('../config/config')

const { user: User } = db

const params = {
  secretOrKey: cfg.security.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
}

const isNotNil = complement(isNil)

module.exports = () => {
  const strategy = new Strategy(params, (payload, done) => {
    User.findById(payload.id).then((user) => {
      if (isNil(user)) { return done(null, false) }

      const userToken = jwt.decode(user.access_token)

      if (isNotNil(userToken) && eqProps('id', userToken, payload) && eqProps('iat', userToken, payload) && eqProps('exp', userToken, payload)) {
        return done(null, user)
      }

      return done(null, false)
    }).catch(err => done(err, null))
  })

  passport.use(strategy)

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', cfg.security.jwtSession),
  }
}
