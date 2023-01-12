import express, { Express } from 'express';
import dotenv from 'dotenv';

const cookieSession = require('cookie-session');
const helmet = require('helmet');
const cors = require('cors');

const indexRouter = require('./routes/index.route');
const postsRouter = require('./routes/posts.route');
const usersRouter = require('./routes/users.route');

dotenv.config();

const PORT = process.env.PORT;

const app: Express = express();

// cors policy
app.use(
  cors({
    origin: ['https://catalyst-react.netlify.app', 'http://localhost:3000'],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

// mongoose conection
const { mongooseConnection } = require('./connection/mongoose.connection');
mongooseConnection();

// cookie session
app.use(
  cookieSession({ name: 'session', keys: ['lama'], maxAge: 24 * 60 * 60 * 100 })
);

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

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
