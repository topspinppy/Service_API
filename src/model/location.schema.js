import mongoose from 'mongoose'

const Schema = mongoose.Schema
const schema = new Schema({
  code: String,
  name: String
})

export default mongoose.model('location', schema)
