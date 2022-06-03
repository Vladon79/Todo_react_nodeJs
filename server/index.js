import express from 'express'
import mongoose from 'mongoose'
import router from './src/routes/router.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import fileupload from 'express-fileupload'

const PORT = 5000
const DB_URL = 'mongodb://localhost:27017/to_do'

const app = express()

app.use(express.json())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(fileupload({}))
app.use(express.static('files'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', router)
async function startApp () {
  try {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => {
      console.log('server ' + PORT)
    })
  } catch (e) {
    console.log(e)
  }
}

startApp()
