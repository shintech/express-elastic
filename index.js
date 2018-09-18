const environment = process.env['NODE_ENV']
const port = process.env['PORT'] || 8000
const configDB = require('./server/db')

const logger = require('./server/logger')({ environment })
const db = configDB({ logger, environment })
const server = require('./server')({ db, logger, environment, port })
const pkg = require('./package.json')

server.listen(port, () => {
  logger.info(`${pkg.name} - version: ${pkg.version} - listening on port ${port}...`)
})
