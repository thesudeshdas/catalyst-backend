import express, { Express } from 'express';
import dotenv from 'dotenv';
const helmet = require('helmet');
const cors = require('cors');

const indexRouter = require('./routes/index.route');
const postsRouter = require('./routes/posts.route');
const usersRouter = require('./routes/users.route');

dotenv.config();

// if (!(process.env.PORT && process.env.CLIENT_ORIGIN_URL)) {
//   throw new Error(
//     'Missing required environment variables. Check docs for more info.'
//   );
// }

// mongoose conection
const { mongooseConnection } = require('./connection/mongoose.connection');
mongooseConnection();

const PORT = process.env.PORT;

const app: Express = express();

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

app.use(
  cors({
    origin: '*',
    methods: ['GET'],
    maxAge: 86400,
  })
);

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
