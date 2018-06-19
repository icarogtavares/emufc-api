const express = require('express')
const usersRoutes = require('./users')
const placesRoutes = require('./places')
const responsiblesRoutes = require('./responsibles')
const equipmentsRoutes = require('./equipments')
const loginRoutes = require('./login')
const versionRoutes = require('./version')
const mobileRoutes = require('./mobile')

const router = express.Router()

router.use('/users', usersRoutes)
router.use('/places', placesRoutes)
router.use('/responsibles', responsiblesRoutes)
router.use('/equipments', equipmentsRoutes)
router.use('/login', loginRoutes)
router.use('/version', versionRoutes)
router.use('/mobile', mobileRoutes)

// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
  res.send({ index: 'index route' })
})

module.exports = router
