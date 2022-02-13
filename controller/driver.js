import express from 'express';
import bcrypt from 'bcrypt';
import { getDriver, searchDriver } from '../service/driverservice.js';
import driverModel from '../models/driver.model.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { to, from, location } = req.query;

  if (location) {
    const driverData = await searchDriver(location, location);
    return res.status(200).send(driverData);
  }

  const driverData = await getDriver(from, to);
  return res.status(200).send(driverData);
});

//Update driver data
router.put('/:id', async (req, res) => {
  const dealerData = req.body.dealer;
  const id = req.params.id;

  const driver = await driverModel.updateOne(
    { _id: id },
    { $push: { dealers: dealerData } }
  );

  if (driver) {
    const updatedDriver = await driverModel.findById(id);
    return res.status(200).send(updatedDriver);
  }

  return res.status(500).send('Error on the server');
});

// Login for drivers
router.post('/login', async (req, res) => {
  const body = req.body;
  const driver = await driverModel.findOne({ username: body.username });

  const passwordCorrect =
    driver === null
      ? false
      : await bcrypt.compare(body.password, driver.password);

  if (!(driver && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password',
    });
  }

  driver['password'] = '';

  res.status(200).send(driver);
});

//Register for drivers
router.post('/register', async (req, res) => {
  const {
    name,
    username,
    password,
    email,
    age,
    truckno,
    mobileno,
    capacity,
    transporter,
    experience,
    routes,
  } = req.body;

  const doc = await driverModel.findOne({ username: username });

  if (doc) {
    return res.status(400).send({ error: 'Username is already taken' });
  }

  const hash = bcrypt.hashSync(password, 12);

  const driver = new driverModel({
    name,
    username,
    password: hash,
    email,
    age,
    truckno,
    mobileno,
    capacity,
    transporter,
    experience,
    routes,
    dealers: [],
  });

  const saveddriver = await driver.save();
  return res.status(200).json(saveddriver);
});

export default router;
