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
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'successfull',
      user: req.user,
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
  req.logout();
  res.redirect('https://catalyst-react.netlify.app/');
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
// router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
//   // return res.status(200).json({
//   //   success: true,
//   //   message: 'User has been created or already exists',
//   //   user: req.user,
//   // });

//   var responseHTML =
//     '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>';
//   responseHTML = responseHTML.replace(
//     '%value%',
//     JSON.stringify({
//       user: req.user,
//     })
//   );
//   res.status(200).send(responseHTML);
// });

router.get(
  '/google/redirect',
  passport.authenticate('google', {
    successRedirect: 'https://catalyst-react.netlify.app',
    failureRedirect: '/login/failed',
  })
);

module.exports = router;
