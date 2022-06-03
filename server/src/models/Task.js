import mongoose from 'mongoose'

const Task = new mongoose.Schema({
  name: { type: String, required: true },
  isChecked: { type: Boolean, required: true },
  type: { type: String, required: true },
  size: { type: Number, default: 0 },
  data: { type: Date }
},
{
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  },
  versionKey: false
}
)

export default mongoose.model('Task', Task)
