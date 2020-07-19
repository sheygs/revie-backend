const mongoose = require('mongoose');
require('dotenv').config();
const { log } = console;

async function dbConnection() {
  const DB = process.env.DATABASE_URL;
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };
  try {
    await mongoose.connect(`${DB}`, options);
    log('Connected to mongoDB...');
  } catch ({ message }) {
    log('Not connected to mongoDB...', message);
  }
}

module.exports = dbConnection;
