import { StudentsCollection } from '../models/student.js';

// Получить всех студентов
export const getAllStudents = async () => {
  return await StudentsCollection.find();
};

// Получить студента по ID
export const getStudentById = async (studentId) => {
  return await StudentsCollection.findById(studentId);
};

// Создать нового студента
export const createStudent = async (student) => {
  return await StudentsCollection.create(student);
};

// Обновить студента
export const updateStudent = async (studentId, student) => {
  return await StudentsCollection.findByIdAndUpdate(studentId, student, {
    new: true,
  });
};

// Удалить студента
export const deleteStudent = async (studentId) => {
  return await StudentsCollection.findByIdAndDelete(studentId);
};

// Поиск студентов по строке запроса (например, по имени)
export const searchStudents = async (query) => {
  try {
    const students = await StudentsCollection.find({
      name: new RegExp(query, 'i'),  // Ищем студентов, у которых в имени есть строка из query
    });
    return students;
  } catch (error) {
    throw new Error('Error searching for students');
  }
};

export default { 
  getAllStudents, 
  getStudentById, 
  createStudent, 
  updateStudent, 
  deleteStudent, 
  searchStudents 
};




// import { StudentsCollection } from '../models/student.js';

// export const getAllStudents = async () => {
//   return await StudentsCollection.find();
// };

// export const getStudentById = async (studentId) => {
//   return await StudentsCollection.findById(studentId);
// };

// export const createStudent = async (student) => {
//   return await StudentsCollection.create(student);
// };

// export const updateStudent = async (studentId, student) => {
//   return await StudentsCollection.findByIdAndUpdate(studentId, student, {
//     new: true,
//   });
// };

// export const deleteStudent = async (studentId) => {
//   return await StudentsCollection.findByIdAndDelete(studentId);
// };

// export default { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent };
