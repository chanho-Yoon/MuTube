import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CommentSchema = new Schema({
  text: {
    type: String,
    required: 'Text is required'
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

const models = mongoose.model('Comment', CommentSchema)
export default models