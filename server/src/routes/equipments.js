const express = require('express')
const equipmentsController = require('../controllers/equipments')

const router = express.Router();

router.route('/')
  .get(equipmentsController.findAll)
  .post(equipmentsController.save)

router.route('/:id')
  .get(equipmentsController.findOne)
  .put(equipmentsController.update)
  .delete(equipmentsController.remove)
  
module.exports = router;