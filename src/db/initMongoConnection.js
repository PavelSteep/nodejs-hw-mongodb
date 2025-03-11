import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import Student from '../models/student.js';
import { getEnvVar } from '../utils/getEnvVar.js';

export const initMongoConnection = async () => {
  try {
    const user = getEnvVar('MONGODB_USER');
    const pwd = getEnvVar('MONGODB_PASSWORD');
    const url = getEnvVar('MONGODB_URL');
    const db = getEnvVar('MONGODB_DB');

    await mongoose.connect(
      `mongodb+srv://${encodeURIComponent(user)}:${encodeURIComponent(pwd)}@${url}/${db}?retryWrites=true&w=majority`
    );

    console.log('Mongo connection successfully established!');

  } catch (e) {
    console.log('Error while setting up mongo connection', e);
    throw e;
    process.exit(1);
  }
};



// import mongoose from 'mongoose';
// import { getEnvVar } from '../utils/getEnvVar.js';

// export const initMongoConnection = async () => {
//   try {
//     const user = getEnvVar('MONGODB_USER');
//     const pwd = getEnvVar('MONGODB_PASSWORD');
//     const url = getEnvVar('MONGODB_URL');
//     const db = getEnvVar('MONGODB_DB');

//     await mongoose.connect(
//       `mongodb+srv://${encodeURIComponent(user)}:${encodeURIComponent(pwd)}@${url}/${db}?retryWrites=true&w=majority`
//     );

//     console.log('Mongo connection successfully established!');
//   } catch (e) {
//     console.log('Error while setting up mongo connection', e);
//     throw e;
//   }
// };
