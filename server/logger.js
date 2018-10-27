const winston = require('winston')
const path = require('path')

module.exports = function ({ environment }) {
  if (environment === 'test') {
    return winston.createLogger({
      transports: [
        new winston.transports.File({ filename: path.join('log', 'test.log'), level: 'warn' })
      ]
    })
  }

  let logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),

    transports: [
      new winston.transports.File({ filename: path.join('log', 'error.log'), level: 'error' }),
      new winston.transports.File({ filename: path.join('log', 'combined.log') })
    ]
  })

  if (environment !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }))
  }

  return logger
}
