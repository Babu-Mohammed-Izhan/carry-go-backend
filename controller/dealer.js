import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dealerModel from '../models/dealer.model.js';
import { getDealers } from '../service/dealerservice.js';
import { getTokenFrom } from '../utils/auth.js';

const router = express.Router();

router.get('/', (req, res) => {
  const dealerData = getDealers();
  res.status(200).send(dealerData);
});

// Get dealerdata
router.get('/:id', async (req, res) => {
  const token = getTokenFrom(req);
  const decodedToken = jwt.verify(token, 'izhan');
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const dealer = await dealerModel.findById(decodedToken.id);

  if (!dealer) {
    res.status(400).json({ error: 'Unauthorized Access' });
  }

  res.status(200).send(dealer);
});

// Login dealer
router.post('/login', async (req, res) => {
  const body = req.body;
  const dealer = await dealerModel.findOne({ username: username });

  const passwordCorrect =
    dealer === null
      ? false
      : await bcrypt.compare(body.password, dealer.password);

  if (!(dealer && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }

  const dealerToken = {
    username: dealer.username,
    id: dealer.id,
  };

  const token = jwt.sign(dealerToken, 'izhan');

  res.status(200).send({ token, username: dealer.username, name: dealer.name });
});

router.post('/register', async (req, res) => {
  const {
    name,
    username,
    password,
    mobileno,
    nature,
    weigth,
    quantity,
    routes,
    dealers,
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
    mobileno,
    nature,
    weigth,
    quantity,
    routes,
    dealers,
  });

  const savedDealer = await dealer.save();
  return res.status(200).json({ savedDealer });
});

export default router;
