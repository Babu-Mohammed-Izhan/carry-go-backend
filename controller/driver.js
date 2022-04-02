const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { getDriver, searchDriver } = require('../service/driverservice.js');
const driverModel = require('../models/driver.model.js');
const otpModel = require('../models/otp.model.js');

const router = express.Router();

router.get('/', async (req, res) => {
  const { to, from, location } = req.query;

  if (location) {
    const driverDataTemp = await getDriver(location, location);
    const driverData = driverDataTemp.map((d) => {
      d['password'] = '';
      return d;
    });
    return res.status(200).send(driverData);
  }

  const driverDataTemp = await searchDriver(from, to);
  const driverData = driverDataTemp.map((d) => {
    d['password'] = '';
    return d;
  });
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

router.post('/otp', async (req, res) => {
  const { email } = req.body;
  if (email) {
    const driver = await driverModel.findOne({ email: email });
    if (driver) {
      const otp = Math.floor(1000 + Math.random() * 9000);

      const otpTemp = new otpModel({
        email: email,
        otp: `${otp}`,
      });

      await otpTemp.save();

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 456,
        secure: true,
        service: 'Gmail',
        auth: {
          user: 'carryGo1234@gmail.com',
          pass: 'CarryGo2022',
        },
      });

      const mail = await transporter.sendMail({
        from: 'carryGo1234@gmail.com',
        to: email,
        subject: 'OTP verification',
        text: `${otp}`,
      });

      return res.status(200).send('sendOtp');
    }
    return res.status(400).send('Invalid Email');
  }
  return res.status(500).send('Server Error');
});

// Login for drivers
router.post('/login', async (req, res) => {
  const { username, password, email, otp } = req.body;

  if (username && password) {
    const driver = await driverModel.findOne({ username: username });

    const passwordCorrect =
      driver === null ? false : await bcrypt.compare(password, driver.password);

    if (!(driver && passwordCorrect)) {
      return res.status(401).json({
        error: 'invalid username or password',
      });
    }

    driver['password'] = '';

    return res.status(200).send(driver);
  }
  if (email) {
    const user = await otpModel.findOne({ otp: otp });
    if (user.otp === otp) {
      const driver = await driverModel.findOne({ email: email });
      if (driver) {
        driver['password'] = '';

        otpModel.deleteOne({ otp: `${otp}` });

        return res.status(200).send(driver);
      }
      return res.status(401).json({
        error: 'invalid username or password',
      });
    }
    return res.status(401).json({
      error: 'invalid username or password',
    });
  }
  return res.status(500).send('Server Error');
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

module.exports = router;
