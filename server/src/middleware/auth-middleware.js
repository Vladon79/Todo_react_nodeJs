import jwt from 'jsonwebtoken'
import { secretKey } from '../../index.js'

export const authMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }
  try {
    const token = req.headers.autorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Auth error' })
    }
    const decoded = jwt.verify(token, secretKey)
    req.user = decoded
    next()
  } catch (e) {
    return res.status(401).json({ message: 'Auth error' })
  }
}
