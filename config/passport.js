import driverModel from '../models/driver.model';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'izhan',
};

passport.use(
  new JwtStrategy(options, function (jwtPayload, done) {
    return driverModel
      .findById(jwtPayload.id)
      .then((user) => {
        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  })
);
