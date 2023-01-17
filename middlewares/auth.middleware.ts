const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

exports.auth_verification = (req, res, next) => {
  try {
    const authTokenFromClient = req.headers.authorization;

    if (authTokenFromClient) {
      jwt.verify(authTokenFromClient, secret, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            title: 'Auth Verification',
            success: false,
            message:
              'Auth verification failed. Secret & token different. ' +
              err.message,
            authTokenFromClient,
            err,
          });
        }

        next();
      });
    } else {
      return res.status(400).json({
        title: 'Auth Verification',
        success: false,
        message: 'Auth verification failed. No token found.',
      });
    }
  } catch (err) {
    res.status(500).json({
      title: 'Auth Verification',
      success: false,
      message: 'Auth verification failed. Please provide the correct token.',
    });
  }
};
