import express from 'express';
import { verifyGoogleToken } from '../middleware/auth';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/signup', [verifyGoogleToken], (req, res) => {
  const google = req.google;
  const body = req.body;
  const user = new User({ name: body.name, googleId: google.sub, image: google.picture });
  user
    .save()
    .then((data) => {
      const accessToken = jwt.sign({ ...data }, process.env.GOOGLE_SECRET, { algorithm: 'HS256', expiresIn: '1 day' });
      res.json(accessToken);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.post('/login', [verifyGoogleToken], async (req, res) => {
  const google = req.google;
  const user = await User.findOne({ googleId: google.sub });
  if (!user) {
    return res.status(403).send({ error: 'Forbidden: Cannot find user with google id' });
  }
  const accessToken = jwt.sign({ ...user }, process.env.GOOGLE_SECRET, { algorithm: 'HS256', expiresIn: '1 day' });
  res.json(accessToken);
});

export default router;
