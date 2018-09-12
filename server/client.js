const elasticsearch = require('elasticsearch')

module.exports = ({ logger }) => {
  let environment = process.env['NODE_ENV']

  var client = new elasticsearch.Client({
    host: process.env['DATABASE_URL'] || 'localhost:9200'
    // log: 'trace'
  })

  // let postgresURI = process.env['DATABASE_URL'] || `postgres://postgres:postgres@localhost:5432/api_${environment}`

  const databaseName = ['', '']

  if (environment === 'development') {
    logger.info(`Connected to database: ${databaseName[databaseName.length - 1]}...`)
  }

  return client
}
