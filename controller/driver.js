import express from 'express';
import { getDriver } from '../service/driverservice';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import driverModel from '../models/driver.model';

const router = express.Router();

router.get('/', (req, res) => {
  const { to, from } = req.params;
  const driverData = getDriver(from, to);
  res.status(200).send(driverData);
});

router.post('/login', (req, res) => {
  passport.use(
    new LocalStrategy(
      driverModel.findOne({ username: username }, function (err, user) {
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

  res.status(200);
});

router.post(
  '/register',
  (req, res, next) => {
    const hash = bcrypt.hashSync(req.body.password, 12);
    driverModel
      .findOne({ username: req.body.username })
      .then((res) => {
        if (res) {
          res.redirect('/');
        }
        driverModel.insertOne(
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
  },
  passport.authenticate('local', { failureRedirect: '/' }),
  (req, res, next) => {
    res.redirect('/');
  }
);

export default router;
