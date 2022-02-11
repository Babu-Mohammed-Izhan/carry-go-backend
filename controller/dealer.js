import express from 'express';
import bcrypt from 'bcrypt';
import dealerModel from '../models/dealer.model';
import { getDealers } from '../service/dealerservice';

const router = express.Router();

router.get('/', (req, res) => {
  const { to, from } = req.params;
  const dealerData = getDealers(from, to);
  res.status(200).send(dealerData);
});

router.post('/login', (req, res) => {
  passport.use(
    new LocalStrategy(
      dealerModel.findOne({ username: username }, function (err, user) {
        console.log('User ' + username + ' attempted to log in.');
        if (err) return done(err);
        if (!user) return done(null, false);
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false);
        }
        return done(null, user);
      })
    )
  );
});

router.post('/register', (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 12);
  dealerModel
    .findOne({ username: req.body.username })
    .then((res) => {
      if (res) {
        res.redirect('/');
      }
      dealerModel.insertOne(
        {
          username: req.body.username,
          password: hash,
        },
        (err, doc) => {
          if (err) {
            res.redirect('/');
          } else {
            next(null, doc.ops[0]);
          }
        }
      );
    })
    .catch((err) => {
      if (err) {
        next(err);
      }
    });
});

export default router;
