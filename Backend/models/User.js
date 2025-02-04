import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
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

// Create a compound unique index
userSchema.index({ username: 1, email: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

export default User;