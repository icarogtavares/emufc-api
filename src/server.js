const throng = require('throng')
const { startApp } = require('./bin/boot')

const WORKERS = process.env.WEB_CONCURRENCY || 1

throng({
  workers: WORKERS,
  lifetime: Infinity,
  start: startApp,
})
