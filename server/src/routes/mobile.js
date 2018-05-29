const express = require('express')
const mobileController = require('../controllers/mobile')

const router = express.Router()

router.route('/')
  .get(mobileController.findAll)


module.exports = router
