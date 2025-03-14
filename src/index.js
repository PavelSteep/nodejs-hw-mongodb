import dotenv from 'dotenv';
import initMongoConnection from './db/initMongoConnection.js';
import setupServer from './server.js';

dotenv.config();

export const bootstrap = async () => {
  try {
    await initMongoConnection();
    console.log('MongoDB connected.');

    setupServer();
  } catch (e) {
    console.log('Error during MongoDB connection:', e);
    process.exit(1);
  }
};

bootstrap();
