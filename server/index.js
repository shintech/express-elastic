const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const compression = require('compression')
const morgan = require('morgan')
const Router = require('./router')
const configDB = require('./db')

module.exports = ({ logger, port, environment }) => {
  const server = express()
  const db = configDB({ logger, environment })
  const api = Router({ db, logger })

  if (environment === 'development') server.use(morgan('dev'))

  server.use('/public', express.static(path.join(__dirname, '../public')))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(compression())
    .use('/api', api)

  return server
}
