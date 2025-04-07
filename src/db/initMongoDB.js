import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';
import { ENV_VARS } from '../constants/env.js';

mongoose.set('strictQuery', true);
// mongoose.set('strictQuery', false);  // для подготовки к будущим изменениям


export const initMongoDB = async () => {
  try {
    const user = getEnvVar(ENV_VARS.MONGODB_USER);
    const pwd = getEnvVar(ENV_VARS.MONGODB_PASSWORD);
    const url = getEnvVar(ENV_VARS.MONGODB_URL);
    const db = getEnvVar(ENV_VARS.MONGODB_DB);

    if (!user || !pwd || !url || !db) {
      throw new Error('❌ One or more MongoDB environment variables are missing');
    }

    const connectionURI = `mongodb+srv://${encodeURIComponent(user)}:${encodeURIComponent(pwd)}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`;

    console.log(`🔌 Connecting to MongoDB: ${db} at ${url}...`);

    await mongoose.connect(connectionURI);

    console.log('✅ Mongo connection successfully established!');
  } catch (e) {
    console.log('❌ Error while setting up mongo connection:', e.message);
    throw e;
  }
};

