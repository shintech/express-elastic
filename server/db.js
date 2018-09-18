const elasticsearch = require('elasticsearch')

module.exports = ({ logger, environment }) => {
  var client = new elasticsearch.Client({
    host: process.env['DATABASE_URL'] || 'localhost:9200'
    // log: 'trace'
  })

  if (environment === 'development') {
    logger.info(`Connected to Elasticsearch...`)
  }

  return client
}
