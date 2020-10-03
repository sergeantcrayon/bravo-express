import express from 'express';
import { authorizeToken } from '../middleware/auth';
import Lfg from '../models/lfg.model';
import { IUser } from '../models/user.model';
const router = express.Router();

router.post('/', [authorizeToken], (req, res) => {
  const user = req['user']['_doc'];
  const owner = <IUser>{
    name: user.name,
    googleId: user.googleId,
    image: user.image,
  };
  req.body = {
    ...req.body,
    users: [{ ...owner, ign: req.body.ign }],
    owner,
  };
  const lfg = new Lfg(req.body);
  lfg
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.post('/query', async (req, res) => {
  const query = req.body;
  if (query.tags && query.tags.length > 0) {
    query.tags = {
      $in: query.tags.map((tag) => new RegExp(`^${tag}`, 'i')),
    };
  }
  let lfgs = await Lfg.find(req.body);
  lfgs = lfgs.sort((a, b) => b.created.getTime() - a.created.getTime()).slice(0, 20);
  res.send(lfgs);
});

export default router;
