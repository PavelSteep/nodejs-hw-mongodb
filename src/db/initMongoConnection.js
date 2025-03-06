const mongoose = require('mongoose');
const logger = require('pino')();

const initMongoConnection = () => {
  const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = process.env;
  const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      logger.info('Mongo connection successfully established!');
    })
    .catch(err => {
      logger.error('MongoDB connection error:', err);
    });
};

module.exports = initMongoConnection;
