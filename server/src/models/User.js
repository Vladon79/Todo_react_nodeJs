import mongoose from 'mongoose'

const User = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false, required: true },
    activationLink: { type: String },
    token: { type: String }
  },
  {
    versionKey: false
  }
)

export default mongoose.model('User', User)
