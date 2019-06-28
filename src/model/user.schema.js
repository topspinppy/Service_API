import mongoose from 'mongoose'

const Schema = mongoose.Schema
const schema = new Schema({
  user_type: Number,
  name: String,
  username: {
    type: String,
    unique: true,
    index: true,
  },
  password: {
    type: String,
  },
})

export default mongoose.model('user', schema)
