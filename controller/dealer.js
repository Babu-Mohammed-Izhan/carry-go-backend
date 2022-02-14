import express from 'express';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import dealerModel from '../models/dealer.model.js';
import otpModel from '../models/otp.model.js';

const router = express.Router();

let otp;

router.post('/otp', async (req, res) => {
  const { email } = req.body;
  if (email) {
    const dealer = await dealerModel.findOne({ email: email });
    if (dealer) {
      otp = Math.floor(1000 + Math.random() * 9000);
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
        from: 'babuizhan1234@gmail.com',
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

// Login dealer
router.post('/login', async (req, res) => {
  const { username, password, email, otp } = req.body;
  if (username && password) {
    const dealer = await dealerModel.findOne({ username: username });

    const passwordCorrect =
      dealer === null ? false : await bcrypt.compare(password, dealer.password);

    if (!(dealer && passwordCorrect)) {
      return res.status(401).json({
        error: 'invalid username or password',
      });
    }

    dealer['password'] = '';

    return res.status(200).send(dealer);
  }
  if (email) {
    const user = await otpModel.findOne({ otp: otp });
    if (user.otp === otp) {
      const dealer = await dealerModel.findOne({ email: email });
      if (dealer) {
        dealer['password'] = '';

        const deleteOtp = await otpModel.deleteOne({ otp: otp });

        return res.status(200).send(dealer);
      }
      return res.status(401).json({
        error: 'invalid username or password',
      });
    }
  }
  return res.status(500).send('Server Error');
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
