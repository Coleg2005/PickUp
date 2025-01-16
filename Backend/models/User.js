import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  auth0Id: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  profile: {
    location: String,
    description: {
      type: String,
      default: ''
    },
    picture: {
      type: String,
      default: 'public\assets\default-pfp.jpg'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  friends: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  }
});

module.exports = mongoose.model('User', UserSchema);