import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

const cors = require('cors');

dotenv.config();

const indexRouter = require('./routes/index.route');
const postsRouter = require('./routes/posts.route');

// mongoose conection
const { mongooseConnection } = require('./connection/mongoose.connection');
mongooseConnection();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());

app.use('/', indexRouter);
app.use('/posts', postsRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
