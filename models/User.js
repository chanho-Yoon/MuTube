import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number,
  googleId: Number
})

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' })

const models = mongoose.model('User', UserSchema)

export default models
