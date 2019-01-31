const express = require('express')
const usersController = require('../controllers/users')

const router = express.Router()

router.route('/')
  .get(usersController.findAll)
  .post(usersController.save)

router.route('/:id')
  .get(usersController.findOne)
  .put(usersController.update)
  .delete(usersController.remove)

module.exports = router
