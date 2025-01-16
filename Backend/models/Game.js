import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({

  gameMembers: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdby: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  plannedFor: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  sport: {
    type: String,
    required: true
  }
});
 
module.exports = mongoose.model('Game', GameSchema);