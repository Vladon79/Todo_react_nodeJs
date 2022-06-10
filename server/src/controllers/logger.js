import { createLogger, format, transports } from 'winston'
import 'winston-mongodb'

const { combine, errors, timestamp, json } = format

const db = 'mongodb://localhost:27017/to_do'

const logger = createLogger({
  format: combine(timestamp(), errors({ stack: true }), json()),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.MongoDB({
      level: 'error',
      db,
      options: { useUnifiedTopology: true },
      collection: 'LoggerError',
      format: json()
    })
  ]
})

export default logger
