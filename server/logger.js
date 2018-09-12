const winston = require('winston')

module.exports = function ({ environment }) {
  let logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  })

  if (environment !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple()
    }))
  }

  return logger
}
