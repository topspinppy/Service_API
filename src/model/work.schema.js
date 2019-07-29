import mongoose from 'mongoose'

const Schema = mongoose.Schema
const schema = new Schema({
  doc_date: String,
  doc_time: String,
  location_id: {
    type: Schema.Types.ObjectId,
    ref: "location"
  },
  detail: String,
  phone: String,
  status: {
      type: Number,
      default: 0
  },
  status_date: String,
  status_time: String,
  work_detail: String,
  work_user_id: String,
  user_id: String
})

export default mongoose.model('work', schema)
