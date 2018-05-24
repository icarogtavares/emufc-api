const logger = require('morgan')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const express = require('express')

const routes = require('../routes/')
const auth = require('./auth')

const configureExpress = () => {
  const app = express()

  app.set('port', process.env.PORT || '3000')

  if (app.get('env') === 'development') {
    app.use(logger('dev'))
  }

  app.use(helmet())
  app.use(helmet.noCache())
  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  app.use(auth().initialize())

  app.use((req, res, next) => {
    delete req.body.id
    delete req.body.created_at
    delete req.body.updated_at
    delete req.body.deleted_at
    next()
  })

  app.use('/', routes)

  app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  app.use((err, req, res) => {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    res.status(err.status || 500)
    res.send(res.locals.error)
  })

  return app
}

module.exports = {
  configureExpress,
}
