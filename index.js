const environment = process.env['NODE_ENV']
const port = process.env['PORT'] || 8000

const logger = require('./server/logger')({ environment })
const server = require('./server')({ logger, environment, port })
const pkg = require('./package.json')

server.listen(port, () => {
  logger.info(`${pkg.name} - version: ${pkg.version} - listening on port ${port}...`)
})
