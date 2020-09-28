import express from 'express';
const router = express.Router();
const User = require('../models/User');

router.post('/', (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.get('/google/:id', async (req, res) => {
  const user = await User.findOne({ googleId: req.params.id });
  res.send(user);
});

module.exports = router;
