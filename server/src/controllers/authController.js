import logger from '../controllers/logger.js'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'
import { mailService } from './mailService.js'
import { v4 } from 'uuid'
import { API_URL, CLIENT_URL } from '../../config.js'
import { userService } from '../service/userService.js'
import { token } from '../service/tokenService.js'

class AuthController {
  async registration (req, res) {
    try {
      const errors = validationResult(req) // проверяем результат валидации
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Uncorect request', errors })
      }

      const { email, password } = req.body
      const candidate = await User.findOne({ email }) // есть ли пользователь с таким EMAIL
      if (candidate) {
        return res.status(500).json({ message: `User with email: ${email}, already exist` })
      }
      const activLink = v4()
      await mailService(email, `${API_URL}/api/auth/activate/${activLink}`)

      const hashPassword = await bcrypt.hash(password, 8) // второй параметр - степень хеширования
      const user = new User({ email, password: hashPassword, activationLink: activLink })
      await user.save()
      return res.json({ message: 'User was created', warning: 'Go to your email to authorize your account!!!' })
    } catch (error) {
      logger.error(error)
      res.status(500).json(error)
    }
  }

  async activate (req, res) {
    try {
      const activationLink = req.params.link
      await userService.activate(activationLink)
      return res.redirect(CLIENT_URL)
    } catch (e) {
      logger.error(e)
    }
  }

  async login (req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: 'Not correct email or password' })
      }
      const isPassValid = bcrypt.compareSync(password, user.password) // сравнивает зашифрованый пороль с тем который к нам пригшел
      if (!isPassValid) {
        return res.status(400).json({ message: 'Not correct email or password' })
      }
      if (!user.isActivated) {
        return res.status(400).json({ message: 'Your account is not activated, go to your email' })
      }
      token.createToken(user)
      await User.updateOne({ email }, { $set: { token: token.token } })
      return res.cookie('token', token.token).json({
        user: {
          id: user._id,
          email: user.email,
          token: user.token
        }
      })
    } catch (error) {
      logger.error(error)
      res.status(500).json(error)
    }
  }

  async auth (req, res) {
    try {
      const user = await User.findOne({ token: req.cookies.token })
      if (req.cookies.token === user.token) {
        return res.status(200).json({
          user: {
            id: user._id,
            email: user.email,
            token: user.token
          }
        })
      } else {
        return res.status(400).json({ message: 'You not autorithed' })
      }
    } catch (error) {
      logger.error(error)
      res.status(500).json({ message: 'You not autorithed' })
    }
  }

  async logOut (req, res) {
    try {
      res.clearCookie('token')
      return res.status(204).json({ message: 'You not autorithed' })
    } catch (error) {
      logger.error(error)
      res.status(500).json({ message: 'You not autorithed' })
    }
  }
}

export default new AuthController()
