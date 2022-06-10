import mongoose from 'mongoose'

const { Schema } = mongoose

const Token = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String, required: true }
  },
  {
    versionKey: false
  }
)

export default mongoose.model('Token', Token)
