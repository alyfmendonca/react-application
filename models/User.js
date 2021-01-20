const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  premiatoryTerm: {
    type: Boolean,
    required: false
  },
  type: {
    required: true,
    type: String,
    lowercase: true,
    enum: ['admin', 'agency', 'enterprise', 'sworn', 'swornpremiatory', 'swornpremiatoryend']
  },
  phone: {
    type: String,
    required: true
  },
  reset_password_token: {
    type: String,
    default: null,
  },
  reset_password_expires: {
    type: Date,
    default: null,

  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User
