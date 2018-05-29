const express = require('express')
const versionController = require('../controllers/version')

const router = express.Router()

router.route('/')
  .get(versionController.currentVersion)
  .post(versionController.incrementVersion)


module.exports = router
