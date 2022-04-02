// const driverModel = require('../models/driver.model');
// const bcrypt = require('bcrypt');
// const passport = require('passport');
// const localStrategy = require('passport-local').Strategy;
// const JWTStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;

// const options = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: 'izhan',
// };

// passport.use('registerDriver', new localStrategy({}));

// passport.use('loginDriver', new localStrategy({}));

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
