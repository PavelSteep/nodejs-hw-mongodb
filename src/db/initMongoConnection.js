const mongoose = require('mongoose');
const logger = require('pino')();

const initMongoConnection = async () => {
  try {
    const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = process.env;
    const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    logger.info('MongoDB connection successfully established!');
  } catch (err) {
    logger.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = initMongoConnection;
