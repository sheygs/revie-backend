const usersRoute = require('./routes/users');
const express = require('express');
const { log } = console;
const app = express();
const dbConnection = require('./db/db');
dbConnection();

// req.body
app.use(express.json());
app.use('/api/v1/auth', usersRoute);

app.get('/api/v1', (req, res) => {
  res.send('Welcome to the Review platform');
});

const port = process.env.PORT || 4000;
app.listen(port, () => log(`Listening on port ${port}...`));
