const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const morgan = require('morgan')
const configRouter = require('./router')
const configClient = require('./client')

const environment = process.env['NODE_ENV'] || 'development'
const port = process.env['PORT'] || 8000

const logger = require('./logger')({ environment })

const app = express()
const client = configClient({ logger })

if (environment === 'development') app.use(morgan('dev'))

app.use('/api/*', (req, res, next) => {
  req.client = client
  next()
})

app.use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(compression())
  .use('/api', configRouter({ logger }))

app.listen(port, () => {
  logger.info(`listening on ${port}...`)
})

module.exports = app
