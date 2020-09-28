import express from 'express';
import Game from '../models/game.model';
import { ObjectId } from 'mongodb';

const router = express.Router();

router.get('/', async (req, res) => {
  const games = await Game.find();
  res.send(games);
});

router.get('/:id', async (req, res) => {
  const game = await Game.findOne({ _id: new ObjectId(req.params.id) });
  res.send(game);
});

export default router;
