import fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import placesRoutes from './routes/places-routes.js';
import usersRoutes from './routes/users-routes.js';
import HttpError from './models/http-error.js';

const app = express();
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else if (process.env.NODE_ENV === 'dev') {
  app.use(express.static(path.join(__dirname, '../frontend/src')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'public', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production or dev'));
}

app.use((req, res) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  const status = error.status || 500;
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unkown error occurred!' });
});

mongoose
  .connect(`${process.env.DB_SERVER}`)
  .then(() => {
    app.listen(process.env.PORT || 5003);
  })
  .catch((err) => {
    console.log(err, 'mongoose error:');
  });
