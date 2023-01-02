const express = require('express');
const router = express.Router();
const passport = require('passport');

// log in success
// router.get('/login', (req, res) => {
//   console.log('kya ji?', req.cookies);

//   if (req.user) {
//     res.status(200).json({
//       success: true,
//       message: 'User has been authenticated',
//       user: req.user,
//       // cookies: req.cookies,
//     });
//   } else {
//     res.status(401).json({
//       success: false,
//       message: 'User failed to authenticated',
//       // user: req.user,
//       // cookies: req.cookies,
//     });
//   }
// });

router.get('/login/success', (req, res) => {
  // console.log(req, res);

  console.log('before if-else', req.session);

  if (req.user) {
    console.log('inside if');

    res.status(200).json({
      success: true,
      message: 'successfull',
      user: req.user,
      //   cookies: req.cookies
    });
  } else {
    console.log('outside if');

    res.status(401).json({
      success: false,
      message: 'unsuccessfull',
      // user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'failure',
  });
});

router.get('/logout', (req, res) => {
  // if (req.user) {
  //   console.log('logout when user');

  //   req.logout();
  //   res.redirect('http://localhost:3000');
  // }

  console.log('logout when NO user');

  req.logout();
  res.redirect('http://localhost:3000');
});

// log out
// router.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('http://localhost:3000');
// });

// auth with google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// redirect callback
router.get(
  '/google/redirect',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000',
    failureRedirect: '/login/failed',
  })
);

module.exports = router;
