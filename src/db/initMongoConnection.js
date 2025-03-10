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

    // После установления соединения импортируем данные из students.json
    await importStudents();
  } catch (e) {
    console.log('Error while setting up mongo connection', e);
    throw e;
  }
};

// Функция для импорта данных студентов из файла students.json
const importStudents = async () => {
  try {
    const filePath = path.join(__dirname, '../../students.json');
    const studentsData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Импортируем данные студентов в MongoDB
    await Student.insertMany(studentsData);

    console.log('Students imported successfully!');
  } catch (error) {
    console.error('Error importing students:', error);
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
