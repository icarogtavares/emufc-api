const express = require('express')
const usersController = require('../controllers/users')
const auth = require('../bin/auth')

const router = express.Router()

router.route('/')
  .post(usersController.login)

router.route('/')
  .get(auth().authenticate(), (req, res, next) => res.send('Auth test OK!')) // eslint-disable-line no-unused-vars

module.exports = router
