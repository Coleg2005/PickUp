import express from 'express';
import Game from '../models/Game.js';
import User from '../models/User.js';
import checkJwt from '../middleware/auth.js';
const router = express.Router();


// Create game works
router.post('/game', async (req, res) => {

  try {
    const { name, date, location, sport, leader, description } = req.body;
    if (!name || !date || !location || !sport || !leader ) {
      return res.status(400).json({ error: 'name, date, location, sport, and leader are required' });
    }
    const leadUser = await User.findOne({username: leader});
    if (!leadUser) {
      return res.status(404).json({ error: 'Leader not found' });
    }
    const game = new Game({ name, gameMembers: [leadUser], date, location, sport, leader: leadUser._id, description: description });
    await game.save();

    res.status(201).json({ message: 'Game created successfully' });
  } catch (error) {
    // console.error('Detailed error:', error);
    res.status(500).json({ error: "Failed to create game", details: error.message });
  }
});

// get games for location works
router.get('/game', async (req, res) => {
  try {
    const { location } = req.query;
    if (!location) {
      return res.status(400).json({ error: 'location is required' });
    }
    const games = await Game.find({ location: location }).populate('gameMembers').populate('leader');
    res.json(games);
  } catch {
    res.status(500).json({ error: 'Error getting game' });
  }
});

// delete game works
router.delete('/game', async (req, res) => {
  try {
    const { name, location } = req.query;
    if (!name || !location) {
      return res.status(400).json({ error: 'name and location are required' });
    }
    const game = await Game.findOne({ name, location });
    await game.deleteOne();
    res.json({ message: 'Game deleted successfully' });
  } catch {
    res.status(500).json({ error: 'Error deleting game' });
  }
});

// add game member works
router.post('/gameMember', async (req, res) => {
  try {
    const { name, location, gameMember } = req.body;
    if (!name || !location || !gameMember) {
      return res.status(400).json({ error: 'name, location, and gameMember are required', gameMember});
    }
    const game = await Game.findOne({ name, location });

    const member = await User.findOne({username: gameMember});
    if (!member) {
      return res.status(404).json({ error: 'Leader not found' });
    }

    if (game.gameMembers.some((existingMember) => existingMember._id.toString() === member._id.toString())) {
      return res.status(400).json({ error: 'User already in game' });
    }

    game.gameMembers.push(member._id);
    await game.save();
    res.json({ message: 'Game member added successfully' });
  } catch {
    res.status(500).json({ error: 'Error adding game member', details: error.message });
  }
});

// remove game member works 
router.delete('/gameMember', async (req, res) => {
  try {
    const { name, location, gameMember } = req.query;
    if(!name || !location || !gameMember) {
      return res.status(400).json({ error: 'name, location, and gameMember are required' });
    }
    const game = await Game.findOne({ name, location });
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    const member = await User.findOne({username: gameMember});
    if (!member) {
      return res.status(404).json({ error: 'Leader not found' });
    }

    game.gameMembers.pull(member._id);
    await game.save();
    res.json({ message: 'Game member removed successfully' });
  } catch {
    res.status(500).json({ error: 'Error removing game member' });
  }
});

export default router;