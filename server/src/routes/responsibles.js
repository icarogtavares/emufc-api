const express = require('express')
const responsiblesController = require('../controllers/responsibles')

const router = express.Router()

router.route('/')
  .get(responsiblesController.findAll)
  .post(responsiblesController.save)

router.route('/:id')
  .get(responsiblesController.findOne)
  .put(responsiblesController.update)
  .delete(responsiblesController.remove)


module.exports = router
