import logger from '../controllers/logger.js'
import User from '../models/User.js'

export const userService = {
  async activate (activationLink) {
    const user = await User.findOne({ activationLink })
    !user && logger.error('Некоректная ссылка активации')
    user.isActivated = true
    await user.save()
  }
}
