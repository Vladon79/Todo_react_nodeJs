import mongoose from 'mongoose'

const Task = new mongoose.Schema({
  name: { type: String, required: true },
  isChecked: { type: Boolean, required: true },
  type: { type: String, required: true },
  size: { type: Number, default: 0 },
  data: { type: Date },
  userEmail: { type: String, required: true },
  userId: { type: String, required: true }
},
{
  versionKey: false
}
)

export default mongoose.model('Task', Task)
