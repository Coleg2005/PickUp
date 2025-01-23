import express from 'express';
import Game from '../models/Game.js';
import { checkJwt, extractUserId } from '../middleware/auth.js';
const router = express.Router();

// create a collection of games; 

router.post('/event', checkJwt, async (req, res) => {

  

});

router.get('/event', checkJwt, async (req, res) => {
});

router.delete('/event', checkJwt, async (req, res) => {
});

router.post('/gameMember', checkJwt, async (req, res) => {
});

router.get('/gameMembers', checkJwt, async (req, res) => {
});

router.delete('/gameMember', checkJwt, async (req, res) => {
});

module.exports = router;