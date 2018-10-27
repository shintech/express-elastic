const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const compression = require('compression')
const Router = require('./router')

module.exports = ({ db, logger, port, environment }) => {
  const server = express()
  const api = Router()

  server.use('/public', express.static(path.join(__dirname, '../public')))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(compression())

    .use('/api', (req, res, next) => {
      res.on('finish', () => {
        logger.info(`${res.statusCode} - ${req.method} - ${req.url}`)
      })

      req.logger = logger
      req.db = db

      next()
    })

    .use('/api', api)

  return server
}
