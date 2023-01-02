import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
const User = require('../models/user.model');

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id).then((user) => {
//     done(null, user);
//   });
// });

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/redirect',
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log({ profile });

      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          // already have this user
          console.log('user is: ', currentUser);
          done(null, currentUser);
        } else {
          // if not, create user in our db

          console.log('creating new user in DB');

          new User({
            email: profile.emails[0].value,
            googleId: profile.id,
            name: profile.displayName,
            profilePic: {
              src: profile._json.picture,
              alt: profile.displayName,
            },
          })
            .save()
            .then((newUser) => {
              console.log('created new user: ', newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);

passport.serializeUser(function (user, cb) {
  console.log('serialise user', user);

  process.nextTick(function () {
    cb(null, user);
  });
});

passport.deserializeUser(function (user, cb) {
  console.log('deserialise user', user);

  process.nextTick(function () {
    return cb(null, user);
  });
});
