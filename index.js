const usersRoute = require('./routes/users');
const reviewsRoute = require('./routes/reviews');
const express = require('express');
const { log } = console;
const app = express();
const dbConnection = require('./db/db');
dbConnection();

// req.body
app.use(express.json());
app.use('/api/v1/auth', usersRoute);
app.use('/api/v1/reviews', reviewsRoute);

// base path
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the Review API',
  });
});

// non-existent path
app.all('*', (req, res, next) => {
  return status(404).json({
    status: 'error',
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => log(`Listening on port ${port}...`));
