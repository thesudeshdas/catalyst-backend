import express, { Express } from 'express';
import dotenv from 'dotenv';

const cookieSession = require('cookie-session');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
import MongoDBStore from 'connect-mongodb-session';
const session = require('express-session');
const mongoStore = MongoDBStore(session);

const indexRouter = require('./routes/index.route');
const postsRouter = require('./routes/posts.route');
const usersRouter = require('./routes/users.route');
const authRouter = require('./routes/auth.routes');

dotenv.config();

const passportSetup = require('./config/passport-setup');

const store = new mongoStore({
  collection: 'userSessions',
  uri: process.env.DB_URL,
  expires: 1000,
});

const PORT = process.env.PORT;

const app: Express = express();

// set up session cookies
// app.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: ['sudeshsessionkey'],
//   })
// );

// mongoose conection
const { mongooseConnection } = require('./connection/mongoose.connection');
mongooseConnection();

// cookie session
app.use(
  cookieSession({ name: 'session', keys: ['lama'], maxAge: 24 * 60 * 60 * 100 })
);

// express session
// app.use(
//   session({
//     secret: 'keyboard cat',
//     resave: false, // don't save session if unmodified
//     saveUninitialized: false, // don't create session until something stored
//     store: store,
//     cookie: {
//       sameSite: 'none',
//       secure: false,
//       maxAge: 1000 * 60 * 60 * 24 * 7, // One Week
//     },
//   })
// );

// initialize passport
// app.use(passport.initialize());
app.use(passport.authenticate('session'));
// app.use(passport.session());

// json
app.use(express.json());
app.set('json spaces', 2);

// helmet
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

// charset
app.use((req, res, next) => {
  res.contentType('application/json; charset=utf-8');
  next();
});

// cors policy
app.use(
  cors({
    origin: ['https://catalyst-react.netlify.app', 'http://localhost:3000'],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
