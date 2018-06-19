const express = require('express')
const placeController = require('../controllers/places')

const router = express.Router()

router.route('/')
  .get(placeController.findAll)
  .post(placeController.save)

router.route('/:id')
  .get(placeController.findById)
  .put(placeController.update)
  .delete(placeController.remove)

module.exports = router
