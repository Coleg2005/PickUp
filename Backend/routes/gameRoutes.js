import express from 'express';
import Game from '../models/Game.js';
import User from '../models/User.js';
import checkJwt from '../middleware/auth.js';
const router = express.Router();


// Create game works

router.post('/game', async (req, res) => {

  try {
    const { name, date, location, sport, leader } = req.body;
    if (!name || !date || !location || !sport || !leader ) {
      return res.status(400).json({ error: 'name, date, location, sport, and leader are required' });
    }
    const leadUser = await User.findOne({username: leader});
    if (!leadUser) {
      return res.status(404).json({ error: 'Leader not found' });
    }
    const game = new Game({ name, date, location, sport, leader: leadUser._id });
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
    const { location } = req.body;
    if (!location) {
      return res.status(400).json({ error: 'location is required' });
    }
    const games = await Game.find({ location: location });
    res.json(games);
  } catch {
    res.status(500).json({ error: 'Error getting game' });
  }
});

// delete game works

router.delete('/game', async (req, res) => {
  try {
    const { name, location } = req.body;
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
      return res.status(400).json({ error: 'name, location, and gameMember are required' });
    }
    const game = await Game.findOne({ name, location });

    const member = await User.findOne({username: gameMember});
    if (!member) {
      return res.status(404).json({ error: 'Leader not found' });
    }
    game.gameMembers.push(member._id);
    await game.save();
    res.json({ message: 'Game member added successfully' });
  } catch {
    res.status(500).json({ error: 'Error adding game member' });
  }
});

// get game members works
router.post('/gameMembers', async (req, res) => {
  try {
    const { name, location } = req.body;
    if (!name || !location) {
      return res.status(400).json({ error: 'name and location are required' });
    }
    const game = await Game.findOne({ name, location });
    if(!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    const gameMembers = game.gameMembers;
    if (!gameMembers || gameMembers.length === 0) {
      return res.status(404).json({ error: 'No game members found' });
    }
    const members = await User.find({ _id: { $in: gameMembers } });

    res.json(members.map(member => member.username));
  } catch {
    res.status(500).json({ error: 'Error getting game members' });
  }
});

// remove game member works 

router.delete('/gameMember', async (req, res) => {
  try {
    const { name, location, gameMember } = req.body;
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