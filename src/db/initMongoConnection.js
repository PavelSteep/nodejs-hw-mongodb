import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

const initMongoConnection = async () => {
  try {
    const user = getEnvVar('MONGODB_USER');
    const pwd = getEnvVar('MONGODB_PASSWORD');
    const url = getEnvVar('MONGODB_URL');
    const db = getEnvVar('MONGODB_DB');

    // await mongoose.connect(
    //   "mongodb+srv://bpv:2LMwWsiNmehyA7kX@cluster0.b0ikt.mongodb.net/students?retryWrites=true&w=majority"
    // );
    

    await mongoose.connect(
      `mongodb+srv://${encodeURIComponent(user)}:${encodeURIComponent(pwd)}@${url}/${db}?retryWrites=true&w=majority`
    );
    
    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.log('Error while setting up mongo connection', e);
    throw e;
  }
};

export default initMongoConnection;
