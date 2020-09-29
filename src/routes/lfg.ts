import express from 'express';
import Lfg from '../models/lfg.model';
const router = express.Router();

router.post('/', (req, res) => {
  const tokenObj = req['googleTokenId'];
  req.body = {
    ...req.body,
    user: {
      name: tokenObj.name,
      googleId: tokenObj.sub,
      image: tokenObj.picture,
    },
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
