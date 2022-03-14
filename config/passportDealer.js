import driverModel from '../models/driver.model';
import bcrypt from 'bcrypt';
import passport from 'passport';
const localStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'izhan',
};

passport.use('registerDealer', new localStrategy({}));
passport.use('loginDealer', new localStrategy({}));

// passport.use(
//   new JwtStrategy(options, function (jwtPayload, done) {
//     return driverModel
//       .findById(jwtPayload.id)
//       .then((user) => {
//         return done(null, user);
//       })
//       .catch((err) => {
//         return done(err);
//       });
//   })
// );
