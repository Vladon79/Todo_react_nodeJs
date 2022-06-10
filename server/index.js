import express from 'express'
import mongoose from 'mongoose'
import router from './src/routes/router.js'
import authRouter from './src/routes/auth-routes.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import fileupload from 'express-fileupload'
import logger from './src/controllers/logger.js'
import cookieParser from 'cookie-parser'

const PORT = 5000
const DB_URL = 'mongodb://localhost:27017/to_do'
export const secretKey = 'mern-secret-key'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(fileupload({}))
app.use(express.static('files'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', router)
app.use('/api', authRouter)
async function startApp () {
  try {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => {
      logger.error('Start server ' + PORT)
    })
  } catch (e) {
    console.log(e)
  }
}

startApp()
