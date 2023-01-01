import express, { Express } from 'express';
import dotenv from 'dotenv';
const cookieSession = require('cookie-session');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');

const indexRouter = require('./routes/index.route');
const postsRouter = require('./routes/posts.route');
const usersRouter = require('./routes/users.route');
const authRouter = require('./routes/auth.routes');

dotenv.config();
const passportSetup = require('./config/passport-setup');

const PORT = process.env.PORT;

const app: Express = express();

// cors policy
const corsOptions = {
  origin: [process.env.CLIENT_APP_URL],
  //update: or "origin: true," if you don't wanna add a specific one
  credentials: true,
};

app.use(
  cors({
    origin: `https://catalyst-react.netlify.app`,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

// app.use(cors(corsOptions));
// app.use(
//   cors({
//     origin: '*',
//     methods: ['GET'],
//     maxAge: 86400,
//   })
// );

// set up session cookies
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['sudeshsessionkey'],
  })
);

// mongoose conection
const { mongooseConnection } = require('./connection/mongoose.connection');
mongooseConnection();

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.set('json spaces', 2);

app.use(
  helmet({
    hsts: {
      maxAge: 31536000,
    },
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        'default-src': ["'none'"],
        'frame-ancestors': ["'none'"],
      },
    },
    frameguard: {
      action: 'deny',
    },
  })
);

app.use((req, res, next) => {
  res.contentType('application/json; charset=utf-8');
  next();
});

// const authCheck = (req, res, next) => {
//   if (!req.user) {
//     res.status(401).json({
//       authenticated: false,
//       message: 'user has not been authenticated',
//     });
//   } else {
//     next();
//   }
// };

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
