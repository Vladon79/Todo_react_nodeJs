import jwt from 'jsonwebtoken'
import { secretKey } from '../../index.js'

export const token = {
  token: '',
  createToken (user) {
    this.token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1d' })
  }
}
