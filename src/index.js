import dotenv from 'dotenv';
dotenv.config();
import { initMongoDB } from "./db/initMongoDB.js";
import { startServer } from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';


export const bootstrap = async () => {
  try {
    await initMongoDB();
    console.log('✅ MongoDB connected.');
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(UPLOAD_DIR);

    await startServer ();
  } catch (e) {
    console.error('❌ Error during MongoDB connection:', e.message);
    process.exit(1);
  }
};

void bootstrap();
