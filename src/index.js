import dotenv from 'dotenv';
import initMongoConnection from './db/initMongoConnection.js';
import { startServer } from './server.js';

dotenv.config();

export const bootstrap = async () => {
  try {
    await initMongoConnection();
    console.log('MongoDB connected.');

    startServer();
  } catch (e) {
    console.log('Error during MongoDB connection:', e);
    process.exit(1);
  }
};

bootstrap();
