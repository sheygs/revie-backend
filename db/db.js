const mongoose = require('mongoose');
require('dotenv').config();
const { log } = console;

async function dbConnection() {
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };
  try {
    await mongoose.connect(`${process.env.DATABASE_URL}`, options);
    log('Connected to mongoDB...');
  } catch ({ message }) {
    log('Not connected to mongoDB...', message);
  }
}

module.exports = dbConnection;
