import mongoose from 'mongoose'

const Schema = mongoose.Schema

const VideoSchema = new Schema({
  fileUrl: {
    type: String,
    required: 'File URL required'
  },
  title: {
    type: String,
    required: 'Title required'
  },
  description: String,
  views: {
    type: Number,
    default: 0
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

//model 생성
const models = mongoose.model('Video', VideoSchema)
export default models
