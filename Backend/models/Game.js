import mongoose from 'mongoose';

// general schema, think sample game

const GameSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  gameMembers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: []
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
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
 
const Game = mongoose.model('Game', GameSchema);

export default Game;