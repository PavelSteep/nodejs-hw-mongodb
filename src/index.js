const setupServer = require('./server');
require('dotenv').config();
setupServer();

const initMongoConnection = require('./db/initMongoConnection');
initMongoConnection();
