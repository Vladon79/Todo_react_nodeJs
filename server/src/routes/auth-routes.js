import { Router } from 'express'
import { check } from 'express-validator'
import authController from '../controllers/authController.js'

const authRouter = new Router()

authRouter.post('/auth/registration', [
  check('email', 'Uncorrect email').isEmail(),
  check('password', 'Uncorrect email').isLength({ min: 8, max: 32 })
], authController.registration)
authRouter.post('/auth/login', authController.login)
authRouter.get('/auth', authController.auth)
authRouter.get('/auth/logout', authController.logOut)

authRouter.get('/auth/activate/:link', authController.activate)

export default authRouter
