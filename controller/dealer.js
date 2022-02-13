import express from 'express';
import bcrypt from 'bcrypt';
import dealerModel from '../models/dealer.model.js';

const router = express.Router();

// Login dealer
router.post('/login', async (req, res) => {
  const body = req.body;
  const dealer = await dealerModel.findOne({ username: body.username });

  const passwordCorrect =
    dealer === null
      ? false
      : await bcrypt.compare(body.password, dealer.password);

  if (!(dealer && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password',
    });
  }

  dealer['password'] = '';

  res.status(200).send(dealer);
});

router.post('/register', async (req, res) => {
  const {
    name,
    username,
    password,
    email,
    mobileno,
    nature,
    weigth,
    quantity,
    state,
    city,
  } = req.body;

  const doc = await dealerModel.findOne({ username: username });

  if (doc) {
    return res.status(400).send({ error: 'Username is already taken' });
  }

  const hash = bcrypt.hashSync(password, 12);

  const dealer = new dealerModel({
    name,
    username,
    password: hash,
    email,
    mobileno,
    nature,
    weigth,
    quantity,
    state,
    city,
  });

  const savedDealer = await dealer.save();
  return res.status(200).json({ savedDealer });
});

export default router;
