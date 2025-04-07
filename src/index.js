import dotenv from 'dotenv';
dotenv.config();

import { initMongoDB } from "./db/initMongoDB.js";
import { startServer } from './server.js';


export const bootstrap = async () => {
  try {
    await initMongoDB();
    console.log('✅ MongoDB connected.');

    await startServer ();
  } catch (e) {
    console.error('❌ Error during MongoDB connection:', e.message);
    process.exit(1);
  }
};

bootstrap();
