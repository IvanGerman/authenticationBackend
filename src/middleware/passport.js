const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
//const mongoose = require('mongoose');
//const User = mongoose.model('users');

const User = require('../models/User');

const { JWT_SECRET_KEY } = require('../common/config');


const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY
};

module.exports = passport2 = () => { 
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => { 
      try {  
        // console.log('passport2 try jwt_payload',jwt_payload);
        // console.log('Date.now()--',Date.now());
        // if ( (Date.now() / 1000) > jwt_payload.exp) {
        // console.log('Token is expired');
        // }
        // if ( (Date.now() / 1000) < jwt_payload.exp) {
        //   console.log('Token is alive');
        //   }
        const user = await User.findById(jwt_payload.userId).select('email id');
        if (user) {  console.log('passport2 user');
          return done(null, user);
        } else {  console.log('passport2 !user');
          return done(null, false);
        }
      } catch(err) {  
        console.log(err);
      }
    })
  )
}


//docs-   https://github.com/mikenicholson/passport-jwt
