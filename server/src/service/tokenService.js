import jwt from 'jsonwebtoken'
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../../config.js'
import { secretKey } from '../../index.js'
import TokenModel from '../models/TokenModel.js'

export const TokenService = {
  generateToken (payload) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '30m' })
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '30d' })
    return {
      accessToken, refreshToken
    }
  },

  async saveToken (userID, refreshToken) {
    const tokenData = await TokenModel.findOne({ user: userID })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    const token = await TokenModel.create({ user: userID, refreshToken })
    return token
  }
}

export const token = {
  token: '',
  createToken (user) {
    this.token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1d' })
  }
}
